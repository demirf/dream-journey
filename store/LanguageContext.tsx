import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'tr';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Ana Sayfa
    'hello': 'Hello 👋',
    'home': 'Home',
    'want.to.create': 'Want to create a new story?',
    'your.stories': 'Your Stories 📚',
    'new.story': 'New Story',
    'explore.imagination': 'Explore your imagination',

    // Hikaye Oluşturma
    'meet.your.hero': 'Meet Your Hero 🦸‍♂️',
    'tell.about.hero': 'Tell us about the hero of your story',
    'hero.name': "Hero's Name",
    'hero.age': "Hero's Age",
    'hero.interest': "Hero's Interest",
    'hero.gender': "Hero's Gender",
    'boy': 'Boy',
    'girl': 'Girl',
    'create.story': 'Create Story',
    'name.placeholder': 'e.g.: John, Sarah',
    'age.placeholder': 'e.g.: 8',
    'interest.placeholder': 'e.g.: Space, Nature, Sky, Airplanes',

    // Ayarlar
    'settings': 'Settings',
    'language': 'Language',
    'english': 'English',
    'turkish': 'Turkish',
    'edit.profile': 'Edit Profile',
    'sign.out': 'Sign Out',
    'app.name': 'Dream Journey',
    'app.subtitle': 'Explore Your Dreams',

    // Loading Screen
    'creating.story': 'Creating Your Story',
    'please.wait': 'Please wait while we work our magic...',
    'generating.story': 'Generating your unique story',
    'creating.illustration': 'Creating magical illustrations',
    'finalizing': 'Finalizing your adventure',
  },
  tr: {
    // Ana Sayfa
    'home': 'Anasayfa',
    'hello': 'Merhaba 👋',
    'want.to.create': 'Yeni bir hikaye oluşturmak ister misin?',
    'your.stories': 'Hikayelerin 📚',
    'new.story': 'Yeni Hikaye',
    'explore.imagination': 'Hayal gücünü keşfet',

    // Hikaye Oluşturma
    'meet.your.hero': 'Kahramanını Tanıyalım 🦸‍♂️',
    'tell.about.hero': 'Hikayenin kahramanı hakkında bilgi ver',
    'hero.name': 'Kahramanın İsmi',
    'hero.age': 'Kahramanın Yaşı',
    'hero.interest': 'Kahramanın İlgi Alanı',
    'hero.gender': 'Kahramanın Cinsiyeti',
    'boy': 'Erkek',
    'girl': 'Kız',
    'create.story': 'Hikaye Oluştur',
    'name.placeholder': 'örn: Ahmet, Ayşe',
    'age.placeholder': 'örn: 8',
    'interest.placeholder': 'örn: Uzay, Doğa, Gökyüzü, Uçaklar',

    // Ayarlar
    'settings': 'Ayarlar',
    'language': 'Dil',
    'english': 'İngilizce',
    'turkish': 'Türkçe',
    'edit.profile': 'Profili Düzenle',
    'sign.out': 'Çıkış Yap',
    'app.name': 'Dream Journey',
    'app.subtitle': 'Hayallerini Keşfet',

    // Loading Screen
    'creating.story': 'Hikayen Oluşturuluyor',
    'please.wait': 'Sihrimizi konuştururken lütfen bekle...',
    'generating.story': 'Eşsiz hikayeni oluşturuyoruz',
    'creating.illustration': 'Sihirli çizimler yapıyoruz',
    'finalizing': 'Maceranı tamamlıyoruz',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Başlangıçta kaydedilmiş dili yükle
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage === 'tr' || savedLanguage === 'en') {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 