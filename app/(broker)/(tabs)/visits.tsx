import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import StatusBadge from '@/components/StatusBadge';
import { MOCK_VISITS } from '@/constants/mockData';

const TABS = ['All', 'Approved', 'Pending', 'Rejected'] as const;

export default function VisitsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All');

  const filtered = MOCK_VISITS.filter(v => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Approved') return v.status === 'approved' || v.status === 'entered';
    if (activeTab === 'Pending') return v.status === 'pending';
    if (activeTab === 'Rejected') return v.status === 'rejected';
    return true;
  });

  const handleVisitPress = (visit: typeof MOCK_VISITS[0]) => {
    if (visit.status === 'approved') {
      router.push({ pathname: '/(broker)/approved', params: { visitId: visit.id } });
    } else if (visit.status === 'rejected') {
      router.push({ pathname: '/(broker)/rejected', params: { visitId: visit.id } });
    } else if (visit.status === 'pending') {
      router.push({ pathname: '/(broker)/waiting', params: { visitId: visit.id } });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Visits</Text>
        <Pressable style={styles.filterBtn}>
          <Ionicons name="funnel-outline" size={18} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
        <View style={styles.tabRow}>
          {TABS.map(tab => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="time-outline" size={40} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No visits found</Text>
          </View>
        )}
        {filtered.map(visit => (
          <Pressable key={visit.id} style={styles.card} onPress={() => handleVisitPress(visit)}>
            <View style={styles.cardLeft}>
              <View style={[styles.statusDot, { backgroundColor: dotColor(visit.status) }]} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.propName} numberOfLines={1}>{visit.propertyName}</Text>
                <StatusBadge status={visit.status as any} small />
              </View>
              <Text style={styles.builder}>{visit.builderName}</Text>
              {visit.entryCode && (visit.status === 'approved') && (
                <View style={styles.codeRow}>
                  <Ionicons name="key-outline" size={13} color={Colors.primary} />
                  <Text style={styles.codeText}>Entry code: {visit.entryCode}</Text>
                  {visit.entryCodeExpiry && (
                    <Text style={[styles.expiry, visit.entryCodeExpiry === 'EXPIRED' && styles.expired]}>
                      · {visit.entryCodeExpiry}
                    </Text>
                  )}
                </View>
              )}
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.time}>{visit.requestedAt}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function dotColor(status: string) {
  if (status === 'approved' || status === 'entered') return Colors.success;
  if (status === 'pending') return Colors.warning;
  if (status === 'rejected') return Colors.error;
  return Colors.textMuted;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  filterBtn: { padding: Spacing.xs },
  tabScroll: { backgroundColor: Colors.card, maxHeight: 52 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  tab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: Colors.white },
  list: { padding: Spacing.md, gap: Spacing.sm },
  empty: { alignItems: 'center', paddingTop: Spacing.xxl },
  emptyText: { fontSize: FontSize.md, color: Colors.textMuted, marginTop: Spacing.sm },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLeft: { paddingTop: 6 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  cardContent: { flex: 1 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  propName: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, flex: 1, marginRight: Spacing.sm },
  builder: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 4 },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 3 },
  codeText: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '600' },
  expiry: { fontSize: FontSize.xs, color: Colors.success, fontWeight: '600' },
  expired: { color: Colors.textMuted },
  cardRight: { alignItems: 'flex-end', gap: 4 },
  time: { fontSize: FontSize.xs, color: Colors.textMuted },
});
