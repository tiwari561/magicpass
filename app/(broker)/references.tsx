import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import StatusBadge from '@/components/StatusBadge';
import { REFERENCES } from '@/constants/mockData';

export default function ReferencesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>References</Text>
        <Pressable style={styles.addBtn}>
          <Ionicons name="add" size={20} color={Colors.primary} />
          <Text style={styles.addBtnText}>Add more</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
          <Text style={styles.infoText}>
            References boost trust with builders — they see reviews but never your identity
          </Text>
        </View>

        <Text style={styles.sectionTitle}>YOUR REFERENCES ({REFERENCES.length})</Text>

        {REFERENCES.map(ref => (
          <View key={ref.id} style={styles.refCard}>
            <View style={styles.refHeader}>
              <View style={styles.refAvatar}>
                <Text style={styles.refAvatarText}>
                  {ref.personName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </Text>
              </View>
              <View style={styles.refInfo}>
                <Text style={styles.refName}>{ref.personName}</Text>
                {ref.company && <Text style={styles.refCompany}>{ref.company}</Text>}
                {ref.builderName && <Text style={styles.refBuilder}>{ref.builderName}</Text>}
                {ref.phone && <Text style={styles.refPhone}>{ref.phone}</Text>}
              </View>
              <StatusBadge status={ref.status as any} small />
            </View>
            {ref.comment && (
              <View style={styles.refComment}>
                {ref.status === 'approved' ? (
                  <Text style={styles.refCommentText}>"{ref.comment}"</Text>
                ) : (
                  <Text style={styles.refPendingText}>{ref.comment}</Text>
                )}
              </View>
            )}
          </View>
        ))}

        <Pressable style={styles.inviteBtn}>
          <Ionicons name="share-outline" size={18} color={Colors.primary} />
          <Text style={styles.inviteBtnText}>Invite a referee via WhatsApp</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.card,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primaryLight, borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 6 },
  addBtnText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.primary },
  scroll: { padding: Spacing.md, paddingBottom: 40 },
  infoBox: {
    flexDirection: 'row', gap: Spacing.sm,
    backgroundColor: Colors.primaryLight, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.lg,
  },
  infoText: { flex: 1, fontSize: FontSize.sm, color: Colors.primary, lineHeight: 18 },
  sectionTitle: {
    fontSize: FontSize.xs, fontWeight: '700', color: Colors.textMuted,
    letterSpacing: 0.8, marginBottom: Spacing.sm,
  },
  refCard: {
    backgroundColor: Colors.card, borderRadius: Radius.lg,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.border,
  },
  refHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  refAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  refAvatarText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.white },
  refInfo: { flex: 1 },
  refName: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  refCompany: { fontSize: FontSize.sm, color: Colors.textSecondary },
  refBuilder: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '500' },
  refPhone: { fontSize: FontSize.sm, color: Colors.textSecondary },
  refComment: {
    marginTop: Spacing.sm, paddingTop: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  refCommentText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontStyle: 'italic', lineHeight: 18 },
  refPendingText: { fontSize: FontSize.sm, color: Colors.warning },
  inviteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, height: 52, borderRadius: Radius.lg,
    borderWidth: 1.5, borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight, marginTop: Spacing.md,
  },
  inviteBtnText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.primary },
});
