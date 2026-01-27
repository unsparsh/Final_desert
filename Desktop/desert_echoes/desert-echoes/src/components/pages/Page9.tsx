import React, { useEffect, useState, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';

interface Page9Props {
  isActive: boolean;
}

const pdfFiles = [
  { name: 'Document 1', path: '/assets/pdf/PAGE 9.pdf' },
  { name: 'Document 2', path: '/assets/pdf/PAGE 9A.pdf' },
  { name: 'Document 3', path: '/assets/pdf/PAGE 9B.pdf' },
  { name: 'Document 4', path: '/assets/pdf/PAGE 9C.pdf' },
];

const AUTO_NAV_DURATION = 5000; // 5 seconds per PDF

export const Page9: React.FC<Page9Props> = ({ isActive }) => {
  const [activePdf, setActivePdf] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setIsVisible(true), 300);
      setActivePdf(0); // Reset to first PDF when page becomes active
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  // Auto-navigation timer
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setActivePdf(prev => {
        if (prev < pdfFiles.length - 1) {
          return prev + 1;
        }
        return prev; // Stay on last PDF
      });
    }, AUTO_NAV_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, activePdf]);

  return (
    <PageWrapper isActive={isActive} backgroundColor="bg-secondary">
      <div className={`w-full h-full flex flex-col transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* PDF Navigation Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-4 md:mb-6 px-4 pt-4">
          {pdfFiles.map((pdf, index) => (
            <button
              key={index}
              onClick={() => setActivePdf(index)}
              className={`px-3 py-2 md:px-6 md:py-3 font-body text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 rounded-sm ${
                activePdf === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {pdf.name}
            </button>
          ))}
        </div>

        {/* PDF Viewer - No toolbar */}
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 pb-4">
          <div className="w-full h-full bg-muted/20 rounded-sm overflow-hidden border border-primary/10">
            <object
              data={`${pdfFiles[activePdf].path}#toolbar=0&navpanes=0&scrollbar=0`}
              type="application/pdf"
              className="w-full h-full"
              style={{ minHeight: '500px' }}
            >
              <embed
                src={`${pdfFiles[activePdf].path}#toolbar=0&navpanes=0&scrollbar=0`}
                type="application/pdf"
                className="w-full h-full"
              />
          </object>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
