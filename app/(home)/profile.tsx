import { useClerk, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, Alert, StyleSheet, Image, TextInput } from 'react-native';

import { Button } from '~/components/Button';

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!currentPassword || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all password fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await user?.updatePassword({
        currentPassword,
        newPassword: password,
      });
      Alert.alert('Success', 'Password updated successfully!');
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to update password.');
    }
  };

  const handleDeleteUser = async () => {
    try {
      await user?.delete();
      Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
      router.push('/(auth)/sign-in');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to delete account.');
    }
  };
  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView>
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Profile</Text>
        </View>
        <View className="p-4">
          {user?.imageUrl && <Image source={{ uri: user?.imageUrl }} style={styles.image} />}
          <View className="border-hairline border-gray-300 p-2">
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Email Address:</Text>
              <Text style={styles.infoText}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Current Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Current Password..."
                value={currentPassword}
                secureTextEntry
                onChangeText={setCurrentPassword}
                placeholderTextColor="white"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>New Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter New Password..."
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                placeholderTextColor="white"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password..."
                value={confirmPassword}
                secureTextEntry
                onChangeText={setConfirmPassword}
                placeholderTextColor="white"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Update Password" onPress={handleChangePassword} className="mx-5" />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Delete User" onPress={handleDeleteUser} className="mx-5 bg-red-500" />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Sign Out" onPress={() => signOut()} className="mx-5" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 30,
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gainsboro',
    padding: 20,
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
  },
  infoTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    width: 150,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    padding: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
    padding: 5,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
