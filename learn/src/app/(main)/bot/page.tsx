"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import "regenerator-runtime/runtime";
import { translateText } from "./services/translationService";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import AudioAnalysis from "./AudioAnalysis";
import {
  FiSend,
  FiMic,
  FiDownload,
  FiImage,
  FiHelpCircle,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import ImageUploadModal from "./ImageUploadModal";

interface Message {
  text: string;
  translation: string;
  id: string;
}

interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
interface AudioAnalysisResult {
  transcript: string;
  transliteration: string;
  pronunciationAnalysis: {
    isCorrect: boolean;
    score: number;
    corrections: Array<{
      word: string;
      suggestion: string;
      reason: string;
    }>;
  };
  geminiAnalysis: string;
}
const themes: Theme[] = [
  {
    name: "light",
    primary: "from-blue-50 to-white",
    secondary: "bg-white",
    background: "bg-white",
    text: "text-gray-800",
  },
  {
    name: "dark",
    primary: "from-gray-900 to-gray-800",
    secondary: "bg-gray-800",
    background: "bg-gray-900",
    text: "text-white",
  },
];

const TranslatePage = () => {
  const [inputText, setInputText] = useState<string>("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  const [audioAnalysis, setAudioAnalysis] =
    useState<AudioAnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input element

  // Voice recording states
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [transcriptHistory, setTranscriptHistory] = useState<string[]>([]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setCurrentTheme(isDarkMode ? themes[0] : themes[1]);
  };

  const addMessageToConversation = (text: string, translation: string) => {
    const newMessage: Message = {
      text,
      translation,
      id: Math.random().toString(36).substr(2, 9),
    };
    setIsTyping(true);
    setTimeout(() => {
      setConversation([...conversation, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://savage-incantation-g4q5j45rq69xcjqp-5000.app.github.dev//image/translate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Image translation result:", result);

      addMessageToConversation(
        `Uploaded image: ${file.name}`,
        `EN: ${result.description_en}\nKN: ${result.description_kn}\nTransliteration: ${result.description_transliteration}`
      );
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  const handleSummary = async () => {
    try {
      // Prepare the data to send
      const summaryRequest = {
        messages: conversation, // Send the conversation state
      };

      // Make a POST request to the backend to generate a summary
      const response = await fetch("https://savage-incantation-g4q5j45rq69xcjqp-5000.app.github.dev/generate_summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(summaryRequest),
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      // Parse the response JSON
      const data = await response.json();

      // Handle the summary (for example, displaying it in the UI)
      if (data.summary) {
        console.log("Generated Summary:", data.summary);
        // You can display the summary in your UI here
      } else {
        console.error("Summary generation failed:", data.error);
      }
    } catch (error) {
      console.error("Error occurred while generating summary:", error);
    }
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const result = await translateText(inputText, "session_001");
      addMessageToConversation(inputText, result.res.msg);
      setInputText("");
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Voice recording functions
  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: "kn-IN",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      setTranscriptHistory((prev) => [...prev, transcript.trim()]);
      setInputText(transcript.trim());
      setShowAnalysis(true);  // Add this line
    }
  };
  const handleAudioAnalysis = async (text: string) => {
    setAnalysisLoading(true);
    setShowAnalysis(true);
    try {
      const response = await fetch("https://savage-incantation-g4q5j45rq69xcjqp-5000.app.github.dev/analyze_audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze audio");
      }

      const result = await response.json();
      setAudioAnalysis(result);
    } catch (error) {
      console.error("Audio analysis failed:", error);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleVoiceSubmit = () => {
    if (inputText.trim()) {
      handleTranslate();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4">
  <div className="mx-auto h-full max-w-[1000px] px-4 md:px-6 py-8 md:pb-[50px] flex flex-col md:flex-row gap-8">
    {/* Main Content */}
    <main className="flex flex-col w-full md:w-2/3 p-6 md:p-8 space-y-6 shadow-lg rounded-2xl transition-all duration-300 glass items-center justify-center">
      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto w-full">
        <AnimatePresence>
          {conversation.map((msg: Message, idx: number) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg shadow-md mb-4 glass ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="chat-bubble">
                <div className="user-message font-semibold">User: {msg.text}</div>
              </div>
              <div className="chat-bubble translation-message mt-2">
                Translation:
                <ReactMarkdown>{msg.translation}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex space-x-2 p-4"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Section */}
      <div className="space-y-6 mt-4 w-full">
        {/* Input textarea */}
        <motion.textarea
          className={`w-full h-28 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
          } shadow-inner`}
          placeholder="Type text input..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />
        {/* Input buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            onClick={handleTranslate}
            disabled={loading}
          >
            <FiSend />
            <span>Send</span>
          </button>
         
          <button
            className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
            onClick={() => setIsImageModalOpen(true)}
          >
            <FiImage />
            <span>Upload Image</span>
          </button>
          {/* <button
            className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
            onClick={() => {}}
          >
            <FiHelpCircle />
            <span>Quiz</span>
          </button> */}
        </div>
      </div>

      {/* Pronunciation Analysis */}
      {showAnalysis && inputText && (
        <div className="mt-6 w-full">
          <h3 className={`text-lg font-semibold mb-3 ${currentTheme.text}`}>
            Pronunciation Analysis
          </h3>
          <AudioAnalysis
            transcript={inputText}
            onAnalysisComplete={(analysis) => {
              console.log("Analysis complete:", analysis);
            }}
          />
        </div>
      )}

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onUpload={handleImageUpload}
        isDarkMode={isDarkMode}
      />
    </main>

    {/* Voice Recording Section */}
    <section className="w-full md:w-1/3 p-6 md:p-8 shadow-lg rounded-2xl transition-all duration-300 glass">
      <div className="space-y-6">
        {/* Voice recording controls */}
        <div className="flex flex-col gap-4">
          <motion.button
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl text-white shadow-lg transform transition duration-300 ease-in-out ${
              listening ? "bg-gradient-to-r from-red-400 to-red-600" : "bg-gradient-to-r from-green-400 to-green-600"
            } hover:shadow-xl hover:scale-105`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={listening ? stopListening : startListening}
          >
            <FiMic className="text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base md:text-lg font-semibold">
              {listening ? "Stop Recording" : "Start Recording"}
            </span>
          </motion.button>

          <motion.button
            className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVoiceSubmit}
            disabled={!inputText.trim()}
          >
            <FiSend className="text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base md:text-lg font-semibold">Translate Voice Input</span>
          </motion.button>
        </div>

        {/* Transcript display area */}
        <div className="mt-6">
          <h3 className={`text-lg font-semibold mb-3 ${currentTheme.text}`}>
            Voice Transcript History
          </h3>
          <div
            className={`h-64 overflow-y-auto rounded-xl p-4 ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } shadow-inner`}
          >
            {listening && transcript && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-3 rounded-lg mb-3 ${
                  isDarkMode ? "bg-gray-600" : "bg-blue-50"
                } ${currentTheme.text}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-medium">Recording:</span>
                </div>
                <p className="mt-2">{transcript}</p>
              </motion.div>
            )}
            <AnimatePresence>
              {transcriptHistory.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-3 rounded-lg mb-3 ${
                    isDarkMode ? "bg-gray-600" : "bg-gray-50"
                  } ${currentTheme.text}`}
                >
                  <p>{text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
  );
};

export default TranslatePage;