import { CLAUDE_API_KEY, CLAUDE_API_URL, TCM_SYSTEM_PROMPT } from './constants';
import type { ClaudeResponse, ClaudeError } from './api-types';

export async function sendMessageToClaude(message: string): Promise<string> {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLAUDE_API_KEY}`,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        system: TCM_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text(); // Use .text() instead of .json()
      console.error('API Error Response:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as ClaudeResponse;
    return data.content[0].text;
  } catch (error) {
    console.error('Detailed API Error:', error);
    if (error instanceof Error) {
      throw new Error(`Claude API Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while calling Claude API');
  }
}