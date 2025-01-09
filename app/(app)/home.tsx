import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import StoryCard from '@/components/StoryCard';
import NewStoryCard from '@/components/NewStoryCard';
import { useLanguage } from '@/store/LanguageContext';
import api from '@/lib/api';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 sütun, kenarlardan 16px padding, kartlar arası 16px boşluk

type Story = {
  _id: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};

export default function Home() {
  const { t } = useLanguage();
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await api.get<Story[]>('/stories');
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bg.jpeg')}
      style={styles.container}>
      <View style={styles.overlay}>
        <ScrollView>
          {/* Karşılama Mesajı */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              {t('hello')}
            </Text>
            <Text style={styles.subtitle}>
              {t('want.to.create')}
            </Text>
          </View>

          {/* Hikayeler Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('your.stories')}</Text>
            <View style={styles.grid}>
              <NewStoryCard
                onPress={() => router.push('/story/create-story')}
                width={CARD_WIDTH}
              />
              {stories.map((story, index) => (
                <TouchableOpacity
                  key={story._id}
                  onPress={() => router.push({
                    pathname: '/(app)/story/[id]',
                    params: { id: story._id }
                  })}
                >
                  <StoryCard
                    content={story.content}
                    imageUrl={story.imageUrl}
                    createdAt={story.createdAt}
                    width={CARD_WIDTH}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingTop: 60,
  },
  welcomeSection: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'LoraItalic',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  section: {
    marginTop: 24,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'flex-start',
  },
});
