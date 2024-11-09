import React, { useState, useRef, useEffect } from 'react';

const Conversation = ({ conversationId }) => {
  const soundFiles = {
    'conversation1': require('./sayings/hesarueenu.mp3'),
    'conversation2': require('./sayings/niivuellinavaru.mp3'),
    'conversation3': require('./sayings/niiveeshtuvarsa.mp3'),
    'conversation4': require('./sayings/ninnahavyasagalu.mp3'),
    'conversation5': require('./sayings/neevuyavude.mp3'),
    'conversation6': require('./sayings/niivuyaava.mp3'),
    'conversation7': require('./sayings/ninnancchinaaharayaavadu.mp3'),
    "conversation8": require('./sayings/niivusamanyavagi.mp3'),
    "conversation9": require('./sayings/niivuyaavarittigalla.mp3'),
    // Add more sound files for each conversation ID
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(soundFiles[conversationId]);
    audioRef.current.onended = () => {
      setIsPlaying(false);
    };

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, [conversationId]);

  const styles = {
    button: {
      backgroundColor: '#58CC02',
      color: '#fff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 4px 0 #46A302',
      transition: 'all 0.1s ease',
      float: 'right',
    },
  };

  const handleClick = () => {
    console.log(conversationId);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button style={styles.button} onClick={handleClick}>
      {isPlaying ? 'Pause' : 'Listen'}
    </button>
  );
};

export default Conversation;