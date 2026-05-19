import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

const SERVICE_AREAS = ['Worli', 'Lower Parel', 'Prabhadevi', 'Bandra', 'Andheri', 'BKC', 'Powai', 'Thane', 'Mulund', 'Lonavala'];

export default function SetupScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Arjun Kapoor');
  const [email, setEmail] = useState('arjun.k@akrealty.in');
  const [company, setCompany] = useState('AK Realty LLP');
  const [address, setAddress] = useState('301, Lotus Plaza, Lower Parel');
  const [selected, setSelected] = useState<string[]>(['Worli', 'Lower Parel', 'Prabhadevi']);

  const toggleArea = (area: string) => {
    setSelected(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleNext = () => {
    if (step < 2) setStep(s => s + 1);
    else router.replace('/(broker)/identity');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.progressRow}>
          <Pressable onPress={() => step > 1 ? setStep(s => s - 1) : router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </Pressable>
          <Text style={styles.stepText}>Profile setup  {step}/2</Text>
        </View>

        {step === 1 && (
          <>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Field label="FULL NAME" value={name} onChangeText={setName} />
            <Field label="EMAIL" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <Field label="COMPANY NAME" value={company} onChangeText={setCompany} />
            <Field label="OFFICE ADDRESS" value={address} onChangeText={setAddress} />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.title}>Service areas</Text>
            <Text style={styles.subtitle}>Select the areas you primarily work in</Text>
            <View style={styles.areaGrid}>
              {SERVICE_AREAS.map(area => (
                <Pressable
                  key={area}
                  style={[styles.areaChip, selected.includes(area) && styles.areaSelected]}
                  onPress={() => toggleArea(area)}
                >
                  <Text style={[styles.areaText, selected.includes(area) && styles.areaTextSelected]}>
                    {area}
                  </Text>
                  {selected.includes(area) && (
                    <Ionicons name="close" size={14} color={Colors.primary} />
                  )}
                </Pressable>
              ))}
            </View>
          </>
        )}

        <Pressable style={styles.btn} onPress={handleNext}>
          <Text style={styles.btnText}>{step < 2 ? 'Continue' : 'Next: Identity Proof'}</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, value, onChangeText, keyboardType }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor={Colors.textMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  scroll: { padding: Spacing.lg, paddingTop: 60 },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  stepText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  field: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  input: {
    height: 52,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  areaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  areaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  areaSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  areaText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  areaTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  btnText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.white,
  },
});
