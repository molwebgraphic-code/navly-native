import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../hooks/useAppState';
import { colors, light, dark } from '../constants/theme';

// Auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Onboarding
import OnboardingScreen from '../screens/auth/OnboardingScreen';

// Main tabs
import HomeScreen from '../screens/main/HomeScreen';
import LessonsScreen from '../screens/lessons/LessonsScreen';
import SkillsScreen from '../screens/skills/SkillsScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import BriefScreen from '../screens/brief/BriefScreen';

// Detail screens
import LessonDetailScreen from '../screens/lessons/LessonDetailScreen';
import RecordScreen from '../screens/record/RecordScreen';
import ManualLoggerScreen from '../screens/record/ManualLoggerScreen';
import AnalysisScreen from '../screens/record/AnalysisScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SimScreen from '../screens/simulation/SimScreen';
import SimLiveScreen from '../screens/simulation/SimLiveScreen';
import SimResultScreen from '../screens/simulation/SimResultScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ name, focused, theme }) {
  const t = theme === 'dark' ? dark : light;
  const icons = {
    Home: focused ? '⌂' : '⌂',
    Lessons: '≡',
    Skills: '◈',
    Calendar: '▦',
    Brief: '◑',
  };
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabEmoji, { color: focused ? colors.signal : t.text2 }]}>
        {icons[name]}
      </Text>
      <Text style={[styles.tabLabel, { color: focused ? colors.signal : t.text2 }]}>
        {name}
      </Text>
    </View>
  );
}

function MainTabs({ theme }) {
  const t = theme === 'dark' ? dark : light;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: t.bg,
          borderTopColor: t.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      {['Home', 'Lessons', 'Skills', 'Calendar', 'Brief'].map(name => (
        <Tab.Screen
          key={name}
          name={name}
          component={
            name === 'Home' ? HomeScreen :
            name === 'Lessons' ? LessonsScreen :
            name === 'Skills' ? SkillsScreen :
            name === 'Calendar' ? CalendarScreen :
            BriefScreen
          }
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name={name} focused={focused} theme={theme} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { state, loading } = useApp();

  if (loading) return null;

  const theme = state?.theme || 'light';

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!state?.onboarded ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main">
              {() => <MainTabs theme={theme} />}
            </Stack.Screen>
            <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
            <Stack.Screen name="Record" component={RecordScreen} />
            <Stack.Screen name="ManualLogger" component={ManualLoggerScreen} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Sim" component={SimScreen} />
            <Stack.Screen name="SimLive" component={SimLiveScreen} />
            <Stack.Screen name="SimResult" component={SimResultScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIcon: { alignItems: 'center', justifyContent: 'center', paddingTop: 6 },
  tabEmoji: { fontSize: 18 },
  tabLabel: { fontSize: 9, marginTop: 2, fontWeight: '500', letterSpacing: 0.5 },
});
