import React from 'react';
import { Course } from '../types';
import { X, Award, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  course: Course;
  isUnlocked: boolean;
  completionPercentage: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  isUnlocked,
  completionPercentage,
  onClose
}) => {
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-lg border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-semibold text-slate-800">
              কোর্স সমাপনী সার্টিফিকেট সনদ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট / সেভ করুন</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Message if locked */}
        {!isUnlocked && (
          <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-100 text-xs text-amber-800 flex items-center justify-between">
            <span>
              এটি একটি সার্টিফিকেট প্রিভিউ। আপনার বর্তমান অগ্রগতি {completionPercentage}%। সবকটি লেকচার ও কুইজ সম্পন্ন হলে অফিশিয়াল ভেরিফাইড সনদপত্র সক্রিয় হবে।
            </span>
            <span className="font-semibold tabular-nums">{completionPercentage}%</span>
          </div>
        )}

        {/* The Printable Certificate Design */}
        <div className="p-8 sm:p-12 bg-[#FEFEFD] relative">
          
          {/* Subtle decorative hairline border */}
          <div className="border-4 border-double border-indigo-900/20 p-8 sm:p-10 rounded-sm relative text-center space-y-6">
            
            {/* Seal / Emblem */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center shadow-md">
                <Award className="w-8 h-8" />
              </div>
            </div>

            {/* Platform Branding */}
            <div>
              <p className="text-xs tracking-widest text-indigo-900 uppercase font-mono">
                SHIKHUN LEARNING ACADEMY
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 mt-1">
                সাফল্য ও সমাপনী সনদপত্র
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Certificate of Career Skill Achievement
              </p>
            </div>

            {/* Recipient */}
            <div className="space-y-1">
              <p className="text-xs text-slate-600">গর্বের সাথে প্রত্যয়ন করা যাচ্ছে যে,</p>
              <p className="text-xl sm:text-2xl font-semibold text-indigo-950 underline decoration-indigo-300 decoration-1 underline-offset-8">
                তানভীর আহমেদ
              </p>
            </div>

            {/* Course Accomplishment */}
            <div className="max-w-xl mx-auto space-y-2">
              <p className="text-xs text-slate-600 leading-relaxed">
                সফলতার সাথে নিয়মিত ক্লাসে অংশগ্রহণ, সমস্ত প্রজেক্ট ও গেইমিফাইড কুইজ টেস্টে কৃতিত্বের পরিচয় দিয়ে
              </p>
              <p className="text-base sm:text-lg font-medium text-slate-900">
                "{course.titleBn}"
              </p>
              <p className="text-xs text-slate-500">
                কোর্সটির সকল কারিকুলাম ও ক্যারিয়ার প্র্যাকটিস মাইলস্টোন সফলভাবে সম্পন্ন করেছেন।
              </p>
            </div>

            {/* Signatures & Verification Badge */}
            <div className="pt-8 grid grid-cols-3 items-end text-xs text-slate-600 border-t border-slate-100">
              <div className="text-left space-y-1">
                <p className="font-serif italic font-medium text-slate-800 text-sm">মাহমুদুল হাসান</p>
                <div className="w-24 h-0.5 bg-slate-300"></div>
                <p className="text-[11px] text-slate-500">প্রধান প্রশিক্ষক ও মেন্টর</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-emerald-500 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-emerald-700 font-mono mt-1">VERIFIED CERTIFICATE</span>
                <span className="text-[9px] text-slate-400 font-mono">ID: SHK-2026-99214</span>
              </div>

              <div className="text-right space-y-1">
                <p className="font-medium text-slate-800 text-xs tabular-nums">{currentDate}</p>
                <div className="w-24 h-0.5 bg-slate-300 ml-auto"></div>
                <p className="text-[11px] text-slate-500">ইস্যুর তারিখ</p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded-lg transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
