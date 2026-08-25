"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../utils/matchEngine';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVip?: boolean;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  updateUserProfile: (profile: UserProfile) => void;
  upgradeToVip: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const savedUser = localStorage.getItem('uniprep_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Hardcoded demo account
    if (username === 'a' && password === 'a') {
      const loggedInUser: User = {
        id: 'user_demo_1',
        username: 'a',
        displayName: 'PigMoney',
        avatar: 'https://i.pravatar.cc/150?u=Hieuthuhai',
        profile: {
          scores: {
            toan: 8.6,
            van: 7.5,
            anh: 8.8,
            ly: 8.2,
            hoa: 7.9,
            sinh: 8.0,
            su: 7.2,
            dia: 7.8,
            gdcd: 8.5,
            ielts: 6.5,
            hsa: 116,
            tsa: 72.23
          },
          transcriptScores: {
            toan: 8.8,
            van: 8.0,
            anh: 9.2,
            ly: 8.5,
            hoa: 8.1,
            sinh: 8.2,
            su: 7.5,
            dia: 8.0,
            gdcd: 8.8,
            gpa: 8.3
          },
          maxFee: 30000000,
          location: 'all',
          traits: []
        }
      };
      setUser(loggedInUser);
      localStorage.setItem('uniprep_user', JSON.stringify(loggedInUser));
      
      const mockWishlist = ['HUST-IT1', 'HVNH-TCNH']; 
      const mockViewed = ['HUST-IT1', 'HUST-IT2', 'HVNH-TCNH']; 
      localStorage.setItem('wishlist', JSON.stringify(mockWishlist));
      localStorage.setItem('viewed_majors', JSON.stringify(mockViewed));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('wishlistUpdated'));

      return true;
    } else if (username === 'b' && password === 'b') {
      const savedProfile = localStorage.getItem('userProfile');
      let userProfile = undefined;
      if (savedProfile) {
        try {
          userProfile = JSON.parse(savedProfile);
        } catch (e) {
          console.error(e);
        }
      }

      const loggedInUser: User = {
        id: 'user_demo_2',
        username: 'b',
        displayName: 'Tân sinh viên',
        avatar: 'https://i.pravatar.cc/150?u=newbie',
        profile: userProfile
      };
      
      setUser(loggedInUser);
      localStorage.setItem('uniprep_user', JSON.stringify(loggedInUser));
      
      // Kế thừa dữ liệu wishlist, viewed_majors, usedWishlistQuota hiện tại
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('wishlistUpdated'));

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uniprep_user');
  };

  const updateUserProfile = (profile: UserProfile) => {
    if (user) {
      const updatedUser = { ...user, profile };
      setUser(updatedUser);
      localStorage.setItem('uniprep_user', JSON.stringify(updatedUser));
    }
  };

  const upgradeToVip = () => {
    if (user) {
      const updatedUser = { ...user, isVip: true };
      setUser(updatedUser);
      localStorage.setItem('uniprep_user', JSON.stringify(updatedUser));
    }
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, showLoginModal, setShowLoginModal, updateUserProfile, upgradeToVip }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
