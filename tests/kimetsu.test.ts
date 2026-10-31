import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { characters, arcs } from '../src/data/kimetsu-characters';
import * as game from '../src/lib/kimetsu-game';

test('Kimetsu roster has unique identities, valid arcs and local portraits', () => {
  assert.equal(characters.length, 29);
  assert.equal(new Set(characters.map((c) => c.id)).size, characters.length);
  for (const c of characters) {
    assert.ok(existsSync(`public${c.image}`));
    assert.ok(arcs.includes(c.arc));
    assert.equal(game.exactCharacter(c.name)?.id, c.id);
  }
  assert.equal(game.exactCharacter('Tanjirō')?.id, 'tanjiro');
  assert.equal(game.exactCharacter('Rengoku')?.id, 'rengoku');
});
test('Kimetsu calendar, independent storage, clues and spoiler-free sharing', () => {
  const tanjiro = game.exactCharacter('Tanjiro')!;
  const giyu = game.exactCharacter('Giyu')!;
  assert.equal(game.challenge('2026-10-30').answer.id, 'tanjiro');
  assert.equal(game.challenge('2026-10-31').answer.id, 'nezuko');
  assert.equal(game.challenge('2026-11-28').answer.id, 'tanjiro');
  assert.equal(game.compare(tanjiro, giyu, 'weapon'), 'partial');
  assert.equal(game.compare(tanjiro, giyu, 'nature'), 'match');
  assert.equal(game.storageKey('2026-10-30'), 'kimetsu:v1:2026-10-30');
  assert.deepEqual(
    game.restore(
      JSON.stringify({ date: '2026-10-30', guesses: ['gon', 'tanjiro'] }),
      '2026-10-30',
    ),
    ['tanjiro'],
  );
  const shared = game.shareText('2026-10-30', ['giyu', 'tanjiro']);
  assert.ok(shared.includes('DEMON SLAYER DLE'));
  assert.ok(!shared.includes('Tanjiro'));
});

test('new Kimetsu clues distinguish unknown data, age direction and weapon overlap', () => {
  const tanjiro = game.exactCharacter('Tanjiro')!;
  const genya = game.exactCharacter('Genya')!;
  const muzan = game.exactCharacter('Muzan')!;
  assert.equal(game.compare(tanjiro, genya, 'age'), 'older');
  assert.equal(game.compare(genya, tanjiro, 'age'), 'younger');
  assert.equal(game.compare(muzan, muzan, 'age'), 'unknown');
  assert.equal(game.compare(tanjiro, genya, 'equipment'), 'partial');
  assert.equal(game.compare(muzan, muzan, 'equipment'), 'unknown');
  assert.equal(game.compare(genya, tanjiro, 'position'), 'match');
  const rows = game.shareText('2026-10-30', ['tanjiro']).split('\n');
  assert.equal(Array.from(rows.at(-1)!).length, 8);
});
