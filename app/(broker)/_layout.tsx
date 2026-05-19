import { Stack } from 'expo-router';

export default function BrokerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="setup" />
      <Stack.Screen name="identity" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="manual" />
      <Stack.Screen name="property" />
      <Stack.Screen name="waiting" />
      <Stack.Screen name="approved" />
      <Stack.Screen name="rejected" />
      <Stack.Screen name="references" />
      <Stack.Screen name="property-detail" />
    </Stack>
  );
}
