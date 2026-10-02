import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Timeline } from '@/components/Timeline';
import { QuestLog } from '@/components/QuestLog';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ExpBar } from '@/components/ExpBar';
import { TerminalEasterEgg } from '@/components/TerminalEasterEgg';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <QuestLog />
      <Contact />
      <Footer />
      <ExpBar />
      <TerminalEasterEgg />
    </main>
  );
}
