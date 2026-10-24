import React from 'react';
import { Course } from '../types';
import { useLearning } from '../context/LearningContext';
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  Code2,
  Palette,
  Briefcase,
  Video
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onOpenClassroom: (courseId: string) => void;
  onOpenSyllabus: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onOpenClassroom,
  onOpenSyllabus
}) => {
  const { enrolledProgress, enrollInCourse, isEnrolled, currentUser } = useLearning();

  const enrolled = Boolean(currentUser && isEnrolled(course.id));
  const progress = enrolledProgress[course.id];

  // Calculate total lessons and completed lessons
  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const completedCount = progress?.completedLessonIds.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // SVG Banner based on category
  const renderBanner = () => {
    switch (course.category) {
      case 'web-dev':
        return (
          <div className="relative h-44 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 p-5 flex flex-col justify-between text-white overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 bg-white/10 px-2 py-0.5 rounded">
                React · Node · Database
              </span>
              <Code2 className="w-5 h-5 text-indigo-300" />
            </div>
            <div className="z-10">
              <span className="text-xs text-indigo-200">মেন্টর: {course.instructor}</span>
              <p className="text-base font-medium text-white leading-snug line-clamp-1">{course.titleBn}</p>
            </div>
            <div className="absolute right-[-10px] bottom-[-20px] opacity-15 font-mono text-[10px] text-indigo-100 select-none pointer-events-none">
              &lt;App /&gt; useState() async await
            </div>
          </div>
        );

      case 'ui-ux':
        return (
          <div className="relative h-44 bg-gradient-to-br from-rose-900 via-rose-950 to-slate-900 p-5 flex flex-col justify-between text-white overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300 bg-white/10 px-2 py-0.5 rounded">
                Figma · UX Research · Wireframe
              </span>
              <Palette className="w-5 h-5 text-rose-300" />
            </div>
            <div className="z-10">
              <span className="text-xs text-rose-200">মেন্টর: {course.instructor}</span>
              <p className="text-base font-medium text-white leading-snug line-clamp-1">{course.titleBn}</p>
            </div>
            <div className="absolute right-3 bottom-2 opacity-20 pointer-events-none">
              <div className="w-24 h-16 border border-rose-300 rounded-md"></div>
            </div>
          </div>
        );

      case 'freelancing':
        return (
          <div className="relative h-44 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 p-5 flex flex-col justify-between text-white overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 bg-white/10 px-2 py-0.5 rounded">
                Upwork · Fiverr · Global Clients
              </span>
              <Briefcase className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="z-10">
              <span className="text-xs text-emerald-200">মেন্টর: {course.instructor}</span>
              <p className="text-base font-medium text-white leading-snug line-clamp-1">{course.titleBn}</p>
            </div>
            <div className="absolute right-2 bottom-[-10px] opacity-15 font-mono text-xs text-emerald-100 pointer-events-none">
              $$$ Proposals Verified
            </div>
          </div>
        );

      default:
        return (
          <div className="relative h-44 bg-gradient-to-br from-amber-900 via-amber-950 to-slate-900 p-5 flex flex-col justify-between text-white overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 bg-white/10 px-2 py-0.5 rounded">
                Premiere · Motion · Storytelling
              </span>
              <Video className="w-5 h-5 text-amber-300" />
            </div>
            <div className="z-10">
              <span className="text-xs text-amber-200">মেন্টর: {course.instructor}</span>
              <p className="text-base font-medium text-white leading-snug line-clamp-1">{course.titleBn}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 overflow-hidden flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-xs h-full">
      {/* Top Part: Banner and Info */}
      <div>
        {/* Banner */}
        {renderBanner()}

        {/* Body Content */}
        <div className="p-5 space-y-3">
          
          {/* Metadata line (Unboxed with · separators) */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500">
            <span className="text-indigo-600 font-medium">{course.categoryLabelBn}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.totalHours}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {course.rating}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {course.enrolledCount}+ শিক্ষার্থী
            </span>
          </div>

          <h3 className="text-base font-medium text-slate-900 leading-snug">
            {course.titleBn}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {course.subtitleBn}
          </p>

        </div>
      </div>

      {/* Bottom Part: Progress & Fixed Height Buttons */}
      <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100">
        
        {/* Enrollment Progress if already enrolled */}
        {enrolled && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-600">অগ্রগতি</span>
              <span className="font-medium text-emerald-600 tabular-nums">
                {progressPercent}% ({completedCount}/{totalLessons} লেকচার)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons: 1 CTA + 1 Zero-Shift Syllabus Trigger */}
        <div className="flex items-center gap-2">
          {enrolled ? (
            <button
              onClick={() => onOpenClassroom(course.id)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              <span>ক্লাসরুমে যান</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => enrollInCourse(course.id)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              <span>{currentUser ? 'কোর্সে যুক্ত হোন' : 'লগইন করে শুরু করুন'}</span>
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => onOpenSyllabus(course)}
            className="px-3.5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            title="সিলেবাস ও লেকচার সূচিপত্র দেখুন"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>সিলেবাস</span>
          </button>
        </div>

      </div>
    </div>
  );
};
