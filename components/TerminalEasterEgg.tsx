'use client';

import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight } from 'lucide-react';
import { terminalCommands } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
  command?: string;
}

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'CipherOS v9.9.9 — Type "help" for available commands.',
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (raw: string): TerminalLine[] => {
    const cmd = raw.trim().toLowerCase();
    if (cmd === 'clear') {
      setLines([]);
      return [];
    }
    const found = terminalCommands.find((tc) => tc.command === cmd);
    if (found) {
      return found.output.map((line) => ({ type: 'output' as const, content: line }));
    }
    if (cmd === '') {
      return [];
    }
    return [
      {
        type: 'output',
        content: `Command not found: ${cmd}. Type "help" for available commands.`,
      },
    ];
  };

  const handleSubmit = () => {
    const raw = input;
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', content: raw, command: raw },
    ];
    const outputLines = processCommand(raw);
    const allLines = [...newLines, ...outputLines];
    setLines(allLines);
    if (raw.trim()) {
      setHistory((prev) => [...prev, raw]);
    }
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary transition-colors hover:bg-primary/20"
        aria-label="Open terminal"
        title="Open Terminal (Ctrl + `)"
      >
        <Terminal className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[560px] max-h-[420px] flex flex-col rounded-xl border border-primary/30 bg-background/95 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-card">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs font-medium text-foreground">
                  CipherOS — Terminal
                </span>
                <span className="font-mono text-[10px] text-muted-foreground ml-2">
                  /home/kaelen
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
                  <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-2 flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
                  aria-label="Close terminal"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed scrollbar-hide"
            >
              {lines.map((line, idx) => (
                <div key={idx} className="mb-0.5">
                  {line.type === 'input' ? (
                    <div className="flex items-center gap-1.5 text-foreground">
                      <span className="text-primary">kaelen@cipher</span>
                      <span className="text-muted-foreground">:~$</span>
                      <span className="text-foreground">{line.content}</span>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'whitespace-pre-wrap break-all',
                        line.content.startsWith('Warning') || line.content.startsWith('Command not found')
                          ? 'text-amber-500'
                          : 'text-muted-foreground'
                      )}
                    >
                      {line.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Active input line */}
              <div className="flex items-center gap-1.5 text-foreground mt-0.5">
                <span className="text-primary">kaelen@cipher</span>
                <span className="text-muted-foreground">:~$</span>
                <div className="flex items-center flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronRight className="h-3 w-3 text-primary" />
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-3 py-1.5 border-t border-border/40 bg-card/50">
              <span className="font-mono text-[9px] text-muted-foreground">
                Press <kbd className="px-1 py-0.5 rounded bg-secondary text-foreground">Esc</kbd> to
                close · <kbd className="px-1 py-0.5 rounded bg-secondary text-foreground">↑↓</kbd> for
                history · Type <kbd className="px-1 py-0.5 rounded bg-secondary text-primary">help</kbd>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
