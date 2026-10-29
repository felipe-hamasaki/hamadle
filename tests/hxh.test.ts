import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { characters } from '../src/data/hxh-characters';
import * as hxh from '../src/lib/hxh-game';
import * as berserk from '../src/lib/game';

test('HxH roster has unique names, valid local portraits and a complete daily cycle', () => {
  assert.equal(characters.length, 31);
  const names = characters.flatMap((c) => [
    ...new Set([c.name, ...c.aliases].map(hxh.normalize)),
  ]);
  assert.equal(new Set(names).size, names.length);
  const answers = new Set(
    Array.from(
      { length: characters.length },
      (_, i) =>
        hxh.challenge(
          new Date(Date.UTC(2026, 9, 29 + i)).toISOString().slice(0, 10),
        ).answer.id,
    ),
  );
  assert.equal(answers.size, characters.length);
  for (const c of characters) {
    assert.ok(answers.has(c.id));
    assert.ok(existsSync(`public${c.image}`), c.name);
  }
  assert.equal(hxh.challenge('2026-10-29').answer.id, 'gon');
  assert.equal(hxh.challenge('2026-11-29').answer.id, 'gon');
  assert.ok(hxh.challenge('2026-10-28').answer);
});

test('HxH guesses, aliases, storage and share results remain isolated from Berserk', () => {
  const date = '2026-10-29';
  assert.equal(hxh.exactCharacter(' KIRUA ')?.id, 'killua');
  assert.equal(hxh.exactCharacter('Bisky')?.id, 'biscuit');
  assert.equal(hxh.search('KÍL')[0].id, 'killua');
  assert.deepEqual(hxh.search('kill', ['killua']), []);
  assert.equal(hxh.exactCharacter('Guts'), undefined);
  assert.equal(berserk.exactCharacter('Gon'), undefined);
  assert.notEqual(hxh.storageKey(date), berserk.storageKey(date));
  assert.deepEqual(
    hxh.restore(
      JSON.stringify({
        date,
        guesses: ['guts', 'killua', 'killua', 'gon', 'hisoka'],
      }),
      date,
    ),
    ['killua', 'gon'],
  );
  assert.deepEqual(hxh.restore('{', date), []);
  assert.deepEqual(
    hxh.restore(JSON.stringify({ date: '2026-10-28', guesses: ['gon'] }), date),
    [],
  );
  const share = hxh.shareText(date, ['killua', 'gon']);
  assert.match(share, /HUNTER × HUNTER DLE #1/);
  assert.match(share, /🟩🟩🟩🟩🟩/);
  assert.doesNotMatch(share, /Gon|Killua|Reforço|BERSERK/);
});

test('HxH compares Nen sets, affiliations and its own chronological arc order', () => {
  const get = (name: string) => hxh.exactCharacter(name)!;
  assert.equal(hxh.compare(get('Kurapika'), get('Kite'), 'weapon'), 'partial');
  assert.equal(hxh.compare(get('Killua'), get('Gon'), 'group'), 'partial');
  assert.equal(hxh.compare(get('Killua'), get('Hisoka'), 'weapon'), 'match');
  assert.equal(hxh.compare(get('Gon'), get('Meruem'), 'nature'), 'miss');
  assert.equal(hxh.compare(get('Gon'), get('Bisky'), 'arc'), 'later');
  assert.equal(hxh.compare(get('Ging'), get('Bisky'), 'arc'), 'earlier');
});
