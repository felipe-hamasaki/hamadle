import type { Metadata } from 'next';
import DarkSoulsGame from './dark-souls-game';
import './dark-souls.css';

export const metadata: Metadata = {
  title: 'Dark Souls DLE | Hamadle',
  description:
    'Descubra o personagem do dia entre os NPCs e chefes da trilogia Dark Souls e suas expansões.',
};

export default function DarkSoulsPage() {
  return <DarkSoulsGame />;
}
