import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface AudioAnalysisProps {
  transcript: string;
  onAnalysisComplete?: (analysis: AudioAnalysisResult) => void;
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

const AudioAnalysis: React.FC<AudioAnalysisProps> = ({
  transcript,
  onAnalysisComplete,
}) => {
  const [analysis, setAnalysis] = React.useState<AudioAnalysisResult | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const analyzeAudio = async (text: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://savage-incantation-g4q5j45rq69xcjqp-5000.app.github.dev//analyze_audio", {
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
        setAnalysis(result);

        if (onAnalysisComplete) {
          onAnalysisComplete(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (transcript) {
      analyzeAudio(transcript);
    }
  }, [transcript, onAnalysisComplete]);

  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span>Analyzing audio...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Kannada Transcript</h3>
          <ReactMarkdown className="text-gray-700">
            {analysis.transcript}
          </ReactMarkdown>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">English Transliteration</h3>
          <ReactMarkdown className="text-gray-700">
            {analysis.transliteration}
          </ReactMarkdown>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Pronunciation Analysis</h3>
          <div
            className={`inline-block px-3 py-1 rounded-full ${
              analysis.pronunciationAnalysis.isCorrect
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Score: {analysis.pronunciationAnalysis.score}%
          </div>

          {analysis.pronunciationAnalysis.corrections.length > 0 && (
            <div className="mt-3 space-y-2">
              <h4 className="font-medium">Suggested Corrections:</h4>
              {analysis.pronunciationAnalysis.corrections.map(
                (correction, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <p>
                      <span className="font-medium">{correction.word}</span> →{" "}
                      <span className="text-green-600">
                        {correction.suggestion}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {correction.reason}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Gemini Analysis</h3>
          <ReactMarkdown className="text-gray-700 whitespace-pre-wrap">
            {analysis.geminiAnalysis}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioAnalysis;
