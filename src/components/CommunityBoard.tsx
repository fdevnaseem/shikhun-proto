import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  MessageSquare, 
  ThumbsUp, 
  Search, 
  Plus, 
  Pin, 
  Send, 
  Filter, 
  LogIn 
} from 'lucide-react';
import { AuthModal } from './AuthModal';
import { Pagination } from './Pagination';

export const CommunityBoard: React.FC = () => {
  const { 
    communityThreads, 
    courses, 
    addCommunityThread, 
    replyToCommunityThread, 
    toggleUpvoteThread,
    currentRole,
    currentUser,
    adminDeleteThread,
    adminTogglePinThread
  } = useLearning();

  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const THREADS_PER_PAGE = 5;

  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Active expanded thread for replies
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(communityThreads[0]?.id || null);
  const [replyInput, setReplyInput] = useState<{ [threadId: string]: string }>({});
  const [replyLikes, setReplyLikes] = useState<{ [replyId: string]: boolean }>({});

  const toggleLikeReply = (replyId: string) => {
    setReplyLikes(prev => ({ ...prev, [replyId]: !prev[replyId] }));
  };

  // Reset to page 1 on filter or search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCourseFilter]);

  const filteredThreads = communityThreads
    .filter(t => {
      const matchesCourse = selectedCourseFilter === 'all' || t.courseId === selectedCourseFilter;
      const matchesSearch = 
        t.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.contentBn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.upvotes || 0) - (a.upvotes || 0);
    });

  const totalPages = Math.ceil(filteredThreads.length / THREADS_PER_PAGE) || 1;
  const paginatedThreads = filteredThreads.slice(
    (currentPage - 1) * THREADS_PER_PAGE,
    currentPage * THREADS_PER_PAGE
  );

  const handleOpenNewQuestion = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsNewQuestionOpen(true);
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    await addCommunityThread(newCourseId || courses[0]?.id || 'general', newTitle, newContent);
    setNewTitle('');
    setNewContent('');
    setIsNewQuestionOpen(false);
  };

  const handleSendReply = async (threadId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const text = replyInput[threadId]?.trim();
    if (!text) return;
    await replyToCommunityThread(threadId, text);
    setReplyInput(prev => ({ ...prev, [threadId]: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-medium text-slate-900 tracking-tight">
            সহপাঠীদের সাথে আলোচনা ও প্রশ্নোত্তর
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            ফায়ারস্টোর ডেটাবেজে লাইভ সিঙ্ক হওয়া প্রশ্নোত্তর ফোরাম। যেকোনো সমস্যা নিয়ে সহপাঠী ও মেন্টরদের সাথে সরাসরি আলোচনা করুন।
          </p>
        </div>

        <button
          onClick={handleOpenNewQuestion}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন প্রশ্ন করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="যেকোনো টপিক বা সমস্যার বিষয় লিখে সার্চ করুন..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Course Filter Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">সব কোর্সের আলোচনা</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.titleBn}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions & Discussion List */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500 text-xs">
            এখনো কোনো আলোচনা শুরু হয়নি। আপনার কোনো জিজ্ঞাসা থাকলে প্রথম প্রশ্নটি পোস্ট করুন!
          </div>
        ) : (
          paginatedThreads.map((thread) => {
            const isExpanded = expandedThreadId === thread.id;
            const hasUserUpvoted = currentUser ? (thread.upvotedUserIds || []).includes(currentUser.id) : false;

            return (
              <div 
                key={thread.id} 
                className={`bg-white rounded-lg border transition-all ${
                  thread.isPinned ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="p-5 space-y-3">
                  
                  {/* Meta row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      {thread.isPinned && (
                        <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-medium">
                          <Pin className="w-3 h-3" />
                          পিন করা
                        </span>
                      )}

                      {/* Author Avatar & Name */}
                      <div className="flex items-center gap-1.5">
                        {thread.authorPhotoURL ? (
                          <img
                            src={thread.authorPhotoURL}
                            alt={thread.authorName}
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold flex items-center justify-center">
                            {thread.authorName.charAt(0) || 'ইউ'}
                          </div>
                        )}
                        <span className="font-semibold text-slate-800">{thread.authorName}</span>
                      </div>

                      {thread.authorRole === 'superadmin' && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                          সুপার অ্যাডমিন
                        </span>
                      )}
                      <span className="text-slate-300">·</span>
                      <span className="text-indigo-600 truncate max-w-xs">{thread.courseTitleBn}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">{thread.createdAt}</span>
                    </div>

                    {/* Admin Moderation Controls if in superadmin mode */}
                    {currentRole === 'superadmin' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adminTogglePinThread(thread.id)}
                          className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                        >
                          {thread.isPinned ? 'আনপিন করুন' : 'পিন করুন'}
                        </button>
                        <button
                          onClick={() => adminDeleteThread(thread.id)}
                          className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                        >
                          মুছুন
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title & Content */}
                  <div>
                    <h3 className="text-base font-medium text-slate-900 leading-snug">
                      {thread.titleBn}
                    </h3>
                    <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-normal">
                      {thread.contentBn}
                    </p>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            setIsAuthModalOpen(true);
                            return;
                          }
                          toggleUpvoteThread(thread.id);
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                          hasUserUpvoted
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${hasUserUpvoted ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                        <span className="tabular-nums">{thread.upvotes}</span>
                        <span className="hidden sm:inline">সহায়ক</span>
                      </button>

                      <button
                        onClick={() => setExpandedThreadId(isExpanded ? null : thread.id)}
                        className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="tabular-nums">{(thread.replies || []).length}টি মন্তব্য</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setExpandedThreadId(isExpanded ? null : thread.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                    >
                      {isExpanded ? 'মন্তব্য গুটিয়ে রাখুন' : 'মন্তব্য দেখুন বা লিখুন'}
                    </button>
                  </div>

                </div>

                {/* Expanded Replies Section (Compact Facebook Comments Style) */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3 sm:px-5 sm:py-3.5 space-y-3">
                    
                    {/* Compact Comment List */}
                    {(thread.replies || []).length > 0 ? (
                      <div className="space-y-2">
                        {thread.replies.map((reply) => {
                          const isLiked = !!replyLikes[reply.id];
                          const authorInitial = reply.authorName.trim().charAt(0) || 'শ';

                          return (
                            <div key={reply.id} className="flex items-start gap-2 sm:gap-2.5 group">
                              {/* Round Avatar */}
                              {reply.authorPhotoURL ? (
                                <img
                                  src={reply.authorPhotoURL}
                                  alt={reply.authorName}
                                  className="w-7 h-7 rounded-full object-cover shrink-0 select-none mt-0.5 ring-1 ring-slate-200"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-medium text-[11px] shrink-0 select-none mt-0.5">
                                  {authorInitial}
                                </div>
                              )}

                              <div className="flex-1 min-w-0">
                                {/* Gray Facebook-style Bubble */}
                                <div className="inline-block bg-slate-200/70 hover:bg-slate-200/90 transition-colors rounded-2xl px-3 py-1.5 max-w-[96%] sm:max-w-[85%] text-left">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-semibold text-xs text-slate-900 leading-tight">
                                      {reply.authorName}
                                    </span>
                                    {reply.authorRole === 'instructor' && (
                                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-medium">
                                        মেন্টর
                                      </span>
                                    )}
                                    {reply.authorRole === 'superadmin' && (
                                      <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-medium">
                                        অ্যাডমিন
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-800 leading-snug font-normal mt-0.5 whitespace-pre-wrap">
                                    {reply.contentBn}
                                  </p>
                                </div>

                                {/* Micro Action Row (Facebook Like · Reply · Time) */}
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pl-3 pt-0.5">
                                  <button
                                    onClick={() => toggleLikeReply(reply.id)}
                                    className={`hover:underline cursor-pointer ${
                                      isLiked ? 'text-indigo-600 font-semibold' : 'text-slate-600'
                                    }`}
                                  >
                                    {isLiked ? 'পছন্দ হয়েছে' : 'লাইক'}
                                  </button>
                                  <span className="text-slate-300">·</span>
                                  <button
                                    onClick={() => setReplyInput(prev => ({ ...prev, [thread.id]: `@${reply.authorName} ` }))}
                                    className="hover:underline text-slate-600 cursor-pointer"
                                  >
                                    উত্তর দিন
                                  </button>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-slate-400 font-normal">{reply.createdAt}</span>
                                  {isLiked && (
                                    <span className="inline-flex items-center gap-0.5 text-indigo-600 font-medium text-[10px] ml-1 bg-white px-1.5 py-0.2 rounded-full border border-slate-200 shadow-2xs">
                                      👍 ১
                                    </span>
                                  )}
                                </div>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic py-1">
                        এখনও কোনো মন্তব্য আসেনি। প্রথম মন্তব্যটি আপনিই লিখুন!
                      </p>
                    )}

                    {/* Comment Input Bar or Sign In Prompt */}
                    {currentUser ? (
                      <div className="flex items-center gap-2 pt-1.5 border-t border-slate-200/60">
                        {currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt={currentUser.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0 select-none ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium text-[11px] shrink-0 select-none">
                            {currentUser.name.charAt(0)}
                          </div>
                        )}
                        
                        <div className="flex-1 relative flex items-center">
                          <input
                            type="text"
                            value={replyInput[thread.id] || ''}
                            onChange={(e) => setReplyInput(prev => ({ ...prev, [thread.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendReply(thread.id)}
                            placeholder="একটি মন্তব্য লিখুন..."
                            className="w-full pl-3.5 pr-8 py-1.5 text-xs bg-slate-200/60 hover:bg-slate-200/80 focus:bg-white border border-transparent focus:border-slate-300 rounded-full focus:outline-none transition-all placeholder:text-slate-400"
                          />
                          <button
                            onClick={() => handleSendReply(thread.id)}
                            disabled={!replyInput[thread.id]?.trim()}
                            className="absolute right-1.5 p-1 text-indigo-600 hover:text-indigo-800 disabled:text-slate-400 disabled:opacity-40 transition-colors cursor-pointer"
                            title="মন্তব্য পাঠান"
                            aria-label="মন্তব্য পাঠান"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between pt-2.5 pb-1 border-t border-slate-200/60 text-xs text-slate-500">
                        <span>আলোচনায় মন্তব্য লিখতে বা উত্তর দিতে লগইন করুন।</span>
                        <button
                          onClick={() => setIsAuthModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
                        >
                          <LogIn className="w-3 h-3" />
                          <span>লগইন করুন</span>
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {filteredThreads.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredThreads.length}
          itemsPerPage={THREADS_PER_PAGE}
          itemNameBn="আলোচনা ও প্রশ্ন"
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
        />
      )}

      {/* New Question Modal */}
      {isNewQuestionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-slate-200 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              নতুন প্রশ্ন বা আলোচনা শুরু করুন
            </h3>

            <form onSubmit={handleCreateQuestion} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  কোর্স নির্বাচন করুন
                </label>
                <select
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.titleBn}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  প্রশ্নের শিরোনাম
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: React Router-এ 404 page কীভাবে handle করব?"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  বিস্তারিত বিবরণ ও কোড/ডিজাইন রেফারেন্স
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  placeholder="কী করতে চেয়েছিলেন আর কী error বা সমস্যা হচ্ছে বিস্তারিত লিখুন..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewQuestionOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs rounded-lg cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg cursor-pointer"
                >
                  প্রশ্ন পোস্ট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal for unauthenticated user prompt */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
};
