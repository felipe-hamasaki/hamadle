import roster from '../data/dark-souls-roster.json' with { type: 'json' };
import { createGame } from './game-engine';

export const characters = roster;
export const fields = [
  { key: 'games', label: 'Jogos' },
  { key: 'content', label: 'Conteúdo' },
  { key: 'roles', label: 'Papel' },
  { key: 'areas', label: 'Local de referência' },
  { key: 'covenants', label: 'Pacto associado' },
] as const;

// A stable shuffle keeps adjacent days from following the wiki's game or boss order.
function dailyOrder(id: string) {
  let hash = 2166136261;
  for (const letter of 'bonfire/' + id)
    hash = Math.imul(hash ^ letter.charCodeAt(0), 16777619);
  return hash >>> 0;
}
const calendar = [...characters].sort(
  (a, b) => dailyOrder(a.id) - dailyOrder(b.id) || a.id.localeCompare(b.id),
);
export const schedule = calendar.map((c) => c.id);
export const {
  challenge,
  compare,
  exactCharacter,
  isFinished,
  restore,
  search,
  shareText,
  storageKey,
} = createGame({
  characters,
  arcs: [],
  fields,
  title: 'DARK SOULS DLE',
  searchByWord: true,
  storageKey: (date) => `dark-souls:v1:${date}`,
  challenge(date) {
    const day = Math.floor(
      (Date.parse(date + 'T00:00:00Z') - Date.UTC(2026, 10, 9)) / 86400000,
    );
    return {
      date,
      number: day + 1,
      answer:
        calendar[((day % calendar.length) + calendar.length) % calendar.length],
    };
  },
});
