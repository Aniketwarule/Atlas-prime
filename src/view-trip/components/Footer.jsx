import React from 'react';

function Footer() {
  return (
    <div className="mt-12 text-center print:hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-cream-dark dark:via-white/10 to-transparent mb-6" />
      <p className="text-sm text-slate-400">
        Planned with ❤️ by <span className="font-serif font-bold text-coral">Atlas Prime</span>
      </p>
    </div>
  );
}

export default Footer;