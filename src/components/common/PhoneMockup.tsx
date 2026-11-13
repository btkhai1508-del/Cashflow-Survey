import React from 'react';

interface PhoneMockupProps {
  className?: string;
  leftAnswer?: string;
  rightAnswer?: string;
  onLeftChange?: (val: string) => void;
  onRightChange?: (val: string) => void;
  isEditable?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  className = '',
  leftAnswer = '',
  rightAnswer = '',
  onLeftChange,
  onRightChange,
  isEditable = true,
}) => {
  return (
    <div className={`relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full max-w-4xl mx-auto py-4 ${className}`}>
      {/* Left Input Bubble */}
      <div className="w-full lg:w-64 flex flex-col items-center lg:items-end text-center lg:text-right order-2 lg:order-1">
        <span className="font-['Baloo_2',cursive] font-extrabold text-slate-800 text-lg md:text-xl mb-1 tracking-wide">
          Điểm Mạnh Tài Chính
        </span>
        <div className="bg-white border-2 border-slate-200/80 rounded-3xl lg:rounded-tr-none px-5 py-4 shadow-sm w-full max-w-xs transition-all focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-200">
          <input
            type="text"
            value={leftAnswer}
            onChange={(e) => onLeftChange?.(e.target.value)}
            disabled={!isEditable}
            placeholder="Ví dụ: Kỷ luật tiết kiệm..."
            className="w-full text-slate-800 placeholder-slate-400 italic text-sm md:text-base bg-transparent border-none outline-none text-center lg:text-right"
          />
        </div>
      </div>

      {/* Center Phone Device */}
      <div className="order-1 lg:order-2 shrink-0">
        <div className="w-64 sm:w-72 h-[450px] sm:h-[490px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700/80 relative overflow-hidden flex flex-col">
          {/* Top Notch & Camera Hole */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full border border-slate-800 z-30" />
          
          {/* Screen Content */}
          <div className="w-full h-full bg-[#FFFDF7] rounded-[34px] overflow-hidden flex flex-col relative text-slate-800 text-xs select-none">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-slate-700 z-20">
              <span>09:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-5 h-2.5 border border-slate-600 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-emerald-600 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* In-app header */}
            <div className="bg-[#FFD833] px-4 pt-3 pb-4 rounded-b-3xl shadow-sm border-b border-amber-300">
              <div className="text-[10px] uppercase font-bold text-slate-700 tracking-wider">Hi, Cashflow Player!</div>
              <div className="font-['Baloo_2',cursive] font-extrabold text-slate-900 text-base leading-tight mt-0.5">
                Ready to learn?
              </div>
              <div className="mt-2 bg-purple-900/10 backdrop-blur-xs px-2.5 py-1 rounded-xl flex items-center justify-between text-[10px] font-semibold text-purple-900">
                <span>Dòng tiền (Cashflow):</span>
                <span className="text-emerald-700 font-bold font-mono">+$2,450/tháng</span>
              </div>
            </div>

            {/* Scrollable app inner body */}
            <div className="p-3.5 space-y-2.5 overflow-hidden flex-1 flex flex-col justify-between">
              {/* Categories */}
              <div>
                <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Mục tiêu đầu tư</span>
                  <span className="text-[10px] text-purple-700 font-medium">Chi tiết →</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-medium">Bất động sản</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-medium">Cổ phiếu 2x</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-medium">Fast Track</span>
                </div>
              </div>

              {/* Game cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#9B77C1] text-white p-2.5 rounded-2xl flex flex-col justify-between shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">🏠</div>
                  <div className="mt-2">
                    <div className="text-[11px] font-bold">Căn hộ 2 phòng</div>
                    <div className="text-[9px] opacity-90 font-mono">+$350/tháng</div>
                  </div>
                </div>

                <div className="bg-[#41A456] text-white p-2.5 rounded-2xl flex flex-col justify-between shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">📈</div>
                  <div className="mt-2">
                    <div className="text-[11px] font-bold">Cổ tức Quỹ</div>
                    <div className="text-[9px] opacity-90 font-mono">+$180/tháng</div>
                  </div>
                </div>
              </div>

              {/* Bottom level tracker */}
              <div className="bg-slate-100 p-2 rounded-xl border border-slate-200">
                <div className="flex justify-between text-[10px] font-semibold text-slate-700 mb-1">
                  <span>Tiến độ thoát Vòng Chuột</span>
                  <span className="text-purple-700 font-bold font-mono">75%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 via-emerald-500 to-purple-600 h-full w-3/4 rounded-full" />
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator */}
            <div className="py-1.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Input Bubble */}
      <div className="w-full lg:w-64 flex flex-col items-center lg:items-start text-center lg:text-left order-3">
        <span className="font-['Baloo_2',cursive] font-extrabold text-slate-800 text-lg md:text-xl mb-1 tracking-wide">
          Bẫy Tiêu Sản Cần Giảm
        </span>
        <div className="bg-white border-2 border-slate-200/80 rounded-3xl lg:rounded-tl-none px-5 py-4 shadow-sm w-full max-w-xs transition-all focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-200">
          <input
            type="text"
            value={rightAnswer}
            onChange={(e) => onRightChange?.(e.target.value)}
            disabled={!isEditable}
            placeholder="Ví dụ: Trả góp thẻ, mua sắm..."
            className="w-full text-slate-800 placeholder-slate-400 italic text-sm md:text-base bg-transparent border-none outline-none text-center lg:text-left"
          />
        </div>
      </div>
    </div>
  );
};
