import React from 'react';
import { CourseCategory } from '../types';
import { Search, PlayCircle, FileText, CheckCircle2, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CourseCategory;
  setSelectedCategory: (category: CourseCategory) => void;
  enrolledCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  enrolledCount
}) => {
  const categories: { id: CourseCategory; labelBn: string }[] = [
    { id: 'all', labelBn: 'সকল ক্যাটাগরি' },
    { id: 'web-dev', labelBn: 'ওয়েব প্রোগ্রামিং' },
    { id: 'ui-ux', labelBn: 'ইউআই/ইউএক্স ডিজাইন' },
    { id: 'freelancing', labelBn: 'ফ্রিল্যান্সিং ক্যারিয়ার' },
    { id: 'graphics', labelBn: 'গ্রাফিক্স ও ভিডিও' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
        
        {/* Value Proposition & Clean Headline */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50/80 rounded-md text-xs text-indigo-700">
            <span>দেশসেরা মেন্টরদের সাথে সহজ বাংলায় ক্যারিয়ার লার্নিং</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 tracking-tight leading-[1.3] text-balance">
            দক্ষতা অর্জন করুন আপনার মাতৃভাষায়, গড়ে তুলুন সমৃদ্ধ ভবিষ্যৎ
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            প্রোগ্রামিং, আধুনিক ডিজাইন ও আন্তর্জাতিক ফ্রিল্যান্সিং মার্কেটপ্লেসে সফল হওয়ার জন্য প্রতিটি লেকচার সাজানো হয়েছে বাস্তবমুখী প্রজেক্ট, রিসোর্স ও ইন্টারেক্টিভ কুইজ দিয়ে।
          </p>

          {/* Search Box */}
          <div className="pt-3 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="কোর্সের নাম, দক্ষতা বা বিষয় লিখে খুঁজুন..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
                >
                  ক্লিয়ার
                </button>
              )}
            </div>
          </div>

          {/* Quick Educational Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-left">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-100 shadow-2xs">
              <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 shrink-0">
                <PlayCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-800">এইচডি ভিডিও</span>
                <span className="text-[11px] text-slate-500">প্রজেক্ট-ভিত্তিক ক্লাস</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-100 shadow-2xs">
              <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-800">পিডিএফ রিসোর্স</span>
                <span className="text-[11px] text-slate-500">নোটস ও শিট</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-100 shadow-2xs">
              <div className="p-1.5 rounded-md bg-amber-50 text-amber-600 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-800">গেইমিফাইড কুইজ</span>
                <span className="text-[11px] text-slate-500">XP ও সার্টিফিকেট</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-100 shadow-2xs">
              <div className="p-1.5 rounded-md bg-sky-50 text-sky-600 shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-800">কমিউনিটি ফোরাম</span>
                <span className="text-[11px] text-slate-500">শিক্ষার্থী ও মেন্টর সাপোর্ট</span>
              </div>
            </div>
          </div>

        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat.labelBn}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
