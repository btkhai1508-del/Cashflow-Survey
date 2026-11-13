import React, { useState } from 'react';
import { initialCashflowSurvey } from './data/defaultSurveyData';
import { SurveyRenderer } from './components/preview/SurveyRenderer';
import { Confetti } from './components/common/Confetti';
import { ComponentLibraryDrawer } from './components/common/ComponentLibraryDrawer';

export default function App() {
  const [project] = useState(initialCashflowSurvey);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [, setSubmissionData] = useState<Record<string, any> | null>(null);
  const [showComponentLibrary, setShowComponentLibrary] = useState<boolean>(false);

  const handleSubmit = (answers: Record<string, any>) => {
    setSubmissionData(answers);
    setCompleted(true);
    setShowConfetti(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCompleted(false);
    setShowConfetti(false);
    setSubmissionData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-start items-center selection:bg-purple-600 selection:text-white font-['Nunito',sans-serif]">
      {/* Confetti celebration on completion */}
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Component Library Reference Drawer */}
      <ComponentLibraryDrawer
        isOpen={showComponentLibrary}
        onClose={() => setShowComponentLibrary(false)}
      />

      {/* Component Library Reference Button */}
      <div className="fixed top-3 right-3 z-40">
        <button
          onClick={() => setShowComponentLibrary(true)}
          className="flex items-center gap-2 bg-[#212121]/90 hover:bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md cursor-pointer border border-zinc-700 backdrop-blur-xs transition-all hover:scale-105 active:scale-95"
          title="Mở thư viện Component Library tham chiếu"
        >
          <span className="text-[#FFE05C]">📋</span>
          <span className="hidden sm:inline">Component Library</span>
        </button>
      </div>

      {/* Main Survey Container - 100% full width, edge-to-edge without black bars */}
      <main className="w-full min-h-screen relative overflow-x-hidden">
        <SurveyRenderer
          project={project}
          isInteractive={true}
          completed={completed}
          onSubmitSurvey={handleSubmit}
          onResetSurvey={handleReset}
        />
      </main>
    </div>
  );
}
