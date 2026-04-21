import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from './src/hooks/useAppState';
import Navigation from './src/navigation';
import { View } from 'react-native';
import { light, dark } from './src/constants/theme';

function ThemedApp() {
  const { state, loading } = useApp();
  if (loading) return <View style={{ flex: 1, backgroundColor: '#0E1A17' }} />;
  const t = state?.theme === 'dark' ? dark : light;
  return (
    <>
      <StatusBar style={state?.theme === 'dark' ? 'light' : 'dark'} />
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <Navigation />
      </View>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ThemedApp />
    </AppProvider>
  );
}
