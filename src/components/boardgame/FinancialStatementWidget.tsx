import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Sparkles, Trophy, Zap, Plus, RefreshCw } from 'lucide-react';

interface FinancialStatementWidgetProps {
  initialSalary?: number;
  initialPassiveIncome?: number;
  initialTotalExpenses?: number;
  professionTitle?: string;
}

export const FinancialStatementWidget: React.FC<FinancialStatementWidgetProps> = ({
  initialSalary = 3300,
  initialPassiveIncome = 650,
  initialTotalExpenses = 2100,
  professionTitle = 'Kỹ Sư Phần Mềm (Engineer)',
}) => {
  const [salary] = useState<number>(initialSalary);
  const [passiveIncome, setPassiveIncome] = useState<number>(initialPassiveIncome);
  const [totalExpenses, setTotalExpenses] = useState<number>(initialTotalExpenses);

  const totalIncome = salary + passiveIncome;
  const monthlyCashflow = totalIncome - totalExpenses;
  const isEscaped = passiveIncome >= totalExpenses;
  const escapePercent = Math.min(100, Math.round((passiveIncome / totalExpenses) * 100));

  const addDeal = (addedCashflow: number) => {
    setPassiveIncome((prev) => prev + addedCashflow);
  };

  const addDoodad = (addedExpense: number) => {
    setTotalExpenses((prev) => prev + addedExpense);
  };

  const resetLedger = () => {
    setPassiveIncome(initialPassiveIncome);
    setTotalExpenses(initialTotalExpenses);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#FAF6ED] text-[#24212C] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#38245D]/20 font-['Be_Vietnam_Pro'] space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-[#38245D]/20 gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-purple-900 tracking-wider bg-purple-100 px-3 py-1 rounded-full">
            CASHFLOW 101 · FINANCIAL STATEMENT
          </span>
          <h3 className="font-['Oswald'] text-2xl font-bold text-[#24212C] mt-1">
            Báo Cáo Thu Nhập & Bảng Cân Đối Tài Chính
          </h3>
          <p className="text-xs text-slate-600">
            Nghề nghiệp: <strong className="text-purple-900">{professionTitle}</strong>
          </p>
        </div>

        {/* Quick simulator buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => addDeal(350)}
            className="flex items-center gap-1 bg-[#23A778] hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-xl font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
            title="Thêm căn hộ cho thuê +$350"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+Mua Tài Sản ($350)</span>
          </button>
          <button
            onClick={() => addDoodad(150)}
            className="flex items-center gap-1 bg-[#E65C5C] hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-xl font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
            title="Tăng chi tiêu tiêu sản +$150"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+Doodad ($150)</span>
          </button>
          <button
            onClick={resetLedger}
            className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-700 transition-colors"
            title="Đặt lại ban đầu"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2 COLUMNS: INCOME STATEMENT VS EXPENSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: INCOME */}
        <div className="bg-[#EBE5F2] rounded-2xl p-5 border border-purple-200/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-purple-950 uppercase tracking-wide border-b border-purple-300/60 pb-2">
            <span className="flex items-center gap-1.5">
              <ArrowUpRight className="w-4 h-4 text-emerald-700" />
              1. CỘT THU NHẬP (INCOME)
            </span>
            <span className="font-['JetBrains_Mono'] text-sm text-emerald-800 font-extrabold">
              ${totalIncome.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Lương hàng tháng (Earned Salary):</span>
              <span className="font-bold font-['JetBrains_Mono']">${salary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-800 font-bold bg-white/70 p-2 rounded-xl border border-emerald-200">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Thu nhập thụ động (Passive Income):
              </span>
              <span className="font-['JetBrains_Mono'] text-sm">+${passiveIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column: EXPENSES */}
        <div className="bg-[#FAF0F0] rounded-2xl p-5 border border-red-200/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-red-950 uppercase tracking-wide border-b border-red-300/60 pb-2">
            <span className="flex items-center gap-1.5">
              <ArrowDownRight className="w-4 h-4 text-red-700" />
              2. CỘT CHI PHÍ (TOTAL EXPENSES)
            </span>
            <span className="font-['JetBrains_Mono'] text-sm text-red-800 font-extrabold">
              ${totalExpenses.toLocaleString()}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Thuế & Bảo hiểm (Taxes):</span>
              <span className="font-['JetBrains_Mono']">$580</span>
            </div>
            <div className="flex justify-between">
              <span>Khoản vay mua nhà (Mortgage):</span>
              <span className="font-['JetBrains_Mono']">$600</span>
            </div>
            <div className="flex justify-between">
              <span>Vay xe & Tiêu dùng (Auto / Cards):</span>
              <span className="font-['JetBrains_Mono']">$320</span>
            </div>
            <div className="flex justify-between text-red-900 font-bold pt-1 border-t border-red-200">
              <span>Chi phí sinh hoạt khác:</span>
              <span className="font-['JetBrains_Mono']">${(totalExpenses - 1500).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RAT RACE ESCAPE CONDITION BANNER */}
      <div
        className={`rounded-2xl p-4 sm:p-5 border-2 transition-all shadow-md ${
          isEscaped
            ? 'bg-gradient-to-r from-emerald-600 to-amber-500 text-white border-amber-300 animate-pulse'
            : 'bg-[#24212C] text-white border-amber-400/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              ĐIỀU KIỆN THOÁT VÒNG CHUỘT (RAT RACE ESCAPE CONDITION)
            </div>
            <div className="font-['Oswald'] text-lg sm:text-xl font-bold mt-0.5">
              {isEscaped
                ? '🎉 CHÚC MỪNG! THU NHẬP THỤ ĐỘNG ĐÃ VƯỢT TỔNG CHI PHÍ!'
                : 'Mục tiêu: Thu Nhập Thụ Động (Passive Income) > Tổng Chi Phí (Total Expenses)'}
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-['JetBrains_Mono'] text-2xl font-extrabold text-amber-300">
              {escapePercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/30">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isEscaped ? 'bg-amber-300' : 'bg-gradient-to-r from-amber-400 to-emerald-400'
            }`}
            style={{ width: `${escapePercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] mt-2 opacity-90">
          <span>Thu nhập thụ động: ${passiveIncome.toLocaleString()}</span>
          <span>Cần đạt: ${totalExpenses.toLocaleString()}</span>
        </div>
      </div>

      {/* MONTHLY CASHFLOW PAYDAY SUMMARY */}
      <div className="bg-[#38245D] text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
            DÒNG TIỀN RÒNG HÀNG THÁNG (MONTHLY CASHFLOW)
          </div>
          <div className="text-xs text-purple-200">
            Số tiền người chơi được lĩnh vào tay ở mỗi ô Payday trên bàn cờ
          </div>
        </div>

        <div className="font-['JetBrains_Mono'] text-2xl sm:text-3xl font-extrabold text-amber-400 bg-black/30 px-5 py-2 rounded-xl border border-amber-400/30">
          +${monthlyCashflow.toLocaleString()}/tháng
        </div>
      </div>
    </div>
  );
};
