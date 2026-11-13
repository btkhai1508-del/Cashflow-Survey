import React, { useState, useEffect } from 'react';
import {
  SamBoxMascot,
  PurplePillMascot,
  TrioFriendsMascot,
  BigSmileMascot,
} from '../common/CharacterMascots';
import { StartHeroSection } from '../common/StartHeroSection';
import { SurveyAnswers, WheelRating } from '../../types/cotSongSurvey';
import {
  Heart,
  Coins,
  Clock,
  Home,
  Brain,
  Users,
  Gift,
  Smile,
  ShieldCheck,
  AlertCircle,
  Check,
  CheckCircle2,
} from 'lucide-react';

interface SurveyRendererProps {
  isInteractive?: boolean;
  onSubmitSurvey?: (answers: any) => void;
  completed?: boolean;
  onResetSurvey?: () => void;
  project?: any;
  selectedElementId?: string | null;
  selectedSectionId?: string | null;
  onSelectElement?: (elementId: string) => void;
  onSelectSection?: (sectionId: string) => void;
  isEditor?: boolean;
}

export const SurveyRenderer: React.FC<SurveyRendererProps> = ({
  onSubmitSurvey,
  completed = false,
  onResetSurvey,
}) => {
  // Step 0: Start Hero
  // Step 1: Phần 1 - Thông tin cơ bản (Câu 1, 2, 3)
  // Step 2: Phần 2 - Chấm điểm 8 yếu tố hạnh phúc (Câu 1 - 8)
  // Step 3: Phần 3 - Bức tranh tài chính & Cách sử dụng thời gian rảnh (Câu 9 - 13)
  // Step 4: Phần 4 - Định hướng tương lai & Trải nghiệm CASHFLOW (Câu 14 - 15)
  // Step 5: Kết quả & Chẩn đoán Bánh xe cuộc đời
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Form State
  // Phần 1
  const [fullName, setFullName] = useState('');
  const [phoneZalo, setPhoneZalo] = useState('');
  const [currentRole, setCurrentRole] = useState<string>('');

  // Phần 2: 8 Yếu tố (chưa chọn = undefined, bắt buộc chọn từ 1-5)
  const [wheelRatings, setWheelRatings] = useState<{ [key in keyof WheelRating]?: number }>({});

  // Phần 3: Câu 9 -> 13
  const [financialPicture, setFinancialPicture] = useState<string>('');
  const [incomeType, setIncomeType] = useState<string>('');
  const [freeTimeUse, setFreeTimeUse] = useState<string>('');
  const [emergencyFundDuration, setEmergencyFundDuration] = useState<string>('');
  const [inRatRace, setInRatRace] = useState<string>('');

  // Phần 4: Câu 14 -> 15
  const [futurePriority, setFuturePriority] = useState<string>('');
  const [cashflowTicketChoice, setCashflowTicketChoice] = useState<string>('');

  // Validation Error State
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (completed) {
      setCurrentStep(5);
    }
  }, [completed]);

  const displayFont = "font-['Baloo_2',cursive] font-extrabold";
  const bodyFont = "font-['Nunito',sans-serif]";

  // 8 Life wheel factors definition per user prompt
  const lifeFactors: {
    key: keyof WheelRating;
    qNum: number;
    title: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'health',
      qNum: 1,
      title: '1. Sức khỏe',
      desc: 'Thể chất và tinh thần luôn dồi dào năng lượng, ít khi "cảm lạnh" hay cạn kiệt.',
      icon: <Heart className="w-5 h-5 text-rose-600 shrink-0" />,
    },
    {
      key: 'finance',
      qNum: 2,
      title: '2. Tự do tài chính',
      desc: 'Thu nhập "ổn áp", có tích lũy tốt và chủ động chi tiêu không sợ "cháy ví".',
      icon: <Coins className="w-5 h-5 text-amber-600 shrink-0" />,
    },
    {
      key: 'time',
      qNum: 3,
      title: '3. Tự do thời gian',
      desc: 'Có đủ thời gian cho bản thân, không bị cuốn vào guồng quay từ sáng đến khuya.',
      icon: <Clock className="w-5 h-5 text-blue-600 shrink-0" />,
    },
    {
      key: 'family',
      qNum: 4,
      title: '4. Gia đình & Báo hiếu',
      desc: 'Có thời gian chăm sóc người thân, không để công việc chiếm sóng 100%.',
      icon: <Home className="w-5 h-5 text-emerald-600 shrink-0" />,
    },
    {
      key: 'growth',
      qNum: 5,
      title: '5. Phát triển bản thân',
      desc: 'Siêng năng học hỏi kỹ năng mới, nâng cấp não bộ thay vì lướt mạng vô tri.',
      icon: <Brain className="w-5 h-5 text-purple-600 shrink-0" />,
    },
    {
      key: 'relationships',
      qNum: 6,
      title: '6. Mối quan hệ',
      desc: 'Có hội bạn "cùng tần số" tích cực và tìm được Mentor (cố vấn) chất lượng.',
      icon: <Users className="w-5 h-5 text-indigo-600 shrink-0" />,
    },
    {
      key: 'community',
      qNum: 7,
      title: '7. Giúp đỡ cộng đồng',
      desc: 'Thường xuyên lan tỏa năng lượng "chữa lành" và đóng góp cho xã hội.',
      icon: <Gift className="w-5 h-5 text-teal-600 shrink-0" />,
    },
    {
      key: 'hobbies',
      qNum: 8,
      title: '8. Sở thích cá nhân',
      desc: 'Có thời gian và tiền bạc để đu đam mê, "chill" sau những giờ làm việc mệt nhoài.',
      icon: <Smile className="w-5 h-5 text-pink-600 shrink-0" />,
    },
  ];

  // Calculation for average wheel score
  const answeredRatings = Object.values(wheelRatings).filter((v) => typeof v === 'number') as number[];
  const averageWheelScore =
    answeredRatings.length > 0
      ? (answeredRatings.reduce((a, b) => a + b, 0) / answeredRatings.length).toFixed(1)
      : '0.0';

  const getScoreDiagnosis = (avg: number) => {
    if (avg >= 4.2) {
      return {
        title: 'Cột Sống Vững Vàng · Tuyệt Cú Mèo!',
        ratingLabel: 'Tuyệt cú mèo ⭐',
        color: 'text-emerald-900',
        desc: 'Bánh xe cuộc đời của bạn đang lăn siêu mượt! Bạn kiểm soát rất tốt giữa năng lượng, thu nhập và quỹ thời gian. Tham gia trải nghiệm CASHFLOW sẽ giúp bạn nhân bản dòng tiền và làm chủ các Big Deal lớn hơn nữa!',
      };
    }
    if (avg >= 3.0) {
      return {
        title: 'Cột Sống Cần Chăm Sóc · Bánh Xe Hơi Lục Cục',
        ratingLabel: 'Tạm ổn / Cần nâng cấp ⚠️',
        color: 'text-amber-900',
        desc: 'Một số yếu tố như thời gian riêng tư hoặc tích lũy tài chính đang bị công việc chiếm sóng. Bạn cần một chiến lược đòn bẩy thông minh để giải phóng thời gian, tránh để cột sống bị quá tải!',
      };
    }
    return {
      title: 'Báo Động Cột Sống · Xu Cà Na Cần Check VAR Gấp!',
      ratingLabel: 'Xu cà na / Cạn lời 🚨',
      color: 'text-rose-900',
      desc: 'Vòng xoáy "đổi thời gian lấy tiền" đang bào mòn năng lượng và tài chính của bạn. Buổi trải nghiệm Boardgame CASHFLOW cuối tuần này sẽ là cơ hội "thông não" thực chiến để tìm đường thoát khỏi Rat Race!',
    };
  };

  // Validation function per part
  const validatePart = (step: number): boolean => {
    setValidationError(null);

    if (step === 1) {
      if (!fullName.trim()) {
        setValidationError('Vui lòng nhập họ và tên của bạn.');
        return false;
      }
      if (!phoneZalo.trim() || phoneZalo.trim().length < 8) {
        setValidationError('Vui lòng nhập số điện thoại (Zalo) để nhận thông tin vé mời.');
        return false;
      }
      if (!currentRole) {
        setValidationError('Vui lòng chọn vai trò hiện tại của bạn.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      const missingFactors = lifeFactors.filter((f) => wheelRatings[f.key] === undefined);
      if (missingFactors.length > 0) {
        setValidationError(
          `Vui lòng chấm điểm cho tất cả các yếu tố (còn thiếu: ${missingFactors.map((f) => f.title).join(', ')}).`
        );
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!financialPicture) {
        setValidationError('Vui lòng chọn câu trả lời cho Câu 9 (Bức tranh tài chính hiện tại).');
        return false;
      }
      if (!incomeType) {
        setValidationError('Vui lòng chọn câu trả lời cho Câu 10 (Kiểu nguồn thu nhập).');
        return false;
      }
      if (!freeTimeUse) {
        setValidationError('Vui lòng chọn câu trả lời cho Câu 11 (Thời gian rảnh ngoài giờ hành chính).');
        return false;
      }
      if (!emergencyFundDuration) {
        setValidationError('Vui lòng chọn câu trả lời cho Câu 12 (Quỹ dự phòng tài chính).');
        return false;
      }
      if (!inRatRace) {
        setValidationError('Vui lòng chọn câu trả lời cho Câu 13 (Vòng lặp đi làm - nhận lương - trả nợ).');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!futurePriority) {
        setValidationError('Vui lòng chọn mục tiêu ưu tiên cho Câu 14.');
        return false;
      }
      if (!cashflowTicketChoice) {
        setValidationError('Vui lòng chọn phương án cho Câu 15 (Vé mời trải nghiệm CASHFLOW).');
        return false;
      }
      return true;
    }

    return true;
  };

  const goToNextStep = () => {
    if (!validatePart(currentStep)) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }
    setValidationError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevStep = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePart(4)) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    const finalRatings: WheelRating = {
      health: wheelRatings.health || 3,
      finance: wheelRatings.finance || 3,
      time: wheelRatings.time || 3,
      family: wheelRatings.family || 3,
      growth: wheelRatings.growth || 3,
      relationships: wheelRatings.relationships || 3,
      community: wheelRatings.community || 3,
      hobbies: wheelRatings.hobbies || 3,
    };

    const finalAnswers: SurveyAnswers = {
      fullName,
      phoneZalo,
      currentRole,
      wheelRatings: finalRatings,
      financialPicture,
      incomeType,
      freeTimeUse,
      emergencyFundDuration,
      inRatRace,
      futurePriority,
      cashflowTicketChoice,
      submittedAt: new Date().toISOString(),
    };

    onSubmitSurvey?.(finalAnswers);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFullName('');
    setPhoneZalo('');
    setCurrentRole('');
    setWheelRatings({});
    setFinancialPicture('');
    setIncomeType('');
    setFreeTimeUse('');
    setEmergencyFundDuration('');
    setInRatRace('');
    setFuturePriority('');
    setCashflowTicketChoice('');
    setValidationError(null);
    onResetSurvey?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Signature Figma Next Button (rounded-[25px_25px_0px_25px], solid white, black triangle)
  const renderNextButton = (label: string = 'Tiếp theo', onClick = goToNextStep) => (
    <button
      type="button"
      onClick={onClick}
      className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 bg-white text-black shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      style={{ borderRadius: '25px 25px 0px 25px' }}
    >
      <span className={`${displayFont} text-base sm:text-lg text-black`}>{label}</span>
      <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[11px] border-l-black group-hover:translate-x-1 transition-transform" />
    </button>
  );

  // Solid Back Button
  const renderBackButton = () => (
    <button
      type="button"
      onClick={goToPrevStep}
      className="w-full sm:w-auto px-5 py-3 rounded-full bg-black text-white hover:bg-slate-800 transition-all text-xs sm:text-sm font-bold cursor-pointer text-center"
    >
      Quay lại
    </button>
  );

  return (
    <div className={`w-full min-h-screen select-text transition-colors flex flex-col justify-between ${bodyFont}`}>
      {/* ========================================================
          TRANG 0: START / HERO
      ======================================================== */}
      {currentStep === 0 && (
        <div className="w-full min-h-screen bg-[#41A456] flex flex-col justify-center">
          <StartHeroSection onStartClick={() => setCurrentStep(1)} />
        </div>
      )}

      {/* ========================================================
          TRANG 1: PHẦN 1 - THÔNG TIN CƠ BẢN
          1 Column, Không dùng box bọc ngoài, Scroll tự nhiên
      ======================================================== */}
      {currentStep === 1 && (
        <div className="w-full min-h-screen bg-[#F5ABCE] py-12 px-4 sm:px-8 flex flex-col items-center">
          <div className="w-full max-w-2xl mx-auto space-y-7 my-auto text-left">
            {/* Header kicker */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-black/70">
                Phần 1 trên 4 · 1 Phút
              </span>
              <h1 className={`${displayFont} text-[#3D3A36] text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight`}>
                PHẦN 1: THÔNG TIN CƠ BẢN (1 Phút)
              </h1>
              <p className="font-bold text-[#3D3A36] text-sm sm:text-base">
                Mọi "in tư" của bạn đều được bảo mật hoàn toàn nha!
              </p>
            </div>

            {/* Error Banner */}
            {validationError && (
              <div className="bg-red-600 text-white p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-md animate-bounce">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Mascot Greeting */}
            <div className="flex items-center justify-center gap-4 py-1">
              <div
                style={{ borderRadius: '42.92px 42.92px 0px 42.92px' }}
                className="bg-white text-black px-6 py-4 shadow-sm text-sm font-extrabold max-w-xs"
              >
                Xin chào! Cho mình xin thông tin cơ bản để bắt mạch chính xác nhé!
              </div>
              <div className="shrink-0 hover:scale-105 transition-transform">
                <SamBoxMascot color="#FF9900" />
              </div>
            </div>

            {/* 1 COLUMN LIST OF QUESTIONS - KHÔNG DÙNG BOX LỒNG NHAU */}
            <div className="space-y-6 pt-2">
              {/* 1. Họ và tên */}
              <div className="space-y-2">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  1. Họ và tên: <span className="text-red-600">*</span>
                </label>
                <div
                  style={{ borderRadius: '42.92px 42.92px 0px 42.92px' }}
                  className="bg-white border border-[#E0E0E0] px-4 sm:px-6 py-3.5 sm:py-4 shadow-sm focus-within:border-black"
                >
                  <input
                    type="text"
                    value={fullName}
                    autoFocus
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="Nhập họ và tên của bạn..."
                    className="w-full text-black placeholder-slate-400 italic font-semibold text-sm sm:text-base bg-transparent border-none outline-none"
                  />
                </div>
              </div>

              {/* 2. Số điện thoại (Zalo) */}
              <div className="space-y-2">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  2. Số điện thoại (Zalo): <span className="text-red-600">*</span>
                </label>
                <div
                  style={{ borderRadius: '42.92px 42.92px 0px 42.92px' }}
                  className="bg-white border border-[#E0E0E0] px-4 sm:px-6 py-3.5 sm:py-4 shadow-sm focus-within:border-black"
                >
                  <input
                    type="tel"
                    value={phoneZalo}
                    onChange={(e) => {
                      setPhoneZalo(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="Nhập số điện thoại (Zalo) để nhận kết quả & vé mời..."
                    className="w-full text-black placeholder-slate-400 italic font-semibold text-sm sm:text-base bg-transparent border-none outline-none"
                  />
                </div>
              </div>

              {/* 3. Hiện tại bạn đang là: */}
              <div className="space-y-2 pt-2">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  3. Hiện tại bạn đang là: <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2.5">
                  {[
                    'Tấm chiếu mới (Sinh viên)',
                    'Mới đi làm (< 2 năm kinh nghiệm)',
                    'Bô lão chốn công sở (> 2 năm kinh nghiệm)',
                    'Freelancer / Tự kinh doanh',
                  ].map((role) => {
                    const isSelected = currentRole === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setCurrentRole(role);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-sm font-bold transition-all flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-slate-900 border-[#E0E0E0] hover:bg-slate-50'
                        }`}
                      >
                        <span>{role}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white border-2 border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {renderBackButton()}
              {renderNextButton('Tiếp tục sang Phần 2')}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TRANG 2: PHẦN 2 - CHẤM ĐIỂM 7 YẾU TỐ HẠNH PHÚC & QUỸ THỜI GIAN
          (Đánh giá mức độ hài lòng: 1 là "xu cà na"/cạn lời ➔ 5 là "tuyệt cú mèo")
          XẾP 1 COLUMN VÀ SCROLL LUÔN, BỎ BOX ĐI, BẮT BUỘC CHỌN
      ======================================================== */}
      {currentStep === 2 && (
        <div className="w-full min-h-screen bg-[#F5ABCE] py-12 px-4 sm:px-8 flex flex-col items-center">
          <div className="w-full max-w-2xl mx-auto space-y-6 my-auto text-left">
            {/* Header Titles */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-black/70">
                Phần 2 trên 4 · 2 Phút
              </span>
              <h1 className={`${displayFont} text-[#3D3A36] text-2xl sm:text-4xl tracking-tight leading-tight`}>
                PHẦN 2: CHẤM ĐIỂM 7 YẾU TỐ HẠNH PHÚC &amp; THỜI GIAN (2 Phút)
              </h1>
              <p className="font-bold text-[#3D3A36] text-xs sm:text-sm">
                (Đánh giá mức độ hài lòng hiện tại của bạn từ 1 đến 5: <strong>1 là "xu cà na"/cạn lời</strong>, <strong>5 là "tuyệt cú mèo"</strong>)
              </p>
            </div>

            {/* Error Banner */}
            {validationError && (
              <div className="bg-red-600 text-white p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-md">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Real-time Score Counter */}
            <div className="flex items-center justify-between text-xs font-bold text-black border-b border-black/20 pb-2">
              <span>Đã chấm điểm: {answeredRatings.length} / 8 yếu tố</span>
              <span>Điểm trung bình: <strong className="text-base font-extrabold">{averageWheelScore} / 5.0 ⭐</strong></span>
            </div>

            {/* 1 COLUMN STREAM OF 8 QUESTIONS - NO BIG BOX CONTAINER */}
            <div className="space-y-5 pt-1">
              {lifeFactors.map((item) => {
                const currentRating = wheelRatings[item.key];
                const isAnswered = currentRating !== undefined;

                return (
                  <div
                    key={item.key}
                    className={`py-4 border-b border-black/15 transition-all ${
                      !isAnswered && validationError ? 'bg-red-500/10 p-3 rounded-2xl' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2.5 mb-1.5">
                      <div className="p-1 rounded-md bg-white shadow-2xs mt-0.5">{item.icon}</div>
                      <div>
                        <h3 className={`${displayFont} text-slate-900 text-base sm:text-lg leading-tight`}>
                          {item.title} <span className="text-red-600">*</span>
                        </h3>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Star / Number Rating Buttons 1 to 5 */}
                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isSelected = currentRating === star;
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => {
                                setWheelRatings((prev) => ({ ...prev, [item.key]: star }));
                                if (validationError) setValidationError(null);
                              }}
                              className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#FFE05C] text-black border-2 border-black scale-110 shadow-md'
                                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                              }`}
                            >
                              {star}
                            </button>
                          );
                        })}
                      </div>

                      {/* Score Label with playful phrasing */}
                      <span className="text-xs font-extrabold text-slate-900 bg-white/60 px-3 py-1 rounded-full">
                        {currentRating === 1 && '🚨 1: "Xu cà na" / cạn lời'}
                        {currentRating === 2 && '⚠️ 2: Thiếu hụt'}
                        {currentRating === 3 && '😐 3: Tạm ổn'}
                        {currentRating === 4 && '👍 4: Ổn áp'}
                        {currentRating === 5 && '⭐ 5: "Tuyệt cú mèo"'}
                        {currentRating === undefined && 'Chưa chấm điểm'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {renderBackButton()}
              {renderNextButton('Tiếp tục sang Phần 3')}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TRANG 3: PHẦN 3 - BỨC TRANH TÀI CHÍNH & CÁCH SỬ DỤNG THỜI GIAN RẢNH
          (CÂU 9 ĐẾN CÂU 13) - 1 COLUMN & SCROLL LUÔN, BỎ BOX
      ======================================================== */}
      {currentStep === 3 && (
        <div className="w-full min-h-screen bg-[#FFD833] py-12 px-4 sm:px-8 flex flex-col items-center">
          <div className="w-full max-w-2xl mx-auto space-y-8 my-auto text-left">
            {/* Header kicker */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-black/70">
                Phần 3 trên 4 · 3 Phút
              </span>
              <h1 className={`${displayFont} text-[#3D3A36] text-2xl sm:text-4xl tracking-tight leading-tight`}>
                PHẦN 3: BỨC TRANH TÀI CHÍNH &amp; CÁCH SỬ DỤNG THỜI GIAN RẢNH (3 Phút)
              </h1>
              <p className="font-bold text-slate-800 text-xs sm:text-sm">
                (Từ Câu 9 đến Câu 13 — Chọn phương án đúng với bạn nhất nhé)
              </p>
            </div>

            {/* Error Banner */}
            {validationError && (
              <div className="bg-red-600 text-white p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-md">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Purple Pill Mascot */}
            <div className="flex items-center justify-center gap-3">
              <div className="hover:scale-105 transition-transform">
                <PurplePillMascot color="#9B77C1" />
              </div>
              <div
                style={{ borderRadius: '0px 30px 30px 30px' }}
                className="bg-white text-black text-xs font-extrabold px-4 py-2 shadow-sm"
              >
                Cùng "bắt mạch" xem bạn có đang bị kẹt trong vòng lặp cày cuốc không nhé!
              </div>
            </div>

            {/* 1 COLUMN LIST OF QUESTIONS 9 TO 13 - NO BOXES */}
            <div className="space-y-8 pt-2">
              {/* CÂU 9: Bức tranh tài chính hiện tại */}
              <div className="space-y-3 pb-6 border-b border-black/15">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  9. Bức tranh tài chính hiện tại của bạn giống câu nào nhất? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2.5">
                  {[
                    'Đang đi học, thu nhập phụ thuộc hoàn toàn vào "nhà tài trợ vàng" (gia đình).',
                    'Làm tháng nào bay màu tháng đó, lương vừa về đã "còn cái nịt".',
                    'Có dư một tí tẹo nhưng luôn nơm nớp sợ biến cố "kiếp nạn".',
                    'Khá "chất", đã có kế hoạch quản lý chi tiêu và đầu tư bài bản.',
                  ].map((option) => {
                    const isSelected = financialPicture === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFinancialPicture(option);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md font-bold'
                            : 'bg-white text-slate-800 border-black/10 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white border-2 border-slate-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CÂU 10: Nguồn thu nhập hiện tại */}
              <div className="space-y-3 pb-6 border-b border-black/15">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  10. Nguồn thu nhập hiện tại của bạn thuộc kiểu nào? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2.5">
                  {[
                    'Thu nhập bào thời gian (Chủ động): Lấy sức khỏe và thời gian cày cuốc đổi lấy tiền, ngưng cày là cạn ví.',
                    'Thu nhập sinh thời gian (Thụ động): Tiền vẫn "ting ting" dù đang ngủ (nhờ nhà cho thuê, hệ thống kinh doanh...).',
                    'Mình vẫn đang "lú", chưa rõ sự khác biệt giữa hai loại này.',
                  ].map((option) => {
                    const isSelected = incomeType === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setIncomeType(option);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md font-bold'
                            : 'bg-white text-slate-800 border-black/10 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white border-2 border-slate-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CÂU 11: Thời gian rảnh ngoài giờ hành chính */}
              <div className="space-y-3 pb-6 border-b border-black/15">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  11. Bạn thường dùng thời gian rảnh ngoài giờ hành chính để làm gì? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2.5">
                  {[
                    'Giải trí, xõa: Cày phim, lướt Tóp Tóp, đi dạo (dự là 3-5 năm nữa vẫn y xì hiện tại).',
                    'Bán mạng kiếm thêm tiền: Chạy xe, làm thêm tay chân (có thêm chút đỉnh nhưng cạn sạch thời gian, không học được tư duy làm chủ).',
                    'Nâng cấp bản thân: Học hỏi kinh nghiệm, "cày" kỹ năng để set up nguồn thu nhập thứ hai bền vững.',
                    'Tự thấy bản thân đang mông lung, chưa có kế hoạch thời gian cụ thể.',
                  ].map((option) => {
                    const isSelected = freeTimeUse === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFreeTimeUse(option);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md font-bold'
                            : 'bg-white text-slate-800 border-black/10 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white border-2 border-slate-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CÂU 12: Quỹ dự phòng tài chính */}
              <div className="space-y-3 pb-6 border-b border-black/15">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  12. Nếu mai phải nghỉ việc/nghỉ học, quỹ dự phòng giúp bạn trụ vững được bao lâu? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2.5">
                  {[
                    'Dưới 1 tháng (rất "tới công chuyện")',
                    '1 – 3 tháng',
                    '3 – 6 tháng',
                    'Chấp luôn trên 1 năm (an toàn tài chính)',
                  ].map((option) => {
                    const isSelected = emergencyFundDuration === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setEmergencyFundDuration(option);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md font-bold'
                            : 'bg-white text-slate-800 border-black/10 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white border-2 border-slate-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CÂU 13: Cảm giác kẹt trong vòng lặp */}
              <div className="space-y-3 pb-6">
                <label className={`${displayFont} text-slate-900 text-base sm:text-lg block`}>
                  13. Bạn có cảm giác mình bị kẹt trong vòng lặp "Sáng đi làm ➔ Cuối tháng nhận lương ➔ Trả nợ ➔ Hết tiền ➔ Lại đi cày" không? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2.5">
                  {[
                    'Có nha, đang trải nghiệm vòng lặp "ảo ma" này và rất muốn bứt phá.',
                    'Có nghe qua tình trạng này nhưng chưa biết "check map" đường thoát.',
                    'Mình chưa từng để ý đến vòng lặp này.',
                  ].map((option) => {
                    const isSelected = inRatRace === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setInRatRace(option);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md font-bold'
                            : 'bg-white text-slate-800 border-black/10 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white border-2 border-slate-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {renderBackButton()}
              {renderNextButton('Tiếp tục sang Phần 4')}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TRANG 4: PHẦN 4 - ĐỊNH HƯỚNG TƯƠNG LAI & TRẢI NGHIỆM CASHFLOW
          (CÂU 14 & CÂU 15) - 1 COLUMN & SCROLL LUÔN, BỎ BOX
      ======================================================== */}
      {currentStep === 4 && (
        <div className="w-full min-h-screen bg-[#9B77C1] py-12 px-4 sm:px-8 flex flex-col items-center text-white">
          <div className="w-full max-w-2xl mx-auto space-y-8 my-auto text-left">
            {/* Header kicker */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                Phần 4 trên 4 · 4 Phút
              </span>
              <h1 className={`${displayFont} text-white text-2xl sm:text-4xl tracking-tight leading-tight`}>
                PHẦN 4: ĐỊNH HƯỚNG TƯƠNG LAI &amp; TRẢI NGHIỆM CASHFLOW (4 Phút)
              </h1>
              <p className="font-bold text-white/90 text-xs sm:text-sm">
                (Câu 14 &amp; Câu 15 — Bước cuối cùng để xem chẩn đoán Cột sống &amp; nhận vé mời)
              </p>
            </div>

            {/* Error Banner */}
            {validationError && (
              <div className="bg-red-600 text-white p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-md">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Trio Mascots Header */}
            <div className="flex items-center justify-center gap-3">
              <div className="hover:scale-105 transition-transform">
                <TrioFriendsMascot color="#41A456" />
              </div>
            </div>

            {/* 1 COLUMN LIST OF QUESTIONS 14 & 15 - NO BOXES */}
            <div className="space-y-8 pt-2">
              {/* CÂU 14: Mục tiêu bự nhất trong 2 - 3 năm tới */}
              <div className="space-y-3 pb-6 border-b border-white/20">
                <label className={`${displayFont} text-white text-base sm:text-lg block`}>
                  14. Mục tiêu "bự" nhất của bạn trong 2 - 3 năm tới là gì? <span className="text-amber-300">*</span>
                </label>
                <div className="space-y-2.5">
                  {[
                    'Tự do thời gian: Không phải bán thanh xuân 8 tiếng/ngày đổi lấy lương cứng.',
                    'Thông não về tiền bạc: Biết cách xài tiền để "tiền đẻ ra tiền".',
                    'Nâng tầm tư duy làm chủ, bắt tay xây dựng dòng tiền tự động.',
                    'Tìm được Mentor (người dẫn đường) có tâm, có tầm để "đu trend" học hỏi.',
                    'Chạy deadline qua ngày, hiện tại tui chưa có dự định gì cụ thể hết.',
                  ].map((option) => {
                    const isSelected = futurePriority === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFuturePriority(option);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer border ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-md font-bold'
                            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white/20 border-2 border-white/70'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CÂU 15: Vé mời trải nghiệm Game Board CASHFLOW */}
              <div className="space-y-3 pb-6">
                <div>
                  <label className={`${displayFont} text-white text-base sm:text-lg block`}>
                    15. [Vé mời trải nghiệm] Game Board CASHFLOW (sáng tạo bởi tác giả cuốn "Dạy con làm giàu"): <span className="text-amber-300">*</span>
                  </label>
                  <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed mt-2 bg-white/10 p-3.5 rounded-2xl border border-white/15">
                    Đây là một game cực kỳ "cuốn", mô phỏng tài chính cả đời người chỉ trong 3 tiếng. Chơi xong, bạn sẽ tự soi chiếu được cách mình quản lý tiền bấy lâu nay, đồng thời học được tư duy thoát khỏi vòng lặp đi làm - trả nợ để tiến tới Tự do Tài chính &amp; Thời gian.
                    <br />
                    <span className="font-bold text-[#FFE05C] block mt-1.5">
                      Cuối tuần này CLB có mở một buổi trải nghiệm, bạn có muốn "chốt đơn" một slot không?
                    </span>
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  {[
                    'Chốt đơn luôn! Giữ cho mình 1 slot để trải nghiệm nhé.',
                    'Nghe xịn đấy, cho mình xin "in tư" (ngày, giờ, địa điểm) để ngó lại lịch nha.',
                    'Cảm ơn bạn, hiện tại mình đang kẹt lịch chưa đi được.',
                  ].map((option) => {
                    const isSelected = cashflowTicketChoice === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setCashflowTicketChoice(option);
                          if (validationError) setValidationError(null);
                        }}
                        className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 cursor-pointer border ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-md font-bold'
                            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-[#FFE05C] text-black border-2 border-black shadow-xs'
                              : 'bg-white/20 border-2 border-white/70'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Submit Button & Back Button */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              {renderBackButton()}
              <button
                onClick={handleSubmit}
                type="button"
                style={{ borderRadius: '25px' }}
                className={`w-full sm:w-auto ${displayFont} text-white text-base sm:text-lg px-8 py-3.5 shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 tracking-wide bg-[#3D3A36] hover:bg-black hover:scale-102`}
              >
                <span>Nộp Khảo Sát &amp; Bắt Mạch</span>
                <span>▶</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TRANG 5: MÀN HÌNH CẢM ƠN & CHẨN ĐOÁN "CỘT SỐNG"
      ======================================================== */}
      {currentStep === 5 && (
        <div className={`min-h-screen bg-[#FFD833] flex flex-col justify-between items-center text-center px-4 py-12 relative ${bodyFont}`}>
          <div className="max-w-2xl mx-auto space-y-6 pt-4 z-10 my-auto">
            {/* Top Tag from Figma */}
            <div className="text-xs font-bold text-[#3D3A36] tracking-wider uppercase flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-800" />
              <span>Khảo sát hoàn tất · Đã Check VAR</span>
            </div>

            {/* Big Headline */}
            <h1 className={`${displayFont} text-[#3D3A36] text-3xl sm:text-5xl md:text-6xl leading-tight`}>
              Cảm ơn {fullName ? `${fullName}` : 'bạn'}!
            </h1>

            <p className="font-bold text-[#3D3A36] text-sm sm:text-base max-w-lg mx-auto">
              Cảm ơn bạn đã dành thời gian hoàn thành khảo sát! Chúc bạn sớm thiết kế được lộ trình tự do tài chính cho riêng mình.
            </p>

            {/* Flat Report Section - 1 Column */}
            {(() => {
              const diag = getScoreDiagnosis(Number(averageWheelScore));
              return (
                <div className="text-left space-y-4">
                  {/* Diagnosis Card */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/10 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                          Báo cáo chẩn đoán "Cột sống" &amp; Bánh xe cuộc đời
                        </span>
                        <h3 className={`${displayFont} text-slate-900 text-xl sm:text-2xl mt-0.5`}>
                          {diag.title}
                        </h3>
                      </div>
                      <div className="bg-black text-[#FFE05C] px-4 py-2 rounded-2xl text-xs sm:text-sm font-black self-start sm:self-center shadow-xs flex items-center gap-1.5 shrink-0">
                        <span>Điểm TB:</span>
                        <span className="text-base text-white">{averageWheelScore}</span>
                        <span>/ 5.0 ⭐</span>
                      </div>
                    </div>

                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-semibold pt-3">
                      {diag.desc}
                    </p>
                  </div>

                  {/* 8 Factors Overview - High Contrast White Cards */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/10 shadow-lg space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2.5">
                      <span className={`${displayFont} text-base sm:text-lg text-slate-900 flex items-center gap-2`}>
                        <span className="p-1 rounded-lg bg-amber-100 text-amber-800">📊</span>
                        <span>Chi tiết 8 yếu tố Bánh xe cuộc đời</span>
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">
                        Đánh giá cá nhân (1 – 5 sao)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                      {lifeFactors.map((f) => {
                        const score = wheelRatings[f.key] || 3;
                        const getScoreBadge = (s: number) => {
                          if (s === 5) return { text: 'Tuyệt cú mèo', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
                          if (s === 4) return { text: 'Ổn áp', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
                          if (s === 3) return { text: 'Tạm ổn', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
                          if (s === 2) return { text: 'Thiếu hụt', bg: 'bg-orange-100 text-orange-800 border-orange-300' };
                          return { text: 'Xu cà na', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
                        };
                        const badge = getScoreBadge(score);

                        return (
                          <div
                            key={f.key}
                            className="bg-slate-50 hover:bg-white p-3 rounded-2xl border border-slate-200 hover:border-black/20 hover:shadow-sm transition-all flex flex-col justify-between"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-xl bg-white shadow-2xs shrink-0 border border-slate-100">
                                {f.icon}
                              </div>
                              <span className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                                {f.title.replace(/^\d+\.\s*/, '')}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                              <div className="flex items-center gap-1 font-black text-sm text-black">
                                <span>{score}</span>
                                <span className="text-amber-500">⭐</span>
                              </div>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${badge.bg}`}>
                                {badge.text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ticket Confirmation Box */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/10 shadow-lg text-xs sm:text-sm text-slate-900 space-y-2.5">
                    <div className="font-['Baloo_2',cursive] font-extrabold flex items-center gap-2 text-slate-900 text-base pb-2 border-b border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span>Xác nhận đăng ký CLB Boardgame CASHFLOW</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-slate-500 font-bold block text-[11px]">Người tham gia:</span>
                        <strong className="text-slate-900 text-xs sm:text-sm">{fullName} ({currentRole})</strong>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-slate-500 font-bold block text-[11px]">Số điện thoại / Zalo:</span>
                        <strong className="text-slate-900 text-xs sm:text-sm">{phoneZalo}</strong>
                      </div>

                      <div className="sm:col-span-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                        <span className="text-emerald-900 font-bold block text-[11px]">Phương án vé mời:</span>
                        <span className="font-extrabold text-emerald-950 text-xs sm:text-sm">
                          {cashflowTicketChoice}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] sm:text-xs text-slate-600 pt-1 flex items-center gap-1.5 font-medium">
                      <span>📲</span>
                      <span>CLB sẽ liên hệ qua Zalo trong vòng 24h để gửi vé mời chính thức và thông tin địa điểm tổ chức cuối tuần này!</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Restart button */}
            <div className="pt-2">
              <button
                onClick={handleReset}
                className={`bg-black hover:bg-slate-800 text-white ${displayFont} text-sm px-7 py-3 rounded-full cursor-pointer shadow-md transition-transform hover:scale-105`}
              >
                Làm lại khảo sát từ đầu
              </button>
            </div>
          </div>

          {/* Big Smiling Mascot Arc at Bottom */}
          <div className="w-full max-w-2xl mt-4 z-0">
            <BigSmileMascot color="#FF9900" />
          </div>
        </div>
      )}
    </div>
  );
};
