import { arcs, characters } from '../data/hxh-characters';
import { createGame } from './game-engine';

export const schedule = characters.map((character) => character.id);
export const fields = [
  { key: 'gender', label: 'Gênero' },
  { key: 'nature', label: 'Natureza' },
  { key: 'group', label: 'Afiliação' },
  { key: 'weapon', label: 'Tipo de Nen' },
  { key: 'arc', label: 'Arco de referência' },
] as const;

export const {
  challenge,
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
  title: 'HUNTER × HUNTER DLE',
  storageKey: (date) => `hxh:v1:${date}`,
  challenge(date) {
    const day = Math.floor(
      (Date.parse(`${date}T00:00:00Z`) - Date.UTC(2026, 9, 29)) / 86_400_000,
    );
    return {
      date,
      number: day + 1,
      answer:
        characters[
          ((day % characters.length) + characters.length) % characters.length
        ],
    };
  },
});
