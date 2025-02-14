import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
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
            placeholder="Enter email"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Enter password"
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
          />
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          <Pressable style={styles.googleButton} onPress={handleGoogleAuth}>
            <Text style={styles.signInGoogleText}>Sign in with Google</Text>
            <FontAwesome name="google" size={20} color="black" />
          </Pressable>
          <Button title="Sign in" onPress={onSignInPress} color="cyan" />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    color: 'gainsboro',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 30,
  },
  bodyContainer: {
    gap: 5,
    width: Dimensions.get('window').width,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  inputText: {
    color: 'gainsboro',
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  bottomText: {
    color: 'gainsboro',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signupContainer: {
    gap: 20,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'gainsboro',
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
    width: Dimensions.get('window').width / 2,
  },
  signupText: {
    color: 'purple',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  errorMessage: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: Dimensions.get('window').width / 2,
    alignSelf: 'center',
  },
  signInGoogleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
