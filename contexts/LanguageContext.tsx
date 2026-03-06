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
  createManualTitle: string;
  createManualSubtitle: string;
  whereGoing: string;
  whereGoingPlaceholder: string;
  howManyDays: string;
  adjustLater: string;
  startBuilding: string;
  inspireTitle: string;
  inspireSubtitle: string;
  searchGuides: string;
  places: string;
  by: string;
  editProfile: string;
  memberSince: string;
  savedPlaces: string;
  plannedJourneys: string;
  vipMember: string;
  managePlan: string;
  backToProfile: string;
  newTrip: string;
  planning: string;
  travelers: string;
  discoverPlaces: string;
  searchDestinations: string;
  filters: string;
  about: string;
  reviews: string;
  writeReview: string;
  trustSignals: string;
  trustBadge: string;
  verifiedEst: string;
  trustScore: string;
  verifiedBills: string;
  verifyCheckin: string;
  aiPlannerBadge: string;
  aiPlannerTitle: string;
  aiPlannerSubtitle: string;
  destination: string;
  destinationPlaceholder: string;
  startDate: string;
  endDate: string;
  backHome: string;
  editProfilePic: string;
  editProfilePicHint: string;
  fullName: string;
  bio: string;
  location: string;
  itineraryTitle: string;
  itinerarySubtitle: string;
  day: string;
  addPlace: string;
  placesAdded: string;
  yourLocation: string;
  destinations: string;
  backProfile: string;
  verifiedTransaction: string;
  saveChanges: string;
  shareTrip: string;
  exportTrip: string;
  exportPdf: string;
  exportCalendar: string;
  inviteFriends: string;
  inviteEmailPlaceholder: string;
  sendInvite: string;
  tripMembers: string;
  aiAssistant: string;
  aiChatPlaceholder: string;
  aiSuggestion1: string;
  aiSuggestion2: string;
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
    createManualTitle: 'Create Your Trip',
    createManualSubtitle: 'Build your custom itinerary from scratch with complete control over every detail',
    whereGoing: 'Where are you going?',
    whereGoingPlaceholder: 'E.g., Vung Tau, Da Lat, Hanoi',
    howManyDays: 'How many days?',
    adjustLater: 'You can always adjust this later',
    startBuilding: 'Start Building Itinerary',
    inspireTitle: 'Inspiration',
    inspireSubtitle: 'Discover and save guides from our community of world travelers',
    searchGuides: 'Search destinations, guides...',
    places: 'places',
    by: 'By',
    editProfile: 'Edit Profile',
    memberSince: 'Member since',
    savedPlaces: 'Saved places',
    plannedJourneys: 'Planned journeys',
    vipMember: 'VIP Member',
    managePlan: 'Manage your plan',
    backToProfile: 'Back to Profile',
    newTrip: 'New Trip',
    planning: 'Planning',
    travelers: 'travelers',
    discoverPlaces: 'Discover Places',
    searchDestinations: 'Search destinations, cuisines, experiences...',
    filters: 'Filters',
    about: 'About',
    reviews: 'Reviews',
    writeReview: 'Write Review',
    trustSignals: 'Trust Signals',
    trustBadge: 'Trust Badge',
    verifiedEst: 'Verified Establishment',
    trustScore: 'Trust Score',
    verifiedBills: 'Verified Bills',
    verifyCheckin: 'Verify Check-in',
    aiPlannerBadge: 'AI Trip Planner',
    aiPlannerTitle: 'Let\'s plan your journey',
    aiPlannerSubtitle: 'Share your travel dreams and preferences. Our AI will craft a personalized itinerary just for you.',
    destination: 'Destination',
    destinationPlaceholder: 'Where would you like to go?',
    startDate: 'Start Date',
    endDate: 'End Date',
    backHome: 'Back to Home',
    editProfilePic: 'Change Profile Picture',
    editProfilePicHint: 'JPG, PNG or GIF. Max 5MB.',
    fullName: 'Full Name',
    bio: 'Bio',
    location: 'Location',
    itineraryTitle: 'Your Itinerary',
    itinerarySubtitle: 'Build your perfect trip by adding places to each day',
    day: 'Day',
    addPlace: 'Add Place',
    placesAdded: 'places added',
    yourLocation: 'Your location',
    destinations: 'Destinations',
    backProfile: 'Back to Profile',
    verifiedTransaction: 'verified transaction',
    saveChanges: 'Save Changes',
    shareTrip: 'Share',
    exportTrip: 'Export',
    exportPdf: 'Download PDF',
    exportCalendar: 'Add to Calendar',
    inviteFriends: 'Invite Friends',
    inviteEmailPlaceholder: 'Enter email address...',
    sendInvite: 'Send Invite',
    tripMembers: 'Trip Members',
    aiAssistant: 'AI Assistant',
    aiChatPlaceholder: 'Ask AI to modify your trip...',
    aiSuggestion1: 'Can you suggest a vegan restaurant for Day 2?',
    aiSuggestion2: 'Make this itinerary more kid-friendly.',
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
    createManualTitle: 'Tạo chuyến đi của bạn',
    createManualSubtitle: 'Tự lên lịch trình chi tiết theo cách của riêng bạn',
    whereGoing: 'Bạn muốn đi đâu?',
    whereGoingPlaceholder: 'VD: Vũng Tàu, Đà Lạt, Hà Nội',
    howManyDays: 'Bao nhiêu ngày?',
    adjustLater: 'Bạn có thể thay đổi sau',
    startBuilding: 'Bắt đầu lên lịch',
    inspireTitle: 'Cảm hứng',
    inspireSubtitle: 'Khám phá và lưu lại cẩm nang từ cộng đồng du lịch',
    searchGuides: 'Tìm điểm đến, cẩm nang...',
    places: 'địa điểm',
    by: 'Bởi',
    editProfile: 'Chỉnh sửa hồ sơ',
    memberSince: 'Thành viên từ',
    savedPlaces: 'Đã lưu',
    plannedJourneys: 'Lịch trình đã tạo',
    vipMember: 'Thành viên VIP',
    managePlan: 'Quản lý gói',
    backToProfile: 'Quay lại hồ sơ',
    newTrip: 'Chuyến đi mới',
    planning: 'Đang lên lịch',
    travelers: 'người',
    discoverPlaces: 'Khám phá Địa điểm',
    searchDestinations: 'Tìm điểm đến, ẩm thực, trải nghiệm...',
    filters: 'Bộ lọc',
    about: 'Giới thiệu',
    reviews: 'Đánh giá',
    writeReview: 'Viết đánh giá',
    trustSignals: 'Độ tin cậy',
    trustBadge: 'Huy hiệu tin cậy',
    verifiedEst: 'Cơ sở đã xác minh',
    trustScore: 'Điểm tin cậy',
    verifiedBills: 'Hóa đơn xác minh',
    verifyCheckin: 'Xác minh Check-in',
    aiPlannerBadge: 'Trợ lý Lịch trình AI',
    aiPlannerTitle: 'Hãy lên kế hoạch cho chuyến đi',
    aiPlannerSubtitle: 'Chia sẻ sở thích của bạn. AI của chúng tôi sẽ thiết kế một lịch trình dành riêng cho bạn.',
    destination: 'Điểm đến',
    destinationPlaceholder: 'Bạn muốn đi đâu?',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    backHome: 'Quay lại Trang chủ',
    editProfilePic: 'Thay đổi ảnh đại diện',
    editProfilePicHint: 'JPG, PNG hoặc GIF. Tối đa 5MB.',
    fullName: 'Họ và tên',
    bio: 'Tiểu sử',
    location: 'Vị trí',
    itineraryTitle: 'Lịch trình của bạn',
    itinerarySubtitle: 'Xây dựng chuyến đi hoàn hảo bằng cách thêm địa điểm cho từng ngày',
    day: 'Ngày',
    addPlace: 'Thêm địa điểm',
    placesAdded: 'địa điểm đã thêm',
    yourLocation: 'Vị trí của bạn',
    destinations: 'Điểm đến',
    backProfile: 'Quay lại Hồ sơ',
    verifiedTransaction: 'giao dịch đã xác minh',
    saveChanges: 'Lưu thay đổi',
    shareTrip: 'Chia sẻ',
    exportTrip: 'Xuất file',
    exportPdf: 'Tải PDF',
    exportCalendar: 'Thêm vào Lịch',
    inviteFriends: 'Mời bạn bè',
    inviteEmailPlaceholder: 'Nhập địa chỉ email...',
    sendInvite: 'Gửi lời mời',
    tripMembers: 'Thành viên',
    aiAssistant: 'Trợ lý AI',
    aiChatPlaceholder: 'Nhờ AI chỉnh sửa lịch trình...',
    aiSuggestion1: 'Gợi ý nhà hàng chay cho Ngày 2?',
    aiSuggestion2: 'Làm cho lịch trình này phù hợp với trẻ em.',
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
