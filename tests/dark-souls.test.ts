import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import * as souls from '../src/lib/dark-souls-game';

test('every roster identity is reachable in one cycle and has playable clues', () => {
  const { characters, schedule } = souls;
  assert.equal(new Set(schedule).size, characters.length);
  const answers = new Set<string>();
  for (const [i, c] of characters.entries()) {
    const date = new Date(Date.UTC(2026, 10, 9 + i)).toISOString().slice(0, 10);
    answers.add(souls.challenge(date).answer.id);
    assert.ok(
      c.games.length &&
        c.roles.length &&
        c.areas.length &&
        c.content.length &&
        c.sources.length,
      c.name,
    );
    if (c.image) assert.ok(existsSync('public' + c.image), c.name);
    for (const name of [c.name, ...c.aliases])
      assert.equal(souls.exactCharacter(name)?.id, c.id, name);
  }
  assert.equal(answers.size, characters.length);
  assert.equal(new Set(characters.flatMap((c) => c.content)).size, 7);
});

test('recurring NPCs have one identity and overlapping clues', () => {
  const patches = souls.exactCharacter('Lapp')!;
  assert.equal(souls.search('lapp')[0].id, patches.id);
  assert.equal(souls.search('artorias')[0].name, 'Knight Artorias');
  assert.deepEqual(patches.games, ['Dark Souls', 'Dark Souls III']);
  const solaire = souls.exactCharacter('Solaire')!;
  assert.equal(souls.compare(patches, solaire, 'games'), 'partial');
  assert.equal(souls.compare(solaire, solaire, 'covenants'), 'match');
  assert.equal(souls.compare(patches, solaire, 'covenants'), 'unknown');
  const date = '2026-11-09';
  const answer = souls.challenge(date).answer;
  assert.equal(
    souls.restore(
      JSON.stringify({ date, guesses: ['gon', answer.id, patches.id] }),
      date,
    ).length,
    1,
  );
  const shared = souls.shareText(date, [answer.id]);
  assert.ok(!shared.includes(answer.name));
  assert.equal(
    Array.from(shared.split('\n').at(-1)!).length,
    souls.fields.length,
  );
});
