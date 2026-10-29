export type GameCharacter = {
  id: string;
  name: string;
  image: string | null;
  portraitCrop?: readonly [number, number, number, number];
  /** Object-position percentages; preserves the source image's aspect ratio. */
  portraitPosition?: readonly [number, number];
  aliases: readonly string[];
  gender: 'Homem' | 'Mulher' | 'Outro/indefinido';
  nature: readonly string[];
  group: readonly string[];
  weapon: readonly string[];
  arc: string;
  note: string;
  source: string;
};
export const TIME_ZONE = 'America/Sao_Paulo';
export const fields = [
  { key: 'gender', label: 'Gênero' },
  { key: 'nature', label: 'Natureza' },
  { key: 'group', label: 'Núcleo' },
  { key: 'weapon', label: 'Armas / poderes' },
  { key: 'arc', label: 'Arco de referência' },
] as const;
export type Field = (typeof fields)[number]['key'];
export type Clue = 'match' | 'partial' | 'earlier' | 'later' | 'miss';
export const clueLabels: Record<Clue, string> = {
  match: 'Igual',
  partial: 'Parcial: pelo menos um atributo em comum',
  miss: 'Diferente',
  earlier: 'Resposta em arco anterior',
  later: 'Resposta em arco posterior',
};
export const clueSymbols: Record<Clue, string> = {
  match: '✓',
  partial: '≈',
  miss: '×',
  earlier: '↓',
  later: '↑',
};

export function dateInBrasilia(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  return ['year', 'month', 'day']
    .map((type) => parts.find((p) => p.type === type)!.value)
    .join('-');
}

export function createGame(options: {
  characters: readonly GameCharacter[];
  arcs: readonly string[];
  title: string;
  challenge: (date: string) => {
    date: string;
    number: number;
    answer: GameCharacter;
  };
  storageKey: (date: string) => string;
}) {
  const { characters, arcs, challenge } = options;
  function normalize(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  }
  function search(query: string, excluded: readonly string[] = []) {
    const needle = normalize(query);
    return needle
      ? characters.filter(
          (c) =>
            !excluded.includes(c.id) && normalize(c.name).startsWith(needle),
        )
      : [];
  }
  function exactCharacter(query: string) {
    return characters.find((c) =>
      [c.name, ...c.aliases].some((n) => normalize(n) === normalize(query)),
    );
  }
  function compare(
    guess: GameCharacter,
    answer: GameCharacter,
    field: Field,
  ): Clue {
    if (field === 'nature' || field === 'group' || field === 'weapon') {
      const guessed = new Set<string>(guess[field]);
      const expected = new Set<string>(answer[field]);
      if (
        guessed.size === expected.size &&
        [...guessed].every((value) => expected.has(value))
      )
        return 'match';
      return [...guessed].some((value) => expected.has(value))
        ? 'partial'
        : 'miss';
    }
    if (guess[field] === answer[field]) return 'match';
    if (field === 'arc')
      return arcs.indexOf(answer.arc) > arcs.indexOf(guess.arc)
        ? 'later'
        : 'earlier';
    return 'miss';
  }
  function isFinished(guesses: readonly string[], answerId: string) {
    return guesses.includes(answerId);
  }
  const storageKey = options.storageKey;
  function restore(raw: string | null, date: string): string[] {
    try {
      const data: unknown = JSON.parse(raw ?? 'null');
      if (
        !data ||
        typeof data !== 'object' ||
        !('date' in data) ||
        data.date !== date ||
        !('guesses' in data) ||
        !Array.isArray(data.guesses)
      )
        return [];
      const guesses: string[] = [];
      for (const id of data.guesses) {
        if (
          typeof id !== 'string' ||
          !characters.some((c) => c.id === id) ||
          guesses.includes(id)
        )
          continue;
        guesses.push(id);
        if (isFinished(guesses, challenge(date).answer.id)) break;
      }
      return guesses;
    } catch {
      return [];
    }
  }
  function shareText(date: string, guesses: readonly string[]) {
    const { number, answer } = challenge(date);
    const grid = guesses
      .map((id) =>
        fields
          .map(({ key }) => {
            const clue = compare(
              characters.find((c) => c.id === id)!,
              answer,
              key,
            );
            return clue === 'match' ? '🟩' : clue === 'partial' ? '🟧' : '🟥';
          })
          .join(''),
      )
      .join('\n');
    return `${options.title} #${number} · ${date}\n${guesses.includes(answer.id) ? 'Personagem encontrado' : 'Em andamento'}\n${grid}`;
  }

  return {
    challenge,
    normalize,
    search,
    exactCharacter,
    compare,
    isFinished,
    storageKey,
    restore,
    shareText,
  };
}
