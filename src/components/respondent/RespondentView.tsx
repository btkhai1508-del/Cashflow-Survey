import React, { useState } from 'react';
import { SurveyProject, DeviceViewport } from '../../types/survey';
import { SurveyRenderer } from '../preview/SurveyRenderer';
import { Confetti } from '../common/Confetti';
import { ArrowLeft, Monitor, Smartphone, Tablet, Sparkles, RotateCcw } from 'lucide-react';

interface RespondentViewProps {
  project: SurveyProject;
  onBackToEdit: () => void;
  viewport: DeviceViewport;
  onChangeViewport: (vp: DeviceViewport) => void;
}

export const RespondentView: React.FC<RespondentViewProps> = ({
  project,
  onBackToEdit,
  viewport,
  onChangeViewport,
}) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [submissionData, setSubmissionData] = useState<Record<string, any> | null>(null);

  const handleSubmit = (answers: Record<string, any>) => {
    setSubmissionData(answers);
    setCompleted(true);
    setShowConfetti(true);
  };

  const handleReset = () => {
    setCompleted(false);
    setShowConfetti(false);
    setSubmissionData(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Floating Testing Banner */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Chỉnh sửa</span>
          </button>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Chế độ Trả lời Thử Nghiệm (Respondent Preview)</span>
          </span>
        </div>

        {/* Viewport frame selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => onChangeViewport('mobile')}
              className={`p-1.5 rounded-md ${
                viewport === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
              title="Khung điện thoại (Mobile 390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeViewport('tablet')}
              className={`p-1.5 rounded-md ${
                viewport === 'tablet' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
              title="Khung máy tính bảng (Tablet 768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeViewport('desktop')}
              className={`p-1.5 rounded-md ${
                viewport === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
              title="Khung máy tính (Desktop)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          {completed && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg"
              title="Làm lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Thử lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Confetti celebration */}
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Main Survey Content rendered in device container */}
      <main className="flex-1 p-2 sm:p-6 flex justify-center items-start overflow-y-auto">
        <div
          className={`w-full transition-all duration-300 shadow-2xl overflow-hidden bg-white ${
            viewport === 'mobile'
              ? 'max-w-[420px] rounded-3xl border-4 border-slate-800'
              : viewport === 'tablet'
              ? 'max-w-2xl rounded-3xl border-4 border-slate-800'
              : 'max-w-5xl rounded-2xl'
          }`}
        >
          <SurveyRenderer
            project={project}
            selectedElementId={null}
            selectedSectionId={null}
            isEditor={false}
            isInteractive={true}
            completed={completed}
            onSubmitSurvey={handleSubmit}
            onResetSurvey={handleReset}
          />
        </div>
      </main>
    </div>
  );
};
