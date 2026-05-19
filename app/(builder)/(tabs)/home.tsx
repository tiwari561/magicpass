import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { MOCK_BUILDER, PENDING_APPROVALS } from '@/constants/mockData';

export default function BuilderHomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const builder = MOCK_BUILDER;
  const [approvals, setApprovals] = useState(PENDING_APPROVALS);

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
  };

  const handleReject = (id: string) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {builder.name.split(' ')[0]}</Text>
          <Text style={styles.date}>{today}</Text>
        </View>
        <Pressable style={styles.avatarBtn}>
          <Text style={styles.avatarText}>{builder.initials}</Text>
        </Pressable>
      </View>

      <View style={styles.statsGrid}>
        <StatCard icon="people-outline" value={builder.pendingApprovals} label="Pending" color={Colors.warning} />
        <StatCard icon="qr-code-outline" value={builder.qrScansToday} label="QR scans today" color={Colors.primary} />
        <StatCard icon="checkmark-circle-outline" value={builder.verifiedBrokers} label="Verified" color={Colors.success} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PENDING APPROVALS</Text>
          <Text style={styles.sectionCount}>{approvals.length} waiting</Text>
        </View>

        {approvals.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="checkmark-circle" size={48} color={Colors.success} />
            <Text style={styles.emptyTitle}>All clear!</Text>
            <Text style={styles.emptyText}>No pending approvals</Text>
          </View>
        )}

        {approvals.map(approval => (
          <Pressable
            key={approval.id}
            style={styles.approvalCard}
            onPress={() => router.push({ pathname: '/(builder)/approval', params: { approvalId: approval.id } })}
          >
            <View style={styles.approvalHeader}>
              <View style={styles.brokerAvatar}>
                <Text style={styles.brokerAvatarText}>{approval.brokerInitials}</Text>
              </View>
              <View style={styles.brokerInfo}>
                <Text style={styles.brokerName}>{approval.brokerName}</Text>
                {approval.brokerId && (
                  <Text style={styles.brokerId}>{approval.brokerId}</Text>
                )}
              </View>
              <View style={styles.waitingBadge}>
                <Ionicons name="time-outline" size={12} color={Colors.warning} />
                <Text style={styles.waitingText}>{approval.waitingTime}</Text>
              </View>
            </View>

            <Text style={styles.propertyName}>{approval.propertyName}</Text>

            {approval.brokerNote ? (
              <Text style={styles.brokerNote} numberOfLines={2}>"{approval.brokerNote}"</Text>
            ) : null}

            {approval.builderNote ? (
              <View style={styles.builderNoteRow}>
                <Ionicons name="information-circle" size={12} color={Colors.primary} />
                <Text style={styles.builderNoteText}>{approval.builderNote}</Text>
              </View>
            ) : null}

            <View style={styles.approvalActions}>
              <Pressable
                style={[styles.actionBtn, styles.approveBtn]}
                onPress={() => handleApprove(approval.id)}
              >
                <Ionicons name="checkmark" size={16} color={Colors.white} />
                <Text style={styles.approveBtnText}>Approve & notify caretaker</Text>
              </Pressable>
              <Pressable
                style={[styles.actionBtn, styles.rejectBtn]}
                onPress={() => handleReject(approval.id)}
              >
                <Ionicons name="close" size={16} color={Colors.error} />
                <Text style={styles.rejectBtnText}>Reject</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, value, label, color }: any) {
  return (
    <View style={[styles.statCard, { borderTopColor: color, borderTopWidth: 3 }]}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  greeting: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  date: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  avatarBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: FontSize.md, fontWeight: '800', color: Colors.white },
  statsGrid: {
    flexDirection: 'row', gap: Spacing.sm,
    padding: Spacing.md, backgroundColor: Colors.background,
  },
  statCard: {
    flex: 1, backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.md, alignItems: 'center', gap: 4,
  },
  statValue: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center' },
  scroll: { padding: Spacing.md, paddingBottom: 100 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.sm },
  sectionTitle: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.8 },
  sectionCount: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.warning },
  empty: { alignItems: 'center', paddingVertical: Spacing.xxl },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text, marginTop: Spacing.md },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: 4 },
  approvalCard: {
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
    borderLeftWidth: 4, borderLeftColor: Colors.warning,
  },
  approvalHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  brokerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  brokerAvatarText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.white },
  brokerInfo: { flex: 1 },
  brokerName: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  brokerId: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 1 },
  waitingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.warningLight, paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full,
  },
  waitingText: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.warning },
  propertyName: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.xs },
  brokerNote: { fontSize: FontSize.sm, color: Colors.textSecondary, fontStyle: 'italic', marginBottom: Spacing.xs },
  builderNoteRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.sm },
  builderNoteText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: '600' },
  approvalActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.xs, height: 44, borderRadius: Radius.md,
  },
  approveBtn: { backgroundColor: Colors.success },
  approveBtnText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.white },
  rejectBtn: { backgroundColor: Colors.errorLight, borderWidth: 1, borderColor: Colors.error },
  rejectBtnText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.error },
});
