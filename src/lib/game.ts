import { arcs, characters } from '../data/characters';
import { createGame } from './game-engine';
export type { Field, Clue } from './game-engine';
export {
  clueLabels,
  clueSymbols,
  dateInBrasilia,
  fields,
  TIME_ZONE,
} from './game-engine';

const DAY_MS = 86_400_000;
const epoch = Date.UTC(2026, 9, 1);
const expandedEpoch = Date.UTC(2026, 9, 3);
// Preserve answers before the expanded roster starts on October 3.
export const legacySchedule = [
  'judeau',
  'irvine',
  'guts',
  'farnese',
  'zodd',
  'rickert',
  'schierke',
  'griffith',
  'puck',
  'grunbeld',
  'serpico',
  'casca',
  'locus',
  'isidro',
] as const;
// The first fifteen slots are unchanged. The complete manga roster follows.
export const schedule = [
  'femto',
  ...legacySchedule,
  ...characters
    .filter(
      (c) => c.id !== 'femto' && !legacySchedule.some((id) => id === c.id),
    )
    .map((c) => c.id),
] as const;
export function challenge(date: string) {
  const timestamp = Date.parse(`${date}T00:00:00Z`);
  const day = Math.floor((timestamp - epoch) / DAY_MS);
  const calendar = timestamp >= expandedEpoch ? schedule : legacySchedule;
  const calendarDay = Math.floor(
    (timestamp - (timestamp >= expandedEpoch ? expandedEpoch : epoch)) / DAY_MS,
  );
  const id =
    calendar[
      ((calendarDay % calendar.length) + calendar.length) % calendar.length
    ];
  return {
    date,
    number: day + 1,
    answer: characters.find((c) => c.id === id)!,
  };
}

export const {
  normalize,
  search,
  exactCharacter,
  compare,
  isFinished,
  storageKey,
  restore,
  shareText,
} = createGame({
  characters,
  arcs,
  challenge,
  title: 'BERSERKDLE',
  storageKey(date) {
    const edition =
      Date.parse(date + 'T00:00:00Z') >= expandedEpoch ? 'v2' : 'v1';
    return 'berserkdle:' + edition + ':' + date;
  },
});
