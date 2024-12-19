import {Image, Text, View, StyleSheet, Dimensions} from "react-native";
import * as AppleAuthentication from 'expo-apple-authentication';
import {useAuth} from "@/store/AuthContext";
import {useEffect} from "react";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

export default function Index() {
  const { signInWithApple, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/home")
    }, 500)
  }, []);

  return (
    <View>
      <Image
        source={require("@/assets/images/welcome.jpeg")}
        style={styles.welcomeLogo}
      />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Hello!</Text>
        <Text style={styles.welcomeSubText}>Welcome to DreamJourney! We’re super excited to see you. Jump into a universe of fun, learning, and creativity. Your adventure starts now—let’s make something amazing together!</Text>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={signInWithApple}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeLogo: {
    width: width,
    height: 500,
  },
  container: {
    backgroundColor: '#fff',
    height: "100%"
  },
  welcomeText: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: "700",
    paddingTop: 10,
    color: '#222',
    fontFamily: 'LoraItalic',
  },
  welcomeSubText: {
    paddingTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'LoraItalic',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 15,
    color: '#222',
  },
  button: {
    height: 44,
    marginTop: 24,
    marginLeft: width / 2 - 100,
    marginRight: width / 2 - 100,
    textAlign: 'center',
  },
});
