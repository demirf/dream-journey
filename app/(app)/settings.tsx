import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useAuth } from '@/store/AuthContext';
import { useLanguage } from '@/store/LanguageContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function Settings() {
  const { signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <ImageBackground 
      source={require('@/assets/images/bg.jpeg')} 
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>{t('app.name')}</Text>
          <Text style={styles.appSubtitle}>{t('app.subtitle')}</Text>
        </View>

        <View style={styles.menuContainer}>
          <View style={[styles.inputGroup, styles.languageSection]}>
            <Text style={styles.label}>{t('language')}</Text>
            <View style={styles.languageContainer}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'en' && styles.languageButtonActive
                ]}
                onPress={() => setLanguage('en')}
              >
                <Text style={[
                  styles.languageText,
                  language === 'en' && styles.languageTextActive
                ]}>{t('english')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'tr' && styles.languageButtonActive
                ]}
                onPress={() => setLanguage('tr')}
              >
                <Text style={[
                  styles.languageText,
                  language === 'tr' && styles.languageTextActive
                ]}>{t('turkish')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.menuSeparator} />

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="person" size={24} color="#6366f1" />
            <Text style={styles.menuText}>{t('edit.profile')}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={signOut}>
            <MaterialIcons name="logout" size={24} color="#ef4444" />
            <Text style={[styles.menuText, styles.logoutText]}>{t('sign.out')}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'LoraItalic',
    marginBottom: 8,
    textShadowColor: 'rgba(99, 102, 241, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    fontFamily: 'LoraItalic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#334155',
  },
  logoutText: {
    color: '#ef4444',
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  languageButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  languageText: {
    fontSize: 16,
    color: '#666',
  },
  languageTextActive: {
    color: '#fff',
  },
  languageSection: {
    marginBottom: 0,
  },
  menuSeparator: {
    height: 24,
  },
});