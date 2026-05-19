import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { MOCK_BUILDER } from '@/constants/mockData';

export default function BuilderProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const builder = MOCK_BUILDER;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{builder.initials}</Text>
        </View>
        <Text style={styles.name}>{builder.name}</Text>
        <Text style={styles.company}>{builder.company}</Text>
      </View>

      <View style={styles.statsRow}>
        <Stat value={builder.pendingApprovals} label="Pending" />
        <View style={styles.divider} />
        <Stat value={builder.qrScansToday} label="Scans today" />
        <View style={styles.divider} />
        <Stat value={builder.verifiedBrokers} label="Verified" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MANAGE</Text>
        <MenuItem icon="business-outline" label="Properties" onPress={() => {}} />
        <MenuItem icon="people-outline" label="Brokers" onPress={() => {}} />
        <MenuItem icon="bar-chart-outline" label="Reports" onPress={() => {}} />
        <MenuItem icon="settings-outline" label="Settings" onPress={() => {}} />
      </View>

      <Pressable style={styles.logoutBtn} onPress={() => router.replace('/')}>
        <Ionicons name="log-out-outline" size={18} color={Colors.error} />
        <Text style={styles.logoutText}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuItem({ icon, label, onPress }: any) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={18} color={Colors.primary} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.card, padding: Spacing.lg, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.border },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  avatarText: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.white },
  name: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  company: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', backgroundColor: Colors.card, margin: Spacing.md, borderRadius: Radius.lg, overflow: 'hidden' },
  stat: { flex: 1, alignItems: 'center', paddingVertical: Spacing.md },
  statValue: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  divider: { width: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  section: { backgroundColor: Colors.card, borderRadius: Radius.lg, marginHorizontal: Spacing.md, marginBottom: Spacing.sm, overflow: 'hidden' },
  sectionTitle: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.8, padding: Spacing.md, paddingBottom: Spacing.sm },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    gap: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  menuIcon: { width: 36, height: 36, borderRadius: Radius.md, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, margin: Spacing.lg, padding: Spacing.md, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.error },
  logoutText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.error },
});
