import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Pressable,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import OTPInput from '@/components/OTPInput';

export default function OTPScreen() {
  const router = useRouter();
  const { role, phone } = useLocalSearchParams<{ role: string; phone: string }>();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(42);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleVerify = () => {
    if (otp.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'broker') {
        router.replace('/(broker)/setup');
      } else {
        router.replace('/(builder)/(tabs)/home');
      }
    }, 800);
  };

  const maskedPhone = phone ? `+91 ${phone.slice(0, 2)}••••${phone.slice(-4)}` : '+91 98••••1247';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>

        <View style={styles.iconBox}>
          <Ionicons name="chatbubble-ellipses-outline" size={32} color={Colors.primary} />
        </View>

        <Text style={styles.title}>Verify your phone</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to{'\n'}
          <Text style={styles.phone}>{maskedPhone}</Text>
        </Text>

        <View style={styles.otpArea}>
          <OTPInput value={otp} onChange={setOtp} />
        </View>

        <Text style={styles.resend}>
          {countdown > 0
            ? `Resend in 0:${countdown.toString().padStart(2, '0')}`
            : <Text style={styles.resendLink} onPress={() => setCountdown(42)}>Resend code</Text>
          }
        </Text>

        <Pressable
          style={[styles.btn, (otp.length < 6 || loading) && styles.btnDisabled]}
          onPress={handleVerify}
          disabled={otp.length < 6 || loading}
        >
          <Text style={styles.btnText}>{loading ? 'Verifying…' : 'Verify & continue'}</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.changeNumber}>Change number</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  scroll: { padding: Spacing.lg, paddingTop: 60 },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  phone: {
    fontWeight: '700',
    color: Colors.text,
  },
  otpArea: {
    marginBottom: Spacing.lg,
  },
  resend: {
    textAlign: 'center',
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  resendLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  btnDisabled: {
    backgroundColor: Colors.textMuted,
  },
  btnText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.white,
  },
  changeNumber: {
    textAlign: 'center',
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: '600',
    paddingVertical: Spacing.sm,
  },
});
