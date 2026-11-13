import React, { useState } from 'react';
import { SurveyProject, SurveyElement, SurveySection, DeviceViewport } from '../../types/survey';
import { SurveyRenderer } from '../preview/SurveyRenderer';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Eye,
  Check,
  Plus,
  Type,
  Palette,
  Layers,
  MoreVertical,
  X,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Smartphone,
  Monitor,
  Sparkles,
  RotateCcw,
  Sliders,
} from 'lucide-react';

interface MobileEditorProps {
  project: SurveyProject;
  onChangeProject: (updated: SurveyProject) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onBackToDesktop?: () => void;
  viewport: DeviceViewport;
  onChangeViewport: (vp: DeviceViewport) => void;
  onSwitchToRespondentPreview: () => void;
}

type MobileTab = 'none' | 'edit' | 'style' | 'layers' | 'add' | 'more';

export const MobileEditor: React.FC<MobileEditorProps> = ({
  project,
  onChangeProject,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  onBackToDesktop,
  viewport,
  onChangeViewport,
  onSwitchToRespondentPreview,
}) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>('q1-header');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>('section-q1');
  const [activeTab, setActiveTab] = useState<MobileTab>('edit');
  const [isSheetExpanded, setIsSheetExpanded] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isRenamingTitle, setIsRenamingTitle] = useState<boolean>(false);

  // Find currently selected element and section
  let selectedElement: SurveyElement | undefined;
  let currentSection: SurveySection | undefined;

  for (const sec of project.sections) {
    const el = sec.elements.find((e) => e.id === selectedElementId);
    if (el) {
      selectedElement = el;
      currentSection = sec;
      break;
    }
  }

  if (!currentSection && selectedSectionId) {
    currentSection = project.sections.find((s) => s.id === selectedSectionId);
  }

  const handleSelectElement = (elId: string) => {
    setSelectedElementId(elId);
    // Find parent section
    const sec = project.sections.find((s) => s.elements.some((e) => e.id === elId));
    if (sec) setSelectedSectionId(sec.id);
    setActiveTab('edit');
  };

  const handleSelectSection = (secId: string) => {
    setSelectedSectionId(secId);
    setActiveTab('style');
  };

  const handleSaveWithFeedback = () => {
    onSave();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Helper to mutate selected element
  const updateElement = (updates: Partial<SurveyElement>) => {
    if (!selectedElementId) return;

    const newSections = project.sections.map((sec) => ({
      ...sec,
      elements: sec.elements.map((el) => {
        if (el.id === selectedElementId) {
          return { ...el, ...updates };
        }
        return el;
      }),
    }));

    onChangeProject({
      ...project,
      sections: newSections,
      lastModified: Date.now(),
    });
  };

  // Helper to mutate selected section
  const updateSection = (secId: string, updates: Partial<SurveySection>) => {
    const newSections = project.sections.map((sec) => {
      if (sec.id === secId) {
        return { ...sec, ...updates };
      }
      return sec;
    });

    onChangeProject({
      ...project,
      sections: newSections,
      lastModified: Date.now(),
    });
  };

  // Pre-configured Cashflow colors for mobile swatch picker
  const cashflowColors = [
    { name: 'Rat Race Purple', hex: '#5A1876' },
    { name: 'Pink Bubble', hex: '#F5ABCE' },
    { name: 'Cashflow Gold', hex: '#FFD833' },
    { name: 'Fast Track Azure', hex: '#0091EA' },
    { name: 'Money Green', hex: '#00A86B' },
    { name: 'Doodad Orange', hex: '#FF6F00' },
    { name: 'Velvet Violet', hex: '#9B77C1' },
    { name: 'Charcoal Dark', hex: '#3D3A36' },
    { name: 'Clean White', hex: '#FFFFFF' },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-100 overflow-hidden select-none">
      {/* 4.A TOP TOOLBAR - Compact & Sticky */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between shrink-0 z-30">
        {/* Left: Back / Desktop Switcher */}
        <div className="flex items-center gap-1.5">
          {onBackToDesktop && (
            <button
              onClick={onBackToDesktop}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              title="Về giao diện Desktop"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Project Title with inline rename */}
          <div className="flex items-center gap-1 max-w-[130px] sm:max-w-xs truncate">
            {isRenamingTitle ? (
              <input
                type="text"
                value={project.title}
                autoFocus
                onBlur={() => setIsRenamingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsRenamingTitle(false)}
                onChange={(e) =>
                  onChangeProject({ ...project, title: e.target.value, lastModified: Date.now() })
                }
                className="bg-slate-800 text-white text-xs px-2 py-1 rounded border border-purple-500 outline-none w-full"
              />
            ) : (
              <button
                onClick={() => setIsRenamingTitle(true)}
                className="text-xs sm:text-sm font-bold text-white truncate hover:text-purple-300 text-left"
                title="Nhấn để đổi tên dự án"
              >
                {project.title}
              </button>
            )}
          </div>
        </div>

        {/* Center: Undo / Redo */}
        <div className="flex items-center gap-0.5 bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/60">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded-lg transition-colors ${
              canUndo
                ? 'text-slate-200 hover:bg-slate-700 active:scale-95'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Hoàn tác (Undo)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded-lg transition-colors ${
              canRedo
                ? 'text-slate-200 hover:bg-slate-700 active:scale-95'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Làm lại (Redo)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Preview mode & Save button */}
        <div className="flex items-center gap-2">
          {/* Device viewport toggle */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => onChangeViewport('mobile')}
              className={`p-1.5 rounded-md ${
                viewport === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
              title="Mobile (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeViewport('desktop')}
              className={`p-1.5 rounded-md ${
                viewport === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
              title="Desktop (1100px)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Test Survey Preview */}
          <button
            onClick={onSwitchToRespondentPreview}
            className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700/80 transition-colors"
            title="Xem trước & trả lời thử"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveWithFeedback}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white active:scale-95'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden xs:inline">Đã lưu</span>
              </>
            ) : (
              <span>Lưu</span>
            )}
          </button>
        </div>
      </header>

      {/* 4.B MAIN EDITING CANVAS */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-950 p-2 sm:p-4 flex justify-center pb-32">
        <div
          className={`w-full transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden bg-white ${
            viewport === 'mobile'
              ? 'max-w-[420px]'
              : viewport === 'tablet'
              ? 'max-w-2xl'
              : 'max-w-4xl'
          }`}
        >
          <div className="relative">
            {/* Active element indicator banner */}
            {selectedElement && (
              <div className="sticky top-2 z-30 mx-3 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white rounded-full text-xs font-semibold flex items-center justify-between border border-slate-700/80 shadow-md">
                <span className="truncate max-w-[200px]">
                  Đang chọn: <strong className="text-purple-300">{selectedElement.label}</strong>
                </span>
                <button
                  onClick={() => setActiveTab('edit')}
                  className="text-purple-400 hover:text-purple-200 text-[11px] underline ml-2"
                >
                  Mở chỉnh sửa
                </button>
              </div>
            )}

            <SurveyRenderer
              project={project}
              selectedElementId={selectedElementId}
              selectedSectionId={selectedSectionId}
              onSelectElement={handleSelectElement}
              onSelectSection={handleSelectSection}
              isEditor={true}
              isInteractive={false}
            />
          </div>
        </div>
      </main>

      {/* 4.D BOTTOM SHEET EDITING PANEL */}
      {activeTab !== 'none' && (
        <div
          className={`fixed bottom-14 left-0 right-0 bg-slate-900 border-t border-slate-700/90 shadow-2xl z-40 rounded-t-3xl transition-all duration-300 flex flex-col ${
            isSheetExpanded ? 'h-[75vh]' : 'h-72 sm:h-80'
          }`}
        >
          {/* Sheet Header with drag handle & toggle height */}
          <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between shrink-0">
            {/* Drag Pill Handle */}
            <button
              onClick={() => setIsSheetExpanded(!isSheetExpanded)}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              <div className="w-10 h-1.5 bg-slate-600 rounded-full mx-auto" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {activeTab === 'edit'
                  ? 'Chỉnh sửa phần tử'
                  : activeTab === 'style'
                  ? 'Màu sắc & Giao diện'
                  : activeTab === 'layers'
                  ? 'Cấu trúc trang (Layers)'
                  : activeTab === 'add'
                  ? 'Thêm nội dung'
                  : 'Cài đặt thêm'}
              </span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSheetExpanded(!isSheetExpanded)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                title={isSheetExpanded ? 'Thu nhỏ' : 'Mở rộng'}
              >
                {isSheetExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setActiveTab('none')}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                title="Đóng bảng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sheet Body - Scrollable Controls */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-300">
            {/* TAB 1: EDIT CONTEXT SENSITIVE */}
            {activeTab === 'edit' && (
              <div className="space-y-4">
                {selectedElement ? (
                  <>
                    <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase text-purple-400 font-bold">Phần tử</div>
                        <div className="text-sm font-bold text-white">{selectedElement.label}</div>
                      </div>
                      <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                        {selectedElement.type}
                      </span>
                    </div>

                    {/* Text / Title editing */}
                    {selectedElement.title !== undefined && (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-400">Tiêu đề (Title):</label>
                        <input
                          type="text"
                          value={selectedElement.title}
                          onChange={(e) => updateElement({ title: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-sm"
                        />
                      </div>
                    )}

                    {/* Subtitle editing */}
                    {selectedElement.subtitle !== undefined && (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-400">Phụ đề (Subtitle):</label>
                        <textarea
                          rows={2}
                          value={selectedElement.subtitle}
                          onChange={(e) => updateElement({ subtitle: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-xs"
                        />
                      </div>
                    )}

                    {/* Speech Text for mascot speech bubbles */}
                    {selectedElement.speechText !== undefined && (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-400">Lời thoại Mascot (Speech):</label>
                        <input
                          type="text"
                          value={selectedElement.speechText}
                          onChange={(e) => updateElement({ speechText: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-xs"
                        />
                      </div>
                    )}

                    {/* Mascot Color Picker */}
                    {selectedElement.mascotColor !== undefined && (
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-slate-400">Màu sắc nhân vật:</label>
                        <div className="flex flex-wrap gap-2">
                          {cashflowColors.map((c) => (
                            <button
                              key={c.hex}
                              type="button"
                              onClick={() => updateElement({ mascotColor: c.hex })}
                              style={{ backgroundColor: c.hex }}
                              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                                selectedElement?.mascotColor === c.hex
                                  ? 'border-white scale-110 shadow-lg'
                                  : 'border-transparent'
                              }`}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Placeholder for input/textarea */}
                    {selectedElement.placeholder !== undefined && (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-400">Gợi ý nhập (Placeholder):</label>
                        <input
                          type="text"
                          value={selectedElement.placeholder}
                          onChange={(e) => updateElement({ placeholder: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-xs"
                        />
                      </div>
                    )}

                    {/* Button text */}
                    {selectedElement.buttonText !== undefined && (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-400">Chữ trên nút bấm:</label>
                        <input
                          type="text"
                          value={selectedElement.buttonText}
                          onChange={(e) => updateElement({ buttonText: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-xs font-bold"
                        />
                      </div>
                    )}

                    {/* Options list for Card Grid */}
                    {selectedElement.options && (
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-slate-400">Danh sách tài sản (Options):</label>
                        <div className="space-y-2">
                          {selectedElement.options.map((opt, oIdx) => (
                            <div key={opt.id} className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white text-xs">{opt.title}</span>
                                <span className="text-[10px] text-purple-400">{opt.category}</span>
                              </div>
                              <input
                                type="text"
                                value={opt.title}
                                onChange={(e) => {
                                  const newOptions = [...(selectedElement?.options || [])];
                                  newOptions[oIdx] = { ...opt, title: e.target.value };
                                  updateElement({ options: newOptions });
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-500 space-y-2">
                    <Sliders className="w-8 h-8 mx-auto opacity-50" />
                    <p>Chạm vào một câu hỏi hoặc nhân vật trên màn hình để bắt đầu chỉnh sửa</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: STYLE & CASHFLOW THEME PALETTE */}
            {activeTab === 'style' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                  Bảng màu Bộ Boardgame Cashflow (Robert Kiyosaki)
                </div>

                {currentSection && (
                  <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{currentSection.name}</span>
                      <span className="text-[10px] text-slate-400">Nền Section</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] text-slate-400">Chọn màu nền section:</label>
                      <div className="flex flex-wrap gap-2.5">
                        {cashflowColors.map((c) => (
                          <button
                            key={c.hex}
                            onClick={() => updateSection(currentSection!.id, { backgroundColor: c.hex })}
                            style={{ backgroundColor: c.hex }}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${
                              currentSection!.backgroundColor === c.hex
                                ? 'border-white scale-110 shadow-lg ring-2 ring-purple-500'
                                : 'border-slate-700 hover:scale-105'
                            }`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Corner curve toggle */}
                    <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                      <span className="text-[11px] text-slate-300">Góc cong phong cách Figma:</span>
                      <select
                        value={currentSection.curvedCorner || 'none'}
                        onChange={(e) =>
                          updateSection(currentSection!.id, {
                            curvedCorner: e.target.value as any,
                          })
                        }
                        className="bg-slate-900 text-white rounded-lg px-2.5 py-1 text-xs border border-slate-700 outline-none"
                      >
                        <option value="none">Thẳng</option>
                        <option value="bottom-left">Cong trái (Figma)</option>
                        <option value="bottom-right">Cong phải</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Overall Theme Palette summary */}
                <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800 space-y-2 text-[11px]">
                  <div className="font-semibold text-slate-400">Màu chủ đạo Cashflow:</div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#5A1876]" />
                      <span>Rat Race Purple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#FFD833]" />
                      <span>Cashflow Gold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#00A86B]" />
                      <span>Fast Track Green</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#FF6F00]" />
                      <span>Doodad Orange</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LAYERS & OUTLINE */}
            {activeTab === 'layers' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                  Danh sách Section & Phần tử ({project.sections.length} sections)
                </div>
                <div className="space-y-2">
                  {project.sections.map((sec) => (
                    <div
                      key={sec.id}
                      className={`p-2.5 rounded-xl border transition-all ${
                        selectedSectionId === sec.id
                          ? 'border-purple-500 bg-purple-950/40'
                          : 'border-slate-800 bg-slate-800/60'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setSelectedSectionId(sec.id);
                          if (sec.elements[0]) {
                            setSelectedElementId(sec.elements[0].id);
                          }
                          setActiveTab('edit');
                        }}
                        className="w-full flex items-center justify-between text-left font-semibold text-white text-xs"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: sec.backgroundColor }}
                          />
                          {sec.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{sec.elements.length} phần tử</span>
                      </button>

                      {/* Elements inside this section */}
                      <div className="mt-2 pl-4 space-y-1 border-l border-slate-700">
                        {sec.elements.map((el) => (
                          <button
                            key={el.id}
                            onClick={() => {
                              setSelectedElementId(el.id);
                              setSelectedSectionId(sec.id);
                              setActiveTab('edit');
                            }}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] truncate block ${
                              selectedElementId === el.id
                                ? 'bg-purple-600 text-white font-bold'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            • {el.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: ADD ELEMENTS */}
            {activeTab === 'add' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                  Thêm phần tử hoặc mục mới
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      if (!currentSection) return;
                      const newEl: SurveyElement = {
                        id: `text-${Date.now()}`,
                        type: 'text',
                        label: 'Ghi chú tài chính mới',
                        title: 'Tư duy Rich Dad mới',
                        subtitle: 'Người giàu tập trung vào cột Tài Sản, không phải Thu Nhập.',
                        textColor: '#3D3A36',
                        fontSize: 'base',
                      };
                      updateSection(currentSection.id, {
                        elements: [...currentSection.elements, newEl],
                      });
                      setSelectedElementId(newEl.id);
                      setActiveTab('edit');
                    }}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-left space-y-1"
                  >
                    <Type className="w-5 h-5 text-purple-400" />
                    <div className="font-bold text-white text-xs">Đoạn văn / Ghi chú</div>
                    <div className="text-[10px] text-slate-400">Chèn câu hỏi hoặc lời khuyên</div>
                  </button>

                  <button
                    onClick={() => {
                      if (!currentSection) return;
                      const newEl: SurveyElement = {
                        id: `input-${Date.now()}`,
                        type: 'input',
                        label: 'Ô nhập thông tin mới',
                        placeholder: 'Nhập câu trả lời của bạn...',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 30,
                      };
                      updateSection(currentSection.id, {
                        elements: [...currentSection.elements, newEl],
                      });
                      setSelectedElementId(newEl.id);
                      setActiveTab('edit');
                    }}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-left space-y-1"
                  >
                    <Sliders className="w-5 h-5 text-amber-400" />
                    <div className="font-bold text-white text-xs">Ô nhập liệu mới</div>
                    <div className="text-[10px] text-slate-400">Khung điền câu trả lời ngắn</div>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: MORE OPTIONS */}
            {activeTab === 'more' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                  Tùy chọn khác
                </div>
                <div className="space-y-2">
                  <button
                    onClick={onSwitchToRespondentPreview}
                    className="w-full flex items-center justify-between p-3 bg-purple-900/40 hover:bg-purple-900/60 rounded-xl border border-purple-700/60 text-purple-200 font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Trải nghiệm thử khảo sát thực tế
                    </span>
                    <span>→</span>
                  </button>

                  {onBackToDesktop && (
                    <button
                      onClick={onBackToDesktop}
                      className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        Chuyển sang giao diện Studio Desktop
                      </span>
                      <span>↗</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4.C BOTTOM EDITING TOOLBAR - Thumb Friendly (Max 5 items) */}
      <nav className="h-14 bg-slate-900 border-t border-slate-800 px-2 flex items-center justify-around shrink-0 z-50">
        {/* 1. Add */}
        <button
          onClick={() => setActiveTab(activeTab === 'add' ? 'none' : 'add')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'add' ? 'text-purple-400 bg-purple-950/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Thêm</span>
        </button>

        {/* 2. Edit */}
        <button
          onClick={() => setActiveTab(activeTab === 'edit' ? 'none' : 'edit')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'edit' ? 'text-purple-400 bg-purple-950/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Type className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Sửa</span>
        </button>

        {/* 3. Style */}
        <button
          onClick={() => setActiveTab(activeTab === 'style' ? 'none' : 'style')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'style' ? 'text-purple-400 bg-purple-950/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Màu</span>
        </button>

        {/* 4. Layers */}
        <button
          onClick={() => setActiveTab(activeTab === 'layers' ? 'none' : 'layers')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'layers' ? 'text-purple-400 bg-purple-950/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Lớp</span>
        </button>

        {/* 5. More */}
        <button
          onClick={() => setActiveTab(activeTab === 'more' ? 'none' : 'more')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'more' ? 'text-purple-400 bg-purple-950/60' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MoreVertical className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Thêm...</span>
        </button>
      </nav>
    </div>
  );
};
