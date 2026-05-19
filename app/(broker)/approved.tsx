import React from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import FloorRow from '@/components/FloorRow';
import { MOCK_VISITS, MOCK_PROPERTIES } from '@/constants/mockData';

export default function ApprovedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { visitId } = useLocalSearchParams<{ visitId: string }>();

  const visit = MOCK_VISITS.find(v => v.id === visitId) ?? MOCK_VISITS[0];
  const property = MOCK_PROPERTIES.find(p => p.id === visit.propertyId) ?? MOCK_PROPERTIES[0];
  const approvedFloors = property.floors.filter(f => f.status === 'available');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#f0fdf4', '#dcfce7']} style={styles.heroArea}>
          <View style={styles.checkBox}>
            <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
          </View>
          <Text style={styles.heroTitle}>You're approved</Text>
          <Text style={styles.heroSubtitle}>
            Show this code to the caretaker at the entrance of
          </Text>
          <Text style={styles.propName}>{property.name}</Text>
        </LinearGradient>

        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>ENTRY CODE · VALID {visit.entryCodeExpiry ?? '30 MIN'}</Text>
          <Text style={styles.entryCode}>{(visit.entryCode ?? '482915').split('').join(' ')}</Text>
          <Text style={styles.codeHint}>Code expires once used or after 30 minutes</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FLOORS YOU CAN SHOW RIGHT NOW</Text>
          {approvedFloors.map(floor => (
            <FloorRow key={floor.code} floor={floor} />
          ))}
          {property.floors.filter(f => f.status !== 'available').map(floor => (
            <FloorRow key={floor.code} floor={{ ...floor, status: 'unavailable' }} strikethrough />
          ))}
        </View>

        {property.builderNote ? (
          <View style={styles.builderNote}>
            <Ionicons name="megaphone-outline" size={16} color={Colors.primary} />
            <View>
              <Text style={styles.builderNoteLabel}>BUILDER'S INSTRUCTION</Text>
              <Text style={styles.builderNoteText}>{property.builderNote}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn}>
            <Ionicons name="navigate-outline" size={18} color={Colors.primary} />
            <Text style={styles.actionBtnText}>Get directions</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.actionBtnSecondary]}>
            <Ionicons name="call-outline" size={18} color={Colors.textSecondary} />
            <Text style={[styles.actionBtnText, styles.actionBtnTextSecondary]}>Call caretaker</Text>
          </Pressable>
        </View>

        <Pressable style={styles.doneBtn} onPress={() => router.replace('/(broker)/(tabs)/visits')}>
          <Text style={styles.doneBtnText}>Back to my visits</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40 },
  heroArea: {
    alignItems: 'center',
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  checkBox: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.card,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  heroTitle: { fontSize: 28, fontWeight: '900', color: Colors.success, marginBottom: Spacing.xs },
  heroSubtitle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center' },
  propName: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginTop: 4, textAlign: 'center' },
  codeCard: {
    backgroundColor: Colors.card,
    margin: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.success,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  codeLabel: {
    fontSize: FontSize.xs, fontWeight: '700', color: Colors.success,
    letterSpacing: 0.8, marginBottom: Spacing.sm,
  },
  entryCode: {
    fontSize: 40, fontWeight: '900', color: Colors.text,
    letterSpacing: 6, marginBottom: Spacing.sm,
  },
  codeHint: { fontSize: FontSize.xs, color: Colors.textMuted },
  section: {
    backgroundColor: Colors.card, margin: Spacing.md, marginTop: 0,
    borderRadius: Radius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  sectionTitle: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: Spacing.sm },
  builderNote: {
    flexDirection: 'row', gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg, padding: Spacing.md,
    marginHorizontal: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.primary,
  },
  builderNoteLabel: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.primary, letterSpacing: 0.6, marginBottom: 2 },
  builderNoteText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: Spacing.sm, marginHorizontal: Spacing.md, marginBottom: Spacing.md },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, height: 48, borderRadius: Radius.lg,
    backgroundColor: Colors.primaryLight, borderWidth: 1, borderColor: Colors.primary,
  },
  actionBtnSecondary: { backgroundColor: Colors.background, borderColor: Colors.border },
  actionBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.primary },
  actionBtnTextSecondary: { color: Colors.textSecondary },
  doneBtn: {
    backgroundColor: Colors.card, borderRadius: Radius.lg, height: 52,
    alignItems: 'center', justifyContent: 'center',
    marginHorizontal: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  doneBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textSecondary },
});
