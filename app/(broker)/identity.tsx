import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

const DOC_TYPES = ['Aadhaar', 'DL', 'Voter ID'];

export default function IdentityScreen() {
  const router = useRouter();
  const [docType, setDocType] = useState('Aadhaar');
  const [frontUploaded, setFrontUploaded] = useState(true);
  const [backUploaded, setBackUploaded] = useState(false);
  const [rera, setRera] = useState('A52100000089');

  const canContinue = frontUploaded;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.stepText}>Identity proof  3/4</Text>
      </View>

      <View style={styles.notice}>
        <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
        <Text style={styles.noticeText}>
          Your ID number is encrypted and never shown to builders. Only the last 4 digits are visible after verification.
        </Text>
      </View>

      <Text style={styles.sectionLabel}>SELECT DOCUMENT</Text>
      <View style={styles.docRow}>
        {DOC_TYPES.map(d => (
          <Pressable
            key={d}
            style={[styles.docBtn, docType === d && styles.docBtnSelected]}
            onPress={() => setDocType(d)}
          >
            <Text style={[styles.docBtnText, docType === d && styles.docBtnTextSelected]}>{d}</Text>
          </Pressable>
        ))}
      </View>

      <UploadBox
        label={`${docType} front`}
        fileName={frontUploaded ? 'aadhaar_front.jpg · 2.4 MB' : undefined}
        onUpload={() => setFrontUploaded(true)}
      />
      <UploadBox
        label={`${docType} back side`}
        subtitle="Tap to capture"
        onUpload={() => setBackUploaded(true)}
        fileName={backUploaded ? 'aadhaar_back.jpg · 1.8 MB' : undefined}
      />

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>RERA NUMBER (OPTIONAL)</Text>
        <View style={styles.inputRow}>
          <Text style={styles.inputValue}>{rera}</Text>
        </View>
      </View>

      <Pressable
        style={[styles.btn, !canContinue && styles.btnDisabled]}
        onPress={() => router.replace('/(broker)/(tabs)/scan')}
        disabled={!canContinue}
      >
        <Text style={styles.btnText}>Complete setup</Text>
        <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
      </Pressable>
    </ScrollView>
  );
}

function UploadBox({ label, subtitle, fileName, onUpload }: any) {
  return (
    <Pressable style={[styles.uploadBox, fileName && styles.uploadDone]} onPress={onUpload}>
      {fileName ? (
        <>
          <View style={styles.uploadDoneIcon}>
            <Ionicons name="document" size={22} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.uploadDoneLabel}>{label.replace(' side', ' uploaded')}</Text>
            <Text style={styles.uploadFileName}>{fileName}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.uploadIconBox}>
            <Ionicons name="camera-outline" size={24} color={Colors.textSecondary} />
          </View>
          <Text style={styles.uploadLabel}>{label}</Text>
          {subtitle && <Text style={styles.uploadSubtitle}>{subtitle}</Text>}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  scroll: { padding: Spacing.lg, paddingTop: 60 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '600' },
  notice: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  noticeText: { flex: 1, fontSize: FontSize.sm, color: Colors.primary, lineHeight: 18 },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  docRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  docBtn: {
    flex: 1,
    height: 40,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  docBtnSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  docBtnText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textSecondary },
  docBtnTextSelected: { color: Colors.primary },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  uploadDone: {
    borderStyle: 'solid',
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uploadDoneIcon: { width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center' },
  uploadDoneLabel: { fontSize: FontSize.md, fontWeight: '600', color: Colors.primary },
  uploadFileName: { fontSize: FontSize.sm, color: Colors.textSecondary },
  uploadIconBox: { marginBottom: Spacing.sm },
  uploadLabel: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  uploadSubtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  field: { marginBottom: Spacing.xl },
  fieldLabel: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.8, marginBottom: 6 },
  inputRow: { height: 52, backgroundColor: Colors.background, borderRadius: Radius.md, paddingHorizontal: Spacing.md, justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  inputValue: { fontSize: FontSize.md, color: Colors.text, fontWeight: '500' },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  btnDisabled: { backgroundColor: Colors.textMuted },
  btnText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.white },
});
