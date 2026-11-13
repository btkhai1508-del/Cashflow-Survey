import React, { useState } from 'react';
import { Sparkles, Trophy, Zap } from 'lucide-react';

interface GameBoardSvgProps {
  className?: string;
  highlightTrack?: 'all' | 'ratRace' | 'fastTrack';
  interactive?: boolean;
}

export const GameBoardSvg: React.FC<GameBoardSvgProps> = ({
  className = '',
  highlightTrack = 'all',
  interactive = true,
}) => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);

  const spaces = [
    { id: 'payday', name: 'Ô PAYDAY (Ngày Lương)', color: '#F2BC4A', desc: 'Nhận Dòng tiền hàng tháng (Monthly Cashflow = Tổng thu nhập - Tổng chi phí).' },
    { id: 'opportunity', name: 'Ô OPPORTUNITY (Cơ Hội)', color: '#23A778', desc: 'Bốc thẻ Small Deal (Dưới $5,000) hoặc Big Deal (Từ $6,000 trở lên) để mua tài sản sinh lời.' },
    { id: 'market', name: 'Ô THE MARKET (Thị Trường)', color: '#4B91E2', desc: 'Thị trường biến động: Có người trả giá cao mua lại nhà đất của bạn hoặc cổ phiếu biến động.' },
    { id: 'doodad', name: 'Ô DOODADS (Bẫy Tiêu Sản)', color: '#E65C5C', desc: 'Khoản chi tiêu bất ngờ rút tiền khỏi túi bạn: Mua sắm, tiệc tùng, hỏng xe, đồ chơi đắt tiền.' },
    { id: 'charity', name: 'Ô CHARITY (Làm Từ Thiện)', color: '#9B77C1', desc: 'Quyên góp 10% tổng thu nhập để được tung 2 hoặc 3 xúc xắc trong 3 lượt tiếp theo.' },
    { id: 'downsized', name: 'Ô DOWNSIZED (Mất Việc)', color: '#38245D', desc: 'Tạm dừng 2 lượt chơi và phải nộp toàn bộ chi phí sinh hoạt cho ngân hàng.' },
  ];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* SVG Board Rendering */}
      <svg
        viewBox="0 0 600 600"
        className="w-full max-w-[500px] h-auto drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="boardGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38245D" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#24212C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1A1822" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2BC4A" />
            <stop offset="100%" stopColor="#D99B26" />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#23A778" />
            <stop offset="100%" stopColor="#15805D" />
          </linearGradient>
        </defs>

        {/* Board base background */}
        <circle cx="300" cy="300" r="290" fill="url(#boardGlow)" stroke="#F2BC4A" strokeWidth="3" />

        {/* ========================================================
            1. OUTER TRACK: FAST TRACK (ĐƯỜNG ĐUA NHANH)
        ======================================================== */}
        <g opacity={highlightTrack === 'ratRace' ? 0.35 : 1}>
          {/* Outer Track Ring */}
          <circle
            cx="300"
            cy="300"
            r="260"
            stroke="#23A778"
            strokeWidth="32"
            strokeDasharray="16 3"
            className="transition-opacity"
          />
          <circle cx="300" cy="300" r="276" stroke="#FAF6ED" strokeWidth="2" opacity="0.6" />
          <circle cx="300" cy="300" r="244" stroke="#FAF6ED" strokeWidth="2" opacity="0.6" />

          {/* Fast Track Title Label */}
          <text
            x="300"
            y="48"
            fill="#F2BC4A"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="2"
            textAnchor="middle"
            fontFamily="Oswald"
          >
            ★ FAST TRACK · ĐƯỜNG ĐUA NHANH TỰ DO TÀI CHÍNH ★
          </text>

          {/* Dream Milestone Marker */}
          <g transform="translate(480, 280)">
            <circle cx="20" cy="20" r="20" fill="#F2BC4A" stroke="#FAF6ED" strokeWidth="2.5" />
            <text x="20" y="25" textAnchor="middle" fontSize="16">🧀</text>
          </g>
        </g>

        {/* Transition Bridge Arrow from Rat Race to Fast Track */}
        <path
          d="M 300 170 L 300 90"
          stroke="#F2BC4A"
          strokeWidth="4"
          strokeDasharray="6 4"
          markerEnd="url(#arrow)"
        />
        <text
          x="308"
          y="130"
          fill="#FAF6ED"
          fontSize="9"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
        >
          THOÁT RAT RACE →
        </text>

        {/* ========================================================
            2. INNER TRACK: RAT RACE (VÒNG CHUỘT)
        ======================================================== */}
        <g opacity={highlightTrack === 'fastTrack' ? 0.35 : 1}>
          {/* Rat Race Ring */}
          <circle
            cx="300"
            cy="300"
            r="150"
            fill="#38245D"
            stroke="#F2BC4A"
            strokeWidth="36"
            className="transition-opacity"
          />
          <circle cx="300" cy="300" r="168" stroke="#24212C" strokeWidth="2" />
          <circle cx="300" cy="300" r="132" stroke="#24212C" strokeWidth="2" />

          {/* Representative spaces on circle */}
          {/* Top: Payday */}
          <circle
            cx="300"
            cy="150"
            r="14"
            fill="#F2BC4A"
            stroke="#24212C"
            strokeWidth="2"
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={() => setSelectedSpace('payday')}
          />
          <text x="300" y="154" fill="#24212C" fontSize="10" fontWeight="bold" textAnchor="middle">
            $
          </text>

          {/* Right: Opportunity (Small/Big Deal) */}
          <circle
            cx="450"
            cy="300"
            r="14"
            fill="#23A778"
            stroke="#FAF6ED"
            strokeWidth="2"
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={() => setSelectedSpace('opportunity')}
          />
          <text x="450" y="304" fill="#FAF6ED" fontSize="10" fontWeight="bold" textAnchor="middle">
            DEAL
          </text>

          {/* Bottom: The Market */}
          <circle
            cx="300"
            cy="450"
            r="14"
            fill="#4B91E2"
            stroke="#FAF6ED"
            strokeWidth="2"
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={() => setSelectedSpace('market')}
          />
          <text x="300" y="454" fill="#FAF6ED" fontSize="10" fontWeight="bold" textAnchor="middle">
            MKT
          </text>

          {/* Left: Doodads */}
          <circle
            cx="150"
            cy="300"
            r="14"
            fill="#E65C5C"
            stroke="#FAF6ED"
            strokeWidth="2"
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={() => setSelectedSpace('doodad')}
          />
          <text x="150" y="304" fill="#FAF6ED" fontSize="10" fontWeight="bold" textAnchor="middle">
            DOOD
          </text>

          {/* Top Right: Charity */}
          <circle
            cx="406"
            cy="194"
            r="12"
            fill="#9B77C1"
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={() => setSelectedSpace('charity')}
          />
          {/* Bottom Left: Downsized */}
          <circle
            cx="194"
            cy="406"
            r="12"
            fill="#24212C"
            stroke="#E65C5C"
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={() => setSelectedSpace('downsized')}
          />

          {/* Center Hub: Rat Mascot Icon */}
          <circle cx="300" cy="300" r="85" fill="#24212C" stroke="#F2BC4A" strokeWidth="3" />
          <g transform="translate(265, 255) scale(0.35)">
            <rect x="25" y="25" width="160" height="160" rx="24" fill="#F2BC4A" stroke="#FFFFFF" strokeWidth="6" />
            <ellipse cx="80" cy="85" rx="16" ry="20" fill="#FFFFFF" />
            <ellipse cx="85" cy="88" rx="4.5" ry="5.5" fill="#3D3A36" />
            <ellipse cx="120" cy="85" rx="16" ry="20" fill="#FFFFFF" />
            <ellipse cx="125" cy="88" rx="4.5" ry="5.5" fill="#3D3A36" />
            <path d="M70 125 C90 155, 130 150, 145 120" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
          <text
            x="300"
            y="350"
            fill="#FAF6ED"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="1"
            textAnchor="middle"
            fontFamily="Oswald"
          >
            RAT RACE · VÒNG CHUỘT
          </text>
        </g>
      </svg>

      {/* Interactive Tooltip Description */}
      {interactive && (
        <div className="mt-4 w-full max-w-md bg-[#24212C] border border-amber-400/30 rounded-2xl p-3 text-xs shadow-lg">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-['Oswald'] font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {selectedSpace
                ? spaces.find((s) => s.id === selectedSpace)?.name
                : 'Bàn cờ CASHFLOW: Nhấp vào ô bất kỳ để xem luật'}
            </span>
            {selectedSpace && (
              <button
                onClick={() => setSelectedSpace(null)}
                className="text-[10px] text-slate-400 hover:text-white"
              >
                ✕ Đóng
              </button>
            )}
          </div>
          <p className="text-slate-300 font-['Nunito',sans-serif]">
            {selectedSpace
              ? spaces.find((s) => s.id === selectedSpace)?.desc
              : 'Hai vòng chơi mô phỏng 2 tầng tài chính: Vòng trong Rat Race (Lương - Chi tiêu) và Vòng ngoài Fast Track (Đầu tư - Tự do tài chính).'}
          </p>
        </div>
      )}
    </div>
  );
};
