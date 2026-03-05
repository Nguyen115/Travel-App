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
