import { DVSA } from '../constants/dvsa';

const NEUTRAL = 70;
const CONFIDENCE = [0, 0.4, 0.6, 0.76, 0.88, 0.95];

function confidence(n) {
  return n >= 5 ? 0.95 : CONFIDENCE[n];
}

export function recalcSkills(lessons) {
  const skills = {};

  DVSA.forEach(cat => {
    const relevant = lessons.filter(l =>
      l.faults && l.faults[cat.id] !== undefined
    );

    if (relevant.length === 0) {
      skills[cat.id] = null;
      return;
    }

    // Recency weighting — lesson at index i gets weight (i+1)
    let weightedSum = 0;
    let totalWeight = 0;
    relevant.forEach((lesson, i) => {
      const w = i + 1;
      const faultCount = (lesson.faults[cat.id]?.serious || 0) * 15 +
                         (lesson.faults[cat.id]?.minor || 0) * 5;
      const rawScore = Math.max(0, 100 - faultCount);
      weightedSum += rawScore * w;
      totalWeight += w;
    });

    const signal = weightedSum / totalWeight;
    const conf = confidence(relevant.length);
    const dampened = conf * signal + (1 - conf) * NEUTRAL;

    skills[cat.id] = Math.round(dampened);
  });

  return skills;
}

export function getReadiness(skills) {
  const scored = Object.values(skills).filter(v => v !== null);
  if (scored.length === 0) return null;
  return Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
}

export function getWeakest(skills, n = 3) {
  return DVSA
    .map(cat => ({ ...cat, score: skills[cat.id] }))
    .filter(c => c.score !== null)
    .sort((a, b) => a.score - b.score)
    .slice(0, n);
}

export function getStrongest(skills, n = 2) {
  return DVSA
    .map(cat => ({ ...cat, score: skills[cat.id] }))
    .filter(c => c.score !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}
