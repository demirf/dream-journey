import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { StoryFormData } from '@/app/story/create-story';
import { useLanguage } from '@/store/LanguageContext';
import { useRouter } from 'expo-router';

type StepOneProps = {
  initialData: StoryFormData;
  onNext: (data: Partial<StoryFormData>) => void;
};

export default function StepOne({ initialData, onNext }: StepOneProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    characterName: initialData.characterName,
    characterAge: initialData.characterAge,
    characterGender: initialData.characterGender,
    characterInterest: initialData.characterInterest || '',
  });

  const isValid = formData.characterName.trim() && 
                 formData.characterAge.trim() && 
                 formData.characterGender &&
                 formData.characterInterest.trim();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.title}>{t('meet.your.hero')}</Text>
            </View>
            <Text style={styles.subtitle}>
              {t('tell.about.hero')}
            </Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('hero.name')}</Text>
                <TextInput
                  style={styles.input}
                  value={formData.characterName}
                  onChangeText={(text) => setFormData(prev => ({ 
                    ...prev, 
                    characterName: text.slice(0, 60)
                  }))}
                  placeholder={t('name.placeholder')}
                  maxLength={60}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Hero's Age</Text>
                <TextInput
                  style={styles.input}
                  value={formData.characterAge}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setFormData(prev => ({ ...prev, characterAge: numericValue }))
                  }}
                  placeholder="e.g.: 8"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Hero's Interest</Text>
                <TextInput
                  style={styles.input}
                  value={formData.characterInterest}
                  onChangeText={(text) => setFormData(prev => ({ 
                    ...prev, 
                    characterInterest: text 
                  }))}
                  placeholder="e.g.: Space, Nature, Sky, Airplanes"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Hero's Gender</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      formData.characterGender === 'male' && styles.genderButtonActive
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, characterGender: 'male' }))}
                  >
                    <MaterialCommunityIcons 
                      name="face-man" 
                      size={24} 
                      color={formData.characterGender === 'male' ? '#fff' : '#666'} 
                    />
                    <Text style={[
                      styles.genderText,
                      formData.characterGender === 'male' && styles.genderTextActive
                    ]}>Boy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      formData.characterGender === 'female' && styles.genderButtonActive
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, characterGender: 'female' }))}
                  >
                    <MaterialCommunityIcons 
                      name="face-woman" 
                      size={24} 
                      color={formData.characterGender === 'female' ? '#fff' : '#666'} 
                    />
                    <Text style={[
                      styles.genderText,
                      formData.characterGender === 'female' && styles.genderTextActive
                    ]}>Girl</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
            onPress={() => isValid && onNext(formData)}
            disabled={!isValid}
          >
            <Text style={styles.nextButtonText}>Create Story</Text>
            <MaterialCommunityIcons name="auto-fix" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'LoraItalic',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  genderButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  genderText: {
    fontSize: 16,
    color: '#666',
  },
  genderTextActive: {
    color: '#fff',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
  },
  nextButtonDisabled: {
    backgroundColor: '#a5a6f6',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});