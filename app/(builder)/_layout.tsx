import { Stack } from 'expo-router';

export default function BuilderLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="approval" />
      <Stack.Screen name="floors" />
      <Stack.Screen name="qr" />
    </Stack>
  );
}
