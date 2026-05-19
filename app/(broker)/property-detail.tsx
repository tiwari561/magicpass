import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import StatusBadge from '@/components/StatusBadge';
import FloorRow from '@/components/FloorRow';
import { MOCK_PROPERTIES } from '@/constants/mockData';

const TABS = ['Details', 'QR Code', 'Visits', 'Attachments (3)'] as const;

export default function PropertyDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { propertyId } = useLocalSearchParams<{ propertyId: string }>();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Details');

  const property = MOCK_PROPERTIES.find(p => p.id === propertyId) ?? MOCK_PROPERTIES[0];
  const availableFloors = property.floors.filter(f => f.status === 'available').length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.propName}>{property.name}</Text>
          <Text style={styles.locality}>{property.locality}</Text>
        </View>
        <StatusBadge status="available" small />
      </View>

      <View style={styles.subHeader}>
        <View style={styles.metaRow}>
          <MetaChip icon="bed-outline" value={property.accommodation} />
          <MetaChip icon="construct-outline" value={property.constructionStatus} />
          <MetaChip icon="layers-outline" value={`${availableFloors} floors`} />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
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

      <ScrollView contentContainerStyle={styles.scroll}>
        {activeTab === 'Details' && (
          <>
            <View style={styles.section}>
              <Row label="Accommodation" value={property.accommodation} />
              <Row label="Construction Status" value={property.constructionStatus} />
              <Row label="Possession" value={property.possession} />
              <Row label="Plot Size" value={`${property.plotSize.toLocaleString()} sq. yard`} />
              <Row label="Covered Area" value={`${property.coveredArea.toLocaleString()} sq.ft`} />
              <Row label="Floor & Parking" value={`${property.floor} · ${property.carParking} car park`} />
              <Row label="Asking Price" value={property.askingPrice} highlight />
              <Row label="Facing" value={property.facing} />
            </View>

            {property.propertyFeatures.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROPERTY FEATURES</Text>
                <View style={styles.featureGrid}>
                  {property.propertyFeatures.map(f => (
                    <View key={f} style={styles.featureChip}>
                      <Ionicons name="checkmark" size={12} color={Colors.success} />
                      <Text style={styles.featureText}>{f}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>FLOOR AVAILABILITY</Text>
              {property.floors.map(floor => (
                <FloorRow key={floor.code} floor={floor} />
              ))}
            </View>
          </>
        )}

        {activeTab === 'QR Code' && (
          <View style={styles.qrSection}>
            <View style={styles.qrBox}>
              <View style={styles.qrPlaceholder}>
                <Ionicons name="qr-code" size={80} color={Colors.text} />
              </View>
              <Text style={styles.qrToken}>{property.qrToken}</Text>
            </View>
            <View style={styles.qrActions}>
              <Pressable style={styles.qrBtn}>
                <Ionicons name="download-outline" size={16} color={Colors.primary} />
                <Text style={styles.qrBtnText}>Download PNG</Text>
              </Pressable>
              <Pressable style={styles.qrBtn}>
                <Ionicons name="share-social-outline" size={16} color={Colors.primary} />
                <Text style={styles.qrBtnText}>Share via WhatsApp</Text>
              </Pressable>
            </View>
          </View>
        )}

        {activeTab === 'Visits' && (
          <View style={styles.section}>
            <Text style={styles.emptyText}>No visits recorded yet for this property.</Text>
          </View>
        )}

        {activeTab === 'Attachments (3)' && (
          <View style={styles.section}>
            {['Layout_plan_1203.pdf', 'Living_room_view.jpg', 'Brochure_Parkbliss.pdf'].map(f => (
              <Pressable key={f} style={styles.attachRow}>
                <Ionicons name={f.endsWith('.pdf') ? 'document-text-outline' : 'image-outline'} size={18} color={Colors.primary} />
                <Text style={styles.attachName}>{f}</Text>
                <Ionicons name="download-outline" size={16} color={Colors.textMuted} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={styles.requestBtn}
          onPress={() => router.push({ pathname: '/(broker)/property', params: { propertyId: property.id } })}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
          <Text style={styles.requestBtnText}>Request visit</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, highlight && styles.detailValueHighlight]}>{value}</Text>
    </View>
  );
}

function MetaChip({ icon, value }: { icon: any; value: string }) {
  return (
    <View style={styles.metaChip}>
      <Ionicons name={icon} size={12} color={Colors.textSecondary} />
      <Text style={styles.metaChipText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.card, gap: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  headerInfo: { flex: 1 },
  propName: { fontSize: FontSize.lg, fontWeight: '800', color: Colors.text },
  locality: { fontSize: FontSize.sm, color: Colors.textSecondary },
  subHeader: {
    backgroundColor: Colors.card, paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  metaRow: { flexDirection: 'row', gap: Spacing.sm },
  metaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.background, paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: Radius.full,
  },
  metaChipText: { fontSize: FontSize.xs, color: Colors.textSecondary },
  tabBar: { backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.border, maxHeight: 48 },
  tabRow: { flexDirection: 'row', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm },
  tab: { paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: Colors.white },
  scroll: { padding: Spacing.md, paddingBottom: 100 },
  section: {
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  sectionTitle: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: Spacing.sm },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  detailLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, flex: 1 },
  detailValue: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text, flex: 1, textAlign: 'right' },
  detailValueHighlight: { color: Colors.primary, fontSize: FontSize.md },
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  featureChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.successLight, paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: Radius.full,
  },
  featureText: { fontSize: FontSize.xs, color: Colors.success, fontWeight: '600' },
  qrSection: { alignItems: 'center', padding: Spacing.lg },
  qrBox: { alignItems: 'center', marginBottom: Spacing.lg },
  qrPlaceholder: {
    width: 180, height: 180, borderRadius: Radius.lg,
    backgroundColor: Colors.card, borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
  qrToken: { fontSize: FontSize.xxxl, fontWeight: '900', color: Colors.text, letterSpacing: 4 },
  qrActions: { gap: Spacing.sm, width: '100%' },
  qrBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, height: 48, borderRadius: Radius.lg,
    borderWidth: 1.5, borderColor: Colors.primary, backgroundColor: Colors.primaryLight,
  },
  qrBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.primary },
  emptyText: { fontSize: FontSize.md, color: Colors.textMuted, textAlign: 'center', paddingVertical: Spacing.lg },
  attachRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  attachName: { flex: 1, fontSize: FontSize.md, color: Colors.text, fontWeight: '500' },
  bottomBar: {
    padding: Spacing.md, backgroundColor: Colors.card,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  requestBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.lg, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
  },
  requestBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
});
