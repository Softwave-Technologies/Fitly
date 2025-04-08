import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = useState('');

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  const handleGoogleAuth = React.useCallback(async () => {
    try {
      const { createdSessionId } = await googleAuth();

      if (createdSessionId) {
        if (setActive) {
          await setActive({ session: createdSessionId });
        }
        router.push('/(home)');
      } else {
        throw new Error('Google sign-in failed to create a session.');
      }
    } catch (error) {
      console.error('Error while logging in with Google', error);
      setError('Google sign-in failed. Please try again.');
    }
  }, [googleAuth, setActive, router]);

  const handleAppleAuth = React.useCallback(async () => {
    try {
      const { createdSessionId } = await appleAuth();

      if (createdSessionId) {
        if (setActive) {
          await setActive({ session: createdSessionId });
        }
        router.push('/(home)');
      } else {
        throw new Error('Apple sign-in failed to create a session.');
      }
    } catch (error) {
      console.error('Error while logging in with Apple', error);
      setError('Apple sign-in failed. Please try again.');
    }
  }, [appleAuth, setActive, router]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="email@email.com"
            placeholderTextColor="gainsboro"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          <View style={styles.signupContainer}>
            <Pressable style={styles.signupButton} onPress={onSignInPress}>
              <Text style={styles.signupText}>Sign in</Text>
            </Pressable>
          </View>
          <Pressable style={styles.googleButton} onPress={handleGoogleAuth}>
            <Text style={styles.signInGoogleText}>Sign in with Google</Text>
            <FontAwesome name="google" size={20} color="black" />
          </Pressable>
          <Pressable style={styles.googleButton} onPress={handleAppleAuth}>
            <Text style={styles.signInGoogleText}>Sign in with Apple</Text>
            <FontAwesome name="apple" size={20} color="black" />
          </Pressable>
          <View style={styles.signupContainer}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
            <Link href="/sign-up" asChild>
              <Pressable style={styles.signupButton}>
                <Text style={styles.signupText}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
          <StatusBar style="light" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: 'green',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  bodyContainer: {
    width: '100%',
    padding: 10,
  },
  inputText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
    marginTop: 16,
    marginBottom: 4,
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
  signupContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  signupButton: {
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
  signupText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  bottomText: {
    color: '#888',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'tomato',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
  signInGoogleText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
});
