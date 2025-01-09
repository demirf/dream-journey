import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type NewStoryCardProps = {
  onPress: () => void;
  width: number;
};

const NewStoryCard = ({ onPress, width }: NewStoryCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.container, { width, height: width * 1.2 }]}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['#6366f1', '#818cf8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="add" size={32} color="#fff" />
          </View>
          <Text style={styles.title}>New Story</Text>
          <Text style={styles.subtitle}>Explore your imagination</Text>
        </View>
        
        {/* Dekoratif elementler */}
        <View style={[styles.decorCircle, styles.decorCircle1]} />
        <View style={[styles.decorCircle, styles.decorCircle2]} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    alignItems: 'center',
    gap: 12,
    zIndex: 1,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'LoraItalic',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  // Dekoratif daireler için stiller
  decorCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
  },
  decorCircle1: {
    width: 120,
    height: 120,
    top: -30,
    right: -30,
  },
  decorCircle2: {
    width: 80,
    height: 80,
    bottom: -20,
    left: -20,
  },
});

export default NewStoryCard;