import { createContext, useContext, useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import api from '@/lib/api';
import { LoadingOverlay } from '@/components/LoadingOverlay';

type User = {
  _id: string;
  name: string;
  email?: string;
  appleId: string;
};

interface SignInResponse {
  user: User;
  token: string;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Oturum bilgileri yüklenemedi'
      });
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  const signInWithApple = async () => {
    try {
      setLoading(true);
      
      const storedAppleCredential = await AsyncStorage.getItem('appleCredential');
      let credential;

      if (storedAppleCredential) {
        credential = JSON.parse(storedAppleCredential);
      } else {
        credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });
        
        await AsyncStorage.setItem('appleCredential', JSON.stringify(credential));
      }

      const signInData = {
        appleId: credential.user,
        name: credential.fullName?.givenName 
          ? `${credential.fullName.givenName} ${credential.fullName.familyName}`
          : 'Anonim Kullanıcı',
        email: credential.email,
      };

      const response = await api.post<SignInResponse>('/users/signin/apple', signInData);
      const { user: userData, token: authToken } = response.data;

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', authToken);

      setUser(userData);
      setToken(authToken);

      Toast.show({
        type: 'success',
        text1: 'Hoş Geldiniz',
        text2: `${userData.name} olarak giriş yapıldı`
      });

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Giriş Hatası',
        text2: 'Apple ile giriş yapılamadı'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'token', 'appleCredential']);
      setUser(null);
      setToken(null);
      Toast.show({
        type: 'success',
        text1: 'Çıkış Yapıldı',
        text2: 'Güle güle!'
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Çıkış yapılırken bir hata oluştu'
      });
      throw error;
    }
  };

  if (!isInitialized) {
    return <LoadingOverlay />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signInWithApple,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};