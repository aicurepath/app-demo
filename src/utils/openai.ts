const OPENAI_API_KEY = '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';

export async function sendMessageToOpenAI(message: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable Traditional Chinese Medicine (TCM) practitioner. Provide accurate and helpful advice while maintaining professional medical ethics and noting that users should consult licensed practitioners for specific medical concerns.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}