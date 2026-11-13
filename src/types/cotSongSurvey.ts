export interface WheelRating {
  health: number; // Sức khỏe (1-5)
  finance: number; // Tự do tài chính (1-5)
  time: number; // Tự do thời gian (1-5)
  family: number; // Gia đình & Báo hiếu (1-5)
  growth: number; // Phát triển bản thân (1-5)
  relationships: number; // Mối quan hệ & Mentor (1-5)
  community: number; // Giúp đỡ cộng đồng (1-5)
  hobbies: number; // Sở thích cá nhân (1-5)
}

export interface SurveyAnswers {
  fullName: string;
  phoneZalo: string;
  currentRole: string;
  wheelRatings: WheelRating;
  financialPicture: string;
  incomeType: string;
  freeTimeUse: string;
  emergencyFundDuration: string;
  inRatRace: string;
  futurePriority: string;
  cashflowTicketChoice: string;
  submittedAt?: string;
}
