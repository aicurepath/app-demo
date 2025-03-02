import { TCM_MOCK_RESPONSES } from './mockResponses';

export async function sendMessageToMockAPI(message: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get a random response
  const randomIndex = Math.floor(Math.random() * TCM_MOCK_RESPONSES.length);
  return TCM_MOCK_RESPONSES[randomIndex];
}