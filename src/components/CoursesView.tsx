import React, { useState, useEffect } from 'react';
import { Course, CourseCategory } from '../types';
import { useLearning } from '../context/LearningContext';
import { CourseCard } from './CourseCard';
import { Pagination } from './Pagination';
import { 
  Search, 
  GraduationCap, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Filter
} from 'lucide-react';

interface CoursesViewProps {
  onOpenClassroom: (courseId: string) => void;
  onOpenSyllabus: (course: Course) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onOpenClassroom,
  onOpenSyllabus
}) => {
  const { courses, enrolledProgress, currentUser } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const COURSES_PER_PAGE = 6;

  const categories: { id: CourseCategory; labelBn: string }[] = [
    { id: 'all', labelBn: 'সকল কোর্স' },
    { id: 'web-dev', labelBn: 'Web Development' },
    { id: 'ui-ux', labelBn: 'UI/UX Design' },
    { id: 'freelancing', labelBn: 'Freelancing' },
    { id: 'graphics', labelBn: 'Video & Motion' },
  ];

  // Reset to first page when search query or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Filtered courses
  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = 
      course.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const enrolledCourseIds = Object.keys(enrolledProgress);
  const enrolledCoursesList = courses.filter(c => enrolledCourseIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header and Search */}
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-md text-xs text-indigo-700 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ক্যারিয়ার ট্র্যাক ও কোর্স ডিরেক্টরি</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight">
            সকল কোর্স ও কারিকুলাম
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            আপনার পছন্দের ট্র্যাক বেছে নিন, সম্পূর্ণ সিলেবাস দেখুন এবং ক্লাসরুমে যুক্ত হয়ে সরাসরি শেখা শুরু করুন।
          </p>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="কোর্স, স্কিল বা টপিকের নাম দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-[11px] text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat.labelBn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enrolled Courses Strip (Only for authenticated users who are enrolled in courses) */}
      {currentUser && enrolledCoursesList.length > 0 && !searchQuery && selectedCategory === 'all' && (
        <div className="p-6 rounded-lg bg-indigo-50/50 border border-indigo-100/90 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <h2 className="text-sm font-semibold text-slate-900">
                আপনার চলমান কোর্সসমূহ ({enrolledCoursesList.length}টি)
              </h2>
            </div>
            <button
              onClick={() => onOpenClassroom(enrolledCoursesList[0].id)}
              className="text-xs text-indigo-700 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
            >
              <span>ক্লাসরুমে যান</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCoursesList.map((course) => {
              const progress = enrolledProgress[course.id];
              const total = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
              const done = progress?.completedLessonIds.length || 0;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;

              return (
                <div 
                  key={course.id}
                  onClick={() => onOpenClassroom(course.id)}
                  className="bg-white p-4 rounded-lg border border-indigo-100 hover:border-indigo-300 cursor-pointer transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-[11px] text-indigo-600 font-medium">{course.categoryLabelBn}</span>
                    <h3 className="text-xs font-semibold text-slate-900 line-clamp-1 mt-0.5">{course.titleBn}</h3>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>অগ্রগতি</span>
                      <span className="font-mono text-emerald-600 font-semibold tabular-nums">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Uniform Course Grid (Zero Layout Shift) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            মোট <span className="font-medium text-slate-800 tabular-nums">{filteredCourses.length}টি</span> কোর্স তালিকাভুক্ত রয়েছে
          </p>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-xs text-slate-500">
            কোনো কোর্স খুঁজে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে বা নতুন নামে খুঁজুন।
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {paginatedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpenClassroom={onOpenClassroom}
                  onOpenSyllabus={onOpenSyllabus}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                totalItems={filteredCourses.length}
                itemsPerPage={COURSES_PER_PAGE}
                itemNameBn="কোর্স"
                className="mt-6"
              />
            )}
          </>
        )}
      </div>

    </div>
  );
};
