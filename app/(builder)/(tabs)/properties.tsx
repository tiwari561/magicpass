import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import StatusBadge from '@/components/StatusBadge';
import { MOCK_PROPERTIES } from '@/constants/mockData';

export default function BuilderPropertiesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Properties</Text>
        <Text style={styles.subtitle}>{MOCK_PROPERTIES.length} active listings</Text>
        <Pressable style={styles.addBtn}>
          <Ionicons name="add" size={18} color={Colors.white} />
          <Text style={styles.addBtnText}>Add property</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.tableHeader}>
          <Text style={[styles.col, styles.colName]}>PROPERTY</Text>
          <Text style={[styles.col, styles.colStatus]}>STATUS</Text>
          <Text style={[styles.col, styles.colFloors]}>FLOORS</Text>
          <Text style={[styles.col, styles.colQr]}>QR</Text>
        </View>

        {MOCK_PROPERTIES.map(prop => {
          const avail = prop.floors.filter(f => f.status === 'available').length;
          return (
            <Pressable
              key={prop.id}
              style={styles.tableRow}
              onPress={() => router.push({ pathname: '/(builder)/floors', params: { propertyId: prop.id } })}
            >
              <View style={styles.colName}>
                <Text style={styles.propName} numberOfLines={1}>{prop.name}</Text>
                <Text style={styles.propLocality} numberOfLines={1}>{prop.locality}</Text>
                <View style={styles.propMeta}>
                  <Text style={styles.propMetaText}>{prop.accommodation}</Text>
                  <Text style={styles.propMetaDot}>·</Text>
                  <Text style={styles.propMetaText}>{prop.constructionStatus}</Text>
                </View>
              </View>
              <View style={styles.colStatus}>
                <StatusBadge status="available" small />
              </View>
              <View style={styles.colFloors}>
                <Text style={styles.floorsText}>{avail}/{prop.floors.length}</Text>
                <Text style={styles.floorsLabel}>avail</Text>
              </View>
              <View style={styles.colQr}>
                <Pressable
                  style={styles.qrBtn}
                  onPress={() => router.push({ pathname: '/(builder)/qr', params: { propertyId: prop.id } })}
                >
                  <Ionicons name="qr-code-outline" size={16} color={Colors.primary} />
                </Pressable>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  title: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  subtitle: { flex: 1, fontSize: FontSize.sm, color: Colors.textSecondary },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primary, borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md, paddingVertical: 8,
  },
  addBtnText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.white },
  scroll: { paddingBottom: 100 },
  tableHeader: {
    flexDirection: 'row', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    backgroundColor: Colors.background, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  col: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.6 },
  colName: { flex: 3 },
  colStatus: { flex: 1.5, alignItems: 'center' },
  colFloors: { flex: 1, alignItems: 'center' },
  colQr: { flex: 0.8, alignItems: 'center' },
  tableRow: {
    flexDirection: 'row', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  propName: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  propLocality: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 1 },
  propMeta: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  propMetaText: { fontSize: FontSize.xs, color: Colors.textMuted },
  propMetaDot: { fontSize: FontSize.xs, color: Colors.textMuted },
  floorsText: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.text, textAlign: 'center' },
  floorsLabel: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center' },
  qrBtn: {
    width: 32, height: 32, borderRadius: Radius.sm,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
});
