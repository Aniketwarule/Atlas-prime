import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

function DownloadPDF() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex justify-center print:hidden">
      <Button
        onClick={handleDownload}
        className="flex items-center gap-3 bg-gradient-to-r from-navy to-navy/90 hover:from-navy/90 hover:to-navy text-white rounded-full px-10 py-6 font-bold text-base shadow-xl hover:shadow-navy/25 transition-all duration-300 hover:scale-105"
      >
        <Download className="w-5 h-5" />
        Download Itinerary as PDF
      </Button>
    </div>
  );
}

export default DownloadPDF;
