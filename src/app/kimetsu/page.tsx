import type { Metadata } from 'next';
import Game from '@/components/game';
import './kimetsu.css';
export const metadata: Metadata = {
  title: 'Demon Slayer DLE — Kimetsu no Yaiba | Hamadle',
  description:
    'Descubra o personagem de Demon Slayer do dia. Compare respirações, poderes, afiliações e arcos, com palpites ilimitados.',
};
export default function Kimetsu() {
  return <Game key="kimetsu" universe="kimetsu" />;
}
