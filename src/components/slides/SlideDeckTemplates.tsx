import React, { useState } from 'react';
import { GameBoardSvg } from '../boardgame/GameBoardSvg';
import { InteractiveDice } from '../boardgame/InteractiveDice';
import { GameCard } from '../boardgame/GameCards';
import { FinancialStatementWidget } from '../boardgame/FinancialStatementWidget';
import { CardItem, PlayerProfession } from '../../types/cashflowSlide';
import {
  Sparkles,
  Trophy,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  QrCode,
  DollarSign,
  Shield,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

/* =========================================================================
   SLIDE 01: OPENING / HERO
========================================================================= */
export const Slide01_HeroOpening: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 sm:p-14 lg:p-20 relative overflow-hidden bg-gradient-to-br from-[#24212C] via-[#38245D] to-[#1A1822]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F2BC4A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Column: Headline & Intro */}
      <div className="max-w-2xl space-y-6 z-10 text-left">
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6ED]/10 border border-[#F2BC4A]/40 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2BC4A] animate-pulse" />
          <span className="font-['Oswald'] text-xs font-bold uppercase tracking-widest text-[#F2BC4A]">
            CLB CASHFLOW CẦN THƠ · WORKSHOP TÀI CHÍNH
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-['Oswald'] text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#FAF6ED] leading-[1.05] tracking-tight">
          CASHFLOW <br />
          <span className="text-[#F2BC4A] drop-shadow-md">THE FINANCIAL FREEDOM</span> JOURNEY
        </h1>

        {/* Subtitle */}
        <p className="font-['Be_Vietnam_Pro'] text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Hành trình mô phỏng tài chính kinh điển từ Robert Kiyosaki: Thoát khỏi vòng luẩn quẩn mưu sinh <strong>(Rat Race)</strong> và bứt phá vào đường đua tự do tài chính <strong>(Fast Track)</strong>.
        </p>

        {/* Interactive CTA & Dice bar */}
        <div className="pt-4 flex flex-wrap items-center gap-6">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-[#F2BC4A] hover:bg-amber-400 text-slate-950 font-['Oswald'] text-lg font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer group"
          >
            <span>BẮT ĐẦU VÁN ĐẤU</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <InteractiveDice />
        </div>
      </div>

      {/* Right Column: 3D Board Graphic Centerpiece */}
      <div className="relative shrink-0 mt-8 lg:mt-0 z-10">
        <GameBoardSvg className="scale-95 sm:scale-105 hover:scale-110 transition-transform duration-500" />
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 02: BOARD MAP OVERVIEW (RAT RACE VS FAST TRACK)
========================================================================= */
export const Slide02_BoardMapOverview: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'all' | 'ratRace' | 'fastTrack'>('all');

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 sm:p-14 lg:p-20 bg-[#24212C] text-[#FAF6ED] gap-10">
      {/* Left: Graphic Board Visual */}
      <div className="shrink-0 flex flex-col items-center">
        <GameBoardSvg highlightTrack={activeTrack} className="w-[380px] sm:w-[460px]" />
        {/* Track switch buttons */}
        <div className="flex gap-2 mt-4 bg-[#1A1822] p-1.5 rounded-2xl border border-white/10 text-xs font-['Oswald']">
          <button
            onClick={() => setActiveTrack('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTrack === 'all' ? 'bg-[#F2BC4A] text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Toàn bộ bàn cờ
          </button>
          <button
            onClick={() => setActiveTrack('ratRace')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTrack === 'ratRace' ? 'bg-[#38245D] text-white font-bold' : 'text-slate-400'
            }`}
          >
            Vòng Rat Race
          </button>
          <button
            onClick={() => setActiveTrack('fastTrack')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTrack === 'fastTrack' ? 'bg-[#23A778] text-white font-bold' : 'text-slate-400'
            }`}
          >
            Vòng Fast Track
          </button>
        </div>
      </div>

      {/* Right: Comparative Breakdown */}
      <div className="max-w-xl space-y-6 text-left">
        <div>
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            02. TỔNG QUAN BẢN ĐỒ CHIẾN LƯỢC
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-white mt-1">
            HAI TUYẾN CUỘC ĐỜI: RAT RACE & FAST TRACK
          </h2>
        </div>

        {/* 2 Track Info Cards */}
        <div className="space-y-4">
          <div className="bg-[#38245D]/80 border-2 border-purple-400/30 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-['Oswald'] text-lg font-bold text-amber-300">
                1. VÒNG CHUỘT (THE RAT RACE) · VÒNG TRONG
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full font-bold">
                MƯU SINH
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-['Be_Vietnam_Pro']">
              Mô phỏng 90% dân số: Đi làm nhận lương → Trả tiền nhà, thuế, sinh hoạt → Hết tiền → Tiếp tục đi làm. Bạn chỉ có thể thoát khi <strong>Thu nhập thụ động &gt; Tổng chi phí</strong>.
            </p>
          </div>

          <div className="bg-[#23A778]/20 border-2 border-[#23A778]/50 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-['Oswald'] text-lg font-bold text-emerald-300">
                2. ĐƯỜNG ĐUA NHANH (THE FAST TRACK) · VÒNG NGOÀI
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                TỰ DO
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-['Be_Vietnam_Pro']">
              Nơi của các thương vụ lớn (Big Deal), mua lại doanh nghiệp, trung tâm thương mại và hoàn thành Ước mơ cuộc đời (Dream). Dòng tiền tăng trưởng cấp số nhân.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 03: PLAYER / PROFESSION PROFILE
========================================================================= */
export const Slide03_PlayerProfile: React.FC = () => {
  const sampleProfessions: PlayerProfession[] = [
    {
      id: 'prof-engineer',
      name: 'Kỹ Sư Phần Mềm (Engineer)',
      salary: 3900,
      taxes: 780,
      mortgage: 700,
      schoolLoan: 160,
      carLoan: 140,
      creditCard: 220,
      otherExpenses: 900,
      savings: 2000,
      avatar: '💻',
    },
    {
      id: 'prof-doctor',
      name: 'Bác Sĩ Đa Khoa (Doctor)',
      salary: 8200,
      taxes: 2100,
      mortgage: 1900,
      schoolLoan: 650,
      carLoan: 380,
      creditCard: 420,
      otherExpenses: 1750,
      savings: 3500,
      avatar: '🩺',
    },
    {
      id: 'prof-teacher',
      name: 'Giáo Viên (Teacher)',
      salary: 2500,
      taxes: 460,
      mortgage: 500,
      schoolLoan: 120,
      carLoan: 100,
      creditCard: 180,
      otherExpenses: 640,
      savings: 800,
      avatar: '📚',
    },
  ];

  const [selectedProf, setSelectedProf] = useState<PlayerProfession>(sampleProfessions[0]);

  const totalExp =
    selectedProf.taxes +
    selectedProf.mortgage +
    selectedProf.schoolLoan +
    selectedProf.carLoan +
    selectedProf.creditCard +
    selectedProf.otherExpenses;
  const initialCashflow = selectedProf.salary - totalExp;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-8 sm:p-14 lg:p-16 bg-[#24212C] text-[#FAF6ED] overflow-y-auto">
      <div className="w-full max-w-5xl space-y-6 text-left my-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
              03. HỒ SƠ KHỞI ĐẦU · PROFESSION CARD
            </span>
            <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-white mt-1">
              CHỌN NGHỀ NGHIỆP & BẢN ĐỒ XUẤT PHÁT
            </h2>
          </div>

          {/* Profession Selector */}
          <div className="flex gap-2">
            {sampleProfessions.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProf(p)}
                className={`px-3 py-2 rounded-xl text-xs font-bold font-['Oswald'] transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedProf.id === p.id
                    ? 'bg-[#F2BC4A] text-slate-950 shadow-md scale-105'
                    : 'bg-[#38245D] text-slate-300 hover:text-white'
                }`}
              >
                <span>{p.avatar}</span>
                <span>{p.name.split(' (')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Card & Starting Financial Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Avatar & Identity */}
          <div className="bg-[#FAF6ED] text-[#24212C] rounded-3xl p-6 border-4 border-[#38245D]/20 shadow-xl flex flex-col justify-between">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-purple-100 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-inner">
                {selectedProf.avatar}
              </div>
              <h3 className="font-['Oswald'] text-2xl font-bold text-[#24212C]">
                {selectedProf.name}
              </h3>
              <div className="inline-block bg-[#38245D] text-[#FAF6ED] text-xs px-3 py-1 rounded-full font-bold">
                Tiền khởi đầu: ${selectedProf.savings.toLocaleString()}
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-[#EBE5F2] p-3 rounded-2xl space-y-1 mt-4">
              <div className="font-bold text-[#38245D]">Nghịch lý Cashflow:</div>
              <p>Lương cao chưa chắc thoát Rat Race nhanh hơn lương thấp, vì chi phí người lương cao thường đắt đỏ hơn!</p>
            </div>
          </div>

          {/* Card 2: Income vs Expense Breakdown */}
          <div className="bg-[#38245D] text-white rounded-3xl p-6 border-2 border-purple-400/30 shadow-xl space-y-4">
            <h4 className="font-['Oswald'] text-lg font-bold text-[#F2BC4A] border-b border-white/10 pb-2">
              CHI TIẾT THU - CHI BAN ĐẦU
            </h4>

            <div className="space-y-2 text-xs font-['Be_Vietnam_Pro']">
              <div className="flex justify-between">
                <span>Lương hàng tháng (Salary):</span>
                <span className="font-['JetBrains_Mono'] font-bold text-emerald-400">
                  +${selectedProf.salary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Thuế (Taxes):</span>
                <span className="font-['JetBrains_Mono'] text-red-400">-${selectedProf.taxes}</span>
              </div>
              <div className="flex justify-between">
                <span>Khoản vay nhà (Mortgage):</span>
                <span className="font-['JetBrains_Mono'] text-red-400">-${selectedProf.mortgage}</span>
              </div>
              <div className="flex justify-between">
                <span>Vay xe & thẻ tín dụng:</span>
                <span className="font-['JetBrains_Mono'] text-red-400">
                  -${selectedProf.carLoan + selectedProf.creditCard}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Chi phí sinh hoạt khác:</span>
                <span className="font-['JetBrains_Mono'] text-red-400">
                  -${selectedProf.otherExpenses}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm">
              <span>Tổng Chi Phí:</span>
              <span className="font-['JetBrains_Mono'] text-red-300">
                ${totalExp.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card 3: Cashflow & Goal */}
          <div className="bg-[#24212C] text-white rounded-3xl p-6 border-2 border-[#F2BC4A]/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                DÒNG TIỀN VÒNG CHUỘT (MONTHLY CASHFLOW)
              </span>
              <div className="font-['JetBrains_Mono'] text-4xl font-extrabold text-[#F2BC4A]">
                +${initialCashflow.toLocaleString()}
              </div>
              <p className="text-xs text-slate-300">
                Mỗi khi đi qua ô <strong>Payday</strong>, bạn được nhận khoản tiền này vào quỹ tích lũy để đầu tư thương vụ mới.
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-xs">
              <div className="font-bold text-amber-300">Nhiệm vụ để thoát Rat Race:</div>
              <div className="text-[11px] text-slate-200 mt-0.5">
                Cần tích lũy tài sản sinh ra tối thiểu <strong>${totalExp.toLocaleString()}/tháng</strong>!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 04: OPPORTUNITY / DEAL REVEAL (SMALL DEAL VS BIG DEAL)
========================================================================= */
export const Slide04_OpportunityReveal: React.FC = () => {
  const sampleDeals: CardItem[] = [
    {
      id: 'deal-condo',
      category: 'Small Deal',
      title: 'Căn Hộ Chung Cư 2 Phòng Ngủ',
      cost: 45000,
      downPayment: 5000,
      cashflow: 250,
      roi: '60%',
      description: 'Chủ nhà chuyển định cư cần bán gấp dưới giá thị trường. Cho thuê kín phòng ngay.',
      ruleLesson: 'Tài sản tốt là tài sản có dòng tiền dương (Positive Cashflow) ngay từ ngày đầu tiên sở hữu.',
    },
    {
      id: 'deal-complex',
      category: 'Big Deal',
      title: 'Tòa Nhà Căn Hộ Dịch Vụ 8 Phòng',
      cost: 160000,
      downPayment: 32000,
      cashflow: 1800,
      roi: '67.5%',
      description: 'Khu dân cư đông đúc gần các trường đại học Cần Thơ. Doanh thu cho thuê ổn định quanh năm.',
      ruleLesson: 'Big Deal cần số vốn lớn hơn nhưng mang lại dòng tiền bứt phá để bạn nhảy thẳng sang Fast Track.',
    },
    {
      id: 'deal-stock',
      category: 'Small Deal',
      title: 'Cổ Phiếu Quỹ Tăng Trưởng MYT',
      cost: 1200,
      downPayment: 1200,
      cashflow: 0,
      roi: 'Chờ thị trường',
      description: 'Mua 100 cổ phiếu giá $12/cổ. Kỳ vọng bán lại khi thị trường đạt $30-$40.',
      ruleLesson: 'Lợi nhuận vốn (Capital Gains) mang tính đầu cơ, không tạo ra dòng tiền đều đặn như tài sản dòng tiền.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-8 sm:p-14 lg:p-16 bg-[#24212C] text-[#FAF6ED] overflow-y-auto">
      <div className="w-full max-w-5xl space-y-6 text-left my-auto">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            04. CƠ HỘI ĐẦU TƯ · OPPORTUNITY CARDS
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-white mt-1">
            MỞ THẺ SMALL DEAL & BIG DEAL: TÍNH TOÁN DÒNG TIỀN
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Chạm vào thẻ bài để lật mặt sau và đọc bài học tài chính thực chiến.
          </p>
        </div>

        {/* 3 Interactive Cards Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {sampleDeals.map((deal) => (
            <GameCard key={deal.id} card={deal} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 05: PAYDAY & CASHFLOW COUNTER
========================================================================= */
export const Slide05_PaydayCashflow: React.FC = () => {
  const [paydayCount, setPaydayCount] = useState<number>(1);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#24212C] via-[#38245D] to-[#1A1822] text-[#FAF6ED] gap-10">
      <div className="max-w-xl space-y-6 text-left">
        <div>
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            05. CỘT MỐC ĐỊNH KỲ · PAYDAY
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-6xl font-bold text-white mt-1">
            PAYDAY! NGÀY NHẬN DÒNG TIỀN VÀO TÚI
          </h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-['Be_Vietnam_Pro']">
          Trong thế giới thực, hầu hết mọi người chờ lương để trả nợ. Trong CASHFLOW, mỗi vòng quay qua ô Payday là cơ hội tích trữ đạn dược (tiền mặt) để săn lùng các cơ hội đầu tư sinh lời.
        </p>

        {/* Interactive Payday trigger */}
        <div className="bg-[#FAF6ED] text-slate-900 rounded-3xl p-5 border-4 border-[#F2BC4A] space-y-3 shadow-2xl">
          <div className="flex justify-between items-center text-xs font-bold">
            <span>LƯỢT PAYDAY #{paydayCount}</span>
            <span className="text-emerald-700">+$1,450 / LƯỢT</span>
          </div>

          <div className="flex items-center justify-between bg-[#EBE5F2] p-3 rounded-2xl">
            <span className="text-xs text-slate-700">Tổng tiền mặt nhận được:</span>
            <span className="font-['JetBrains_Mono'] text-2xl font-extrabold text-purple-900">
              ${(paydayCount * 1450).toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setPaydayCount((prev) => prev + 1)}
            className="w-full py-3 bg-[#F2BC4A] hover:bg-amber-400 text-slate-950 font-['Oswald'] font-bold text-sm rounded-xl transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>💰 QUA Ô PAYDAY TIẾP THEO (+ $1,450)</span>
          </button>
        </div>
      </div>

      {/* Right Column: Visual Infographic of Money Pipeline */}
      <div className="shrink-0 max-w-md w-full space-y-4">
        <div className="bg-[#FAF6ED]/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-left space-y-4 shadow-xl">
          <div className="font-['Oswald'] text-lg font-bold text-[#F2BC4A]">
            CÔNG THỨC DÒNG TIỀN PAYDAY:
          </div>

          <div className="space-y-3 font-['JetBrains_Mono'] text-xs">
            <div className="flex justify-between bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/40">
              <span>+ Tổng Thu Nhập (Lương + Thụ Động):</span>
              <span className="font-bold text-emerald-300">$4,550</span>
            </div>
            <div className="flex justify-between bg-red-500/20 p-2.5 rounded-xl border border-red-500/40">
              <span>- Tổng Chi Phí Sinh Hoạt & Tiêu Sản:</span>
              <span className="font-bold text-red-300">$3,100</span>
            </div>
            <div className="flex justify-between bg-amber-500/30 p-3 rounded-xl border-2 border-amber-400 font-bold text-sm text-[#F2BC4A]">
              <span>= Tiền Thực Nhận (Net Cashflow):</span>
              <span>+$1,450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 06: FINANCIAL STATEMENT DASHBOARD
========================================================================= */
export const Slide06_FinancialStatement: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 bg-[#24212C] text-[#FAF6ED] overflow-y-auto">
      <div className="w-full max-w-5xl space-y-4 text-left my-auto">
        <div>
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            06. VŨ KHÍ TỐI THƯỢNG · FINANCIAL STATEMENT
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-white mt-0.5">
            BÁO CÁO TÀI CHÍNH: LA BÀN CỦA NGƯỜI GIÀU
          </h2>
        </div>

        {/* Embedded Interactive Financial Widget */}
        <FinancialStatementWidget />
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 07: RISK & EXPENSE EVENT (DOODADS & MARKET)
========================================================================= */
export const Slide07_RiskEvent: React.FC = () => {
  const doodadSample: CardItem = {
    id: 'doodad-boat',
    category: 'Doodads',
    title: 'Mua Thuyền Cano Đi Chơi Cuối Tuần',
    cost: 4000,
    downPayment: 1000,
    cashflow: -150,
    description: 'Bạn vừa mua chiếc cano trả góp. Phải nộp $1,000 tiền mặt ngay và chi phí bảo dưỡng -$150/tháng.',
    ruleLesson: 'Tiêu sản (Liabilities) lấy tiền ra khỏi túi bạn đều đặn. Hãy để tài sản mua đồ chơi, đừng dùng tiền mồ hôi để trả nợ tiêu sản!',
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#24212C] via-[#38245D] to-[#3B1515] text-[#FAF6ED] gap-10">
      <div className="max-w-xl space-y-6 text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-full text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>CẢNH BÁO RỦI RO & BẪY TÀI CHÍNH</span>
          </div>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-white">
            DOODADS! NHỮNG KHOẢN CHI RÚT RUỘT DÒNG TIỀN
          </h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-['Be_Vietnam_Pro']">
          Trong game lẫn ngoài đời, bạn sẽ liên tục gặp các cám dỗ mua sắm: điện thoại mới, đổi xe, tiệc tùng xa xỉ. Người nghèo và trung lưu xem đó là phần thưởng; người giàu hiểu đó là bẫy giam giữ họ trong Vòng Chuột.
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-[#FAF6ED]/10 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <div className="font-bold text-amber-300 font-['Oswald']">Chi Phí Đột Xuất:</div>
            <div className="text-slate-300">Buộc người chơi phải duy trì quỹ dự phòng khẩn cấp.</div>
          </div>
          <div className="bg-[#FAF6ED]/10 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <div className="font-bold text-red-300 font-['Oswald']">Nợ Xấu Phát Sinh:</div>
            <div className="text-slate-300">Làm giảm dòng tiền Payday hàng tháng.</div>
          </div>
        </div>
      </div>

      {/* Right: Interactive Doodad Card */}
      <div className="shrink-0">
        <GameCard card={doodadSample} />
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 08: ESCAPE THE RAT RACE (LEVEL UP!)
========================================================================= */
export const Slide08_EscapeRatRace: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#38245D] via-[#23A778]/40 to-[#24212C] text-[#FAF6ED] text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[650px] h-[650px] bg-[#F2BC4A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl space-y-6 z-10 my-auto">
        <div className="inline-flex items-center gap-2 bg-[#F2BC4A] text-slate-950 font-['Oswald'] font-bold text-sm px-5 py-2 rounded-full shadow-lg">
          <Trophy className="w-4 h-4" />
          <span>LEVEL UP! · ĐIỀU KIỆN THOÁT VÒNG CHUỘT</span>
        </div>

        <h1 className="font-['Oswald'] text-5xl sm:text-7xl font-extrabold text-[#FAF6ED] tracking-tight leading-tight">
          THU NHẬP THỤ ĐỘNG &gt; TỔNG CHI PHÍ
        </h1>

        <div className="bg-[#FAF6ED] text-slate-950 rounded-3xl p-6 sm:p-8 border-4 border-[#F2BC4A] shadow-2xl max-w-xl mx-auto space-y-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-purple-900 font-['Oswald']">
            RAT RACE ESCAPE CONDITION
          </div>
          <div className="flex justify-around items-center border-y-2 border-slate-200 py-3 font-['JetBrains_Mono']">
            <div>
              <div className="text-xs text-slate-500 font-bold">THỤ ĐỘNG (ASSETS)</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">+$2,800</div>
            </div>
            <div className="text-3xl font-extrabold text-amber-500">&gt;</div>
            <div>
              <div className="text-xs text-slate-500 font-bold">TỔNG CHI PHÍ</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-red-600">$2,400</div>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-['Be_Vietnam_Pro'] leading-relaxed">
            Kể từ thời điểm này, bạn không cần phải làm việc để trả tiền sinh hoạt nữa. Bạn chính thức bước ra <strong>FAST TRACK</strong>, tung 2 xúc xắc và mua Ước mơ lớn của mình!
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 09: FINANCIAL DECISION (A VS B COMPARISON)
========================================================================= */
export const Slide09_FinancialDecision: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B'>('A');

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-8 sm:p-14 lg:p-16 bg-[#24212C] text-[#FAF6ED] overflow-y-auto">
      <div className="w-full max-w-5xl space-y-6 text-left my-auto">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            09. RA QUYẾT ĐỊNH TÀI CHÍNH · CASE STUDY
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-white mt-1">
            SO SÁNH 2 LỰA CHỌN: NHÀ PHỐ 2 PHÒNG VS CHUNG CƯ 8 CĂN
          </h2>
        </div>

        {/* 2 Comparative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Option A */}
          <div
            onClick={() => setSelectedChoice('A')}
            className={`bg-[#FAF6ED] text-slate-900 rounded-3xl p-6 border-4 transition-all cursor-pointer shadow-xl ${
              selectedChoice === 'A' ? 'border-[#23A778] scale-102 ring-4 ring-emerald-500/30' : 'border-slate-300 opacity-90'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-['Oswald'] text-xl font-bold text-[#38245D]">
                LỰA CHỌN A: NHÀ PHỐ (SMALL DEAL)
              </span>
              {selectedChoice === 'A' && (
                <span className="text-[10px] bg-emerald-600 text-white font-bold px-3 py-1 rounded-full">
                  ĐANG CHỌN
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs font-['Be_Vietnam_Pro']">
              <div className="flex justify-between">
                <span>Vốn tự có (Down Pay):</span>
                <span className="font-bold font-['JetBrains_Mono']">$3,000 (An toàn)</span>
              </div>
              <div className="flex justify-between">
                <span>Dòng tiền (Cashflow):</span>
                <span className="font-bold text-emerald-700 font-['JetBrains_Mono']">+$180/tháng</span>
              </div>
              <div className="flex justify-between">
                <span>Tỷ suất sinh lời ROI:</span>
                <span className="font-bold font-['JetBrains_Mono']">72% / năm</span>
              </div>
              <div className="flex justify-between">
                <span>Mức độ rủi ro:</span>
                <span className="font-bold text-emerald-800">Thấp (Dễ quản lý)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 border-t border-slate-200 pt-3 mt-4">
              Phù hợp khi bạn mới bắt đầu, vốn nhỏ, cần tạo thói quen kiểm soát tài sản dòng tiền đầu tiên.
            </p>
          </div>

          {/* Option B */}
          <div
            onClick={() => setSelectedChoice('B')}
            className={`bg-[#FAF6ED] text-slate-900 rounded-3xl p-6 border-4 transition-all cursor-pointer shadow-xl ${
              selectedChoice === 'B' ? 'border-[#F2BC4A] scale-102 ring-4 ring-amber-500/30' : 'border-slate-300 opacity-90'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-['Oswald'] text-xl font-bold text-[#38245D]">
                LỰA CHỌN B: CHUNG CƯ 8 CĂN (BIG DEAL)
              </span>
              {selectedChoice === 'B' && (
                <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full">
                  ĐANG CHỌN
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs font-['Be_Vietnam_Pro']">
              <div className="flex justify-between">
                <span>Vốn tự có (Down Pay):</span>
                <span className="font-bold font-['JetBrains_Mono']">$25,000 (Cần vay/gọi vốn)</span>
              </div>
              <div className="flex justify-between">
                <span>Dòng tiền (Cashflow):</span>
                <span className="font-bold text-emerald-700 font-['JetBrains_Mono']">+$1,600/tháng</span>
              </div>
              <div className="flex justify-between">
                <span>Tỷ suất sinh lời ROI:</span>
                <span className="font-bold font-['JetBrains_Mono']">76.8% / năm</span>
              </div>
              <div className="flex justify-between">
                <span>Mức độ rủi ro:</span>
                <span className="font-bold text-amber-800">Trung bình - Cao (Đòn bẩy lớn)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 border-t border-slate-200 pt-3 mt-4">
              Giúp bạn nhảy vọt thoát ngay khỏi Rat Race, nhưng nếu gặp rủi ro thị trường hoặc thất nghiệp sẽ chịu áp lực nợ lớn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 10: INTERACTIVE QUIZ
========================================================================= */
export const Slide10_InteractiveQuiz: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const correctOption = 2; // Option C: Tài sản tạo ra dòng tiền

  const options = [
    'A. Nhà để ở là tài sản lớn nhất của mọi gia đình',
    'B. Tiết kiệm tiền trong ngân hàng là cách an toàn nhất để làm giàu',
    'C. Tài sản là thứ bỏ tiền vào túi bạn, tiêu sản là thứ rút tiền khỏi túi bạn',
    'D. Điểm số cao ở trường đảm bảo 100% cho sự thành công tài chính',
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-8 sm:p-14 lg:p-16 bg-[#24212C] text-[#FAF6ED] overflow-y-auto">
      <div className="w-full max-w-4xl space-y-6 text-left my-auto">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            10. CÂU HỎI TƯ DUY · FINANCIAL QUIZ
          </span>
          <h2 className="font-['Oswald'] text-3xl sm:text-5xl font-bold text-white mt-1">
            ĐỊNH NGHĨA CHÍNH XÁC VỀ "TÀI SẢN" TRONG CASHFLOW LÀ GÌ?
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === correctOption;

            return (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all font-['Be_Vietnam_Pro'] text-sm sm:text-base flex items-center justify-between cursor-pointer ${
                  selectedOption === null
                    ? 'bg-[#FAF6ED]/10 border-white/20 hover:bg-white/20'
                    : isCorrect
                    ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                    : isSelected
                    ? 'bg-red-600/30 border-red-400 text-red-200'
                    : 'bg-[#FAF6ED]/5 border-white/10 opacity-50'
                }`}
              >
                <span>{opt}</span>
                {selectedOption !== null && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {selectedOption !== null && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback box */}
        {selectedOption !== null && (
          <div className="bg-[#FAF6ED] text-slate-900 p-4 rounded-2xl border-2 border-[#F2BC4A] text-xs font-['Be_Vietnam_Pro'] space-y-1">
            <div className="font-bold text-purple-900 font-['Oswald'] text-sm">
              {selectedOption === correctOption ? '🎉 CHÍNH XÁC! (+ $500 TOKEN)' : '💡 BÀI HỌC QUAN TRỌNG:'}
            </div>
            <p>
              Robert Kiyosaki nhấn mạnh: Nếu bạn mua một căn nhà và hàng tháng phải tự bỏ tiền túi ra trả lãi ngân hàng, điện nước, thuế thì căn nhà đó là <strong>Tiêu sản (Liability)</strong>. Chỉ khi căn nhà cho người khác thuê và sinh ra dòng tiền thặng dư vào tài khoản bạn, nó mới là <strong>Tài sản (Asset)</strong>!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 11: PLAYER LEADERBOARD (CLB CASHFLOW CẦN THƠ)
========================================================================= */
export const Slide11_Leaderboard: React.FC = () => {
  const players = [
    { rank: 1, name: 'Trần Minh Hoàng', prof: 'Kỹ Sư', passive: 2850, exp: 2100, status: 'Fast Track 🚀', statusColor: 'bg-emerald-500' },
    { rank: 2, name: 'Nguyễn Thị Thuỳ', prof: 'Giáo Viên', passive: 1950, exp: 1800, status: 'Fast Track 🚀', statusColor: 'bg-emerald-500' },
    { rank: 3, name: 'Lê Tấn Phát', prof: 'Bác Sĩ', passive: 3400, exp: 4100, status: 'Rat Race (83%)', statusColor: 'bg-amber-500' },
    { rank: 4, name: 'Đặng Quốc Bảo', prof: 'Luật Sư', passive: 1200, exp: 3200, status: 'Rat Race (37%)', statusColor: 'bg-purple-500' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-8 sm:p-14 lg:p-16 bg-[#24212C] text-[#FAF6ED] overflow-y-auto">
      <div className="w-full max-w-5xl space-y-6 text-left my-auto">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            11. BẢNG XẾP HẠNG · PLAYER LEADERBOARD
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-white mt-1">
            TIẾN ĐỘ THOÁT VÒNG CHUỘT · CLB CASHFLOW CẦN THƠ
          </h2>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-[#FAF6ED] text-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-[#38245D]/20 overflow-x-auto">
          <table className="w-full text-left text-xs font-['Be_Vietnam_Pro']">
            <thead>
              <tr className="border-b-2 border-slate-200 text-purple-950 font-['Oswald'] text-sm uppercase">
                <th className="py-2.5 px-3">Hạng</th>
                <th className="py-2.5 px-3">Người chơi</th>
                <th className="py-2.5 px-3">Nghề nghiệp</th>
                <th className="py-2.5 px-3">Thụ động</th>
                <th className="py-2.5 px-3">Chi phí</th>
                <th className="py-2.5 px-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {players.map((p) => (
                <tr key={p.rank} className="hover:bg-purple-50/60 transition-colors">
                  <td className="py-3 px-3 font-bold font-['Oswald'] text-base text-purple-900">
                    #{p.rank}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3 px-3 text-slate-600">{p.prof}</td>
                  <td className="py-3 px-3 font-bold font-['JetBrains_Mono'] text-emerald-700">
                    +${p.passive.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 font-['JetBrains_Mono'] text-slate-600">
                    ${p.exp.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-white text-[11px] font-bold px-3 py-1 rounded-full ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SLIDE 12: REFLECTION & NEXT ACTION (CLB CASHFLOW CẦN THƠ)
========================================================================= */
export const Slide12_ReflectionCTA: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#24212C] via-[#38245D] to-[#1A1822] text-[#FAF6ED] gap-10">
      <div className="max-w-xl space-y-6 text-left">
        <div>
          <span className="text-xs font-bold text-[#F2BC4A] uppercase tracking-wider font-['Oswald']">
            12. ĐÚC KẾT & HÀNH ĐỘNG · NEXT STEP
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-6xl font-bold text-white mt-1">
            BÀI HỌC VÀNG TỪ VÁN CỜ CASHFLOW
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm font-['Be_Vietnam_Pro'] text-slate-300">
          <div className="flex gap-2">
            <span className="text-[#F2BC4A] font-bold">1.</span>
            <span>Tiết kiệm chỉ đủ chống lạm phát; chỉ có <strong>Tài Sản Dòng Tiền</strong> mới giúp bạn tự do.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#F2BC4A] font-bold">2.</span>
            <span>Quản lý rủi ro bằng kiến thức, không phải bằng sự sợ hãi.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#F2BC4A] font-bold">3.</span>
            <span>Sai lầm trên bàn cờ chỉ tốn tiền giả, nhưng đem lại trí tuệ tài chính thật vô giá!</span>
          </div>
        </div>

        {/* Club Information */}
        <div className="bg-[#FAF6ED]/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs">
          <div className="font-bold text-[#F2BC4A] font-['Oswald']">CỘNG ĐỒNG CASHFLOW CẦN THƠ:</div>
          <div className="text-slate-300 mt-1">
            Sinh hoạt định kỳ cuối tuần: Chơi cờ thực chiến, thảo luận ca đầu tư thực tế và kết nối mạng lưới nhà đầu tư trẻ.
          </div>
        </div>
      </div>

      {/* Right Column: QR Code & Contact Card */}
      <div className="shrink-0 max-w-sm w-full bg-[#FAF6ED] text-slate-900 rounded-3xl p-6 border-4 border-[#F2BC4A] shadow-2xl text-center space-y-4">
        <div className="w-14 h-14 bg-purple-900 text-white rounded-2xl mx-auto flex items-center justify-center font-['Oswald'] text-2xl font-bold">
          $
        </div>

        <div>
          <h3 className="font-['Oswald'] text-2xl font-bold text-[#38245D]">
            THAM GIA BUỔI CHƠI KẾ TIẾP
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Quét mã QR hoặc đăng ký tham gia CLB CASHFLOW Cần Thơ
          </p>
        </div>

        {/* Stylized QR Code Placeholder */}
        <div className="w-44 h-44 bg-white border-2 border-slate-300 rounded-2xl mx-auto p-3 flex flex-col items-center justify-center shadow-inner">
          <QrCode className="w-28 h-28 text-slate-900" />
          <span className="text-[10px] text-slate-500 font-mono mt-1">CASHFLOW-CANTHO</span>
        </div>

        <div className="text-[11px] text-purple-900 font-bold">
          Hotline / Zalo: 090x.xxx.xxx · Cần Thơ City
        </div>
      </div>
    </div>
  );
};
