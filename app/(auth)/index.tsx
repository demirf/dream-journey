import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import * as AppleAuthentication from 'expo-apple-authentication';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export default function Welcome() {
  const { signInWithApple, loading } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithApple();
      router.replace('/(app)/home');
    } catch (error) {
      console.error('Sign In Error:', error);
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/welcome.jpeg')} 
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Hikaye Zamanı</Text>
        <Text style={styles.subtitle}>
          Hayal gücünü keşfet, kendi hikayeni yarat
        </Text>
      </View>

      <View style={styles.footer}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={12}
          style={styles.appleButton}
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'LoraItalic',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  appleButton: {
    height: 50,
    width: '100%',
  },
});