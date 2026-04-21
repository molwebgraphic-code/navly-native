import { createContext, useContext, useEffect, useState } from 'react';
import { loadState, saveState } from '../lib/storage';
import { recalcSkills } from '../lib/skillEngine';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadState().then(s => {
      setState(s);
      setLoading(false);
    });
  }, []);

  async function update(patch) {
    const next = { ...state, ...patch };
    setState(next);
    await saveState(next);
    return next;
  }

  async function addLesson(lesson) {
    const lessons = [...(state.lessons || []), lesson];
    const skills = recalcSkills(lessons);
    return update({ lessons, skills });
  }

  async function deleteLesson(id) {
    const lessons = state.lessons.filter(l => l.id !== id);
    const skills = recalcSkills(lessons);
    return update({ lessons, skills });
  }

  return (
    <AppContext.Provider value={{ state, loading, update, addLesson, deleteLesson }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
