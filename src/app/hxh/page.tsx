import type { Metadata } from 'next';
import Game from '@/components/game';
import './hxh.css';

export const metadata: Metadata = {
  title: 'Hunter × Hunter DLE — Personagem do dia | Hamadle',
  description:
    'Encontre o personagem de Hunter × Hunter do dia. Compare Nen, afiliações e arcos em um desafio com palpites ilimitados.',
};

export default function Hxh() {
  return <Game key="hxh" universe="hxh" />;
}
