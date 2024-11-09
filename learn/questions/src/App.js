import React from 'react';
import Conversation from './sounds';

function ConversationBlog() {
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"DIN Round Pro", sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
    },
    header: {
      textAlign: 'center',
      padding: '30px 0',
      marginBottom: '40px',
      backgroundColor: '#58CC02',
      color: '#fff',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(88, 204, 2, 0.3)',
    },
    conversationItem: {
      marginBottom: '25px',
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      border: '2px solid #E5E5E5',
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    english: {
      fontSize: '18px',
      color: '#4B4B4B',
      marginBottom: '12px',
      fontWeight: '700',
    },
    kannada: {
      fontSize: '20px',
      color: '#1CB0F6',
      marginBottom: '8px',
      fontFamily: '"Nirmala UI", sans-serif',
      fontWeight: '600',
    },
    transliteration: {
      fontSize: '16px',
      color: '#777',
      fontStyle: 'italic',
      paddingLeft: '25px',
      borderLeft: '3px solid #FFC800',
    },
  };

  const conversations = [
    {
      id:"conversation1",
      english: "What is your name?",
      kannada: "ನಿಮ್ಮ ಹೆಸರು ಏನು?",
      transliteration: "Ninna hesaru ēnu?"
    },
    {
      id:"conversation2",
      english: "Where are you from?",
      kannada: "ನೀವು ಎಲ್ಲಿನವರು",
      transliteration: "neevu ellinavaru?"
    },
    {
      id:"conversation3",
      english: "How old are you?",
      kannada: "ನೀವು ಎಷ್ಟು ವರ್ಷದವರು?",
      transliteration: "Niivu eṣṭu varṣadavaru?"
    },
    {
      id:"conversation4",
      english: "What are your hobbies?",
      kannada: "ನಿಮ್ಮ ಹವ್ಯಾಸಗಳು ಏನು?",
      transliteration: "Ninna havyaasagalu ēnu?"
    },
    {
      id:"conversation5",
      english: "Do you have any pets?",
      kannada: "ನೀವು ಯಾವುದೇ ಸಾಕುಪ್ರಾಣಿಗಳನ್ನು ಹೊಂದಿದ್ದೀರಾ",
      transliteration: "neevu yavude sakupranigalannu hondiddira?"
    },
    {
      id:"conversation6",
      english: "What do you do for a living?",
      kannada: "ನೀವು ಯಾವ ಉದ್ಯೋಗವನ್ನು ಮಾಡುತ್ತೀರಿ?",
      transliteration: "Niivu yāva udyōgavannu māḍuttīri?"
    },
    {
      id:"conversation7",
      english:"What’s your favorite food?",
      kannada:"ನಿಮ್ಮ ಮೆಚ್ಚಿನ ಆಹಾರ ಯಾವದು?",
      transliteration:"Ninna neccina āhāra yāvaddu?"
    },
    {
      id:"conversation8",
      english:"How do you usually spend your weekends?",
      kannada:"ನೀವು ಸಾಮಾನ್ಯವಾಗಿ ವಾರಾಂತ್ಯದಲ್ಲಿ ಹೇಗೆ ಕಳೆಯುತ್ತೀರಿ?",
      transliteration:"Niivu sāmānyavāgi vāraantyadalli hēge kaḷeyuttīri?"
    },
    {
      id:"conversation9",
      english:"What kind of music do you like?",
      kannada:"ನೀವು ಯಾವ ರೀತಿಯ ಸಂಗೀತವನ್ನು ಇಷ್ಟಪಡುವಿರಿ?",
      transliteration:"Niivu yāva rītigaḷa saṅgītaṁnnu iṣṭapaduttīri?"
    },
    // Add all other conversations here...
  ];
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Conversations</h1>
        <p> </p>
      </header>

      <div className="conversation-list">
        {conversations.map((item) => (
          <div key={item.id} style={styles.conversationItem}>
            <Conversation conversationId={item.id} />
            <div style={styles.english}>
              <strong>English:</strong> {item.english}
            </div>
            <div style={styles.kannada}>
              <strong>ಕನ್ನಡ:</strong> {item.kannada}
            </div>
            <div style={styles.transliteration}>
              <strong>Transliteration:</strong> {item.transliteration}
            </div>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '30px', padding: '20px' }}>
        <p>© 2024 Kannada Learning Blog</p>
      </footer>
    </div>
  );
}

export default ConversationBlog;