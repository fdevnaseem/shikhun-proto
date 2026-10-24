import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Pagination, toBnNum } from './Pagination';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Footprints, 
  Zap, 
  Medal,
  User,
  LogIn
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { gamification, currentUser, leaderboardUsers, loginWithGoogle } = useLearning();

  // All possible badges to unlock
  const allBadges = [
    {
      id: 'badge-starter',
      nameBn: 'লার্নিং জার্নি শুরু',
      descBn: 'শিখুন প্ল্যাটফর্মে সফলভাবে যুক্ত হয়েছেন',
      icon: Footprints,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      id: 'badge-welcome',
      nameBn: 'প্ল্যাটফর্মে স্বাগতম',
      descBn: 'শিখুন অ্যাকাউন্টে সফলভাবে লগইন করেছেন',
      icon: Footprints,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      id: 'badge-first-step',
      nameBn: 'প্রথম পদক্ষেপ',
      descBn: 'প্রথম লেকচার সম্পন্ন করেছেন',
      icon: Footprints,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      id: 'badge-streak-7',
      nameBn: 'সাপ্তাহিক যোদ্ধা',
      descBn: 'টানা ৭ দিন পড়াশোনা বজায় রেখেছেন',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      id: 'badge-perfect-quiz',
      nameBn: 'নিখুঁত স্কোরার',
      descBn: 'কুইজে ১০০% পূর্ণ নম্বর পেয়েছেন',
      icon: Award,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'badge-pro-learner',
      nameBn: 'মাইলস্টোন মাস্টার',
      descBn: 'যেকোনো একটি সম্পূর্ণ কোর্স ফিনিশ করেছেন',
      icon: Zap,
      color: 'text-rose-600 bg-rose-50 border-rose-200'
    }
  ];

  // Merge leaderboard users with current logged in user if not already present
  const displayList = [...leaderboardUsers];
  if (currentUser && !displayList.some(u => u.id === currentUser.id)) {
    displayList.push({
      id: currentUser.id,
      nameBn: currentUser.name,
      districtBn: 'বাংলাদেশ',
      xp: currentUser.xp,
      streakDays: currentUser.streakDays,
      completedQuizzes: Math.floor(currentUser.xp / 100),
      photoURL: currentUser.photoURL,
      isCurrentUser: true
    });
  }
  displayList.sort((a, b) => b.xp - a.xp);

  const [currentPage, setCurrentPage] = useState(1);
  const LEARNERS_PER_PAGE = 10;
  const totalPages = Math.ceil(displayList.length / LEARNERS_PER_PAGE) || 1;
  const paginatedList = displayList.slice(
    (currentPage - 1) * LEARNERS_PER_PAGE,
    currentPage * LEARNERS_PER_PAGE
  );

  const currentUserRankIndex = displayList.findIndex(u => u.id === currentUser?.id);
  const rankDisplay = currentUserRankIndex >= 0 ? `#০${currentUserRankIndex + 1}` : '—';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Conditional: Personal Stats & Badges for Authenticated User OR Guest Action Banner */}
      {currentUser ? (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Total XP */}
            <div className="p-5 bg-white border border-slate-200/90 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-normal">আপনার অর্জিত মোট এক্সপি</p>
                <p className="text-2xl font-semibold text-slate-900 font-mono tabular-nums">
                  {gamification.xp} <span className="text-sm font-sans font-normal text-emerald-600">XP</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">প্রতিটি লেকচার ও কুইজ থেকে বৃদ্ধি পায়</p>
              </div>
            </div>

            {/* Card 2: Daily Streak */}
            <div className="p-5 bg-white border border-slate-200/90 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-normal">দৈনিক স্ট্রিক ফায়ার</p>
                <p className="text-2xl font-semibold text-slate-900 font-mono tabular-nums">
                  {gamification.streakDays} <span className="text-sm font-sans font-normal text-amber-600">দিন</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">টানা প্রতিদিন পড়ার ধারাবাহিকতা</p>
              </div>
            </div>

            {/* Card 3: Ranking standing */}
            <div className="p-5 bg-white border border-slate-200/90 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-normal">লিডারবোর্ড অবস্থান</p>
                <p className="text-2xl font-semibold text-slate-900 font-mono tabular-nums">
                  {rankDisplay} <span className="text-sm font-sans font-normal text-indigo-600">সার্বিক</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">রিয়েল-টাইম ফায়ারস্টোর ডেটাবেজ থেকে</p>
              </div>
            </div>

          </div>

          {/* Badges Section */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                অর্জিত ব্যাজসমূহ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                নিয়মিত পড়ালেখা এবং কুইজ সম্পন্ন করলে এসব ব্যাজ আনলক হয়।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              {allBadges.map((badge) => {
                const isUnlocked = gamification.badges.some(b => b.id === badge.id);
                const Icon = badge.icon;

                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-lg border transition-all text-center flex flex-col items-center justify-between space-y-2 ${
                      isUnlocked
                        ? 'bg-slate-50/50 border-slate-200 shadow-2xs'
                        : 'bg-slate-50/30 border-slate-100 opacity-40 grayscale'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${badge.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 leading-tight">{badge.nameBn}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{badge.descBn}</p>
                    </div>
                    <div className="pt-1">
                      {isUnlocked ? (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          আনলকড
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          লক
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Guest Callout Banner for Unauthenticated Users */
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-indigo-200">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>রিয়েল-টাইম শিক্ষার্থী লিডারবোর্ড</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
              লিডারবোর্ডে অংশ নিতে এবং ব্যাজ আনলক করতে লগইন করুন
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-xl leading-relaxed">
              লেকচার ও কুইজ শেষ করে XP অর্জন করুন, নিজের ধারাবাহিক পড়ার স্ট্রিক ধরে রাখুন এবং দেশের সেরা শিক্ষার্থীদের তালিকায় নিজের নাম তুলে ধরুন।
            </p>
          </div>

          <button
            onClick={() => loginWithGoogle()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-indigo-900 text-xs sm:text-sm font-semibold rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-indigo-600" />
            <span>গুগল দিয়ে লগইন করুন</span>
          </button>
        </div>
      )}

      {/* Real-time Leaderboard Table */}
      <div className="bg-white border border-slate-200/90 rounded-lg overflow-hidden">
        
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Medal className="w-4 h-4 text-amber-500" />
              লাইভ টপ লার্নার লিডারবোর্ড
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ফায়ারস্টোর ডেটাবেজে রেজিস্টার্ড শিক্ষার্থীদের অর্জিত এক্সপি পয়েন্টের ভিত্তিতে লাইভ র‍্যাংকিং।
            </p>
          </div>
          <span className="text-xs text-emerald-600 font-mono font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            লাইভ সিঙ্ক
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30 text-slate-500">
                <th className="py-3 px-6 font-medium">স্থান</th>
                <th className="py-3 px-6 font-medium">শিক্ষার্থীর নাম</th>
                <th className="py-3 px-6 font-medium">অবস্থান</th>
                <th className="py-3 px-6 font-medium text-right">স্ট্রিক</th>
                <th className="py-3 px-6 font-medium text-right">কুইজ টেস্ট</th>
                <th className="py-3 px-6 font-medium text-right">মোট এক্সপি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    এখনও কোনো শিক্ষার্থী যুক্ত হয়নি। গুগল দিয়ে লগইন করে প্রথম পয়েন্টটি অর্জন করুন!
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => {
                  const rank = (currentPage - 1) * LEARNERS_PER_PAGE + idx + 1;
                  let rankBadge = (
                    <span className="font-mono text-slate-500 font-semibold tabular-nums">
                      #{toBnNum(rank < 10 ? `0${rank}` : rank)}
                    </span>
                  );

                  if (rank === 1) {
                    rankBadge = <span className="text-amber-500 font-semibold font-mono">🥇 ০১</span>;
                  } else if (rank === 2) {
                    rankBadge = <span className="text-slate-600 font-semibold font-mono">🥈 ০২</span>;
                  } else if (rank === 3) {
                    rankBadge = <span className="text-amber-700 font-semibold font-mono">🥉 ০৩</span>;
                  }

                  const isCurrent = currentUser?.id === item.id;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isCurrent ? 'bg-indigo-50/50 font-medium' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <td className="py-3.5 px-6 whitespace-nowrap">{rankBadge}</td>
                      <td className="py-3.5 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          {item.photoURL ? (
                            <img
                              src={item.photoURL}
                              alt={item.nameBn}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-[11px] font-medium flex items-center justify-center shrink-0">
                              {item.nameBn?.charAt(0) || 'ইউ'}
                            </div>
                          )}
                          <span className="text-slate-900">{item.nameBn}</span>
                          {isCurrent && (
                            <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-medium">
                              আপনি
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap text-slate-600">
                        {item.districtBn || 'বাংলাদেশ'}
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono tabular-nums text-amber-600">
                        {item.streakDays} দিন
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono tabular-nums text-slate-600">
                        {item.completedQuizzes}টি
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono font-semibold tabular-nums text-emerald-600">
                        {item.xp} XP
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {displayList.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/40">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={displayList.length}
              itemsPerPage={LEARNERS_PER_PAGE}
              itemNameBn="শিক্ষার্থী"
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

      </div>

    </div>
  );
};
