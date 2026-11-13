import React, { useState } from 'react';
import { X, Layers, Check, ArrowRight } from 'lucide-react';

interface ComponentLibraryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComponentLibraryDrawer: React.FC<ComponentLibraryDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'buttons' | 'inputs' | 'cards'>('all');
  const [testRadio, setTestRadio] = useState<string>('selected');
  const [testCheckbox, setTestCheckbox] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-xl sm:max-w-2xl bg-[#212121] text-white h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-l-4 border-black font-['Nunito',sans-serif]">
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">👋🏻</span>
              <div>
                <h2 className="font-['Baloo_2',cursive] font-extrabold text-xl text-white tracking-wide">
                  Thư Viện Thành Phần (Component Library)
                </h2>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Reference & Master Design System
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Guide Banner matching Figma */}
          <div className="bg-[#2A2A2A] rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
            <div className="font-['Baloo_2',cursive] font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Thành phần Master Component là gì?</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Đây là các thành phần chuẩn hóa gốc từ bản vẽ Figma template. Bất kỳ thành phần nào xuất hiện trong trang khảo sát (nút Next góc nhọn, nút Submit tròn, khung trả lời ngắn bo bất đối xứng, thẻ Radio & Checkbox 3 trạng thái) đều tuân theo đúng thông số hình học và quy cách tương tác này.
            </p>
          </div>

          {/* FILTER PILLS */}
          <div className="flex gap-2 text-xs font-bold font-['Baloo_2',cursive]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeTab === 'all' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-white/10 text-slate-300'
              }`}
            >
              Tất cả Component
            </button>
            <button
              onClick={() => setActiveTab('buttons')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeTab === 'buttons' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-white/10 text-slate-300'
              }`}
            >
              Nút bấm (Buttons)
            </button>
            <button
              onClick={() => setActiveTab('inputs')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeTab === 'inputs' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-white/10 text-slate-300'
              }`}
            >
              Ô nhập liệu (Inputs)
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeTab === 'cards' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-white/10 text-slate-300'
              }`}
            >
              Radio & Checkboxes
            </button>
          </div>

          {/* COMPONENTS SHOWCASE */}
          <div className="space-y-6 pt-2">
            {/* 1. NEXT PAGE BUTTON */}
            {(activeTab === 'all' || activeTab === 'buttons') && (
              <div className="bg-[#D9D9D9] text-slate-900 rounded-xl overflow-hidden border border-white/20">
                <div className="bg-[#FFAD00] text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider font-['Baloo_2',cursive]">
                  <span>1. Nút Next Page (Bo góc 25px 25px 0px 25px)</span>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Figma: Next page</span>
                </div>
                <div className="p-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="font-bold">Quy cách hình học:</div>
                    <div className="text-slate-600 font-mono text-[11px]">
                      width: 127px, height: 50px, radius: 25px 25px 0px 25px
                    </div>
                  </div>

                  {/* Rendered Component */}
                  <button
                    className="flex items-center gap-3 px-5 py-2.5 bg-white text-slate-950 shadow-md hover:bg-slate-50 transition-transform active:scale-95"
                    style={{ borderRadius: '25px 25px 0px 25px' }}
                  >
                    <span className="font-['Baloo_2',cursive] font-extrabold text-base">Next</span>
                    <span className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[11px] border-l-black" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. SUBMIT BUTTON */}
            {(activeTab === 'all' || activeTab === 'buttons') && (
              <div className="bg-[#D9D9D9] text-slate-900 rounded-xl overflow-hidden border border-white/20">
                <div className="bg-[#FFAD00] text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider font-['Baloo_2',cursive]">
                  <span>2. Nút Submit (Bo tròn 25px Charcoal #3D3A36)</span>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Figma: Submit button</span>
                </div>
                <div className="p-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="font-bold">Màu sắc & Phông chữ:</div>
                    <div className="text-slate-600 font-mono text-[11px]">
                      background: #3D3A36, border-radius: 25px, color: #FFFFFF
                    </div>
                  </div>

                  {/* Rendered Component */}
                  <button
                    className="px-7 py-3 bg-[#3D3A36] text-white rounded-[25px] shadow-lg hover:bg-black transition-transform active:scale-95 font-['Baloo_2',cursive] font-extrabold text-base tracking-wide"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* 3. SHORT ANSWER INPUT */}
            {(activeTab === 'all' || activeTab === 'inputs') && (
              <div className="bg-[#D9D9D9] text-slate-900 rounded-xl overflow-hidden border border-white/20">
                <div className="bg-[#FFAD00] text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider font-['Baloo_2',cursive]">
                  <span>3. Khung Short Answer (Bo góc 42.92px 42.92px 0px 42.92px)</span>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Figma: Short answer</span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="font-['Baloo_2',cursive] font-extrabold text-base text-slate-900">
                    Type a question
                  </div>
                  <div
                    className="bg-white border border-[#E0E0E0] px-6 py-4 shadow-sm flex items-center"
                    style={{ borderRadius: '42.92px 42.92px 0px 42.92px' }}
                  >
                    <input
                      type="text"
                      placeholder="Type here..."
                      className="w-full bg-transparent border-none outline-none italic text-slate-700 font-['Nunito',sans-serif]"
                    />
                  </div>
                  <div className="text-[11px] text-[#FA1C1C] font-semibold pl-2">
                    Type an error message (Hiển thị khi bỏ trống)
                  </div>
                </div>
              </div>
            )}

            {/* 4. PARAGRAPH TEXTAREA */}
            {(activeTab === 'all' || activeTab === 'inputs') && (
              <div className="bg-[#D9D9D9] text-slate-900 rounded-xl overflow-hidden border border-white/20">
                <div className="bg-[#FFAD00] text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider font-['Baloo_2',cursive]">
                  <span>4. Khung Paragraph (Bo góc 45.8px 45.8px 45.8px 0px)</span>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Figma: Paragraph</span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="font-['Baloo_2',cursive] font-extrabold text-base text-slate-900">
                    Type a question
                  </div>
                  <div
                    className="bg-white border border-[#E0E0E0] p-5 shadow-sm"
                    style={{ borderRadius: '45.8px 45.8px 45.8px 0px' }}
                  >
                    <textarea
                      rows={3}
                      placeholder="Type here..."
                      className="w-full bg-transparent border-none outline-none italic text-slate-700 font-['Nunito',sans-serif] resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. CHECKBOX BUTTONS - 3 VARIANTS */}
            {(activeTab === 'all' || activeTab === 'cards') && (
              <div className="bg-[#D9D9D9] text-slate-900 rounded-xl overflow-hidden border border-white/20">
                <div className="bg-[#FFAD00] text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider font-['Baloo_2',cursive]">
                  <span>5. Checkbox Buttons (3 Trạng thái: Default, Hover, Selected)</span>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Figma: Variants</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {/* Default */}
                    <div className="bg-white/80 p-3 rounded-2xl flex flex-col items-center gap-2 border border-slate-300">
                      <span className="text-[10px] uppercase font-bold text-slate-500">1. Default</span>
                      <div className="w-3.5 h-3.5 rounded-sm border border-black bg-white flex items-center justify-center" />
                      <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">
                        🏠
                      </div>
                      <span className="text-xs font-bold">Option 1</span>
                    </div>

                    {/* Hover */}
                    <div className="bg-white/80 p-3 rounded-2xl flex flex-col items-center gap-2 border border-amber-300 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-amber-600">2. Hover</span>
                      <div className="w-3.5 h-3.5 rounded-sm border border-black bg-[#FFE05C]/30 flex items-center justify-center" />
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-xl scale-105 transition-transform">
                        📈
                      </div>
                      <span className="text-xs font-bold">Option 2</span>
                    </div>

                    {/* Selected */}
                    <div className="bg-white p-3 rounded-2xl flex flex-col items-center gap-2 border-2 border-amber-400 shadow-md">
                      <span className="text-[10px] uppercase font-bold text-amber-700">3. Selected</span>
                      <div className="w-3.5 h-3.5 rounded-sm border border-black bg-[#FFE05C] flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                      </div>
                      <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-xl">
                        💼
                      </div>
                      <span className="text-xs font-bold">Option 3</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. RADIO BUTTONS - 3 VARIANTS */}
            {(activeTab === 'all' || activeTab === 'cards') && (
              <div className="bg-[#D9D9D9] text-slate-900 rounded-xl overflow-hidden border border-white/20">
                <div className="bg-[#FFAD00] text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider font-['Baloo_2',cursive]">
                  <span>6. Radio Cards (Default, Hover, Selected #0091EA)</span>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">Figma: Radio Buttons</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Default */}
                    <div className="bg-white p-4 rounded-[25px] shadow-sm flex flex-col items-center text-center relative border border-slate-200">
                      <div className="w-7 h-7 rounded-full border-[2.5px] border-black bg-white flex items-center justify-center -mt-7 mb-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-transparent" />
                      </div>
                      <span className="text-[9px] uppercase font-bold text-[#332FFF]">PLAN</span>
                      <span className="font-['Baloo_2',cursive] font-extrabold text-lg text-slate-900 my-1">
                        Basic
                      </span>
                      <span className="font-['Baloo_2',cursive] font-extrabold text-xl text-slate-900 mt-2">
                        $9,99
                      </span>
                    </div>

                    {/* Hover */}
                    <div className="bg-white p-4 rounded-[25px] shadow-md flex flex-col items-center text-center relative border-2 border-blue-200">
                      <div className="w-7 h-7 rounded-full border-[2.5px] border-black bg-white flex items-center justify-center -mt-7 mb-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#0091EA]/30" />
                      </div>
                      <span className="text-[9px] uppercase font-bold text-[#332FFF]">POPULAR</span>
                      <span className="font-['Baloo_2',cursive] font-extrabold text-lg text-slate-900 my-1">
                        Standard
                      </span>
                      <span className="font-['Baloo_2',cursive] font-extrabold text-xl text-slate-900 mt-2">
                        $29,99
                      </span>
                    </div>

                    {/* Selected */}
                    <div className="bg-white p-4 rounded-[25px] shadow-xl flex flex-col items-center text-center relative border-2 border-black scale-102">
                      <div className="w-7 h-7 rounded-full border-[2.5px] border-black bg-white flex items-center justify-center -mt-7 mb-2 shadow-sm">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#0091EA]" />
                      </div>
                      <span className="text-[9px] uppercase font-bold text-[#332FFF]">PRO</span>
                      <span className="font-['Baloo_2',cursive] font-extrabold text-lg text-slate-900 my-1">
                        Premium
                      </span>
                      <span className="font-['Baloo_2',cursive] font-extrabold text-xl text-slate-900 mt-2">
                        $59,99
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Component Library Sync: Active</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-full font-['Baloo_2',cursive] hover:bg-amber-300 transition-colors"
          >
            Đóng bảng tham khảo
          </button>
        </div>
      </div>
    </div>
  );
};
