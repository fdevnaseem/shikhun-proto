import React from 'react';
import { Course } from '../types';
import { useLearning } from '../context/LearningContext';
import { 
  X, 
  Clock, 
  Star, 
  Users, 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  Video, 
  FileText, 
  Sparkles 
} from 'lucide-react';

interface SyllabusModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenClassroom: (courseId: string) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  course,
  onClose,
  onOpenClassroom
}) => {
  const { enrollInCourse, isEnrolled, enrolledProgress, currentUser } = useLearning();

  if (!course) return null;

  const enrolled = Boolean(currentUser && isEnrolled(course.id));
  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

  const handleEnrollAndGo = async () => {
    if (!currentUser) {
      onClose();
      await enrollInCourse(course.id);
      return;
    }
    if (!enrolled) {
      await enrollInCourse(course.id);
    }
    onOpenClassroom(course.id);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-lg border border-slate-200/90 shadow-xl overflow-hidden flex flex-col my-8 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium mb-1">
              <span>{course.categoryLabelBn}</span>
              <span>·</span>
              <span>{course.levelBn}</span>
            </div>
            <h2 className="text-lg font-medium text-slate-900 leading-snug">
              {course.titleBn}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              মেন্টর: <span className="text-slate-800 font-medium">{course.instructor}</span> ({course.instructorRole})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors shrink-0"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Strip */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>মোট সময়কাল: <strong className="font-medium text-slate-800">{course.totalHours}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>মোট পাঠ: <strong className="font-medium text-slate-800">{totalLessons}টি লেকচার</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>রেটিং: <strong className="font-medium text-slate-800">{course.rating} / ৫.০</strong></span>
          </div>
        </div>

        {/* Syllabus Timeline Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5">
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">
              কোর্স ওভারভিউ ও সিলেবাস
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {course.subtitleBn}
            </p>
          </div>

          {/* Chapters & Lessons */}
          <div className="space-y-4">
            {course.chapters.map((chapter, cIdx) => (
              <div key={chapter.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">
                    {chapter.titleBn}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {chapter.lessons.length}টি ক্লাস
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {chapter.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-3 hover:bg-slate-50/50 transition-colors flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-start gap-2.5 truncate">
                        <Video className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div className="truncate">
                          <p className="text-slate-800 font-medium truncate">{lesson.titleBn}</p>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{lesson.summaryBn}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {lesson.pdfTitle && (
                          <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-mono">
                            PDF
                          </span>
                        )}
                        {lesson.quiz && (
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono">
                            কুইজ
                          </span>
                        )}
                        <span className="text-slate-400 font-mono text-[11px] tabular-nums">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer with Direct Enrollment Action */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-white transition-colors"
          >
            বন্ধ করুন
          </button>

          <button
            onClick={handleEnrollAndGo}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            {enrolled ? (
              <>
                <span>ক্লাসরুমে যান</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>{currentUser ? 'কোর্সে এনরোল করুন' : 'লগইন করে শুরু করুন'}</span>
                <CheckCircle className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
