import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

// Default prompts as a fallback
const DEFAULT_PROMPTS = [
  'Design a one-screen UI for someone to unsubscribe from a service—and still leave feeling good about it.',
  'Create a loading animation or screen that tells a story in 5 seconds without using words.',
  'Design a screen where a pet owner updates their pet\'s emotional state for a vet dashboard.',
  'Create a confirmation modal that celebrates the user canceling something.',
  'Design a single screen that helps someone decide between staying in or going out tonight.',
  'Create a mobile screen where users build a playlist, but without using song titles or covers.',
  'Design a UI component that visualizes how messy someone\'s desktop is.',
  'Create a daily reflection input that only uses sliders, toggles, or emoji.',
  'Design an app screen for checking in at a secret club with no text allowed.',
  'Make a microinteraction for switching between personal and professional modes.',
  'Create a single screen that helps someone split rent, but keeps it friendly.',
  'Design a checkout screen for a vending machine in a coworking space.',
  'Build a one-screen app that helps someone take a five-minute creative break.',
  'Create an interactive mood picker for a digital therapist tool.',
  'Design a tab interaction that lets users toggle between "fact" and "feeling."',
  'Create a mobile screen that helps someone remember the name of a place they visited.',
  'Design a component that represents time not as a clock, but as a vibe.',
  'Build a screen where a user sets a timer to stop doomscrolling.',
  'Design an empty state for a screen where someone hasn\'t written any goals yet.',
  'Create a fun "are you sure?" microinteraction for deleting a profile photo.',
  'Design a calendar screen that treats free time as more valuable than meetings.',
  'Make a single screen where a plant parent logs their plant\'s growth progress.',
  'Design a screen that shows what you\'d pack for a trip without showing a suitcase.',
  'Build a rating system UI that avoids stars and numbers entirely.',
  'Create a settings toggle screen that feels playful but still usable.',
  'Design a widget for tracking something unusual (e.g., hugs given, weird dreams remembered).',
  'Create a music player UI for a genre that doesn\'t exist yet.',
  'Design a single screen that helps someone choose what to wear based on mood.',
  'Create a reminder screen for something a person wants to forget.',
  'Build a scroll experience for someone browsing their memories.',
  'Design a screen that helps someone silently ask for help.',
  'Create a mobile screen for a poetry vending machine.',
  'Design a sleep tracking screen that doesn\'t feel clinical.',
  'Build a UI for someone who wants to "ghost" an app (leave without being noticed).',
  'Create a microinteraction for bookmarking something that made you feel something.',
  'Design a screen that helps someone pick a random act of kindness to do.',
  'Create a settings screen where every option is delightfully unnecessary.',
  'Design a tool that lets someone sketch their mood with touch.',
  'Make a button that becomes harder to press the more you use it.',
  'Design a single screen for a digital gratitude jar.',
  'Build a simple interface for someone to organize their favorite compliments.',
  'Design a "bad idea" submission form with personality.',
  'Create a mobile screen that helps someone make a sandwich, step-by-step.',
  'Build a UI for requesting a favor without feeling awkward.',
  'Design a screen for someone checking how often they talk vs. listen.',
  'Create a component that reveals more information the longer you hover.',
  'Build a screen where people create their own personal holiday.',
  'Design a UI for someone managing their imaginary friends.',
  'Create a drag-and-drop screen where someone organizes their past week by feeling.',
  'Design a confirmation screen that gives the user a riddle instead of a checkmark.',
  'Create a progress bar that doesn\'t move linearly.',
  'Build a profile card for someone with a secret identity.',
  'Design a form where the fewer fields you fill out, the more powerful it becomes.',
  'Create a screen where someone apologizes (UI reflects emotional nuance).',
  'Design a search experience that works entirely through image associations.',
  'Build a "try again tomorrow" screen for a productivity app.',
  'Create a UI where someone draws their goal instead of writing it.',
  'Design a volume slider that\'s themed around seasons of the year.',
  'Make a carousel that doesn\'t look like a carousel.',
  'Design a reaction picker that goes beyond emoji and into absurdity.',
  'Build a button that politely resists being clicked too often.',
  'Create a mobile screen where someone shares a recipe with a twist—no ingredients listed.',
  'Design a rating experience that changes based on time of day.',
  'Make a settings screen for a product that only works once a year.',
  'Build a single screen that helps someone reconnect with an old friend.',
  'Create a map UI that doesn\'t rely on directions or coordinates.',
  'Design a progress bar that resets itself playfully when you mess up.',
  'Build a notification UI that delivers good news only.',
  'Design a music queue UI for a dinner party of wildly different guests.',
  'Create a screen that helps someone pick what to cook based on what\'s going bad.',
  'Build a rating UI where you rate experiences based on smell.',
  'Design a quick journal screen that only accepts metaphors.',
  'Create a daily planner where all the events are non-obligations.',
  'Make a mobile UI that asks users how much attention they want to give today.',
  'Build a "gift finder" screen for people who hate shopping.',
  'Create a screen that tracks emotional weather.',
  'Design an onboarding flow for a fictional club with strange rules.',
  'Build a timeline that shows how your preferences have changed over time.',
  'Create a mobile screen where you archive a version of yourself.',
  'Design a notification center where you can mark things as "emotionally irrelevant."',
  'Make a progress tracker that works backwards.',
  'Build a single screen where a user can switch between worlds (like dreams or realities).',
  'Design a carousel that gives you a new type of question each swipe.',
  'Create a feedback form that can only be filled in by dragging elements.',
  'Build a microinteraction that encourages you to go outside.',
  'Design a toggle between "Doing It for Me" vs. "Doing It for the Internet."',
  'Create a recipe UI where every instruction includes a fun fact.',
  'Build a minimalist UI for deciding "yes," "no," or "maybe later" for anything.',
  'Design a component for setting intentions instead of goals.',
  'Create a journaling screen that feels like a conversation.',
  'Build a UI for organizing the things you keep putting off.',
  'Design a checkout screen for a zero-dollar gift economy.',
  'Make a button that apologizes every time you press it.',
  'Build a single screen to help someone let go of a digital item.',
  'Create a feed UI that only shows the best parts of your day.',
  'Design a calendar view where weekends feel 3x more exciting.',
  'Build a mobile screen for naming a new star in a fictional sky.',
  'Create a search interface that guides someone to their "next favorite thing."',
  'Design a simple filter UI that only uses tactile metaphors (like "squishy" or "crunchy").',
  'Create a settings screen where the user can toggle how serious the app feels.'
];

const App: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showRegenerate, setShowRegenerate] = useState(false);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * DEFAULT_PROMPTS.length);
    return DEFAULT_PROMPTS[randomIndex];
  };

  const handleInitialClick = () => {
    setIsExpanded(true);
    const newPrompt = getRandomPrompt();
    setCurrentPrompt(newPrompt);
    setIsTyping(true);
    setShowRegenerate(false);
  };

  const handleRegenerate = () => {
    setIsTyping(false);
    setShowRegenerate(false);
    setTimeout(() => {
      const newPrompt = getRandomPrompt();
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
