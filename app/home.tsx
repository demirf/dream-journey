import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';

const Home = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/bg.jpeg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View>
          <Text style={styles.title}>Hazır hikayeler 📖</Text>
          <View style={styles.storyCard}>
            <Image
              source={require("@/assets/images/welcome.jpeg")}
              style={styles.thumbnail}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    paddingTop: 75,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    color: '#fff', // Beyaz metin
    fontSize: 24, // Metin boyutu
    fontWeight: 'bold', // Metin kalınlığı
    fontFamily: 'LoraItalic',
  },
  storyCard: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: "cover"
  },
});

export default Home;
