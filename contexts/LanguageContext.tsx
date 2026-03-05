'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface Translations {
  discover: string;
  search: string;
  myTrips: string;
  notifications: string;
  profile: string;
  signIn: string;
  admin: string;
  startPlanning: string;
  locationOfTheWeek: string;
  hiddenGems: string;
  viewAll: string;
  exploreThisGem: string;
  collections: string;
  trips: string;
  accountSettings: string;
  logOut: string;
  aiTripPlanner: string;
  letAICraft: string;
  letAICraftDesc: string;
  planWithAI: string;
  planWithAIDesc: string;
  createManually: string;
  createManuallyDesc: string;
  footerAbout: string;
  footerCompany: string;
  footerLegal: string;
  footerAboutLink: string;
  footerCareers: string;
  footerPress: string;
  footerBlog: string;
  footerTrust: string;
  footerPrivacy: string;
  footerTerms: string;
  footerContact: string;
  footerCopyright: string;
  footerTagline: string;
  notificationEmpty: string;
  markRead: string;
}

const translations: Record<Language, Translations> = {
  en: {
    discover: 'Discover',
    search: 'Search',
    myTrips: 'My Trips',
    notifications: 'Notifications',
    profile: 'Profile',
    signIn: 'Sign In',
    admin: 'Admin',
    startPlanning: 'Start Planning',
    locationOfTheWeek: 'Location of the Week',
    hiddenGems: 'Hidden Gems',
    viewAll: 'View All',
    exploreThisGem: 'Explore This Gem',
    collections: 'Collections',
    trips: 'Trips',
    accountSettings: 'Account Settings',
    logOut: 'Log Out',
    aiTripPlanner: 'AI Trip Planner',
    letAICraft: 'Let AI craft your perfect itinerary',
    letAICraftDesc: 'Tell us your dreams, and we\'ll create a personalized journey tailored to your preferences, budget, and travel style.',
    planWithAI: 'Plan with AI',
    planWithAIDesc: 'Get personalized itinerary suggestions',
    createManually: 'Create Manually',
    createManuallyDesc: 'Build your trip from scratch',
    footerAbout: 'Discover extraordinary places. Plan journeys that matter. Travel with intention and grace.',
    footerCompany: 'Company',
    footerLegal: 'Legal',
    footerAboutLink: 'About',
    footerCareers: 'Careers',
    footerPress: 'Press',
    footerBlog: 'Blog',
    footerTrust: 'Trust & Safety',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerContact: 'Contact',
    footerCopyright: 'All rights reserved.',
    footerTagline: 'Premium Travel Discovery Platform',
    notificationEmpty: 'No notifications yet',
    markRead: 'Mark as read',
  },
  vi: {
    discover: 'Khám phá',
    search: 'Tìm kiếm',
    myTrips: 'Chuyến đi',
    notifications: 'Thông báo',
    profile: 'Hồ sơ',
    signIn: 'Đăng nhập',
    admin: 'Quản trị',
    startPlanning: 'Bắt đầu lập kế hoạch',
    locationOfTheWeek: 'Địa điểm tuần này',
    hiddenGems: 'Viên ngọc ẩn',
    viewAll: 'Xem tất cả',
    exploreThisGem: 'Khám phá ngay',
    collections: 'Bộ sưu tập',
    trips: 'Chuyến đi',
    accountSettings: 'Cài đặt tài khoản',
    logOut: 'Đăng xuất',
    aiTripPlanner: 'Trợ lý lập kế hoạch AI',
    letAICraft: 'Hãy để AI tạo lên lộ trình hoàn hảo cho bạn',
    letAICraftDesc: 'Kể cho chúng tôi những giấc mơ của bạn, chúng tôi sẽ tạo một hành trình được cá nhân hóa phù hợp với sở thích, ngân sách và phong cách du lịch của bạn.',
    planWithAI: 'Lập kế hoạch với AI',
    planWithAIDesc: 'Nhận các gợi ý lộ trình được cá nhân hóa',
    createManually: 'Tạo thủ công',
    createManuallyDesc: 'Xây dựng chuyến đi của bạn từ đầu',
    footerAbout: 'Khám phá những nơi tuyệt vời. Lập kế hoạch cho những chuyến hành trình có ý nghĩa. Du lịch với ý định và phong cách.',
    footerCompany: 'Công ty',
    footerLegal: 'Pháp lý',
    footerAboutLink: 'Về chúng tôi',
    footerCareers: 'Sự nghiệp',
    footerPress: 'Báo chí',
    footerBlog: 'Blog',
    footerTrust: 'Tin cậy & An toàn',
    footerPrivacy: 'Chính sách bảo mật',
    footerTerms: 'Điều khoản dịch vụ',
    footerContact: 'Liên hệ',
    footerCopyright: 'Bản quyền được bảo lưu.',
    footerTagline: 'Nền tảng khám phá du lịch cao cấp',
    notificationEmpty: 'Chưa có thông báo',
    markRead: 'Đánh dấu đã đọc',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
