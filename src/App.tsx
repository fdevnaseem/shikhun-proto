import React, { useState } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar, AppView } from './components/Navbar';
import { ArtisticBackground } from './components/ArtisticBackground';
import { MarketingHome } from './components/MarketingHome';
import { CoursesView } from './components/CoursesView';
import { ClassroomPlayer } from './components/ClassroomPlayer';
import { CommunityBoard } from './components/CommunityBoard';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminPanel } from './components/AdminPanel';
import { SyllabusModal } from './components/SyllabusModal';
import { Course } from './types';
import { Heart } from 'lucide-react';

const MainApp: React.FC = () => {
  const { 
    courses, 
    enrolledProgress, 
    activeCourseId, 
    setActiveCourseId 
  } = useLearning();

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedSyllabusCourse, setSelectedSyllabusCourse] = useState<Course | null>(null);

  const enrolledCourseIds = Object.keys(enrolledProgress);

  const handleOpenClassroom = (courseId: string) => {
    setActiveCourseId(courseId);
    setCurrentView('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSyllabus = (course: Course) => {
    setSelectedSyllabusCourse(course);
  };

  return (
    <ArtisticBackground>
      {/* Strict 3-zone Top Bar Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: DEDICATED MARKETING HOMEPAGE WITH THREE.JS */}
        {currentView === 'home' && (
          <MarketingHome
            onNavigateToCourses={() => {
              setCurrentView('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToClassroom={() => {
              const targetCourse = enrolledCourseIds[0] || courses[0]?.id;
              if (targetCourse) handleOpenClassroom(targetCourse);
            }}
            enrolledCount={enrolledCourseIds.length}
          />
        )}

        {/* VIEW 2: ALL COURSES DIRECTORY (ZERO LAYOUT SHIFT) */}
        {currentView === 'courses' && (
          <CoursesView
            onOpenClassroom={handleOpenClassroom}
            onOpenSyllabus={handleOpenSyllabus}
          />
        )}

        {/* VIEW 3: CLASSROOM PLAYER */}
        {currentView === 'classroom' && (
          <ClassroomPlayer
            courseId={activeCourseId || enrolledCourseIds[0] || courses[0].id}
            onBackToCatalog={() => setCurrentView('courses')}
          />
        )}

        {/* VIEW 4: COMMUNITY FORUM */}
        {currentView === 'community' && (
          <CommunityBoard />
        )}

        {/* VIEW 5: LEADERBOARD & XP PROFILE */}
        {currentView === 'leaderboard' && (
          <LeaderboardView />
        )}

        {/* VIEW 6: SUPER ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminPanel />
        )}

      </main>

      {/* Global Zero-Layout-Shift Syllabus Modal */}
      {selectedSyllabusCourse && (
        <SyllabusModal
          course={selectedSyllabusCourse}
          onClose={() => setSelectedSyllabusCourse(null)}
          onOpenClassroom={handleOpenClassroom}
        />
      )}

      {/* Clean, Non-slop Footer */}
      <footer className="bg-white/80 backdrop-blur-xs border-t border-slate-200/80 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
              শি
            </div>
            <span className="font-medium text-slate-800">শিখুন — বাংলা ই-লার্নিং প্ল্যাটফর্ম</span>
            <span>·</span>
            <span>সর্বস্বত্ব সংরক্ষিত ২০২৬</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
              হোম
            </button>
            <button onClick={() => { setCurrentView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
              সকল কোর্স
            </button>
            <button onClick={() => { setCurrentView('community'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
              কমিউনিটি
            </button>
            <button onClick={() => { setCurrentView('leaderboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
              লিডারবোর্ড
            </button>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              বাংলাদেশি শিক্ষার্থীদের জন্য নিবেদিত
            </span>
          </div>
        </div>
      </footer>
    </ArtisticBackground>
  );
};

export default function App() {
  return (
    <LearningProvider>
      <MainApp />
    </LearningProvider>
  );
}
