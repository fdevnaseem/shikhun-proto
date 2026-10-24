import React, { useState, useEffect, useRef } from 'react';
import { useLearning } from '../context/LearningContext';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Palette, 
  Briefcase, 
  Trophy, 
  Flame, 
  FileText, 
  ShieldCheck, 
  Star,
  Compass,
  ChevronLeft,
  ChevronRight,
  Quote,
  ZoomIn,
  ZoomOut,
  CheckCircle2
} from 'lucide-react';

interface MarketingHomeProps {
  onNavigateToCourses: () => void;
  onNavigateToClassroom: () => void;
  enrolledCount: number;
}

export const MarketingHome: React.FC<MarketingHomeProps> = ({
  onNavigateToCourses,
  onNavigateToClassroom,
  enrolledCount
}) => {
  const { currentUser } = useLearning();
  // Testimonial Slider State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote: "বাংলায় এত গোছানো React কোর্স আগে পাইনি। প্রতিটা লেকচারের পর কুইজে XP পাওয়ার অভ্যাসটা প্রতিদিন পড়তে বসতে সাহায্য করেছে। কোর্স শেষ করে ঢাকাতেই জুনিয়র ডেভেলপার হিসেবে জয়েন করেছি।",
      name: "তানভীর আহমেদ",
      role: "জুনিয়র ফুলস্ট্যাক ডেভেলপার",
      company: "টেকনেক্সট বিডি",
      location: "ঢাকা",
      track: "Full-Stack Web Development",
      outcome: "ফুলটাইম ডেভেলপার নিয়োগ",
      rating: 5,
      initials: "তা",
      bgGradient: "from-indigo-500 to-blue-600"
    },
    {
      id: 2,
      quote: "Upwork-এ শুরুতে বিড করলেও কোনো রেসপন্স পাচ্ছিলাম না। এখানে কভার লেটার, ক্লায়েন্ট সাইকোলজি আর গিগ অপটিমাইজেশন লেকচারগুলো দেখার পর প্রথম সপ্তাহেই দুটি ছোট প্রজেক্টের কাজ পেয়েছি!",
      name: "সাদিয়া ইসলাম",
      role: "ফ্রিল্যান্স ডিজাইনার",
      company: "Upwork ও Fiverr",
      location: "চট্টগ্রাম",
      track: "Freelancing: Upwork ও Fiverr",
      outcome: "$১,২০০+ ফ্রিল্যান্সিং আয়",
      rating: 5,
      initials: "সা",
      bgGradient: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      quote: "UI/UX ডিজাইনে Figma Auto Layout আর Component লাইব্রেরি নিয়ে আগে অনেক ভজঘট লাগত। কোর্সের প্রজেক্টগুলো হাতে-কলমে করে এখন প্রফেশনাল ডিজাইন সিস্টেম আর্কিটেকচার বানাতে পারি।",
      name: "রাকিবুল হাসান",
      role: "প্রোডাক্ট ডিজাইনার",
      company: "ইনোভেশন ল্যাবস",
      location: "রাজশাহী",
      track: "UI/UX Design ও Figma",
      outcome: "রিমোট UI ক্লায়েন্ট চুক্তি",
      rating: 5,
      initials: "রা",
      bgGradient: "from-rose-500 to-pink-600"
    },
    {
      id: 4,
      quote: "ফোরামে কোডের এরর নিয়ে পোস্ট করলে মেন্টর বা সহপাঠীরা সাথে সাথে কারণ আর সমাধান বুঝিয়ে দেয়। একা পড়ার যে দ্বিধাদ্বন্দ্ব ছিল সেটা একদম কেটে গেছে।",
      name: "শাকিল আহমেদ",
      role: "সিএসই আন্ডারগ্র্যাড শিক্ষার্থী",
      company: "শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
      location: "সিলেট",
      track: "Full-Stack Web Development",
      outcome: "একাডেমিক প্রজেক্ট চ্যাম্পিয়ন",
      rating: 5,
      initials: "শা",
      bgGradient: "from-amber-500 to-orange-600"
    },
    {
      id: 5,
      quote: "কমার্স ব্যাকগ্রাউন্ড থেকে আসায় কোডিং নিয়ে ভয় ছিল। শিখুন-এর সহজ বাংলা লেকচার আর সাথে দেওয়া PDF চিটশিটগুলো রিভিশন দেওয়ার সময় অনেক কাজে দেয়। এখন ফ্রন্টএন্ড কোডিংয়ে বেশ আত্মবিশ্বাসী।",
      name: "ফারহানা বিনতে কামাল",
      role: "অ্যাসোসিয়েট ফ্রন্টএন্ড ইঞ্জিনিয়ার",
      company: "ক্রিয়েটিভ স্টুডিও",
      location: "খুলনা",
      track: "Full-Stack Web Development",
      outcome: "নন-টেক থেকে ক্যারিয়ার পরিবর্তন",
      rating: 5,
      initials: "ফা",
      bgGradient: "from-purple-500 to-indigo-600"
    }
  ];

  // Auto-slide testimonials every 5.5 seconds unless user hovers
  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isTestimonialHovered, testimonials.length]);

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative space-y-56 pb-36 pt-10 sm:pt-16">
      
      {/* Continuous Full-Viewport 3D Mascot Canvas (Strictly in alternating empty side margins at z-10) */}
      <ThreeHeroCanvas />

      {/* 1. HERO SECTION (Left Weighted: Mascot sways in empty Right corridor) */}
      <section id="section-hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
        <div className="max-w-2xl lg:pr-10 space-y-7 text-left relative z-20">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50/90 border border-indigo-200/60 rounded-md text-xs text-indigo-700 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>বাস্তব প্রজেক্টে হ্যান্ডস-অন স্কিল শেখার প্ল্যাটফর্ম</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-medium text-slate-900 tracking-tight leading-[1.25] text-balance">
            প্রজেক্ট বানিয়ে শিখুন Full-Stack ডেভেলপমেন্ট ও UI/UX ডিজাইন
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            বোরিং থিওরি নয়—সরাসরি প্রজেক্ট কোডিং, Figma ডিজাইন সিস্টেম, Upwork ফ্রিল্যান্সিং গাইড এবং প্রতিদিনের প্র্যাকটিস কুইজ দিয়ে নিজের পোর্টফোলিও তৈরি করুন।
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToCourses}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow"
            >
              <span>সকল কোর্স দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {currentUser && enrolledCount > 0 ? (
              <button
                onClick={onNavigateToClassroom}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <span>আমার ক্লাসরুম ({enrolledCount})</span>
              </button>
            ) : (
              <button
                onClick={onNavigateToCourses}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>সিলেবাস দেখুন</span>
              </button>
            )}
          </div>

          {/* Quantitative Metrics Strip */}
          <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-900 font-mono text-xl block tabular-nums">৫,২৯০+</span>
              <span className="text-[11px] text-slate-500">সক্রিয় শিক্ষার্থী</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900 font-mono text-xl block tabular-nums">৯৮.৪%</span>
              <span className="text-[11px] text-slate-500">কোর্স সন্তুষ্টি হার</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900 font-mono text-xl block tabular-nums">২৪/৭</span>
              <span className="text-[11px] text-slate-500">কমিউনিটি ও মেন্টর সাপোর্ট</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. WHAT IS SHIKHUN (Right Weighted: Mascot sways on Left) */}
      <section id="section-about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
        <div className="max-w-3xl ml-auto lg:pl-12 relative z-20 space-y-7">
          
          <div className="space-y-2.5 text-left">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">আমাদের বিশেষত্ব</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900">
              কী এই ‘শিখুন’ এবং কেন আপনার জন্য উপযুক্ত?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              অনলাইনে হাজারো টিউটোরিয়াল দেখে কনফিউজড না হয়ে, কনসেপ্ট ক্লিয়ার করে সরাসরি প্রজেক্ট তৈরি এবং মেন্টরদের সাহায্যে স্কিল ডেভেলপ করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="p-6 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                বাস্তব প্রজেক্ট-ভিত্তিক শিক্ষাক্রম
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                থিওরির বোঝা নয়; প্রথম অধ্যায় থেকেই শুরু হয় আধুনিক React ওয়েব অ্যাপ ও Figma ডিজাইন সিস্টেমের বাস্তব কোডিং।
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                দৈনিক প্র্যাকটিস কুইজ ও XP
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                পড়ালেখা যেন আনন্দের হয়! প্রতিটি লেসনের সাথে কুইজ সমাধান করে কনসেপ্ট ঝালিয়ে নিন এবং স্ট্রিক ফ্লেম ধরে রাখুন।
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Upwork ও Freelancing গাইড
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                মার্কেটপ্লেসে ক্লায়েন্ট খোঁজা, প্রোফাইল অপটিমাইজেশন আর উইনিং প্রপোজাল লেখার প্র্যাক্টিক্যাল কৌশল।
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                ডাউনলোডযোগ্য PDF চিটশিট
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                প্রতিটি লেকচারের সাথে থাকছে পূর্ণাঙ্গ PDF গাইড ও রেফারেন্স চিটশিট যা ভবিষ্যতে রিভিশন দেওয়ার সময় কাজে লাগবে।
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. 3-STEP LEARNING METHODOLOGY (Left Weighted: Mascot sways on Right) */}
      <section id="section-methodology" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
        <div className="max-w-2xl lg:pr-10 relative z-20 space-y-7">
          
          <div className="space-y-2.5 text-left">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">লার্নিং মেথড</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900">
              কীভাবে পরিচালিত হয় ‘শিখুন’ ৩-ধাপের লার্নিং জার্নি?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ধাপে ধাপে শেখা এবং প্রতিটি মাইলস্টোন কমপ্লিটের মাধ্যমে তৈরি হয় আসল আত্মবিশ্বাস।
            </p>
          </div>

          <div className="space-y-4">
            
            <div className="bg-white/95 border border-slate-200/90 rounded-lg p-6 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-indigo-600">ধাপ ০১</span>
                <span className="text-[11px] text-slate-400 font-mono">STEP 01</span>
              </div>
              <h3 className="text-base font-medium text-slate-900">ভিডিও লেকচার ও রিভিশন শিট</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                সহজ বাংলায় ভিডিও ক্লাস দেখার পাশাপাশি প্রয়োজনীয় রেফারেন্স কোড ও কনসেপ্ট চিটশিট ডাউনলোড করে নিন।
              </p>
            </div>

            <div className="bg-white/95 border border-slate-200/90 rounded-lg p-6 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-amber-600">ধাপ ০২</span>
                <span className="text-[11px] text-slate-400 font-mono">STEP 02</span>
              </div>
              <h3 className="text-base font-medium text-slate-900">কুইজ সমাধান ও মাইলস্টোন আনলক</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                লেসনের পড়া কতটুকু বুঝলেন তা তাৎক্ষণিক কুইজ দিয়ে যাচাই করুন এবং পরবর্তী পাঠে প্রবেশ করুন।
              </p>
            </div>

            <div className="bg-white/95 border border-slate-200/90 rounded-lg p-6 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-emerald-600">ধাপ ০৩</span>
                <span className="text-[11px] text-slate-400 font-mono">STEP 03</span>
              </div>
              <h3 className="text-base font-medium text-slate-900">ভেরিফাইড সনদ ও ক্যারিয়ার প্রোফাইল</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                ১০০% মাইলস্টোন পূর্ণ হলে অফিশিয়াল সমাপনী সনদপত্র গ্রহণ করে জবের জন্য নিজের প্রজেক্ট ও পোর্টফোলিও শোকেস করুন।
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CURATED CAREER TRACKS (Right Weighted: Mascot sways in empty Left corridor) */}
      <section id="section-tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-32">
        <div className="max-w-4xl ml-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-7 sm:p-12 space-y-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-7">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">CURATED TRACKS</span>
              <h2 className="text-2xl sm:text-3xl font-medium mt-1">
                জনপ্রিয় ক্যারিয়ার ট্র্যাকসমূহ
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                মার্কেটের বাস্তব চাহিদার সাথে মিলিয়ে তৈরি হ্যান্ডস-অন কারিকুলাম।
              </p>
            </div>

            <button
              onClick={onNavigateToCourses}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors shrink-0"
            >
              <span>সকল কোর্স দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-indigo-300 font-mono">TRACK 01</span>
                <Code2 className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-base font-medium">Full-Stack Web Development</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                React, Node.js, Express, REST APIs এবং Database দিয়ে কমপ্লিট ওয়েব অ্যাপ।
              </p>
              <div className="pt-2 text-xs text-indigo-300 flex items-center gap-1 font-mono">
                <span>৩৬ ঘণ্টা · ৩৬টি লেকচার</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-rose-300 font-mono">TRACK 02</span>
                <Palette className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="text-base font-medium">UI/UX Design ও Figma</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                User Research, Wireframing, Figma Auto Layout ও Component Library।
              </p>
              <div className="pt-2 text-xs text-rose-300 flex items-center gap-1 font-mono">
                <span>২৮ ঘণ্টা · ২৫টি লেকচার</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-emerald-300 font-mono">TRACK 03</span>
                <Briefcase className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-medium">Freelancing: Upwork ও Fiverr</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                100% কমপ্লিট প্রোফাইল, উইনিং কভার লেটার ও ক্লায়েন্ট কমিউনিকেশন।
              </p>
              <div className="pt-2 text-xs text-emerald-300 flex items-center gap-1 font-mono">
                <span>২০ ঘণ্টা · ২০টি লেকচার</span>
              </div>
            </div>

          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onNavigateToCourses}
              className="text-xs text-indigo-300 hover:text-white underline underline-offset-4 font-medium transition-colors"
            >
              সম্পূর্ণ সিলেবাস দেখতে সকল কোর্স ডিরেক্টরিতে যান →
            </button>
          </div>

        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS (Left Weighted: Mascot sways in empty Right corridor) */}
      <section 
        id="section-testimonials"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-32"
        onMouseEnter={() => setIsTestimonialHovered(true)}
        onMouseLeave={() => setIsTestimonialHovered(false)}
      >
        <div className="max-w-4xl mr-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">লার্নার ফিডব্যাক</span>
              <h2 className="text-2xl sm:text-3xl font-medium text-slate-900">
                শিক্ষার্থীদের অভিজ্ঞতা ও মতামত
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                দেশজুড়ে শিক্ষার্থী ও জুনিয়র প্রফেশনালরা ‘শিখুন’ দিয়ে কীভাবে শিখছেন শুনুন তাদের মুখেই।
              </p>
            </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <span className="text-xs font-mono font-medium text-slate-500 tabular-nums">
              ০{currentTestimonialIndex + 1} / ০{testimonials.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevTestimonial}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextTestimonial}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Active Slide Card */}
        <div className="relative overflow-hidden">
          <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs relative space-y-6 transition-all duration-300">
            
            {/* Top Row: Rating & Course Track Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700 ml-1">৫.০ / ৫.০ রেটিং</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  {testimonials[currentTestimonialIndex].track}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{testimonials[currentTestimonialIndex].outcome}</span>
                </span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative pl-6 sm:pl-8">
              <Quote className="w-8 h-8 text-indigo-200 absolute -left-1 -top-2 transform -scale-x-100" />
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
                "{testimonials[currentTestimonialIndex].quote}"
              </p>
            </div>

            {/* Student Profile Info */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${testimonials[currentTestimonialIndex].bgGradient} text-white flex items-center justify-center font-medium text-sm shadow-xs`}>
                  {testimonials[currentTestimonialIndex].initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {testimonials[currentTestimonialIndex].name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {testimonials[currentTestimonialIndex].role} · <span className="text-slate-600 font-medium">{testimonials[currentTestimonialIndex].company}</span> ({testimonials[currentTestimonialIndex].location})
                  </p>
                </div>
              </div>

              <span className="text-xs text-slate-400 font-normal">
                ভেরিফাইড শিক্ষার্থী পর্যালোচনা
              </span>
            </div>

          </div>
        </div>

        {/* Carousel Pagination Dots & Quick Selector Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Direct Dot Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentTestimonialIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentTestimonialIndex === idx 
                    ? 'w-8 bg-indigo-600' 
                    : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Quick Mini Jump Bar */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentTestimonialIndex(idx)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left whitespace-nowrap cursor-pointer ${
                  currentTestimonialIndex === idx
                    ? 'border-indigo-300 bg-indigo-50/80 text-indigo-700 font-medium shadow-2xs'
                    : 'border-slate-200 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{t.name}</span>
                <span className="text-[10px] text-slate-400 ml-1.5 font-normal">({t.location.split(',')[0]})</span>
              </button>
            ))}
          </div>

        </div>
        </div>
      </section>

      {/* 6. FINAL ACTION BANNER (Right Weighted: Mascot sways in empty Left corridor) */}
      <section id="section-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-32">
        <div className="max-w-3xl ml-auto bg-indigo-600 text-white rounded-2xl p-8 sm:p-14 text-center space-y-6 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
              আজই শুরু হোক আপনার স্কিল শেখার জার্নি
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              পছন্দের কোর্স সিলেক্ট করুন, প্রতিদিন একটু করে শিখুন আর বাস্তব প্রজেক্ট বানিয়ে নিজের পোর্টফোলিও সাজান।
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={onNavigateToCourses}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <span>সকল কোর্স দেখুন এবং শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
