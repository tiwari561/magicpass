import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable, TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import FloorRow from '@/components/FloorRow';
import { PENDING_APPROVALS, MOCK_PROPERTIES } from '@/constants/mockData';
import { playApprovalSound } from '@/components/useApprovalSound';

export default function ApprovalDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { approvalId } = useLocalSearchParams<{ approvalId: string }>();
  const [builderNote, setBuilderNote] = useState('');
  const [approved, setApproved] = useState(false);

  const approval = PENDING_APPROVALS.find(a => a.id === approvalId) ?? PENDING_APPROVALS[0];
  const property = MOCK_PROPERTIES[0];

  const handleApprove = () => {
    playApprovalSound();
    setApproved(true);
    setTimeout(() => router.replace('/(builder)/(tabs)/home'), 1500);
  };

  if (approved) {
    return (
      <View style={[styles.container, styles.approvedView, { paddingTop: insets.top }]}>
        <View style={styles.approvedBox}>
          <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
          <Text style={styles.approvedTitle}>Approved!</Text>
          <Text style={styles.approvedSubtitle}>
            Caretaker has been notified. {approval.brokerName} will receive the entry code.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>Visit request</Text>
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={12} color={Colors.warning} />
          <Text style={styles.timeText}>{approval.requestedAt}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.brokerCard}>
          <View style={styles.brokerAvatar}>
            <Text style={styles.brokerAvatarText}>{approval.brokerInitials}</Text>
          </View>
          <View style={styles.brokerInfo}>
            <Text style={styles.brokerName}>{approval.brokerName}</Text>
            <Text style={styles.brokerCompany}>Mehta Properties · 18 visits with us</Text>
            {approval.brokerId && (
              <Text style={styles.brokerId}>ID {approval.brokerId}</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROPERTY</Text>
          <Text style={styles.propName}>{approval.propertyName}</Text>
        </View>

        {approval.brokerNote ? (
          <View style={styles.noteBox}>
            <Text style={styles.noteLabel}>BROKER'S NOTE</Text>
            <Text style={styles.noteText}>"{approval.brokerNote}"</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BROKER WILL SEE THESE FLOORS</Text>
          {property.floors.map(floor => (
            <FloorRow key={floor.code} floor={floor} />
          ))}
        </View>

        {approval.builderNote ? (
          <View style={styles.builderNoteDisplay}>
            <Ionicons name="information-circle" size={14} color={Colors.primary} />
            <Text style={styles.builderNoteDisplayText}>Builder note: {approval.builderNote}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADD NOTE FOR CARETAKER (OPTIONAL)</Text>
          <TextInput
            style={styles.noteInput}
            value={builderNote}
            onChangeText={setBuilderNote}
            placeholder="Add visit-specific note…"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.approveBtn} onPress={handleApprove}>
            <Ionicons name="checkmark" size={20} color={Colors.white} />
            <Text style={styles.approveBtnText}>Approve & notify caretaker</Text>
          </Pressable>
          <Pressable style={styles.rejectBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={18} color={Colors.error} />
            <Text style={styles.rejectBtnText}>Reject</Text>
          </Pressable>
          <Pressable style={styles.markBtn}>
            <Ionicons name="flag-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.markBtnText}>Mark as caretaker</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  approvedView: { alignItems: 'center', justifyContent: 'center' },
  approvedBox: { alignItems: 'center', padding: Spacing.xl },
  approvedTitle: { fontSize: 28, fontWeight: '900', color: Colors.success, marginTop: Spacing.md },
  approvedSubtitle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  timeBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.warningLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  timeText: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.warning },
  scroll: { padding: Spacing.md, paddingBottom: 40 },
  brokerCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  brokerAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  brokerAvatarText: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.white },
  brokerInfo: { flex: 1 },
  brokerName: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  brokerCompany: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 1 },
  brokerId: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1, letterSpacing: 1 },
  section: { backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  sectionTitle: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: Spacing.sm },
  propName: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text },
  noteBox: { backgroundColor: Colors.background, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  noteLabel: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: 4 },
  noteText: { fontSize: FontSize.md, color: Colors.text, fontStyle: 'italic', lineHeight: 22 },
  builderNoteDisplay: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.md },
  builderNoteDisplayText: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '600' },
  noteInput: {
    backgroundColor: Colors.background, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: FontSize.md, color: Colors.text,
    borderWidth: 1, borderColor: Colors.border, minHeight: 80, textAlignVertical: 'top',
  },
  actions: { gap: Spacing.sm },
  approveBtn: { backgroundColor: Colors.success, borderRadius: Radius.lg, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm },
  approveBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
  rejectBtn: { backgroundColor: Colors.errorLight, borderRadius: Radius.lg, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, borderWidth: 1, borderColor: Colors.error },
  rejectBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.error },
  markBtn: { backgroundColor: Colors.background, borderRadius: Radius.lg, height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  markBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.textSecondary },
});
