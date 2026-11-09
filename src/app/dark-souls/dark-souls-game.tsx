'use client';

import Game from '@/components/game';
import * as souls from '@/lib/dark-souls-game';

export default function DarkSoulsGame() {
  return <Game universe="dark-souls" souls={souls} />;
}
