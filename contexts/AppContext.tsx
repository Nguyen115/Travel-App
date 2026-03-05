'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser, mockPlaces, mockNotifications, mockModerationCases, User, Place, Notification, ModerationCase, Trip, Collection } from '@/lib/mockData';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  places: Place[];
  notifications: Notification[];
  moderationCases: ModerationCase[];
  updateUser: (user: User) => void;
  markNotificationRead: (id: string) => void;
  addToCollection: (collectionId: string, placeId: string) => void;
  updateTrip: (tripId: string, trip: Trip) => void;
  updateModerationCase: (caseId: string, updates: Partial<ModerationCase>) => void;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [places] = useState<Place[]>(mockPlaces);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [moderationCases, setModerationCases] = useState<ModerationCase[]>(mockModerationCases);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const addToCollection = (collectionId: string, placeId: string) => {
    if (!user) return;

    setUser({
      ...user,
      collections: user.collections.map(col =>
        col.id === collectionId
          ? { ...col, placeIds: [...col.placeIds, placeId] }
          : col
      )
    });
  };

  const updateTrip = (tripId: string, trip: Trip) => {
    if (!user) return;

    setUser({
      ...user,
      trips: user.trips.map(t => t.id === tripId ? trip : t)
    });
  };

  const updateModerationCase = (caseId: string, updates: Partial<ModerationCase>) => {
    setModerationCases(prev =>
      prev.map(mc =>
        mc.id === caseId ? { ...mc, ...updates } : mc
      )
    );
  };

  const login = () => {
    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        places,
        notifications,
        moderationCases,
        updateUser,
        markNotificationRead,
        addToCollection,
        updateTrip,
        updateModerationCase,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
