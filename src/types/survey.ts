export type ElementType =
  | 'header'
  | 'question'
  | 'text'
  | 'input'
  | 'character'
  | 'phoneMockup'
  | 'cardGrid'
  | 'pricingTiers'
  | 'textarea'
  | 'button'
  | 'section';

export interface CardOption {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  iconType: 'realEstate' | 'stocks' | 'business' | 'royalties' | 'custom';
  accentColor: string;
  badgeText?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  isPopular?: boolean;
  accentColor: string;
  features: string[];
}

export interface SurveyElement {
  id: string;
  type: ElementType;
  label: string; // for layer panel
  title?: string;
  subtitle?: string;
  placeholder?: string;
  defaultValue?: string;
  speechText?: string;
  mascotType?: 'sam_box' | 'purple_pill' | 'trio_friends' | 'big_smile';
  mascotColor?: string;
  options?: CardOption[];
  plans?: PricingPlan[];
  buttonText?: string;
  fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  textAlign?: 'left' | 'center' | 'right';
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  paddingY?: number;
  customStyle?: Record<string, string>;
}

export interface SurveySection {
  id: string;
  sectionNumber: number;
  name: string;
  badgeTitle: string; // e.g. "Question 1", "Question 2"
  themeKey: 'ratRacePurple' | 'cashflowGold' | 'fastTrackGreen' | 'opportunityOrange' | 'velvetPurple' | 'victoryScreen';
  backgroundColor: string;
  curvedCorner?: 'bottom-left' | 'bottom-right' | 'none';
  elements: SurveyElement[];
}

export interface SurveyProject {
  id: string;
  title: string;
  subtitle: string;
  theme: {
    fontTheme?: 'baloo' | 'comfortaa' | 'mali' | 'nunito';
    primary: string; // Cashflow Deep Purple #5A1876
    secondary: string; // Cashflow Gold #FFC107
    accent: string; // Fast Track Green #00A86B
    warning: string; // Doodad Orange #FF6F00
    background: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
  sections: SurveySection[];
  lastModified: number;
}

export type DeviceViewport = 'desktop' | 'tablet' | 'mobile';
export type EditorMode = 'desktop' | 'mobile';
export type AppView = 'edit' | 'preview'; // edit = editing mode, preview = respondent live survey test
