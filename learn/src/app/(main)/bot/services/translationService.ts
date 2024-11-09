import axios from 'axios';

const API_BASE_URL = 'https://savage-incantation-g4q5j45rq69xcjqp-5000.app.github.dev/'; // Replace with your backend URL if different
type Message = {
  sender: string;
  content: string;
};
export const translateText = async (text: string, sessionId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send_message`, {
      id: sessionId,
      msg: text,
    });
    return response.data;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export const generateSummary = async (messages: Message[]) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate_summary`, {
      messages,
    });
    return response.data;
  } catch (error) {
    console.error('Summary generation error:', error);
    throw error;
  }
};