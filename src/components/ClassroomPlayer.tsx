import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  FileDown, 
  Award, 
  HelpCircle, 
  ArrowLeft, 
  ChevronRight, 
  FileText, 
  MessageSquare,
  Sparkles,
  Download,
  GraduationCap,
  LogIn
} from 'lucide-react';
import { GamifiedQuizModal } from './GamifiedQuizModal';
import { CertificateModal } from './CertificateModal';
import { Pagination } from './Pagination';

interface ClassroomPlayerProps {
  courseId: string;
  onBackToCatalog: () => void;
}

export const ClassroomPlayer: React.FC<ClassroomPlayerProps> = ({ courseId, onBackToCatalog }) => {
  const { 
    courses, 
    enrolledProgress, 
    markLessonCompleted, 
    communityThreads, 
    addCommunityThread, 
    replyToCommunityThread,
    currentUser,
    loginWithGoogle
  } = useLearning();

  const course = courses.find(c => c.id === courseId);
  const progress = enrolledProgress[courseId];

  // Flatten all lessons
  const allLessons = course?.chapters.flatMap(ch => ch.lessons) || [];

  // Active lesson state (default to last accessed or first lesson)
  const initialLessonId = progress?.lastAccessedLessonId || allLessons[0]?.id;
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [activeTab, setActiveTab] = useState<'summary' | 'resources' | 'quiz' | 'discussion'>('summary');

  // Modal states
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [discussionInput, setDiscussionInput] = useState('');
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [discussionPage, setDiscussionPage] = useState(1);
  const DISCUSSIONS_PER_PAGE = 3;

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-slate-600 mb-4">কোর্সটি খুঁজে পাওয়া যায়নি।</p>
        <button
          onClick={onBackToCatalog}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg cursor-pointer"
        >
          কোর্স তালিকায় ফিরুন
        </button>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-xs">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
          ক্লাসরুমে প্রবেশ করতে লগইন করুন
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
          আপনার ভিডিও লেকচার দেখার অগ্রগতি, কুইজের অর্জিত XP এবং কোর্স সমাপ্তির ভেরিফাইড সার্টিফিকেট সুরক্ষিত রাখতে গুগল অ্যাকাউন্ট দিয়ে সাইন ইন করুন।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => loginWithGoogle()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>গুগল দিয়ে লগইন করুন</span>
          </button>
          <button
            onClick={onBackToCatalog}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            <span>সকল কোর্স ব্রাউজ করুন</span>
          </button>
        </div>
      </div>
    );
  }

  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const isLessonCompleted = progress?.completedLessonIds.includes(activeLesson?.id || '') || false;

  // Completion calculation
  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = progress?.completedLessonIds.length || 0;
  const completionPercentage = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;
  const isCourseFullyCompleted = completionPercentage === 100;

  // Course specific discussion threads
  const courseThreads = communityThreads.filter(t => t.courseId === courseId);

  // Switch to next lesson
  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentIndex + 1].id);
    }
  };

  const handleToggleComplete = () => {
    if (!activeLesson) return;
    markLessonCompleted(course.id, activeLesson.id);
  };

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionTitle.trim() || !discussionInput.trim()) return;
    addCommunityThread(course.id, discussionTitle, discussionInput);
    setDiscussionTitle('');
    setDiscussionInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Breadcrumb & Milestone Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
            title="সকল কোর্সে ফিরুন"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{course.categoryLabelBn}</span>
              <span>/</span>
              <span className="text-slate-800 font-medium truncate max-w-xs">{course.titleBn}</span>
            </div>
            <h1 className="text-lg font-medium text-slate-900 mt-0.5 line-clamp-1">
              {activeLesson?.titleBn}
            </h1>
          </div>
        </div>

        {/* Milestone Indicator & Certificate Trigger */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">কোর্স মাইলস্টোন</span>
            <span className="text-xs font-semibold text-emerald-600 tabular-nums">
              {completionPercentage}% সম্পন্ন ({completedLessonsCount}/{totalLessonsCount})
            </span>
          </div>

          {isCourseFullyCompleted ? (
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span>সার্টিফিকেট দেখুন</span>
            </button>
          ) : (
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors"
              title="১০০% শেষ হলে সার্টিফিকেট ভ্যালিড হবে"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>সার্টিফিকেট প্রিভিউ</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Classroom Grid: 65% Player & Tabs / 35% Curriculum Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Main Zone: Video Player and Content Tabs */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Responsive 16:9 Video Frame */}
          <div className="relative w-full aspect-video bg-slate-950 rounded-lg overflow-hidden border border-slate-200/90 shadow-2xs">
            {activeLesson?.videoUrl ? (
              <iframe
                src={activeLesson.videoUrl}
                title={activeLesson.titleBn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                <Play className="w-12 h-12 stroke-1 mb-2 text-slate-500" />
                <p className="text-sm">এই লেকচারের ভিডিও প্রসেসিংয়ে রয়েছে</p>
              </div>
            )}
          </div>

          {/* Action Row Under Video */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white border border-slate-200/90 rounded-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleComplete}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                  isLessonCompleted
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? 'সম্পন্ন হয়েছে (Done)' : 'সম্পন্ন হয়েছে মার্ক করুন'}</span>
              </button>

              {activeLesson?.quiz && (
                <button
                  onClick={() => setIsQuizModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>কুইজ টেস্ট ({activeLesson.quiz.xpReward} XP)</span>
                </button>
              )}
            </div>

            <button
              onClick={handleNextLesson}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span>পরবর্তী লেকচার</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Resource & Interaction Tabs */}
          <div className="bg-white border border-slate-200/90 rounded-lg overflow-hidden">
            
            {/* Tab Controls (Segmented clean control, no candy badges) */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/70 text-xs">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-3.5 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'summary'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  লেকচার নোটস
                </span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-3.5 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FileDown className="w-3.5 h-3.5" />
                  PDF ও চিটশিট
                </span>
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-3.5 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'discussion'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  প্রশ্নোত্তর ({courseThreads.length})
                </span>
              </button>
            </div>

            {/* Tab Content Panes */}
            <div className="p-5">
              
              {/* Tab 1: Lecture Summary */}
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">
                      মূল আলোচ্য বিষয় ও উদ্দেশ্য
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {activeLesson?.summaryBn || 'এই লেকচারের সামারি প্রস্তুত হচ্ছে...'}
                    </p>
                  </div>

                  <div className="p-3.5 bg-indigo-50/50 rounded-lg border border-indigo-100 text-xs space-y-1.5">
                    <p className="font-medium text-indigo-900">কী শিখবেন (Key Takeaways):</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>বাস্তব প্রজেক্টে এই টেকনোলজি কীভাবে সরাসরি কাজে লাগাবেন।</li>
                      <li>ইন্ডাস্ট্রি স্ট্যান্ডার্ড মেনে পরিষ্কার ও পরিচ্ছন্ন কোড/ডিজাইন অর্গানাইজেশন।</li>
                      <li>কমন ভুলগুলো এড়িয়ে দ্রুত প্রোডাকশন-রেডি কাজ করার টেকনিক।</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: PDF & Downloadable Resources */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-md">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-800">
                          {activeLesson?.pdfTitle || 'Lecture_Companion_CheatSheet.pdf'}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ডাউনলোডযোগ্য কমপ্লিট লেকচার চিটশিট (PDF)
                        </p>
                      </div>
                    </div>

                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                        `শিখুন লার্নিং প্ল্যাটফর্ম\nকোর্স: ${course.titleBn}\nলেকচার: ${activeLesson?.titleBn}\n\nসামারি ও রেফারেন্স নোটস:\n${activeLesson?.summaryBn}\n\nধন্যবাদ, Shikhun E-Learning.`
                      )}`}
                      download={activeLesson?.pdfTitle || 'Lecture_Resource.txt'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ডাউনলোড করুন</span>
                    </a>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4 bg-white text-xs text-slate-600 space-y-2">
                    <p className="font-medium text-slate-800">পিডিএফ ডকুমেন্ট প্রিভিউ:</p>
                    <div className="p-4 bg-slate-50 rounded border border-slate-100 font-mono text-[11px] leading-relaxed text-slate-700">
                      [PDF PREVIEW: {activeLesson?.pdfTitle || 'Lecture_Slides.pdf'}]
                      <br />• বিষয়ের নাম: {activeLesson?.titleBn}
                      <br />• মেন্টর: {course.instructor}
                      <br />• সম্পূর্ণ হ্যান্ডআউটে অন্তর্ভুক্ত: প্রজেক্ট ড্রাফট, চিটশিট এবং সোর্স গাইড।
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Q&A & Discussion */}
              {activeTab === 'discussion' && (
                <div className="space-y-4">
                  {/* Ask Question Form */}
                  <form onSubmit={handlePostDiscussion} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                    <p className="text-xs font-medium text-slate-800">লেকচার সম্পর্কিত প্রশ্ন করুন</p>
                    <input
                      type="text"
                      value={discussionTitle}
                      onChange={(e) => setDiscussionTitle(e.target.value)}
                      placeholder="প্রশ্নের সংক্ষিপ্ত শিরোনাম..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <textarea
                      value={discussionInput}
                      onChange={(e) => setDiscussionInput(e.target.value)}
                      rows={2}
                      placeholder="বিস্তারিত লিখুন (কোড স্নপেট বা এরর মেসেজসহ)..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!discussionTitle.trim() || !discussionInput.trim()}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        প্রশ্ন পোস্ট করুন
                      </button>
                    </div>
                  </form>

                  {/* Thread List */}
                  <div className="space-y-3 pt-2">
                    {courseThreads.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">
                        এই কোর্সে এখনও কোনো প্রশ্ন করা হয়নি। আপনার যে কোনো জিজ্ঞাসা এখানে লিখুন!
                      </p>
                    ) : (
                      courseThreads.map((thread) => (
                        <div key={thread.id} className="p-3 border border-slate-100 rounded-lg bg-white space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-medium text-slate-800">{thread.authorName}</span>
                            <span>{thread.createdAt}</span>
                          </div>
                          <p className="text-xs font-medium text-slate-900">{thread.titleBn}</p>
                          <p className="text-xs text-slate-600">{thread.contentBn}</p>

                          {/* Replies (Facebook-style compact bubbles) */}
                          {thread.replies.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-2">
                              {thread.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-2">
                                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-medium text-[10px] shrink-0 mt-0.5 select-none">
                                    {reply.authorName.trim().charAt(0) || 'শ'}
                                  </div>
                                  <div className="inline-block bg-slate-100 hover:bg-slate-200/60 rounded-2xl px-3 py-1.5 max-w-[92%] text-left">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-semibold text-[11px] text-slate-900 leading-tight">
                                        {reply.authorName}
                                      </span>
                                      {reply.authorRole === 'instructor' && (
                                        <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded-full font-medium">
                                          মেন্টর
                                        </span>
                                      )}
                                      <span className="text-[10px] text-slate-400 font-normal">
                                        · {reply.createdAt}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-800 leading-snug mt-0.5 whitespace-pre-wrap">
                                      {reply.contentBn}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Zone: Course Syllabus & Chapter Milestones */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-lg overflow-hidden">
          
          <div className="p-4 border-b border-slate-100 bg-slate-50/80">
            <h2 className="text-sm font-semibold text-slate-900">
              কোর্স সূচিপত্র ও মাইলস্টোন
            </h2>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>সার্বিক অগ্রগতি</span>
                <span className="font-medium tabular-nums text-slate-900">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Chapters Accordion List */}
          <div className="divide-y divide-slate-100 max-h-[620px] overflow-y-auto">
            {course.chapters.map((chapter, cIndex) => (
              <div key={chapter.id} className="p-3">
                <p className="text-xs font-medium text-slate-800 mb-2">
                  {chapter.titleBn}
                </p>

                <div className="space-y-1">
                  {chapter.lessons.map((lesson) => {
                    const isCurrent = lesson.id === activeLessonId;
                    const isDone = progress?.completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`w-full text-left p-2 rounded-md text-xs flex items-center justify-between transition-all ${
                          isCurrent
                            ? 'bg-indigo-50/90 text-indigo-900 font-medium'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          )}
                          <span className="truncate">{lesson.titleBn}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-slate-400">
                          {lesson.quiz && (
                            <span className="bg-amber-100 text-amber-800 px-1 py-0.2 rounded text-[10px]">
                              কুইজ
                            </span>
                          )}
                          <span className="tabular-nums">{lesson.duration}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Gamified Quiz Modal */}
      {isQuizModalOpen && activeLesson?.quiz && (
        <GamifiedQuizModal
          quiz={activeLesson.quiz}
          courseId={course.id}
          lessonId={activeLesson.id}
          onClose={() => setIsQuizModalOpen(false)}
        />
      )}

      {/* Certificate Modal */}
      {isCertificateModalOpen && (
        <CertificateModal
          course={course}
          isUnlocked={isCourseFullyCompleted}
          completionPercentage={completionPercentage}
          onClose={() => setIsCertificateModalOpen(false)}
        />
      )}

    </div>
  );
};
