import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorPri, setErrorPri] = useState('');
  
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setErrorPri('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const { user, accessToken, refreshToken } = res.data;
      
      await setAuth(user, accessToken, refreshToken);
    } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: string } } };
    setErrorPri(err.response?.data?.error ?? 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>DG</Text>
          <Text style={styles.title}>DigiGrow<Text style={styles.highlight}> Solutions</Text></Text>
          <Text style={styles.subtitle}>Client Portal Access</Text>
        </View>

        <View style={styles.form}>
          {errorPri ? <Text style={styles.error}>{errorPri}</Text> : null}

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="you@business.com"
            placeholderTextColor="#7B83A1"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#7B83A1"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F1A' },
  inner: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  highlight: { color: '#00D2FF' },
  subtitle: { fontSize: 16, color: '#7B83A1' },
  form: { backgroundColor: '#111827', padding: 24, borderRadius: 20, borderWidth: 1, borderColor: '#2A3050' },
  error: { color: '#FF5252', backgroundColor: 'rgba(255, 82, 82, 0.1)', padding: 12, borderRadius: 8, marginBottom: 16, textAlign: 'center' },
  label: { color: '#E8ECF4', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: '#1A1F35',
    color: '#E8ECF4',
    borderWidth: 1,
    borderColor: '#2A3050',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6C5CE7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
