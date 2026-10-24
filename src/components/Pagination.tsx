import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  itemNameBn?: string;
  className?: string;
}

// Convert numbers to Bengali digits
export const toBnNum = (num: number | string): string => {
  return String(num).replace(/[0-9]/g, (digit) => '০১২৩৪৫৬৭৮৯'[parseInt(digit, 10)]);
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  itemNameBn = 'আইটেম',
  className = ''
}) => {
  // If there are no items or only 1 page with no items, don't show controls
  if (totalPages <= 1 && (!totalItems || totalItems === 0)) {
    return null;
  }

  // Calculate item range
  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  // Generate page numbers array (with ellipsis for large page sets)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/80 ${className}`}>
      
      {/* Item Range Info */}
      <div className="text-xs text-slate-500">
        {totalItems !== undefined && startItem && endItem ? (
          <span>
            মোট <strong className="font-semibold text-slate-800 tabular-nums">{toBnNum(totalItems)}টি</strong> {itemNameBn}-এর মধ্যে{' '}
            <strong className="font-semibold text-slate-800 tabular-nums">{toBnNum(startItem)}–{toBnNum(endItem)}</strong> দেখাচ্ছে
          </span>
        ) : (
          <span>
            পৃষ্ঠা <strong className="font-semibold text-slate-800">{toBnNum(currentPage)}</strong> / {toBnNum(totalPages)}
          </span>
        )}
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none rounded-lg transition-colors cursor-pointer"
          title="পূর্ববর্তী পৃষ্ঠা"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">পূর্ববর্তী</span>
        </button>

        {/* Numeric Page Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`dots-${idx}`} className="px-2 text-xs text-slate-400 select-none">
                  …
                </span>
              );
            }

            const pageNum = Number(p);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[32px] h-8 px-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
                }`}
              >
                {toBnNum(pageNum)}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none rounded-lg transition-colors cursor-pointer"
          title="পরবর্তী পৃষ্ঠা"
          aria-label="Next Page"
        >
          <span className="hidden xs:inline">পরবর্তী</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
