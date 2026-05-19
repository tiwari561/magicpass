import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import StatusBadge from '@/components/StatusBadge';
import { MOCK_BROKER } from '@/constants/mockData';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const broker = MOCK_BROKER;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{broker.initials}</Text>
          </View>
          <Pressable style={styles.editBtn}>
            <Ionicons name="settings-outline" size={20} color={Colors.textSecondary} />
          </Pressable>
        </View>
        <Text style={styles.name}>{broker.name}</Text>
        <Text style={styles.company}>{broker.company}</Text>
        <View style={styles.phoneBadge}>
          <Ionicons name="call-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.phoneText}>{broker.phone}</Text>
          <StatusBadge status="verified" small />
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat value={broker.visitsCount} label="Visits" />
        <View style={styles.statDivider} />
        <Stat value={broker.buildersCount} label="Builders" />
        <View style={styles.statDivider} />
        <Stat value={broker.referencesCount} label="References" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
        <MenuItem
          icon="star-outline"
          label="Remove preferred"
          subtitle="Future visits will need manual approval"
          onPress={() => {}}
        />
        <MenuItem
          icon="pencil-outline"
          label="Add internal note"
          subtitle="Visible only to your team"
          onPress={() => {}}
        />
        <MenuItem
          icon="ban-outline"
          label="Blacklist broker"
          subtitle="Block from all properties"
          danger
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFILE</Text>
        <MenuItem
          icon="shield-checkmark-outline"
          label="Identity proofs"
          subtitle="2 approved · Aadhaar verified"
          onPress={() => {}}
        />
        <MenuItem
          icon="people-outline"
          label="References"
          subtitle="3 approved · Add more"
          onPress={() => router.push('/(broker)/references')}
        />
        <MenuItem
          icon="create-outline"
          label="Edit profile"
          subtitle="Name, photo, contact info"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RERA</Text>
        <View style={styles.reraBox}>
          <Ionicons name="document-text-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.reraText}>{broker.reraNumber}</Text>
        </View>
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

function MenuItem({ icon, label, subtitle, danger, onPress }: any) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress} android_ripple={{ color: '#f3f4f6' }}>
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
        <Ionicons name={icon} size={18} color={danger ? Colors.error : Colors.primary} />
      </View>
      <View style={styles.menuText}>
        <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.white },
  editBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  company: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.sm },
  phoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  phoneText: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '500' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.md,
    overflow: 'hidden',
  },
  stat: { flex: 1, alignItems: 'center', paddingVertical: Spacing.md },
  statValue: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  section: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconDanger: { backgroundColor: Colors.errorLight },
  menuText: { flex: 1 },
  menuLabel: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  menuLabelDanger: { color: Colors.error },
  menuSubtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 1 },
  reraBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  reraText: { fontSize: FontSize.md, color: Colors.text, fontWeight: '500', letterSpacing: 1 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    margin: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.error },
});
