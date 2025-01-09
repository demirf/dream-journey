import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import StepOne from '@/components/story-creation/StepOne';
import api from '@/lib/api';
import { StoryLoadingOverlay } from '@/components/story-creation/StoryLoadingOverlay';
import { useLanguage } from '@/store/LanguageContext';

export type StoryFormData = {
  characterName: string;
  characterAge: string;
  characterGender: 'male' | 'female';
  characterInterest: string;
};

export default function CreateStory() {
  const router = useRouter();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);

  const initialData: StoryFormData = {
    characterName: '',
    characterAge: '',
    characterGender: 'male',
    characterInterest: '',
  };

  const handleCreateStory = async (data: Partial<StoryFormData>) => {
    try {
      setLoading(true);
      
      const response = await api.post('/stories', {
        characterName: data.characterName,
        characterAge: data.characterAge ? parseInt(data.characterAge) : undefined,
        characterGender: data.characterGender,
        characterInterest: data.characterInterest,
        language,
      });

      router.replace('/(app)/home');
    } catch (error) {
      console.error('Story creation failed:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <StoryLoadingOverlay />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StepOne 
        initialData={initialData} 
        onNext={handleCreateStory}
      />
    </View>
  );
} 