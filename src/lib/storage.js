import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'navly_local_v1';

const DEFAULT_STATE = {
  name: '',
  instructorName: '',
  testDate: null,
  onboarded: false,
  theme: 'light',
  lessons: [],
  skills: {},
  bookings: [],
};

export async function loadState() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export async function saveState(state) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export async function clearState() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}
