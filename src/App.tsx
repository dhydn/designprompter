import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Papa from 'papaparse';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface Prompt {
  prompt: string;
}

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showRegenerate, setShowRegenerate] = useState(false);

  useEffect(() => {
    // Load prompts from CSV
    Papa.parse('/data/prompts.csv', {
      download: true,
      header: true,
      complete: (results) => {
        console.log('Loaded prompts:', results.data);
        setPrompts(results.data as Prompt[]);
      },
      error: (error) => {
        console.error('Error loading prompts:', error);
        // Fallback prompts in case CSV loading fails
        setPrompts([
          { prompt: 'Design a loading indicator that gets progressively more exciting the longer it runs' },
          { prompt: 'Create a toast notification that conveys gratitude in a memorable way' },
          { prompt: 'Design a form input field that celebrates completion with a satisfying animation' }
        ]);
      }
    });
  }, []);

  const getRandomPrompt = () => {
    if (prompts.length === 0) {
      return 'Design a loading indicator that gets progressively more exciting the longer it runs';
    }
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex]?.prompt || '';
  };

  const handleInitialClick = () => {
    setIsExpanded(true);
    const newPrompt = getRandomPrompt();
    console.log('New prompt:', newPrompt);
    setCurrentPrompt(newPrompt);
    setIsTyping(true);
    setShowRegenerate(false);
  };

  const handleRegenerate = () => {
    setIsTyping(false);
    setShowRegenerate(false);
    setTimeout(() => {
      const newPrompt = getRandomPrompt();
      console.log('Regenerated prompt:', newPrompt);
      setCurrentPrompt(newPrompt);
      setIsTyping(true);
    }, 500);
  };

  // Calculate approximate typing duration based on prompt length
  useEffect(() => {
    if (isTyping) {
      const typingDuration = currentPrompt.length * 50; // 50ms per character
      const timer = setTimeout(() => {
        setShowRegenerate(true);
      }, typingDuration);
      return () => clearTimeout(timer);
    }
  }, [isTyping, currentPrompt]);

  return (
    <div className="app-container">
      <div className="gradient-background" />
      <AnimatePresence>
        {!isExpanded ? (
          <motion.button
            className="idea-button"
            onClick={handleInitialClick}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            spark a new idea
          </motion.button>
        ) : (
          <motion.div
            className="prompt-container"
            initial={{ scale: 1 }}
            animate={{ scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="prompt-text">
              {isTyping && currentPrompt && (
                <TypeAnimation
                  sequence={[currentPrompt]}
                  wrapper="span"
                  cursor={true}
                  repeat={0}
                  speed={50}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRegenerate && (
          <motion.button
            className="regenerate-button"
            onClick={handleRegenerate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowPathIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
      <div className="attribution">
        created by <a href="https://www.devinhayden.com" target="_blank" rel="noopener noreferrer">Devin Hayden</a>
      </div>
    </div>
  );
};

export default App;
