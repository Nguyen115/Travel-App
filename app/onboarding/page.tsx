'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const travelStyles = [
  'Cultural Immersion',
  'Food & Wine',
  'Adventure & Outdoors',
  'Luxury & Relaxation',
  'Slow Travel',
  'Photography',
  'Wellness Retreat',
  'Urban Explorer'
];

const dietaryPreferences = [
  'No Restrictions',
  'Vegetarian-friendly',
  'Vegan Options',
  'Halal',
  'Kosher',
  'Gluten-free',
  'Local Specialties',
  'Fine Dining'
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const toggleSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      router.push('/');
    }
  };

  const canContinue = step === 1 ? selectedStyles.length > 0 : selectedPreferences.length > 0;

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-12 space-y-4">
          <div className="flex justify-center gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s <= step ? 'w-16 bg-primary' : 'w-8 bg-border'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-2"
              >
                <h1 className="font-serif text-4xl text-foreground">
                  What's your travel style?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Select all that resonate with you
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-2"
              >
                <h1 className="font-serif text-4xl text-foreground">
                  Dietary preferences?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Help us recommend the perfect spots
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="styles"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
            >
              {travelStyles.map((style) => (
                <motion.button
                  key={style}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleSelection(style, selectedStyles, setSelectedStyles)}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    selectedStyles.includes(style)
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className="font-medium text-foreground">{style}</div>
                    {selectedStyles.includes(style) && (
                      <div className="absolute top-3 right-3">
                        <div className="rounded-full bg-primary p-1">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
            >
              {dietaryPreferences.map((pref) => (
                <motion.button
                  key={pref}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleSelection(pref, selectedPreferences, setSelectedPreferences)}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    selectedPreferences.includes(pref)
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className="font-medium text-foreground">{pref}</div>
                    {selectedPreferences.includes(pref) && (
                      <div className="absolute top-3 right-3">
                        <div className="rounded-full bg-primary p-1">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1 h-12 rounded-2xl"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex-1 h-12 rounded-2xl"
          >
            {step === 1 ? 'Continue' : 'Get Started'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
