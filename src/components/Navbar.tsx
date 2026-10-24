import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  GraduationCap, 
  Flame, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  ShieldCheck, 
  UserCheck, 
  LogIn, 
  LogOut, 
  User as UserIcon, 
  ChevronDown 
} from 'lucide-react';
import { AuthModal } from './AuthModal';

export type AppView = 'home' | 'courses' | 'classroom' | 'community' | 'leaderboard' | 'admin';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { 
    gamification, 
    currentRole, 
    setRole, 
    enrolledProgress,
    currentUser,
    logout
  } = useLearning();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'google' | 'admin'>('google');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const enrolledCount = Object.keys(enrolledProgress).length;

  const handleOpenAuth = (tab: 'google' | 'admin' = 'google') => {
    setAuthModalDefaultTab(tab);
    setIsAuthModalOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = async () => {
    setIsProfileDropdownOpen(false);
    await logout();
    if (currentView === 'admin') {
      setCurrentView('home');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            
            {/* Zone 1: Brand Wordmark (Navigates to Home) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 cursor-pointer"
                title="শিখুন হোমপেজে যান"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-2xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    শিখুন
                  </span>
                  <span className="text-[10px] text-slate-500 -mt-1 font-normal tracking-wide">
                    প্রজেক্ট-বেইজড স্কিল লার্নিং
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-[14px] font-normal text-slate-600">
              <button
                onClick={() => setCurrentView('courses')}
                className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                  currentView === 'courses'
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                    : ''
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>সকল কোর্স</span>
              </button>

              {currentUser && (
                <button
                  onClick={() => setCurrentView('classroom')}
                  className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                    currentView === 'classroom'
                      ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                      : ''
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>আমার ক্লাসরুম</span>
                  {enrolledCount > 0 && (
                    <span className="text-[11px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-mono">
                      {enrolledCount}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={() => setCurrentView('community')}
                className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                  currentView === 'community'
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                    : ''
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>কমিউনিটি ফোরাম</span>
              </button>

              <button
                onClick={() => setCurrentView('leaderboard')}
                className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                  currentView === 'leaderboard'
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                    : ''
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>লিডারবোর্ড</span>
              </button>

              {currentUser && (currentRole === 'superadmin' || currentUser?.role === 'superadmin') && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`transition-colors hover:text-amber-600 flex items-center gap-1.5 py-1 ${
                    currentView === 'admin'
                      ? 'text-amber-700 border-b-2 border-amber-600 font-medium'
                      : 'text-amber-700'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>সুপার অ্যাডমিন</span>
                </button>
              )}
            </nav>

            {/* Zone 3: Gamification Stats & User Auth Profile */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Gamification Stats (Only visible to authenticated users) */}
              {currentUser && (
                <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-50/90 border border-slate-200/70 rounded-lg text-xs text-slate-600">
                  <div className="flex items-center gap-1 text-amber-600" title="দৈনিক স্ট্রিক">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="font-semibold text-slate-800 tabular-nums">{gamification.streakDays}</span>
                    <span className="text-slate-500 text-[11px]">দিন</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1 text-emerald-600" title="অর্জিত মোট এক্সপি">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-slate-800 tabular-nums">{gamification.xp}</span>
                    <span className="text-slate-500 text-[11px]">XP</span>
                  </div>
                </div>
              )}

              {/* User Authentication Status */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-full transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col text-right hidden sm:block pr-1">
                      <span className="text-xs font-semibold text-slate-800 leading-tight max-w-[120px] truncate">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] text-slate-500 leading-none">
                        {currentUser.role === 'superadmin' ? 'সুপার অ্যাডমিন' : 'শিক্ষার্থী'}
                      </span>
                    </div>

                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium text-xs">
                        {currentUser.name.charAt(0) || 'ইউ'}
                      </div>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                        {currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium text-sm">
                            {currentUser.name.charAt(0) || 'ইউ'}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate font-mono">
                            {currentUser.email}
                          </p>
                          <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.2 rounded font-medium ${
                            currentUser.role === 'superadmin' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-indigo-50 text-indigo-700'
                          }`}>
                            {currentUser.role === 'superadmin' ? 'Super Admin' : 'Student'}
                          </span>
                        </div>
                      </div>

                      {/* Role switcher if superadmin */}
                      {currentUser.role === 'superadmin' && (
                        <div className="px-2 py-1 border-b border-slate-100">
                          <button
                            onClick={() => {
                              const nextRole = currentRole === 'student' ? 'superadmin' : 'student';
                              setRole(nextRole);
                              if (nextRole === 'superadmin') setCurrentView('admin');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-amber-600" />
                              <span>মোড পরিবর্তন</span>
                            </span>
                            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                              {currentRole === 'superadmin' ? 'অ্যাডমিন ভিউ' : 'শিক্ষার্থী ভিউ'}
                            </span>
                          </button>
                        </div>
                      )}

                      <div className="px-2 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>লগআউট করুন</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAuth('google')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>লগইন করুন</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-100 py-2 px-2 bg-white text-xs text-slate-600 overflow-x-auto">
          <button
            onClick={() => setCurrentView('courses')}
            className={`px-2 py-1 whitespace-nowrap ${currentView === 'courses' ? 'text-indigo-600 font-medium' : ''}`}
          >
            সকল কোর্স
          </button>
          {currentUser && (
            <button
              onClick={() => setCurrentView('classroom')}
              className={`px-2 py-1 whitespace-nowrap ${currentView === 'classroom' ? 'text-indigo-600 font-medium' : ''}`}
            >
              ক্লাসরুম {enrolledCount > 0 && `(${enrolledCount})`}
            </button>
          )}
          <button
            onClick={() => setCurrentView('community')}
            className={`px-2 py-1 whitespace-nowrap ${currentView === 'community' ? 'text-indigo-600 font-medium' : ''}`}
          >
            কমিউনিটি
          </button>
          <button
            onClick={() => setCurrentView('leaderboard')}
            className={`px-2 py-1 whitespace-nowrap ${currentView === 'leaderboard' ? 'text-indigo-600 font-medium' : ''}`}
          >
            লিডারবোর্ড
          </button>
          {currentUser && (currentRole === 'superadmin' || currentUser?.role === 'superadmin') && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-2 py-1 whitespace-nowrap text-amber-700 ${currentView === 'admin' ? 'font-medium underline' : ''}`}
            >
              অ্যাডমিন
            </button>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalDefaultTab}
      />
    </>
  );
};
