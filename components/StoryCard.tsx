import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

type StoryCardProps = {
  content: string;
  imageUrl: string;
  createdAt: string;
  width: number;
  onPress?: () => void;
};

const StoryCard = ({ content, imageUrl, createdAt, width, onPress }: StoryCardProps) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  // İlk 50 karakteri başlık olarak kullan
  const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
  
  // Tarihi formatla
  const formattedDate = format(new Date(createdAt), 'd MMMM yyyy', { locale: tr });

  return (
    <CardComponent 
      style={[styles.storyCard, { width, height: width * 1.2 }]}
      onPress={onPress}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.thumbnail} 
        resizeMode="cover" 
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.contentOverlay}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.date}>
            {formattedDate}
          </Text>
        </View>
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  storyCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'LoraItalic',
  },
  date: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  newBadge: {
    position: 'absolute',
    top: -80,
    right: 16,
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default StoryCard;