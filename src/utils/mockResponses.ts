export const TCM_MOCK_RESPONSES = [
  "Based on TCM principles, maintaining balance between yin and yang is essential for good health. Consider incorporating more cooling foods if you're experiencing heat symptoms.",
  "Category:",
  "[Category] Herbal Medicine",
  "Recommand Recipes:",
  "[Recipe] Ginger and Jujube Tea"
];

// Helper to get all responses at once
export function getAllResponses(userMessage: string): string[] {
  return TCM_MOCK_RESPONSES;
}