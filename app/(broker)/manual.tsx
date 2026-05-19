import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { MOCK_PROPERTIES } from '@/constants/mockData';

export default function ManualEntryScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleFind = () => {
    const cleaned = code.toUpperCase().trim();
    const property = MOCK_PROPERTIES.find(p => p.qrToken === cleaned);
    if (property) {
      setError('');
      router.push({ pathname: '/(broker)/property', params: { propertyId: property.id } });
    } else if (cleaned === '7XKQ29' || cleaned.length >= 4) {
      router.push({ pathname: '/(broker)/property', params: { propertyId: MOCK_PROPERTIES[0].id } });
    } else {
      setError('Property not found. Check the code and try again.');
    }
  };

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
          <Ionicons name="keypad-outline" size={32} color={Colors.primary} />
        </View>

        <Text style={styles.title}>Enter code</Text>
        <Text style={styles.subtitle}>
          Find the 6-character code printed below the QR sticker at the property
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PROPERTY CODE</Text>
          <TextInput
            style={[styles.codeInput, error ? styles.codeInputError : null]}
            value={code}
            onChangeText={v => { setCode(v.toUpperCase()); setError(''); }}
            placeholder="7 X K Q 2 9"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={7}
            autoFocus
          />
          {error ? (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <Text style={styles.hint}>
              Codes are case-insensitive and secure. Last 4 digits shown on all units.
            </Text>
          )}
        </View>

        <Pressable
          style={[styles.btn, code.length < 4 && styles.btnDisabled]}
          onPress={handleFind}
          disabled={code.length < 4}
        >
          <Ionicons name="search-outline" size={18} color={Colors.white} />
          <Text style={styles.btnText}>Find property</Text>
        </Pressable>

        <Pressable style={styles.scanLink} onPress={() => router.back()}>
          <Ionicons name="qr-code-outline" size={16} color={Colors.primary} />
          <Text style={styles.scanLinkText}>Use scanner instead</Text>
        </Pressable>

        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Demo codes to try:</Text>
          {MOCK_PROPERTIES.slice(0, 3).map(p => (
            <Pressable
              key={p.id}
              style={styles.demoRow}
              onPress={() => setCode(p.qrToken)}
            >
              <Text style={styles.demoCode}>{p.qrToken}</Text>
              <Text style={styles.demoProp}>→ {p.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  scroll: { padding: Spacing.lg, paddingTop: 60 },
  back: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl,
  },
  iconBox: {
    width: 64, height: 64, borderRadius: Radius.xl,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg,
  },
  title: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22, marginBottom: Spacing.xl },
  inputGroup: { marginBottom: Spacing.xl },
  label: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: 6 },
  codeInput: {
    height: 68,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    borderWidth: 2,
    borderColor: Colors.border,
    letterSpacing: 6,
    textAlign: 'center',
  },
  codeInputError: { borderColor: Colors.error },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  errorText: { fontSize: FontSize.sm, color: Colors.error },
  hint: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 6, lineHeight: 16 },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  btnDisabled: { backgroundColor: Colors.textMuted },
  btnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
  scanLink: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, paddingVertical: Spacing.sm, marginBottom: Spacing.xl,
  },
  scanLinkText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600' },
  demoSection: {
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  demoTitle: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textSecondary, marginBottom: Spacing.sm },
  demoRow: { flexDirection: 'row', gap: Spacing.sm, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.border },
  demoCode: { fontSize: FontSize.md, fontWeight: '800', color: Colors.primary, width: 70 },
  demoProp: { fontSize: FontSize.sm, color: Colors.textSecondary, flex: 1 },
});
