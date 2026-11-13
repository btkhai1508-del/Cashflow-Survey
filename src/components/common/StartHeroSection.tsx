import React from 'react';

interface StartHeroSectionProps {
  onStartClick: () => void;
}

export const StartHeroSection: React.FC<StartHeroSectionProps> = ({ onStartClick }) => {
  return (
    <section className="relative w-full bg-[#41A456] text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
        {/* Right Side on Desktop / Top on Mobile: Clean Typography & Solid CTA */}
        <div className="w-full lg:max-w-xl space-y-4 sm:space-y-6 text-center lg:text-left order-1 lg:order-2">
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 text-[#FFE05C] font-['Baloo_2',cursive] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
            <span>KHẢO SÁT 3 PHÚT · CHECK VAR BÁNH XE CUỘC ĐỜI</span>
          </div>

          {/* Big Headline */}
          <h1 className="font-['Baloo_2',cursive] font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight">
            Bắt Mạch "Cột Sống" &amp; Sức Khỏe Tài Chính
          </h1>

          {/* Target Audience Pill */}
          <div className="inline-block px-3.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-xs text-[#FFE05C] font-bold text-xs sm:text-sm border border-white/20">
            Dành cho hệ người đi làm và sinh viên muốn làm chủ quỹ thời gian &amp; tài chính cá nhân
          </div>

          {/* Introduction Paragraph */}
          <p className="font-['Nunito',sans-serif] text-white/95 text-sm sm:text-base md:text-lg leading-relaxed">
            Chào bạn, làm nhẹ chiếc form (tầm 3 phút) này để tự <strong>"check VAR"</strong> lại <strong>Bánh xe cuộc đời</strong> của mình nhé. Khảo sát giúp bạn nhìn nhận độ cân bằng giữa công việc, tiền bạc và thời gian cá nhân, từ đó tìm hướng bứt phá "đỉnh kout" hơn. Yên tâm là "in tư" của bạn được bảo mật nha!
          </p>

          {/* Signature Figma CTA Button (rounded: 25px 25px 0px 25px) */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onStartClick}
              className="w-full sm:w-auto flex items-center justify-center gap-3.5 px-8 py-4 bg-white text-black hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer group shadow-2xl"
              style={{ borderRadius: '25px 25px 0px 25px' }}
            >
              <span className="font-['Baloo_2',cursive] font-extrabold text-lg sm:text-xl text-black">
                Bắt đầu khảo sát
              </span>
              {/* Polygon 31 right triangle arrow */}
              <span className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-black group-hover:translate-x-1.5 transition-transform" />
            </button>

            <span className="text-xs text-white/80 font-semibold hidden sm:inline-block">
              ⏳ 15 câu hỏi · ~3 phút
            </span>
          </div>
        </div>

        {/* Left Side on Desktop / Bottom on Mobile: Responsive Phone Mockup */}
        <div className="relative shrink-0 flex justify-center order-2 lg:order-1 w-full sm:w-auto">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-black/20 rounded-[50px] blur-2xl transform scale-95 pointer-events-none" />

          {/* Phone Frame */}
          <div className="relative w-[270px] sm:w-[290px] md:w-[310px] lg:w-[325px] h-[520px] sm:h-[560px] md:h-[600px] lg:h-[620px] bg-black rounded-[44px] sm:rounded-[48px] p-2.5 sm:p-3 shadow-2xl border-[4px] sm:border-[5px] border-[#2B2B2B] flex flex-col transition-all">
            {/* Front Camera Notch */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 bg-black rounded-full border border-zinc-800 z-30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
            </div>

            {/* Inner Screen */}
            <div className="w-full h-full bg-[#FFFFFF] rounded-[34px] sm:rounded-[38px] overflow-hidden flex flex-col relative text-slate-900 select-none">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[11px] font-bold text-slate-800">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">5G</span>
                  <div className="w-4 h-2.5 border border-slate-700 rounded-xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-slate-800 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Blue Header Banner with curved bottom-right */}
              <div className="bg-[#0091EA] text-white px-4 sm:px-5 pt-2 sm:pt-3 pb-4 sm:pb-5 rounded-br-[36px] shadow-sm">
                <div className="text-[11px] font-medium opacity-90">Hi, Người Bạn Mới 👋</div>
                <div className="font-['Baloo_2',cursive] font-extrabold text-xl sm:text-2xl leading-tight mt-0.5">
                  Ready to "Check VAR"?
                </div>
              </div>

              {/* Mockup Body Content - Survey & Cashflow theme */}
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-['Baloo_2',cursive] font-extrabold text-xs text-slate-900 mb-1.5 flex items-center justify-between">
                    <span>4 PHẦN KHẢO SÁT</span>
                    <span className="text-[10px] text-[#0091EA] font-bold">15 CÂU</span>
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-[#F5ABCE] text-slate-900 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                      Cột sống
                    </span>
                    <span className="bg-[#FFD833] text-slate-900 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                      Tài chính
                    </span>
                    <span className="bg-[#9B77C1] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                      Quỹ thời gian
                    </span>
                    <span className="bg-[#41A456] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Cashflow
                    </span>
                  </div>
                </div>

                {/* Subject Cards with Cartoon Faces */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Purple Big Card: Rat Race */}
                  <div className="bg-[#9B77C1] text-white p-2.5 sm:p-3 rounded-2xl flex flex-col justify-between h-[96px] sm:h-[105px] relative overflow-hidden shadow-sm">
                    {/* Cute cartoon eyes */}
                    <div className="absolute right-2.5 top-2.5 flex flex-col items-center">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-3 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-black rounded-full" />
                        </div>
                        <div className="w-2.5 h-3 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-black rounded-full" />
                        </div>
                      </div>
                      <div className="w-3.5 h-1 border-b-2 border-white rounded-full mt-0.5" />
                    </div>
                    <div className="text-xs font-bold opacity-80">Rat Race</div>
                    <div>
                      <div className="font-['Baloo_2',cursive] font-extrabold text-sm sm:text-base leading-tight">
                        Cột Sống
                      </div>
                      <span className="text-[9px] opacity-90 block">Check VAR ➔</span>
                    </div>
                  </div>

                  {/* Right Column: Fast Track & Boardgame */}
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <div className="bg-[#0091EA] text-white p-2 rounded-xl flex items-center justify-between h-[45px] sm:h-[48px] shadow-xs">
                      <div>
                        <div className="font-['Baloo_2',cursive] font-extrabold text-[11px] sm:text-xs">
                          Fast Track
                        </div>
                        <span className="text-[8px] opacity-90 block">Tự do tài chính</span>
                      </div>
                      <span className="text-xs font-bold opacity-90">🚀</span>
                    </div>

                    <div className="bg-[#41A456] text-white p-2 rounded-xl flex items-center justify-between h-[45px] sm:h-[48px] shadow-xs">
                      <div>
                        <div className="font-['Baloo_2',cursive] font-extrabold text-[11px] sm:text-xs">
                          Boardgame
                        </div>
                        <span className="text-[8px] opacity-90 block">Vé mời cuối tuần</span>
                      </div>
                      <span className="text-xs font-bold opacity-90">🎲</span>
                    </div>
                  </div>
                </div>

                {/* Level / Step Progress Circles */}
                <div>
                  <div className="font-['Baloo_2',cursive] font-bold text-[11px] text-slate-800 mb-1 flex items-center justify-between">
                    <span>Mức độ cân bằng</span>
                    <span className="text-[10px] text-slate-500 font-semibold">1 – 5 sao</span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`w-6 sm:w-7 h-6 sm:h-7 rounded-full border border-black flex items-center justify-center font-['Baloo_2',cursive] font-bold text-[11px] sm:text-xs ${
                          lvl === 1
                            ? 'bg-[#FFE05C] text-black shadow-xs'
                            : 'bg-white text-slate-800'
                        }`}
                      >
                        {lvl}
                      </div>
                    ))}
                    <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-black text-white flex items-center justify-center text-[9px]">
                      ▶
                    </div>
                  </div>
                </div>

                {/* Interactive Action Button inside Phone */}
                <button
                  type="button"
                  onClick={onStartClick}
                  className="w-full bg-[#3D3A36] hover:bg-black text-white py-2 sm:py-2.5 rounded-xl font-['Baloo_2',cursive] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform"
                >
                  <span>Bắt đầu ngay</span>
                  <span>▶</span>
                </button>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="py-1.5 flex justify-center">
                <div className="w-24 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
