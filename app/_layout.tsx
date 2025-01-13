import '../global.css';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';

import { tokenCache } from '~/utils/cache';

export default function Layout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error('Missing Publishable key.Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!');
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
