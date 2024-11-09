import React, { useState, useRef } from "react";

const Conversation = ({ conversationId }) => {
  const soundFiles = {
    conversation1: require("./sounds/q1.wav"),
    conversation2: require("./sounds/q2.mp3"),
    conversation3: require("./sounds/q3.mp3"),
    conversation4: require("./sounds/q5.mp3"),
    conversation5: require("./sounds/q6.mp3"),
    conversation6: require("./sounds/q7.mp3"),
    conversation7: require("./sounds/q8.mp3"),
    conversation9: require("./sounds/q10.mp3"),
    conversation10: require("./sounds/q11.mp3"),
    conversation11: require("./sounds/q12.mp3"),
    conversation12: require("./sounds/q13.mp3"),
    conversation13: require("./sounds/q14.mp3"),
    // Add more sound files for each conversation ID
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(soundFiles[conversationId]));

  const styles = {
    button: {
      backgroundColor: "#28a745", // Changed color to green
      color: "#ffffff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "12px", // Added border radius
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      height: "100%",
    },
    buttonHover: {
      backgroundColor: "#218838",
      transform: "scale(1.05)",
    },
  };

  const keyframes = `
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  const handleMouseEnter = (e) => {
    e.target.style.animation = styles.buttonHover.animation;
  };

  const handleMouseLeave = (e) => {
    e.target.style.animation = "";
  };

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  audioRef.current.onended = () => {
    setIsPlaying(false);
  };

  return (
    <button style={styles.button} onClick={handleClick}>
      {isPlaying ? "Pause" : "Listen"}
    </button>
  );
};

export default Conversation;
