import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  AlertCircle, 
  GraduationCap 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'google' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  defaultTab = 'google'
}) => {
  const { loginWithGoogle, loginSuperAdmin } = useLearning();
  const [tab, setTab] = useState<'google' | 'admin'>(defaultTab);
  
  // Super admin credentials state (secure, unexposed)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAdminError('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.error('Google sign in error:', err);
      setAdminError('গুগল সাইন-ইনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAdminError('');
    try {
      if (adminEmail.trim().toLowerCase() !== 'super@gmail.com') {
        setAdminError('ভুল ইমেইল অথবা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।');
        setIsLoading(false);
        return;
      }

      const success = await loginSuperAdmin(adminPassword);
      if (success) {
        onClose();
      } else {
        setAdminError('ভুল ইমেইল অথবা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setAdminError('লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                শিখুন প্ল্যাটফর্মে প্রবেশ করুন
              </h3>
              <p className="text-[11px] text-slate-500">
                কোর্স অগ্রগতি ও ফোরাম পার্টিসিপেশন ট্র্যাকিং
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setTab('google'); setAdminError(''); }}
            className={`flex-1 py-3 text-xs font-medium text-center transition-colors border-b-2 cursor-pointer ${
              tab === 'google'
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20'
                : 'border-transparent text-slate-600 hover:bg-slate-50'
            }`}
          >
            গুগল দিয়ে লগইন
          </button>
          <button
            onClick={() => { setTab('admin'); setAdminError(''); }}
            className={`flex-1 py-3 text-xs font-medium text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'admin'
                ? 'border-amber-600 text-amber-700 bg-amber-50/20'
                : 'border-transparent text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>প্রশাসনিক লগইন</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          {adminError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{adminError}</span>
            </div>
          )}

          {tab === 'google' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                আপনার গুগল অ্যাকাউন্টের মাধ্যমে তাৎক্ষণিক সাইন ইন করুন। প্রোফাইল ছবি, নাম ও ইমেইল স্বয়ংক্রিয়ভাবে সিঙ্ক হবে।
              </p>

              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-2xs transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {/* Official Google 'G' Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google দিয়ে সাইন ইন করুন</span>
              </button>

              <div className="bg-indigo-50/60 border border-indigo-100 rounded-lg p-3 text-[11px] text-indigo-700 space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>ক্লাউড ফায়ারস্টোরে রিয়েল-টাইম সংরক্ষণ</span>
                </div>
                <p>
                  আপনার কোর্স অগ্রগতি, কুইজ স্কোর ও কমিউনিটি মন্তব্য সুরক্ষিতভাবে ক্লাউডে সেভ হবে।
                </p>
              </div>
            </div>
          )}

          {tab === 'admin' && (
            <form onSubmit={handleAdminSignIn} className="space-y-3.5">
              <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-[11px] text-slate-600 space-y-0.5">
                <span className="font-medium text-slate-800 block">প্রশাসনিক নিরাপত্তা পোর্টাল</span>
                <p>প্ল্যাটফর্ম কনটেন্ট ও ডেটাবেজ পরিচালনার জন্য অনুমোদিত ক্রেডেনশিয়াল ব্যবহার করুন।</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  অ্যাডমিন ইমেইল
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  অ্যাডমিন পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    required
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>অ্যাডমিন হিসেবে প্রবেশ করুন</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
