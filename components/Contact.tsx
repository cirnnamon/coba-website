'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Mail, User, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) {
      e.name = 'Adventurer name is required';
    } else if (form.name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters';
    }
    if (!form.email.trim()) {
      e.email = 'Communication channel (email) is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) {
      e.message = 'Your quest message cannot be empty';
    } else if (form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters';
    }
    return e;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          label="Guild Invitation"
          title="Join the Quest"
          description="Send a message to the Cipher — collaborations, research, and teaching inquiries welcome"
          icon={Sparkles}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="rounded-2xl border border-border/60 bg-card p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                  Transmission Protocol
                </span>
              </div>

              <h3 className="font-display text-lg font-bold mb-3">
                Ready to form a party?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Whether you are seeking a research collaborator, a guest lecturer,
                a mentor, or a co-adventurer on an ambitious project — send a signal.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/40">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Direct Channel
                    </div>
                    <div className="text-sm font-medium">kaelen.vance@cipher.dev</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/40">
                  <Sparkles className="h-4 w-4 text-accent shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Response Time
                    </div>
                    <div className="text-sm font-medium">Within 48 hours</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-[11px] font-mono text-primary/80">
                  &gt; Status: <span className="text-accent">Online</span> — accepting party
                  invitations
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border/60 bg-card p-6 space-y-5"
              noValidate
            >
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3 w-3 text-primary" />
                  Adventurer Name
                </label>
                <Input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your name..."
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-primary" />
                  Communication Channel
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@domain.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3 text-primary" />
                  Quest Details
                </label>
                <Textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Describe your quest, project, or collaboration idea..."
                  rows={5}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                    Transmitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Transmission
                  </span>
                )}
              </Button>

              {/* Success Message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-accent/10 border border-accent/30"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm text-accent font-medium">
                      Transmission received! The Cipher will respond within 48 hours.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
