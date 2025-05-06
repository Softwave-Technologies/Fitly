import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const image = require('../../assets/onboarding/logo.png');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          style={[styles.textInput, { width: Dimensions.get('window').width / 2 }]}
          value={code}
          placeholder="Verification code"
          placeholderTextColor="#888"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        <Pressable
          onPress={onVerifyPress}
          style={{
            backgroundColor: '#00BCD4',
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Verify</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.bodyContainer}>
          <Image
            source={image}
            style={{ width: 200, height: 200, borderRadius: 30, alignSelf: 'center', margin: 5 }}
          />
          <Text style={styles.title}>Fitly</Text>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="email@email.com"
            placeholderTextColor="gainsboro"
            onChangeText={(email) => setEmailAddress(email)}
          />
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="**********"
            placeholderTextColor="gainsboro"
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
          />
          {password.length < 8 && (
            <Text style={styles.warningMessage}>Password must be minimum of 8 characters!</Text>
          )}
          <View style={styles.button}>
            <Pressable onPress={onSignUpPress} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Text style={[styles.buttonText, { color: '#888' }]}>Already have an account?</Text>
            <Link asChild href="/(auth)/sign-in">
              <Pressable>
                <Text style={styles.buttonText}>Sign In</Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  bodyContainer: {
    width: '100%',
    padding: 10,
  },
  title: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 30,
  },
  textInput: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
    marginTop: 16,
    marginBottom: 4,
  },
  warningMessage: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    fontSize: 14,
  },
  buttonContainer: {
    backgroundColor: '#6c47ff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
