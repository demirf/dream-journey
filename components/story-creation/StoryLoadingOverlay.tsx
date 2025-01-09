import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '@/store/LanguageContext';

type IconName = 'brain' | 'book-open-page-variant' | 'palette' | 'magic-staff';

const STEPS = [
  { 
    key: 'imagination',
    icon: 'brain' as IconName,
    title: 'Hayal gücü harekete geçiyor...',
    messages: [
      'Fikirler toplanıyor...',
      'Karakterler canlanıyor...',
      'Macera şekilleniyor...',
    ]
  },
  { 
    key: 'story',
    icon: 'book-open-page-variant' as IconName,
    title: 'Hikaye şekilleniyor...',
    messages: [
      'Kelimeler dans ediyor...',
      'Cümleler diziliyor...',
      'Paragraflar örülüyor...',
    ]
  },
  { 
    key: 'art',
    icon: 'palette' as IconName,
    title: 'Resimler canlanıyor...',
    messages: [
      'Renkler seçiliyor...',
      'Fırça darbeleri atılıyor...',
      'Detaylar ekleniyor...',
    ]
  },
  { 
    key: 'magic',
    icon: 'magic-staff' as IconName,
    title: 'Son dokunuşlar yapılıyor...',
    messages: [
      'Sihir serpiliyor...',
      'Pırıltılar ekleniyor...',
      'Hikaye hayat buluyor...',
    ]
  },
];

export function StoryLoadingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const spinValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(1);

  useEffect(() => {
    // Döndürme animasyonu
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Alt mesajları değiştir
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % STEPS[currentStep].messages.length);
    }, 10000);

    // Ana adımları değiştir
    const stepInterval = setInterval(() => {
      fadeValue.setValue(0);
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setCurrentMessage(0);
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 14000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(stepInterval);
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <MaterialCommunityIcons
            name={STEPS[currentStep].icon}
            size={48}
            color="#6366f1"
          />
        </Animated.View>

        <Animated.Text 
          style={[
            styles.title,
            {
              opacity: fadeValue,
            }
          ]}
        >
          {STEPS[currentStep].title}
        </Animated.Text>

        <Animated.Text 
          style={[
            styles.message,
            {
              opacity: fadeValue,
            }
          ]}
        >
          {STEPS[currentStep].messages[currentMessage]}
        </Animated.Text>

        <View style={styles.progressContainer}>
          {STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    fontFamily: 'LoraItalic',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 32,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  progressDotActive: {
    backgroundColor: '#6366f1',
    transform: [{ scale: 1.2 }],
  },
}); 