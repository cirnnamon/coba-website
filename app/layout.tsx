import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dr. Kaelen Vance | Nanoinformatics Researcher & Full-Stack Architect',
  description:
    'Interactive gamified portfolio of Dr. Kaelen "Cipher" Vance — Senior Nanoinformatics Researcher, Ph.D., and Full-Stack Architect. Explore the quest log, research archive, and skill tree.',
  keywords: [
    'nanoinformatics',
    'full-stack developer',
    'researcher',
    'Next.js',
    'TypeScript',
    'molecular modeling',
    'biosensing',
    'POLBAN',
    'MEXT',
  ],
  authors: [{ name: 'Dr. Kaelen Vance' }],
  openGraph: {
    title: 'Dr. Kaelen Vance | Nanoinformatics Researcher & Full-Stack Architect',
    description:
      'Explore the interactive quest log of a Ph.D. researcher and full-stack architect.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
