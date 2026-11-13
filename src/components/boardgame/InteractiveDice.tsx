import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface InteractiveDiceProps {
  onRoll?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InteractiveDice: React.FC<InteractiveDiceProps> = ({
  onRoll,
  size = 'md',
  className = '',
}) => {
  const [currentValue, setCurrentValue] = useState<number>(4);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState<number>(0);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    let rolls = 0;
    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls > 8) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setCurrentValue(finalValue);
        setIsRolling(false);
        setRollCount((prev) => prev + 1);
        onRoll?.(finalValue);
      }
    }, 60);
  };

  const renderDots = (value: number) => {
    switch (value) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-red-600 rounded-full shadow-inner" />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex justify-between p-2">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full self-end" />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex justify-between p-2">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full self-center" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full self-end" />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full grid grid-cols-2 p-2 place-content-between place-items-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full grid grid-cols-3 p-1.5 place-content-between place-items-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div />
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
            <div />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
          </div>
        );
      case 6:
        return (
          <div className="w-full h-full grid grid-cols-2 p-2 place-content-between place-items-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
          </div>
        );
      default:
        return null;
    }
  };

  const dimensionClass =
    size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-18 h-18' : 'w-14 h-14';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={rollDice}
        disabled={isRolling}
        title="Nhấp để tung xúc xắc CASHFLOW"
        className={`relative ${dimensionClass} bg-[#FAF6ED] rounded-2xl shadow-xl border-2 border-slate-300 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 ${
          isRolling ? 'rotate-180 scale-95 shadow-inner' : 'hover:shadow-amber-400/40'
        }`}
      >
        {renderDots(currentValue)}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-900">
          🎲
        </div>
      </button>

      <div className="text-left">
        <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
          XÚC XẮC LƯỢT CHƠI
        </div>
        <div className="font-['Oswald'] text-sm text-white flex items-center gap-1.5">
          <span>Kết quả: <strong className="text-amber-300 font-['JetBrains_Mono'] text-base">{currentValue}</strong> bước</span>
          {rollCount > 0 && <span className="text-[10px] text-slate-400 font-mono">(Lượt #{rollCount})</span>}
        </div>
      </div>
    </div>
  );
};
