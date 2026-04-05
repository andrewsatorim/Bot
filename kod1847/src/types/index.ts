export interface LocalizedString {
  ru: string;
  en: string;
}

export interface MenuItem {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  flagship: boolean;
}

export interface EventItem {
  id: number;
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  time: string;
  zone: 'tea_hall' | 'lounge';
  capacity: number;
  registered: number;
}

export interface GalleryItem {
  id: number;
  alt: LocalizedString;
}

export type MenuCategory = 'tea' | 'hookah' | 'food' | 'drinks';

export interface FormResponse {
  id?: string;
  status: 'pending' | 'success' | 'error';
  message?: LocalizedString;
}

export interface BookingForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  zone?: string;
  comment?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface EventRegistrationForm {
  event_id: number;
  name: string;
  phone: string;
  email?: string;
  guests?: number;
}

export interface MembershipForm {
  name: string;
  phone: string;
  email: string;
  source?: string;
  message?: string;
  level?: 'visit' | 'member' | 'resident';
}
