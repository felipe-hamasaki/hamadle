import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hamadle — Jogos de adivinhar',
  description:
    'Escolha seu universo e descubra o personagem do dia. Jogos de adivinhar com novos desafios todos os dias.',
};
export const viewport: Viewport = { themeColor: '#151513' };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <noscript>Ative o JavaScript no navegador para jogar.</noscript>
        {children}
      </body>
    </html>
  );
}
