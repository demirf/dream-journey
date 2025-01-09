import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import api from '@/lib/api';
import Toast from 'react-native-toast-message';
import { useLanguage } from '@/store/LanguageContext';

type Story = {
  _id: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};

export default function StoryDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('Story detail params:', params);

  useEffect(() => {
    if (params.id) {
      fetchStory();
    } else {
      setError('Hikaye ID\'si bulunamadı');
      setLoading(false);
    }
  }, [params.id]);

  const fetchStory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get<Story>(`/stories/${params.id}`);
      console.log('Story detail response:', response.data);
      
      if (response.data) {
        setStory(response.data);
      } else {
        setError('Hikaye bulunamadı');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
      setError('Hikaye yüklenirken bir hata oluştu');
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Hikaye yüklenirken bir hata oluştu'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchStory();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Hikaye yükleniyor...</Text>
      </View>
    );
  }

  if (error || !story) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#666" />
        <Text style={styles.errorText}>{error || 'Hikaye bulunamadı'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formattedDate = format(new Date(story.createdAt), 'd MMMM yyyy', { locale: tr });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Story Image */}
        <Image 
          source={{ uri: story.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />

        {/* Story Content */}
        <View style={styles.storyContent}>
          <Text style={styles.storyText}>
            {story.content}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  date: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  storyContent: {
    padding: 20,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});