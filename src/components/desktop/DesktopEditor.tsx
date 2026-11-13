import React, { useState } from 'react';
import { SurveyProject, SurveyElement, SurveySection, DeviceViewport } from '../../types/survey';
import { SurveyRenderer } from '../preview/SurveyRenderer';
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Undo2,
  Redo2,
  Check,
  Layers,
  Palette,
  Plus,
  Sliders,
  Type,
  CornerDownRight,
  Sparkles,
  Download,
  Share2,
  Trash2,
} from 'lucide-react';

interface DesktopEditorProps {
  project: SurveyProject;
  onChangeProject: (updated: SurveyProject) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  viewport: DeviceViewport;
  onChangeViewport: (vp: DeviceViewport) => void;
  onSwitchToMobileEditor: () => void;
  onSwitchToRespondentPreview: () => void;
}

export const DesktopEditor: React.FC<DesktopEditorProps> = ({
  project,
  onChangeProject,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  viewport,
  onChangeViewport,
  onSwitchToMobileEditor,
  onSwitchToRespondentPreview,
}) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>('q1-header');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>('section-q1');
  const [leftTab, setLeftTab] = useState<'layers' | 'theme' | 'add'>('layers');
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
    const sec = project.sections.find((s) => s.elements.some((e) => e.id === elId));
    if (sec) setSelectedSectionId(sec.id);
  };

  const handleSelectSection = (secId: string) => {
    setSelectedSectionId(secId);
  };

  const handleSaveWithFeedback = () => {
    onSave();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Mutate element
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

  // Mutate section
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

  const cashflowPalettes = [
    {
      name: 'Cashflow Boardgame Classic',
      desc: 'Bảng màu nguyên bản bộ cờ Cashflow 101/202',
      primary: '#5A1876',
      gold: '#FFD833',
      pink: '#F5ABCE',
      blue: '#0091EA',
    },
    {
      name: 'Fast Track Emerald',
      desc: 'Sắc xanh tự do tài chính & thoát Vòng Chuột',
      primary: '#00A86B',
      gold: '#FFC107',
      pink: '#E2E8F0',
      blue: '#0284C7',
    },
    {
      name: 'Gold Rush Investor',
      desc: 'Sắc vàng kim tiền bạc & cơ hội Big Deal',
      primary: '#D97706',
      gold: '#FDE047',
      pink: '#FEF3C7',
      blue: '#2563EB',
    },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* DESKTOP TOP BAR */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0 z-30">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-800 to-amber-400 flex items-center justify-center font-['Bowlby_One'] text-white text-base shadow-md">
              $
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                ROBERT KIYOSAKI CASHFLOW
              </div>
              <div className="text-sm font-extrabold text-white">
                Landing Page & Survey Editor
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 mx-1" />

          {/* Project Title with inline rename */}
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
              className="bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg border border-purple-500 outline-none w-56 font-semibold"
            />
          ) : (
            <button
              onClick={() => setIsRenamingTitle(true)}
              className="text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-700 transition-colors flex items-center gap-1.5"
              title="Nhấn để đổi tên dự án"
            >
              <span>{project.title}</span>
              <span className="text-[10px] text-slate-500">✏️</span>
            </button>
          )}
        </div>

        {/* Center: Device Viewport Switcher & Undo/Redo */}
        <div className="flex items-center gap-4">
          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-1.5 rounded-lg transition-colors ${
                canUndo
                  ? 'text-slate-200 hover:bg-slate-700 active:scale-95'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
              title="Hoàn tác (Undo - Ctrl+Z)"
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
              title="Làm lại (Redo - Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Section 3: Device Preview Switcher (Desktop / Tablet / Mobile) */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => onChangeViewport('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewport === 'desktop'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Xem trang ở chuẩn Desktop (1100px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => onChangeViewport('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewport === 'tablet'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Xem trang ở chuẩn Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>

            <button
              onClick={() => onChangeViewport('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewport === 'mobile'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Xem trang ở chuẩn Mobile (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Right: Mode Switchers & Actions */}
        <div className="flex items-center gap-3">
          {/* Switch to Dedicated Mobile Touch Editor */}
          <button
            onClick={onSwitchToMobileEditor}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all active:scale-95"
            title="Kích hoạt Giao diện Mobile Editing Mode dành cho smartphone"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Chế độ Mobile Editor</span>
          </button>

          {/* Test respondent survey */}
          <button
            onClick={onSwitchToRespondentPreview}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            title="Chuyển sang chế độ người dùng trả lời thử khảo sát"
          >
            <Eye className="w-4 h-4 text-purple-400" />
            <span>Chạy thử khảo sát</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveWithFeedback}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Đã lưu!</span>
              </>
            ) : (
              <span>Lưu dự án</span>
            )}
          </button>
        </div>
      </header>

      {/* 3-COLUMN DESKTOP WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: Layers, Add, Theme Presets */}
        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
          {/* Panel Tabs */}
          <div className="flex border-b border-slate-800 p-1.5 gap-1 shrink-0 bg-slate-900/50">
            <button
              onClick={() => setLeftTab('layers')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                leftTab === 'layers'
                  ? 'bg-slate-800 text-purple-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Layers</span>
            </button>

            <button
              onClick={() => setLeftTab('theme')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                leftTab === 'theme'
                  ? 'bg-slate-800 text-purple-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Bảng màu</span>
            </button>

            <button
              onClick={() => setLeftTab('add')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                leftTab === 'add'
                  ? 'bg-slate-800 text-purple-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm</span>
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB: LAYERS */}
            {leftTab === 'layers' && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Cấu trúc trang khảo sát ({project.sections.length} sections)
                </div>
                <div className="space-y-2">
                  {project.sections.map((sec, sIdx) => {
                    const isSecSelected = selectedSectionId === sec.id;

                    return (
                      <div
                        key={sec.id}
                        className={`rounded-2xl border transition-all ${
                          isSecSelected
                            ? 'border-purple-500 bg-purple-950/30'
                            : 'border-slate-800 bg-slate-800/40'
                        }`}
                      >
                        <button
                          onClick={() => {
                            setSelectedSectionId(sec.id);
                            if (sec.elements[0]) {
                              setSelectedElementId(sec.elements[0].id);
                            }
                          }}
                          className="w-full p-2.5 flex items-center justify-between text-left font-bold text-xs text-white"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                              style={{ backgroundColor: sec.backgroundColor }}
                            />
                            <span className="truncate">{sec.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal">
                            #{sIdx + 1}
                          </span>
                        </button>

                        {/* Elements list */}
                        <div className="px-2 pb-2 space-y-1">
                          {sec.elements.map((el) => {
                            const isElSelected = selectedElementId === el.id;

                            return (
                              <button
                                key={el.id}
                                onClick={() => {
                                  setSelectedElementId(el.id);
                                  setSelectedSectionId(sec.id);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs truncate flex items-center gap-2 transition-all ${
                                  isElSelected
                                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                }`}
                              >
                                <CornerDownRight className="w-3 h-3 opacity-60 shrink-0" />
                                <span className="truncate">{el.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: THEME PRESETS */}
            {leftTab === 'theme' && (
              <div className="space-y-4">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Bảng màu Bộ Cờ Cashflow
                </div>

                <div className="space-y-3">
                  {cashflowPalettes.map((pal, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 bg-slate-800/70 hover:bg-slate-800 rounded-2xl border border-slate-700/80 space-y-2 cursor-pointer transition-all"
                      onClick={() => {
                        // Apply preset to sections
                        const updated = project.sections.map((s, idx) => {
                          if (idx === 0 || idx === 1) return { ...s, backgroundColor: pal.pink };
                          if (idx === 2) return { ...s, backgroundColor: pal.gold };
                          if (idx === 3) return { ...s, backgroundColor: pal.blue };
                          if (idx === 4) return { ...s, backgroundColor: pal.primary };
                          if (idx === 5) return { ...s, backgroundColor: pal.gold };
                          return s;
                        });
                        onChangeProject({
                          ...project,
                          sections: updated,
                          lastModified: Date.now(),
                        });
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{pal.name}</span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <p className="text-[10px] text-slate-400">{pal.desc}</p>
                      <div className="flex gap-1.5 pt-1">
                        <div className="w-5 h-5 rounded-md" style={{ backgroundColor: pal.primary }} />
                        <div className="w-5 h-5 rounded-md" style={{ backgroundColor: pal.gold }} />
                        <div className="w-5 h-5 rounded-md" style={{ backgroundColor: pal.pink }} />
                        <div className="w-5 h-5 rounded-md" style={{ backgroundColor: pal.blue }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ADD ELEMENTS */}
            {leftTab === 'add' && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Thêm thành phần vào Section đang chọn
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (!currentSection) return;
                      const newEl: SurveyElement = {
                        id: `text-${Date.now()}`,
                        type: 'text',
                        label: 'Đoạn ghi chú tài chính',
                        title: 'Tư Duy Thoát Vòng Chuột',
                        subtitle: 'Tài sản là thứ bỏ tiền vào túi bạn. Tiêu sản là thứ rút tiền khỏi túi bạn.',
                        fontSize: 'base',
                        fontWeight: 'semibold',
                        textColor: '#3D3A36',
                      };
                      updateSection(currentSection.id, {
                        elements: [...currentSection.elements, newEl],
                      });
                      setSelectedElementId(newEl.id);
                    }}
                    className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-left flex items-center gap-3 transition-colors"
                  >
                    <Type className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">Văn bản / Ghi chú</div>
                      <div className="text-[10px] text-slate-400">Tiêu đề hoặc phụ đề bổ sung</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (!currentSection) return;
                      const newEl: SurveyElement = {
                        id: `input-${Date.now()}`,
                        type: 'input',
                        label: 'Ô nhập thông tin',
                        placeholder: 'Nhập câu trả lời của bạn...',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 30,
                      };
                      updateSection(currentSection.id, {
                        elements: [...currentSection.elements, newEl],
                      });
                      setSelectedElementId(newEl.id);
                    }}
                    className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-left flex items-center gap-3 transition-colors"
                  >
                    <Sliders className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">Ô nhập câu trả lời ngắn</div>
                      <div className="text-[10px] text-slate-400">Khung điền văn bản bo tròn</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER CANVAS WORKSPACE */}
        <main className="flex-1 overflow-y-auto bg-slate-900/90 p-6 flex justify-center items-start">
          <div
            className={`transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden bg-white border-4 border-slate-800/60 ${
              viewport === 'mobile'
                ? 'w-[390px]'
                : viewport === 'tablet'
                ? 'w-[768px]'
                : 'w-[1100px] max-w-full'
            }`}
          >
            {/* Viewport Frame Header */}
            <div className="bg-slate-900 text-slate-400 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {viewport === 'desktop'
                    ? 'Desktop View (1100px)'
                    : viewport === 'tablet'
                    ? 'Tablet View (768px)'
                    : 'Smartphone View (390px)'}
                </span>
              </span>
              <span className="text-[10px] text-slate-500">Nhấn vào bất kỳ phần tử nào để chỉnh sửa</span>
            </div>

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
        </main>

        {/* RIGHT PANEL: Inspector / Properties */}
        <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Bảng Thuộc Tính (Inspector)
            </span>
            {selectedElement && (
              <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded font-mono">
                {selectedElement.type}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300">
            {selectedElement ? (
              <>
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 space-y-1">
                  <div className="text-[10px] uppercase text-purple-400 font-bold">Phần tử đang chọn</div>
                  <div className="text-sm font-bold text-white">{selectedElement.label}</div>
                </div>

                {/* Title */}
                {selectedElement.title !== undefined && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">Tiêu đề (Title):</label>
                    <input
                      type="text"
                      value={selectedElement.title}
                      onChange={(e) => updateElement({ title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-xs"
                    />
                  </div>
                )}

                {/* Subtitle */}
                {selectedElement.subtitle !== undefined && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">Phụ đề (Subtitle):</label>
                    <textarea
                      rows={3}
                      value={selectedElement.subtitle}
                      onChange={(e) => updateElement({ subtitle: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-xs"
                    />
                  </div>
                )}

                {/* Speech text */}
                {selectedElement.speechText !== undefined && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">Lời thoại Mascot (Speech Bubble):</label>
                    <input
                      type="text"
                      value={selectedElement.speechText}
                      onChange={(e) => updateElement({ speechText: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none text-xs"
                    />
                  </div>
                )}

                {/* Mascot Color */}
                {selectedElement.mascotColor !== undefined && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-slate-400">Màu nhân vật Mascot:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedElement.mascotColor}
                        onChange={(e) => updateElement({ mascotColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={selectedElement.mascotColor}
                        onChange={(e) => updateElement({ mascotColor: e.target.value })}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white uppercase font-mono w-24"
                      />
                    </div>
                  </div>
                )}

                {/* Placeholder */}
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

                {/* Button Text */}
                {selectedElement.buttonText !== undefined && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">Chữ trên nút bấm (CTA):</label>
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
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-semibold text-slate-400">Danh mục tài sản:</label>
                    <div className="space-y-2">
                      {selectedElement.options.map((opt, oIdx) => (
                        <div key={opt.id} className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 space-y-1.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-white">{opt.category}</span>
                            <span className="text-purple-400">{opt.badgeText}</span>
                          </div>
                          <input
                            type="text"
                            value={opt.title}
                            onChange={(e) => {
                              const newOpts = [...(selectedElement?.options || [])];
                              newOpts[oIdx] = { ...opt, title: e.target.value };
                              updateElement({ options: newOpts });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Sliders className="w-8 h-8 mx-auto opacity-40" />
                <p>Chọn một phần tử trên khung xem trước để chỉnh sửa chi tiết</p>
              </div>
            )}

            {/* Section Settings */}
            {currentSection && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Cài đặt Section ({currentSection.badgeTitle})
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400">Màu nền Section:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentSection.backgroundColor}
                      onChange={(e) =>
                        updateSection(currentSection!.id, { backgroundColor: e.target.value })
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={currentSection.backgroundColor}
                      onChange={(e) =>
                        updateSection(currentSection!.id, { backgroundColor: e.target.value })
                      }
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white uppercase font-mono w-28"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400">Góc bo tròn cong (Figma style):</label>
                  <select
                    value={currentSection.curvedCorner || 'none'}
                    onChange={(e) =>
                      updateSection(currentSection!.id, {
                        curvedCorner: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-800 text-white rounded-xl px-3 py-2 text-xs border border-slate-700 outline-none"
                  >
                    <option value="none">Không bo cong (Thẳng)</option>
                    <option value="bottom-left">Cong góc dưới bên trái (Figma)</option>
                    <option value="bottom-right">Cong góc dưới bên phải</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
