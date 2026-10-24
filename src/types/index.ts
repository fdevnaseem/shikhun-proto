export type CourseCategory = 'all' | 'web-dev' | 'ui-ux' | 'freelancing' | 'graphics';

export interface QuizQuestion {
  id: string;
  questionBn: string;
  optionsBn: string[];
  correctIndex: number;
  explanationBn: string;
}

export interface Quiz {
  id: string;
  titleBn: string;
  passPercentage: number;
  xpReward: number;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  titleBn: string;
  duration: string;
  videoUrl: string;
  summaryBn: string;
  pdfResourceUrl?: string;
  pdfTitle?: string;
  quiz?: Quiz;
}

export interface Chapter {
  id: string;
  titleBn: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  titleBn: string;
  subtitleBn: string;
  category: CourseCategory;
  categoryLabelBn: string;
  instructor: string;
  instructorRole: string;
  enrolledCount: number;
  rating: number;
  levelBn: string;
  totalHours: string;
  colorScheme: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
  chapters: Chapter[];
  featured?: boolean;
  createdAt?: string;
}

export interface CourseProgress {
  id?: string;
  userId?: string;
  courseId?: string;
  completedLessonIds: string[];
  quizScores: Record<string, number>; // quizId -> score percentage
  enrolledAt: string;
  lastAccessedLessonId?: string;
}

export interface Badge {
  id: string;
  nameBn: string;
  descriptionBn: string;
  iconName: string;
  unlockedAt: string;
}

export interface GamificationProfile {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  badges: Badge[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: 'student' | 'superadmin';
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  createdAt: string;
  badges?: Badge[];
}

export interface CommunityReply {
  id: string;
  authorId?: string;
  authorName: string;
  authorPhotoURL?: string;
  authorRole: 'student' | 'instructor' | 'superadmin';
  createdAt: string;
  contentBn: string;
  upvotes: number;
  userUpvoted?: boolean;
}

export interface CommunityThread {
  id: string;
  courseId: string;
  courseTitleBn: string;
  authorId?: string;
  authorName: string;
  authorPhotoURL?: string;
  authorRole: 'student' | 'instructor' | 'superadmin';
  createdAt: string;
  titleBn: string;
  contentBn: string;
  upvotes: number;
  upvotedUserIds?: string[];
  userUpvoted?: boolean;
  replies: CommunityReply[];
  isPinned?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  nameBn: string;
  districtBn?: string;
  xp: number;
  streakDays: number;
  completedQuizzes: number;
  avatarBg?: string;
  photoURL?: string;
  isCurrentUser?: boolean;
}
