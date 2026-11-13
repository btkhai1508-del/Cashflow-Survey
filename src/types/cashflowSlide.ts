export type SlideId =
  | 'slide-01'
  | 'slide-02'
  | 'slide-03'
  | 'slide-04'
  | 'slide-05'
  | 'slide-06'
  | 'slide-07'
  | 'slide-08'
  | 'slide-09'
  | 'slide-10'
  | 'slide-11'
  | 'slide-12';

export interface CardItem {
  id: string;
  category: 'Small Deal' | 'Big Deal' | 'Market' | 'Doodads' | 'Profession';
  title: string;
  cost: number;
  downPayment: number;
  cashflow: number;
  roi?: string;
  description: string;
  ruleLesson?: string;
}

export interface PlayerProfession {
  id: string;
  name: string;
  salary: number;
  taxes: number;
  mortgage: number;
  schoolLoan: number;
  carLoan: number;
  creditCard: number;
  otherExpenses: number;
  savings: number;
  avatar: string;
}

export interface SlideMetadata {
  id: SlideId;
  index: number;
  numberString: string;
  title: string;
  subtitle: string;
  category: 'Opening' | 'Board Map' | 'Profile' | 'Opportunity' | 'Payday' | 'Financial Statement' | 'Risk Event' | 'Level Up' | 'Decision' | 'Quiz' | 'Leaderboard' | 'Reflection';
  presenterNotes: string;
}
