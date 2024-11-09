"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, X, Moon, Sun, Book } from "lucide-react";

// Type definitions remain the same
type Character = {
  english: string;
  kannada: string;
  word?: {
    english: string;
    kannada: string;
  };
};

type Category = "vowels" | "consonants" | "numbers";

const Basics = () => {
  // Existing state
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("vowels");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Character[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech synthesis initialization
  useEffect(() => {
    // Check if speech synthesis is available
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      return;
    }

    // Create a test utterance
    const testUtterance = new SpeechSynthesisUtterance("Test");
    
    // Ensure voices are loaded
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        console.log("Voices loaded:", speechSynthesis.getVoices().length);
      });
    }

    // Cleanup any ongoing speech when component unmounts
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Improved speak function with error handling
// Replace the speak function with this updated version
const speak = useCallback((text: string) => {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }

  try {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    const voices = speechSynthesis.getVoices();

    // Log available voices for debugging
    console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));

    // Try to find voices in this preference order
    const preferredVoice = voices.find(voice => 
      voice.lang === 'kn-IN' || // Kannada (India)
      voice.lang === 'kn' || // Kannada
      voice.name.toLowerCase().includes('kannada') ||
     
      voice.name.toLowerCase().includes('indian')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log("Selected voice:", preferredVoice.name, preferredVoice.lang);
    } else {
      // If no preferred voice found, try to modify the default voice settings
      utterance.lang = 'kn-IN'; // Set language hint to Kannada
    }

    // Adjust speech parameters
    utterance.rate = 0.75;  // Slower rate for clearer pronunciation
    utterance.pitch = 1.2;  // Slightly higher pitch
    utterance.volume = 1;   // Maximum volume

    // Event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      setIsSpeaking(false);
    };

    // For numbers or words with both forms, speak both
    if (text.includes(',')) {
      const [char, word] = text.split(',');
      // Add a slight pause between character and word
      utterance.text = `${char}... ${word.trim()}`;
    } else {
      utterance.text = text;
    }

    speechSynthesis.speak(utterance);

  } catch (error) {
    console.error("Speech synthesis error:", error);
    setIsSpeaking(false);
  }
}, []);

  // Categories data remains the same
  const categories = useMemo(
    () => ({
      vowels: [
        { english: "a", kannada: "ಅ" },
        { english: "aa", kannada: "ಆ" },
        { english: "i", kannada: "ಇ" },
        { english: "ee", kannada: "ಈ" },
        { english: "u", kannada: "ಉ" },
        { english: "oo", kannada: "ಊ" },
        { english: "e", kannada: "ಎ" },
        { english: "ee", kannada: "ಏ" },
        { english: "ai", kannada: "ಐ" },
        { english: "o", kannada: "ಒ" },
        { english: "oo", kannada: "ಓ" },
        { english: "au", kannada: "ಔ" },
        { english: "am", kannada: "ಅಂ" },
        { english: "aha", kannada: "ಅಃ" },
      ],
      consonants: [
        { english: "ka", kannada: "ಕ" },
        { english: "kha", kannada: "ಖ" },
        { english: "ga", kannada: "ಗ" },
        { english: "gha", kannada: "ಘ" },
        { english: "nga", kannada: "ಙ" },
        { english: "cha", kannada: "ಚ" },
        { english: "chha", kannada: "ಛ" },
        { english: "ja", kannada: "ಜ" },
        { english: "jha", kannada: "ಝ" },
        { english: "nya", kannada: "ಞ" },
        { english: "ta", kannada: "ಟ" },
        { english: "tha", kannada: "ಠ" },
        { english: "da", kannada: "ಡ" },
        { english: "dha", kannada: "ಢ" },
        { english: "na", kannada: "ಣ" },
        { english: "tha", kannada: "ತ" },
        { english: "thha", kannada: "ಥ" },
        { english: "da", kannada: "ದ" },
        { english: "dha", kannada: "ಧ" },
        { english: "na", kannada: "ನ" },
        { english: "pa", kannada: "ಪ" },
        { english: "pha", kannada: "ಫ" },
        { english: "ba", kannada: "ಬ" },
        { english: "bha", kannada: "ಭ" },
        { english: "ma", kannada: "ಮ" },
        { english: "ya", kannada: "ಯ" },
        { english: "ra", kannada: "ರ" },
        { english: "la", kannada: "ಲ" },
        { english: "va", kannada: "ವ" },
        { english: "sha", kannada: "ಶ" },
        { english: "sha", kannada: "ಷ" },
        { english: "sa", kannada: "ಸ" },
        { english: "ha", kannada: "ಹ" },
        { english: "la", kannada: "ಳ" },
      ],
      numbers: [
        {
          english: "0",
          kannada: "೦",
          word: { english: "sunne", kannada: "ಸೊನ್ನೆ" },
        },
        {
          english: "1",
          kannada: "೧",
          word: { english: "ondu", kannada: "ಒಂದು" },
        },
        {
          english: "2",
          kannada: "೨",
          word: { english: "eraDu", kannada: "ಎರಡು" },
        },
        {
          english: "3",
          kannada: "೩",
          word: { english: "muuru", kannada: "ಮೂರು" },
        },
        {
          english: "4",
          kannada: "೪",
          word: { english: "naaLaku", kannada: "ನಾಲ್ಕು" },
        },
        {
          english: "5",
          kannada: "೫",
          word: { english: "aidu", kannada: "ಐದು" },
        },
        {
          english: "6",
          kannada: "೬",
          word: { english: "aaru", kannada: "ಆರು" },
        },
        {
          english: "7",
          kannada: "೭",
          word: { english: "elu", kannada: "ಏಳು" },
        },
        {
          english: "8",
          kannada: "೮",
          word: { english: "enTu", kannada: "ಎಂಟು" },
        },
        {
          english: "9",
          kannada: "೯",
          word: { english: "ombattu", kannada: "ಒಂಬತ್ತು" },
        },
        {
          english: "10",
          kannada: "೧೦",
          word: { english: "hattu", kannada: "ಹತ್ತು" },
        },
        {
          english: "20",
          kannada: "೨೦",
          word: { english: "Ippattu", kannada: "ಇಪ್ಪತ್ತು" },
        },
        {
          english: "30",
          kannada: "೩೦",
          word: { english: "moovattu", kannada: "ಮೂವತ್ತು" },
        },
        {
          english: "40",
          kannada: "೪೦",
          word: { english: "nalavattu", kannada: "ನಲವತ್ತು" },
        },
        {
          english: "50",
          kannada: "ೕ೦",
          word: { english: "aivattu", kannada: "ಐವತ್ತು" },
        },
        {
          english: "60",
          kannada: "೬೦",
          word: { english: "aravattu", kannada: "ಅರವತ್ತು" },
        },
        {
          english: "70",
          kannada: "೭೦",
          word: { english: "eppattu", kannada: "ಎಪ್ಪತ್ತು" },
        },
        {
          english: "80",
          kannada: "೮೦",
          word: { english: "embattu", kannada: "ಎಂಬತ್ತು" },
        },
        {
          english: "90",
          kannada: "೯೦",
          word: { english: "tombattu", kannada: "ತೊಂಬತ್ತು" },
        },
        {
          english: "100",
          kannada: "೧೦೦",
          word: { english: "nooru", kannada: "ನೂರು" },
        },
        // ... rest of numbers
      ],
    }),
    []
  );

  // Filter items effect remains the same
  useEffect(() => {
    const items = categories[activeCategory];
    if (searchTerm) {
      setFilteredItems(
        items.filter(
          (item) =>
            item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kannada.includes(searchTerm)
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, activeCategory, categories]);

  // Updated CharacterCard with improved speech handling
  const CharacterCard = ({ item }: { item: Character }) => {
    const handleSpeak = () => {
      // For numbers with words, speak both the numeral and word
      if (item.word) {
        speak(`${item.english}, ${item.word.english}`);
      } else {
        // For letters, speak both Kannada and English pronunciation
        speak(`${item.english}`);
      }
    };

    return (
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg 
                   hover:shadow-2xl transition-all duration-300 overflow-hidden
                   border border-purple-100 dark:border-purple-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        {/* Background elements remain the same */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-transparent dark:from-purple-900 rounded-bl-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-transparent dark:from-blue-900 rounded-tr-full opacity-50" />

        <div className="relative">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3 
                        hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            {item.kannada}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 
                        tracking-wide uppercase">
            {item.english}
          </div>
          {item.word && (
            <div className="mt-4 pt-3 border-t border-purple-100 dark:border-purple-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.word.english}
              </div>
              <div className="text-xl font-semibold text-purple-500 dark:text-purple-300">
                {item.word.kannada}
              </div>
            </div>
          )}
          {/* <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className={`mt-3 p-2 rounded-full transition-all duration-300
                       ${
                         isSpeaking
                           ? "bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200"
                           : "bg-purple-50 dark:bg-purple-900/30 text-purple-500 hover:text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                       }
                       active:scale-95`}
            aria-label="Pronounce"
          >
            <Volume2 size={18} />
          </button> */}
        </div>
      </motion.div>
    );
  };

  // Rest of the component (return statement) remains the same
  return (
    <div
      className={`min-h-screen w-full ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-purple-100/50 via-transparent to-blue-100/50 
                      dark:from-purple-900/30 dark:via-transparent dark:to-blue-900/30"
        />
        <div
          className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-tl from-purple-100/50 via-transparent to-blue-100/50 
                      dark:from-purple-900/30 dark:via-transparent dark:to-blue-900/30"
        />
      </div>

      <div className="relative w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex items-center space-x-4">
            <Book className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <h1
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                         dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              ಕನ್ನಡ ಕಲಿಯಿರಿ
            </h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
                     transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        {/* Search and filter section */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-xl border border-purple-200 dark:border-purple-800 
                       bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                       text-gray-900 dark:text-gray-100 shadow-lg
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       transition-all duration-300"
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600
                         transition-colors duration-300"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {(["vowels", "consonants", "numbers"] as const).map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300
                       ${
                         activeCategory === category
                           ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                           : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                       }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Character grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filteredItems.map((item, index) => (
              <CharacterCard key={index} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No characters found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Basics;