import React from "react";
import Conversation from "./sound";

function ConversationBlog() {
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: '"DIN Round Pro", sans-serif',
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      borderRadius: "15px",
    },
    header: {
      textAlign: "center",
      padding: "20px",
      marginBottom: "40px",
      backgroundColor: "#4CAF50",
      color: "#ffffff",
      borderRadius: "15px 15px 0 0",
      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
    },
    conversationItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginBottom: "25px",
      padding: "20px",
      borderRadius: "15px",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e0e0e0",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      wordWrap: "break-word",
    },
    textContainer: {
      flex: "1",
      marginRight: "20px",
      maxWidth: "calc(100% - 100px)",
    },
    buttonContainer: {
      flexShrink: "0",
      display: "flex",
      alignItems: "stretch",
    },
    english: {
      fontSize: "18px",
      color: "#333333",
      marginBottom: "12px",
      fontWeight: "700",
    },
    kannada: {
      fontSize: "20px",
      color: "#81C784",
      marginBottom: "8px",
      fontFamily: '"Nirmala UI", sans-serif',
      fontWeight: "600",
    },
    transliteration: {
      fontSize: "16px",
      color: "#777777",
      fontStyle: "italic",
      paddingLeft: "15px",
      borderLeft: "3px solid #4CAF50",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
      padding: "20px",
      backgroundColor: "#4CAF50",
      color: "#ffffff",
      borderRadius: "0 0 15px 15px",
      boxShadow: "0 -4px 12px rgba(76, 175, 80, 0.3)",
    },
  };

  const conversations = [
    {
      id: "conversation1",
      english: "Since when have you been driving?",
      kannada: "ನೀವು ಯಾವಾಗಿಂದ ವಾಹನ ಚಾಲನೆ ಮಾಡ್ತಿದ್ದೀರಿ?",
      transliteration: "Neevu yavaginda vahana chalane madtiddiri?",
    },
    {
      id: "conversation2",
      english: "Do you own any license?",
      kannada: "ನಿಮ್ಮ ಹತ್ರ ಲೈಸೆನ್ಸ್ ಇದೆಯಾ?",
      transliteration: "Nimma hatra license ideya?",
    },
    {
      id: "conversation3",
      english:
        "I need you to obey all the rules and regulations. Be cautious while on duty.",
      kannada: "ನೀವು ಎಲ್ಲಾ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಬೇಕು. ಕರ್ತವ್ಯದಲ್ಲಿ ಎಚ್ಚರವಾಗಿರಬೇಕು.",
      transliteration:
        "Neevu ella niyamagalannu palisabeku. Kartavyadalli eccharavagirabeku.",
    },
    {
      id: "conversation4",
      english: "It's already late, where are you?",
      kannada: " ಈಗಾಗಲೇ ಲೇಟ್ ಆಗಿದೆ, ನೀವು ಎಲ್ಲಿದ್ದೀರಾ?",
      transliteration: " Eegagale late agide, neevu elliddira?",
    },
    {
      id: "conversation5",
      english: "We want you to come at the right time in the mornings.",
      kannada: " ನಾವು ಬಯಸುತ್ತೇವೆ ನೀವು ಬೆಳಗ್ಗೆ ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ಬರಬೇಕು.",
      transliteration:
        " Navu bayasutteve neevu belagge sariyada samayakke barabeku.",
    },
    {
      id: "conversation6",
      english: "Where is your house?",
      kannada: " ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿದೆ? ",
      transliteration: " Nimma mane ellide?",
    },
    {
      id: "conversation7",
      english: "Where have you been till now?",
      kannada: " ನೀವು ಈವರೆಗೆ ಎಲ್ಲಿದ್ದೀರಾ? ",
      transliteration: " Neevu eevarege elliddira?",
    },
    {
      id: "conversation9",
      english: "Take the shortcut road, the other road has a traffic jam.",
      kannada: " ಬೇರೆ ದಾರಿಯಲ್ಲಿ ಟ್ರಾಫಿಕ್ ಜಾಮ್ ಇದೆ, ಶಾರ್ಟ್ ಕಟ್ ಮೂಲಕ ಹೋಗಿ.",
      transliteration:
        " Bere dariyalli traffic jam ide, short cut moolaka hogi.",
    },
    {
      id: "conversation10",
      english: "I'll pay you salary monthly.",
      kannada: " ನಾನು ನಿಮಗೆ ತಿಂಗಳಿಗೊಮ್ಮೆ ಸಂಬಳ ಕೊಡುತ್ತೇನೆ.",
      transliteration: " Nanu nimage tingaligomme sambala kodutthene.",
    },
    {
      id: "conversation11",
      english: "Come by 6 AM tomorrow.",
      kannada: " ನಾಳೆ ಬೆಳಗ್ಗೆ ಆರು ಗಂಟೆಗೆ ಬನ್ನಿ.   ",
      transliteration: " Nale belagge aaru gantege banni.",
    },
    {
      id: "conversation12",
      english: "Go slow.",
      kannada: " ನಿಧಾನವಾಗಿ ಹೋಗಿ.   ",
      transliteration: " Nidhanavagi hogi.",
    },
    {
      id: "conversation13",
      english: "Go fast.",
      kannada: " ಬೇಗ ಹೋಗಿ.    ",
      transliteration: " Bega hogi.",
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Driver-Employer Conversation Guide</h1>
        <p>
          Learn common phrases in Kannada for communicating with your driver
        </p>
      </header>

      <div className="conversation-list">
        {conversations.map((item) => (
          <div key={item.id} style={styles.conversationItem}>
            <div style={styles.textContainer}>
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
            <div style={styles.buttonContainer}>
              <Conversation conversationId={item.id} />
            </div>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <p>© 2023 Kannada Learning Blog</p>
      </footer>
    </div>
  );
}

export default ConversationBlog;
