import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useApp } from '../../hooks/useAppState';
import { colors, light, dark, radius } from '../../constants/theme';

export default function LoginScreen({ navigation }) {
  const { state, update } = useApp();
  const t = state?.theme === 'dark' ? dark : light;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return Alert.alert('Missing fields', 'Enter your email and password.');
    setLoading(true);
    await update({ onboarded: true });
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={[styles.root, { backgroundColor: t.bg }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoWrap}>
          <View style={[styles.logoBox, { backgroundColor: colors.forest }]}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <Text style={[styles.brand, { color: t.text }]}>Navly</Text>
          <Text style={[styles.tagline, { color: t.text2 }]}>Your AI driving coach</Text>
        </View>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
          <Text style={[styles.label, { color: t.text2 }]}>Email</Text>
          <TextInput style={[styles.input, { backgroundColor: t.bg, borderColor: t.border, color: t.text }]} placeholder="you@example.com" placeholderTextColor={t.text2} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Text style={[styles.label, { color: t.text2, marginTop: 12 }]}>Password</Text>
          <TextInput style={[styles.input, { backgroundColor: t.bg, borderColor: t.border, color: t.text }]} placeholder="••••••••" placeholderTextColor={t.text2} value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={[styles.btn, { opacity: loading ? 0.6 : 1 }]} onPress={handleLogin} disabled={loading} activeOpacity={0.8}>
            <Text style={styles.btnText}>{loading ? 'Signing in…' : 'Sign in'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgot}>
            <Text style={[styles.forgotText, { color: t.text2 }]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: t.text2 }]}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[styles.footerLink, { color: colors.moss }]}>Sign up free</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoWrap: { alignItems: 'center', marginBottom: 36 },
  logoBox: { width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoText: { fontSize: 32, fontWeight: '800', color: colors.signal },
  brand: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  tagline: { fontSize: 14, marginTop: 4 },
  card: { borderRadius: radius.lg, padding: 20, borderWidth: 1, marginBottom: 24 },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 },
  input: { height: 48, borderRadius: radius.sm, borderWidth: 1, paddingHorizontal: 14, fontSize: 15 },
  btn: { marginTop: 20, height: 52, borderRadius: radius.md, backgroundColor: colors.signal, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 16, fontWeight: '700', color: colors.ink },
  forgot: { alignItems: 'center', marginTop: 14 },
  forgotText: { fontSize: 13 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: '600' },
});
