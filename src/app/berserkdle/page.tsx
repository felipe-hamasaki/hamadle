import type { Metadata } from 'next';
import Game from '@/components/game';

export const metadata: Metadata = {
  title: 'Berserkdle — Personagem do dia | Hamadle',
  description:
    'Um personagem. Oito tentativas. Um desafio diário no mundo de Berserk, com pistas a cada palpite.',
};

export default function Berserkdle() {
  return <Game />;
}
