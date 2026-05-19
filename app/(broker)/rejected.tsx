import React from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { MOCK_VISITS } from '@/constants/mockData';

export default function RejectedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { visitId } = useLocalSearchParams<{ visitId: string }>();

  const visit = MOCK_VISITS.find(v => v.id === visitId) ?? MOCK_VISITS[2];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#fff5f5', '#fee2e2']} style={styles.heroArea}>
          <View style={styles.xBox}>
            <Ionicons name="close-circle" size={64} color={Colors.error} />
          </View>
          <Text style={styles.heroTitle}>Access not allowed</Text>
          <Text style={styles.heroSubtitle}>
            The builder for{' '}
            <Text style={styles.propName}>{visit.propertyName}</Text>
            {' '}declined your request.
          </Text>
        </LinearGradient>

        <View style={styles.reasonBox}>
          <Text style={styles.reasonLabel}>REASON FROM BUILDER</Text>
          <Text style={styles.reasonText}>
            {visit.rejectionReason ?? 'No reason provided. Please contact the builder directly.'}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={() => router.replace('/(broker)/(tabs)/browse')}>
            <Ionicons name="search-outline" size={18} color={Colors.primary} />
            <Text style={styles.actionBtnText}>Find other properties</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.actionBtnSecondary]}>
            <Ionicons name="call-outline" size={18} color={Colors.textSecondary} />
            <Text style={[styles.actionBtnText, { color: Colors.textSecondary }]}>Contact builder</Text>
          </Pressable>
        </View>

        <Pressable style={styles.backBtn} onPress={() => router.replace('/(broker)/(tabs)/visits')}>
          <Text style={styles.backBtnText}>Back to my visits</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40 },
  heroArea: { alignItems: 'center', padding: Spacing.xl },
  xBox: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.card,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  heroTitle: { fontSize: 28, fontWeight: '900', color: Colors.error, marginBottom: Spacing.sm },
  heroSubtitle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  propName: { fontWeight: '700', color: Colors.text },
  reasonBox: {
    backgroundColor: Colors.card, margin: Spacing.md,
    borderRadius: Radius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  reasonLabel: {
    fontSize: FontSize.xs, fontWeight: '700', color: Colors.error,
    letterSpacing: 0.8, marginBottom: Spacing.sm,
  },
  reasonText: { fontSize: FontSize.md, color: Colors.text, lineHeight: 22 },
  actions: { flexDirection: 'row', gap: Spacing.sm, marginHorizontal: Spacing.md, marginBottom: Spacing.md },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, height: 48, borderRadius: Radius.lg,
    backgroundColor: Colors.primaryLight, borderWidth: 1, borderColor: Colors.primary,
  },
  actionBtnSecondary: { backgroundColor: Colors.background, borderColor: Colors.border },
  actionBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.primary },
  backBtn: {
    backgroundColor: Colors.card, borderRadius: Radius.lg, height: 52,
    alignItems: 'center', justifyContent: 'center',
    marginHorizontal: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  backBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textSecondary },
});
