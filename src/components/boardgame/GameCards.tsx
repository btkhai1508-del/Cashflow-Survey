import React, { useState } from 'react';
import { CardItem } from '../../types/cashflowSlide';
import { Sparkles, TrendingUp, AlertTriangle, Briefcase, RotateCw } from 'lucide-react';

interface GameCardProps {
  card: CardItem;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({ card, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const getCategoryColor = (category: CardItem['category']) => {
    switch (category) {
      case 'Small Deal':
        return { bg: '#23A778', text: '#FFFFFF', tag: 'SMALL DEAL · CƠ HỘI NHỎ' };
      case 'Big Deal':
        return { bg: '#F2BC4A', text: '#24212C', tag: 'BIG DEAL · CƠ HỘI LỚN' };
      case 'Market':
        return { bg: '#4B91E2', text: '#FFFFFF', tag: 'THE MARKET · THỊ TRƯỜNG' };
      case 'Doodads':
        return { bg: '#E65C5C', text: '#FFFFFF', tag: 'DOODADS · BẪY TIÊU SẢN' };
      case 'Profession':
        return { bg: '#38245D', text: '#FFFFFF', tag: 'PROFESSION · NGHỀ NGHIỆP' };
    }
  };

  const styleConfig = getCategoryColor(card.category);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className={`relative w-72 sm:w-80 h-[380px] rounded-3xl cursor-pointer perspective-1000 select-none group transition-transform hover:-translate-y-1 ${className}`}
      title="Nhấp để lật mặt thẻ bài"
    >
      <div
        className={`w-full h-full rounded-3xl transition-transform duration-500 transform-style-3d shadow-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full bg-[#FAF6ED] text-[#24212C] rounded-3xl border-4 border-[#38245D]/20 backface-hidden p-5 flex flex-col justify-between overflow-hidden shadow-xl">
          {/* Top Banner */}
          <div
            style={{ backgroundColor: styleConfig.bg, color: styleConfig.text }}
            className="px-3.5 py-1.5 rounded-xl font-['Oswald'] text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xs"
          >
            <span>{styleConfig.tag}</span>
            <RotateCw className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {/* Title & Description */}
          <div className="space-y-2 text-left my-auto">
            <h3 className="font-['Oswald'] text-2xl font-bold text-[#24212C] leading-snug">
              {card.title}
            </h3>
            <p className="font-['Be_Vietnam_Pro'] text-xs text-[#24212C]/80 leading-relaxed">
              {card.description}
            </p>
          </div>

          {/* Financial Numbers Matrix */}
          <div className="bg-[#EBE5F2] rounded-2xl p-3 space-y-1.5 border border-[#38245D]/10 text-xs font-['Be_Vietnam_Pro']">
            <div className="flex justify-between text-slate-700">
              <span>Giá mua (Cost):</span>
              <span className="font-bold font-['JetBrains_Mono']">${card.cost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Vốn trả trước (Down Pay):</span>
              <span className="font-bold font-['JetBrains_Mono']">${card.downPayment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-800 font-bold border-t border-[#38245D]/15 pt-1">
              <span>Dòng tiền (Cashflow):</span>
              <span className="font-['JetBrains_Mono'] text-sm">
                {card.cashflow >= 0 ? `+$${card.cashflow.toLocaleString()}` : `-$${Math.abs(card.cashflow).toLocaleString()}`}/tháng
              </span>
            </div>
            {card.roi && (
              <div className="flex justify-between text-purple-900 font-bold text-[11px]">
                <span>Tỷ suất sinh lời (ROI):</span>
                <span className="font-['JetBrains_Mono']">{card.roi}</span>
              </div>
            )}
          </div>

          {/* Flip Hint */}
          <div className="text-[10px] text-center text-slate-500 italic flex items-center justify-center gap-1">
            <span>Chạm để xem bài học tài chính</span>
            <RotateCw className="w-3 h-3" />
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 w-full h-full bg-[#38245D] text-[#FAF6ED] rounded-3xl border-4 border-[#F2BC4A] rotate-y-180 backface-hidden p-6 flex flex-col justify-between shadow-2xl">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#F2BC4A] text-slate-950 mx-auto flex items-center justify-center font-['Oswald'] text-2xl font-bold shadow-md">
              $
            </div>
            <div className="text-xs uppercase font-bold text-[#F2BC4A] tracking-widest pt-2">
              BÀI HỌC CASHFLOW 101
            </div>
            <h4 className="font-['Oswald'] text-lg font-bold text-white">
              {card.title}
            </h4>
          </div>

          <div className="bg-[#24212C] rounded-2xl p-4 border border-white/10 text-xs text-slate-300 leading-relaxed font-['Be_Vietnam_Pro'] space-y-2">
            <p>
              {card.ruleLesson ||
                'Người giàu không làm việc vì tiền. Họ bắt tiền bạc và tài sản phải làm việc cật lực để tạo ra dòng tiền thụ động thay thế sức lao động.'}
            </p>
          </div>

          <div className="text-center text-[11px] text-amber-300 font-bold">
            Chạm lần nữa để quay lại mặt trước ↺
          </div>
        </div>
      </div>
    </div>
  );
};
