import axios from 'axios';

interface IChat {
  user: string;
  message: string;
  id: number;
}

export const askQuestion = async (prompt: string) => {
  console.log(prompt);

  const data = JSON.stringify({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    system_prompt: '',
    temperature: 0.9,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 256,
    web_access: false,
  });
  try {
    const response = await axios.post(
      'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
      data,
      {
        headers: {
          'x-rapidapi-key':
            '53e9058eb6msh0d5eff2898c471ap1421b8jsnc2d08a6db159',
          'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      },
    );

    const answer = response.data.result;
    return answer;
  } catch (error) {
    console.log(error);
  }
};
