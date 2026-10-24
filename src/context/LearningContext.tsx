import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Course, 
  CourseProgress, 
  GamificationProfile, 
  CommunityThread, 
  Lesson, 
  UserProfile, 
  LeaderboardEntry 
} from '../types';
import { INITIAL_COURSES } from '../data/coursesData';
import { 
  db, 
  auth, 
  googleProvider, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  where 
} from 'firebase/firestore';

interface LearningContextType {
  // Auth state
  currentUser: UserProfile | null;
  authReady: boolean;
  currentRole: 'student' | 'superadmin';
  loginWithGoogle: () => Promise<void>;
  loginSuperAdmin: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setRole: (role: 'student' | 'superadmin') => void;

  // Courses state & operations
  courses: Course[];
  activeCourseId: string | null;
  activeLessonId: string | null;
  setActiveCourseId: (id: string | null) => void;
  setActiveLessonId: (id: string | null) => void;

  // Enrollment & Student Progress
  enrolledProgress: Record<string, CourseProgress>;
  isEnrolled: (courseId: string) => boolean;
  enrollInCourse: (courseId: string) => Promise<void>;
  markLessonCompleted: (courseId: string, lessonId: string) => Promise<void>;
  recordQuizResult: (courseId: string, quizId: string, scorePercentage: number, xpGained: number) => Promise<void>;

  // Gamification & Leaderboard
  gamification: GamificationProfile;
  leaderboardUsers: LeaderboardEntry[];

  // Community Forum
  communityThreads: CommunityThread[];
  addCommunityThread: (courseId: string, titleBn: string, contentBn: string) => Promise<void>;
  replyToCommunityThread: (threadId: string, contentBn: string) => Promise<void>;
  toggleUpvoteThread: (threadId: string) => Promise<void>;

  // Super Admin CRUD
  adminAddCourse: (newCourse: Course) => Promise<void>;
  adminUpdateCourse: (updatedCourse: Course) => Promise<void>;
  adminDeleteCourse: (courseId: string) => Promise<void>;
  adminAddLesson: (courseId: string, chapterId: string, lesson: Lesson) => Promise<void>;
  adminUpdateLesson: (courseId: string, chapterId: string, lesson: Lesson) => Promise<void>;
  adminDeleteLesson: (courseId: string, chapterId: string, lessonId: string) => Promise<void>;
  adminResetProgress: (courseId: string) => Promise<void>;
  adminDeleteThread: (threadId: string) => Promise<void>;
  adminTogglePinThread: (threadId: string) => Promise<void>;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

// Super admin email recognized in system
const SUPER_ADMIN_EMAILS = ['fdevnaseem@gmail.com', 'super@gmail.com', 'rashedul76000@gmail.com'];

// Fallback initial community threads (offline & unseeded state)
const DEFAULT_COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'thread-starter-1',
    courseId: 'web-dev-fullstack',
    courseTitleBn: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট',
    authorId: 'admin-seed',
    authorName: 'সুপার অ্যাডমিন (শিখুন)',
    authorRole: 'superadmin',
    createdAt: 'আজ',
    titleBn: 'কোর্স চলাকালীন কীভাবে প্রজেক্ট কোড গিটহাবে পুশ করবেন?',
    contentBn: 'প্রতিটি মডিউল শেষে আপনার অ্যাসাইনমেন্ট গিটহাবে রিপোজিটরি তৈরি করে সেটির লাইভ লিঙ্ক সাবমিট করবেন। কোনো সমস্যা হলে ফোরামে প্রশ্ন করতে পারেন।',
    upvotes: 4,
    upvotedUserIds: [],
    isPinned: true,
    replies: [
      {
        id: 'reply-starter-1',
        authorName: 'রাশেদুল হাসান',
        authorRole: 'student',
        createdAt: 'আজ',
        contentBn: 'ধন্যবাদ ভাইয়া! গিটহাবে পুশ করার পর কোড রিভিউর ফিডব্যাক কীভাবে পাব?',
        upvotes: 1
      }
    ]
  },
  {
    id: 'thread-starter-2',
    courseId: 'ui-ux-design',
    courseTitleBn: 'ইউআই/ইউএক্স ও প্রোডাক্ট ডিজাইন',
    authorId: 'mentor-seed',
    authorName: 'ফারহান আহমেদ',
    authorRole: 'instructor',
    createdAt: 'গতকাল',
    titleBn: 'Figma অটো-লেআউট এবং রেসপন্সিভ গ্রিড মাস্টারি টিপস',
    contentBn: 'ওয়েব পেজের লেআউট ডিজাইন করার সময় মোবাইল ব্রেকপয়েন্ট ৩৬০px এবং ডেস্কটপ ১২৮০px ধরে গ্রিড সাজাবেন। অটো-লেআউটের Hug ও Fill কন্টেইনার ব্যবহার করলে রেসপন্সিভ ডিজাইন সহজ হয়।',
    upvotes: 6,
    upvotedUserIds: [],
    isPinned: false,
    replies: []
  }
];

// Fallback top leaderboard entries
const DEFAULT_LEADERBOARD_USERS: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    nameBn: 'তানভীর আহমেদ',
    districtBn: 'ঢাকা',
    xp: 2850,
    streakDays: 14,
    completedQuizzes: 18,
    avatarBg: 'bg-indigo-600',
    photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-2',
    nameBn: 'সাদিয়া ইসলাম',
    districtBn: 'চট্টগ্রাম',
    xp: 2420,
    streakDays: 11,
    completedQuizzes: 15,
    avatarBg: 'bg-emerald-600',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-3',
    nameBn: 'রাকিবুল হাসান',
    districtBn: 'রাজশাহী',
    xp: 1980,
    streakDays: 9,
    completedQuizzes: 12,
    avatarBg: 'bg-amber-600'
  },
  {
    id: 'lead-4',
    nameBn: 'শাকিল আহমেদ',
    districtBn: 'সিলেট',
    xp: 1650,
    streakDays: 7,
    completedQuizzes: 10,
    avatarBg: 'bg-rose-600'
  },
  {
    id: 'lead-5',
    nameBn: 'ফারহানা বিনতে কামাল',
    districtBn: 'খুলনা',
    xp: 1420,
    streakDays: 5,
    completedQuizzes: 8,
    avatarBg: 'bg-purple-600'
  }
];

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<'student' | 'superadmin'>('student');

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [enrolledProgress, setEnrolledProgress] = useState<Record<string, CourseProgress>>({});
  const [communityThreads, setCommunityThreads] = useState<CommunityThread[]>(DEFAULT_COMMUNITY_THREADS);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardEntry[]>(DEFAULT_LEADERBOARD_USERS);
  
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Sync role when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setCurrentRole(currentUser.role);
    } else {
      setCurrentRole('student');
    }
  }, [currentUser]);

  // 1. Firebase Authentication Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      try {
        if (fbUser) {
          const userDocRef = doc(db, 'users', fbUser.uid);
          let userSnap;
          try {
            userSnap = await getDoc(userDocRef);
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `users/${fbUser.uid}`);
          }

          const isSuperAdminEmail = fbUser.email ? SUPER_ADMIN_EMAILS.includes(fbUser.email.toLowerCase()) : false;

          if (userSnap && userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            const updatedProfile: UserProfile = {
              ...data,
              id: fbUser.uid,
              name: fbUser.displayName || data.name || 'শিক্ষার্থী',
              email: fbUser.email || data.email,
              photoURL: fbUser.photoURL || data.photoURL || '',
              role: isSuperAdminEmail ? 'superadmin' : data.role || 'student',
              lastActiveDate: new Date().toISOString()
            };
            setCurrentUser(updatedProfile);

            // Update user profile in Firestore
            try {
              await updateDoc(userDocRef, {
                name: updatedProfile.name,
                photoURL: updatedProfile.photoURL,
                role: updatedProfile.role,
                lastActiveDate: updatedProfile.lastActiveDate
              });
            } catch (err) {
              handleFirestoreError(err, OperationType.UPDATE, `users/${fbUser.uid}`);
            }
          } else {
            // New user registration
            const newProfile: UserProfile = {
              id: fbUser.uid,
              name: fbUser.displayName || 'নতুন শিক্ষার্থী',
              email: fbUser.email || '',
              photoURL: fbUser.photoURL || '',
              role: isSuperAdminEmail ? 'superadmin' : 'student',
              xp: 150,
              streakDays: 1,
              lastActiveDate: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              badges: [
                {
                  id: 'badge-welcome',
                  nameBn: 'প্ল্যাটফর্মে স্বাগতম',
                  descriptionBn: 'শিখুন অ্যাকাউন্টে সফলভাবে লগইন করেছেন',
                  iconName: 'Footprints',
                  unlockedAt: 'আজ'
                }
              ]
            };

            try {
              await setDoc(userDocRef, newProfile);
            } catch (err) {
              handleFirestoreError(err, OperationType.CREATE, `users/${fbUser.uid}`);
            }
            setCurrentUser(newProfile);
          }
        } else {
          // If not logged in via Firebase Auth, check if custom Super Admin was logged in
          const savedAdmin = localStorage.getItem('shikhun_custom_superadmin');
          if (savedAdmin) {
            try {
              const parsed = JSON.parse(savedAdmin);
              setCurrentUser(parsed);
              setCurrentRole('superadmin');
            } catch {
              setCurrentUser(null);
              setCurrentRole('student');
            }
          } else {
            setCurrentUser(null);
            setCurrentRole('student');
          }
        }
      } catch (error) {
        console.error('Auth state change error:', error);
      } finally {
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time Courses Listener (from Firestore)
  useEffect(() => {
    const coursesColRef = collection(db, 'courses');
    
    const unsubscribe = onSnapshot(coursesColRef, async (snapshot) => {
      if (snapshot.empty) {
        setCourses(INITIAL_COURSES);
        // Only an authenticated superadmin can seed initial courses into Firestore
        if (currentUser && currentUser.role === 'superadmin') {
          for (const course of INITIAL_COURSES) {
            try {
              await setDoc(doc(db, 'courses', course.id), course);
            } catch (err) {
              console.warn('Course seed notice:', err);
            }
          }
        }
      } else {
        const loadedCourses: Course[] = [];
        snapshot.forEach((doc) => {
          loadedCourses.push(doc.data() as Course);
        });
        setCourses(loadedCourses);
      }
    }, () => {
      // Smooth fallback to bundled initial courses
      setCourses(INITIAL_COURSES);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 3. Real-time Enrollments Listener for current user
  useEffect(() => {
    if (!currentUser) {
      setEnrolledProgress({});
      return;
    }

    const enrollmentsColRef = collection(db, 'enrollments');
    const q = query(enrollmentsColRef, where('userId', '==', currentUser.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const progressMap: Record<string, CourseProgress> = {};
      snapshot.forEach((doc) => {
        const data = doc.data() as CourseProgress;
        progressMap[data.courseId || doc.id] = data;
      });
      setEnrolledProgress(progressMap);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'enrollments');
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 4. Real-time Community Threads Listener (from Firestore)
  useEffect(() => {
    const threadsColRef = collection(db, 'communityThreads');

    const unsubscribe = onSnapshot(threadsColRef, async (snapshot) => {
      if (snapshot.empty) {
        setCommunityThreads(DEFAULT_COMMUNITY_THREADS);
        // Only an authenticated superadmin can seed initial threads
        if (currentUser && currentUser.role === 'superadmin') {
          for (const t of DEFAULT_COMMUNITY_THREADS) {
            try {
              await setDoc(doc(db, 'communityThreads', t.id), t);
            } catch (err) {
              console.warn('Thread seed notice:', err);
            }
          }
        }
      } else {
        const threads: CommunityThread[] = [];
        snapshot.forEach((doc) => {
          threads.push(doc.data() as CommunityThread);
        });
        // Sort pinned first, then by upvotes
        threads.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return (b.upvotes || 0) - (a.upvotes || 0);
        });
        setCommunityThreads(threads);
      }
    }, () => {
      // Smooth fallback to default starter threads
      setCommunityThreads(DEFAULT_COMMUNITY_THREADS);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 5. Real-time Leaderboard from Firestore Users
  useEffect(() => {
    // Only query live users collection if superadmin, else use default leaderboard ranking
    if (!currentUser || currentUser.role !== 'superadmin') {
      setLeaderboardUsers(DEFAULT_LEADERBOARD_USERS);
      return;
    }

    const usersColRef = collection(db, 'users');
    const q = query(usersColRef, orderBy('xp', 'desc'), limit(15));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries: LeaderboardEntry[] = [];
      snapshot.forEach((d) => {
        const u = d.data() as UserProfile;
        entries.push({
          id: u.id,
          nameBn: u.name,
          districtBn: 'ঢাকা',
          xp: u.xp || 0,
          streakDays: u.streakDays || 1,
          completedQuizzes: Math.floor((u.xp || 0) / 100),
          avatarBg: 'bg-indigo-600',
          photoURL: u.photoURL,
          isCurrentUser: currentUser?.id === u.id
        });
      });
      if (entries.length > 0) {
        setLeaderboardUsers(entries);
      }
    }, () => {
      setLeaderboardUsers(DEFAULT_LEADERBOARD_USERS);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Auth Operations
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign In error:', error);
      throw error;
    }
  };

  const loginSuperAdmin = async (password: string): Promise<boolean> => {
    if (password === 'password') {
      const superAdminProfile: UserProfile = {
        id: 'super-admin-root',
        name: 'সুপার অ্যাডমিন (শিখুন)',
        email: 'super@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'superadmin',
        xp: 9999,
        streakDays: 45,
        lastActiveDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', superAdminProfile.id), superAdminProfile);
      } catch (err) {
        console.warn('Admin profile Firestore sync note:', err);
      }

      localStorage.setItem('shikhun_custom_superadmin', JSON.stringify(superAdminProfile));
      setCurrentUser(superAdminProfile);
      setCurrentRole('superadmin');
      return true;
    }
    return false;
  };

  const logout = async () => {
    localStorage.removeItem('shikhun_custom_superadmin');
    await fbSignOut(auth);
    setCurrentUser(null);
    setCurrentRole('student');
  };

  // Gamification helper
  const gamification: GamificationProfile = {
    xp: currentUser?.xp ?? 0,
    streakDays: currentUser?.streakDays ?? 1,
    lastActiveDate: currentUser?.lastActiveDate ?? new Date().toISOString(),
    badges: currentUser?.badges ?? [
      {
        id: 'badge-starter',
        nameBn: 'লার্নিং জার্নি শুরু',
        descriptionBn: 'শিখুন প্ল্যাটফর্মে সফলভাবে যুক্ত হয়েছেন',
        iconName: 'Flame',
        unlockedAt: 'আজ'
      }
    ]
  };

  // Course Enrollment & Progress
  const isEnrolled = (courseId: string) => {
    return Boolean(enrolledProgress[courseId]);
  };

  const enrollInCourse = async (courseId: string) => {
    if (!currentUser) {
      // Prompt sign in
      await loginWithGoogle();
      return;
    }

    if (enrolledProgress[courseId]) return;

    const course = courses.find(c => c.id === courseId);
    const firstLessonId = course?.chapters[0]?.lessons[0]?.id || '';
    const enrollmentId = `${currentUser.id}_${courseId}`;

    const newProgress: CourseProgress = {
      id: enrollmentId,
      userId: currentUser.id,
      courseId,
      completedLessonIds: [],
      quizScores: {},
      enrolledAt: new Date().toISOString(),
      lastAccessedLessonId: firstLessonId
    };

    try {
      await setDoc(doc(db, 'enrollments', enrollmentId), newProgress);
      // Award 50 XP
      const updatedXp = (currentUser.xp || 0) + 50;
      await updateDoc(doc(db, 'users', currentUser.id), {
        xp: updatedXp
      });
      setCurrentUser(prev => prev ? { ...prev, xp: updatedXp } : prev);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `enrollments/${enrollmentId}`);
    }
  };

  const markLessonCompleted = async (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    const enrollmentId = `${currentUser.id}_${courseId}`;
    const current = enrolledProgress[courseId] || {
      id: enrollmentId,
      userId: currentUser.id,
      courseId,
      completedLessonIds: [],
      quizScores: {},
      enrolledAt: new Date().toISOString()
    };

    if (current.completedLessonIds.includes(lessonId)) return;

    const updatedLessons = [...current.completedLessonIds, lessonId];
    try {
      await setDoc(doc(db, 'enrollments', enrollmentId), {
        ...current,
        completedLessonIds: updatedLessons,
        lastAccessedLessonId: lessonId
      });

      // Award 40 XP
      const updatedXp = (currentUser.xp || 0) + 40;
      await updateDoc(doc(db, 'users', currentUser.id), {
        xp: updatedXp
      });
      setCurrentUser(prev => prev ? { ...prev, xp: updatedXp } : prev);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `enrollments/${enrollmentId}`);
    }
  };

  const recordQuizResult = async (courseId: string, quizId: string, scorePercentage: number, xpGained: number) => {
    if (!currentUser) return;
    const enrollmentId = `${currentUser.id}_${courseId}`;
    const current = enrolledProgress[courseId] || {
      id: enrollmentId,
      userId: currentUser.id,
      courseId,
      completedLessonIds: [],
      quizScores: {},
      enrolledAt: new Date().toISOString()
    };

    const updatedQuizScores = {
      ...current.quizScores,
      [quizId]: Math.max(current.quizScores[quizId] || 0, scorePercentage)
    };

    try {
      await setDoc(doc(db, 'enrollments', enrollmentId), {
        ...current,
        quizScores: updatedQuizScores
      });

      const updatedXp = (currentUser.xp || 0) + xpGained;
      await updateDoc(doc(db, 'users', currentUser.id), {
        xp: updatedXp
      });
      setCurrentUser(prev => prev ? { ...prev, xp: updatedXp } : prev);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `enrollments/${enrollmentId}`);
    }
  };

  // Community Discussions
  const addCommunityThread = async (courseId: string, titleBn: string, contentBn: string) => {
    const authorName = currentUser?.name || 'শিক্ষার্থী';
    const authorId = currentUser?.id || 'anon-student';
    const authorRole = currentUser?.role || 'student';
    const authorPhotoURL = currentUser?.photoURL || '';

    const course = courses.find(c => c.id === courseId);
    const newThreadId = `thread-${Date.now()}`;
    const newThread: CommunityThread = {
      id: newThreadId,
      courseId,
      courseTitleBn: course?.titleBn || 'সাধারণ আলোচনা',
      authorId,
      authorName,
      authorPhotoURL,
      authorRole,
      createdAt: 'এইমাত্র',
      titleBn,
      contentBn,
      upvotes: 1,
      upvotedUserIds: [authorId],
      replies: [],
      isPinned: false
    };

    try {
      await setDoc(doc(db, 'communityThreads', newThreadId), newThread);
      if (currentUser && currentUser.id !== 'super-admin-root') {
        const updatedXp = (currentUser.xp || 0) + 20;
        await updateDoc(doc(db, 'users', currentUser.id), { xp: updatedXp });
        setCurrentUser(prev => prev ? { ...prev, xp: updatedXp } : prev);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `communityThreads/${newThreadId}`);
    }
  };

  const replyToCommunityThread = async (threadId: string, contentBn: string) => {
    const thread = communityThreads.find(t => t.id === threadId);
    if (!thread) return;

    const authorName = currentUser?.name || 'শিক্ষার্থী';
    const authorId = currentUser?.id || 'anon-student';
    const authorRole = currentUser?.role || 'student';
    const authorPhotoURL = currentUser?.photoURL || '';

    const newReply = {
      id: `reply-${Date.now()}`,
      authorId,
      authorName,
      authorPhotoURL,
      authorRole,
      createdAt: 'এইমাত্র',
      contentBn,
      upvotes: 0
    };

    const updatedReplies = [...thread.replies, newReply];

    try {
      await updateDoc(doc(db, 'communityThreads', threadId), {
        replies: updatedReplies
      });
      if (currentUser && currentUser.id !== 'super-admin-root') {
        const updatedXp = (currentUser.xp || 0) + 15;
        await updateDoc(doc(db, 'users', currentUser.id), { xp: updatedXp });
        setCurrentUser(prev => prev ? { ...prev, xp: updatedXp } : prev);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `communityThreads/${threadId}`);
    }
  };

  const toggleUpvoteThread = async (threadId: string) => {
    const thread = communityThreads.find(t => t.id === threadId);
    if (!thread) return;

    const userId = currentUser?.id || 'local-guest';
    const upvotedUsers = thread.upvotedUserIds || [];
    const hasUpvoted = upvotedUsers.includes(userId);

    const updatedUpvotedUserIds = hasUpvoted
      ? upvotedUsers.filter(id => id !== userId)
      : [...upvotedUsers, userId];

    const updatedCount = updatedUpvotedUserIds.length;

    try {
      await updateDoc(doc(db, 'communityThreads', threadId), {
        upvotes: updatedCount,
        upvotedUserIds: updatedUpvotedUserIds
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `communityThreads/${threadId}`);
    }
  };

  // Super Admin CRUD
  const adminAddCourse = async (newCourse: Course) => {
    try {
      await setDoc(doc(db, 'courses', newCourse.id), newCourse);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `courses/${newCourse.id}`);
    }
  };

  const adminUpdateCourse = async (updatedCourse: Course) => {
    try {
      await updateDoc(doc(db, 'courses', updatedCourse.id), { ...updatedCourse });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `courses/${updatedCourse.id}`);
    }
  };

  const adminDeleteCourse = async (courseId: string) => {
    try {
      await deleteDoc(doc(db, 'courses', courseId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `courses/${courseId}`);
    }
  };

  const adminAddLesson = async (courseId: string, chapterId: string, lesson: Lesson) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedChapters = course.chapters.map(ch => {
      if (ch.id !== chapterId) return ch;
      return {
        ...ch,
        lessons: [...ch.lessons, lesson]
      };
    });

    try {
      await updateDoc(doc(db, 'courses', courseId), { chapters: updatedChapters });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `courses/${courseId}`);
    }
  };

  const adminUpdateLesson = async (courseId: string, chapterId: string, lesson: Lesson) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedChapters = course.chapters.map(ch => {
      if (ch.id !== chapterId) return ch;
      return {
        ...ch,
        lessons: ch.lessons.map(l => l.id === lesson.id ? lesson : l)
      };
    });

    try {
      await updateDoc(doc(db, 'courses', courseId), { chapters: updatedChapters });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `courses/${courseId}`);
    }
  };

  const adminDeleteLesson = async (courseId: string, chapterId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedChapters = course.chapters.map(ch => {
      if (ch.id !== chapterId) return ch;
      return {
        ...ch,
        lessons: ch.lessons.filter(l => l.id !== lessonId)
      };
    });

    try {
      await updateDoc(doc(db, 'courses', courseId), { chapters: updatedChapters });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `courses/${courseId}`);
    }
  };

  const adminResetProgress = async (courseId: string) => {
    if (!currentUser) return;
    const enrollmentId = `${currentUser.id}_${courseId}`;
    try {
      await deleteDoc(doc(db, 'enrollments', enrollmentId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `enrollments/${enrollmentId}`);
    }
  };

  const adminDeleteThread = async (threadId: string) => {
    try {
      await deleteDoc(doc(db, 'communityThreads', threadId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `communityThreads/${threadId}`);
    }
  };

  const adminTogglePinThread = async (threadId: string) => {
    const thread = communityThreads.find(t => t.id === threadId);
    if (!thread) return;
    try {
      await updateDoc(doc(db, 'communityThreads', threadId), {
        isPinned: !thread.isPinned
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `communityThreads/${threadId}`);
    }
  };

  return (
    <LearningContext.Provider
      value={{
        currentUser,
        authReady,
        currentRole,
        loginWithGoogle,
        loginSuperAdmin,
        logout,
        setRole: setCurrentRole,
        courses,
        activeCourseId,
        activeLessonId,
        setActiveCourseId,
        setActiveLessonId,
        enrolledProgress,
        isEnrolled,
        enrollInCourse,
        markLessonCompleted,
        recordQuizResult,
        gamification,
        leaderboardUsers,
        communityThreads,
        addCommunityThread,
        replyToCommunityThread,
        toggleUpvoteThread,
        adminAddCourse,
        adminUpdateCourse,
        adminDeleteCourse,
        adminAddLesson,
        adminUpdateLesson,
        adminDeleteLesson,
        adminResetProgress,
        adminDeleteThread,
        adminTogglePinThread
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
