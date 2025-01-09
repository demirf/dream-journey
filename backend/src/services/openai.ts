import { openai } from '../app';

export async function generateStory(
  characterName: string,
  characterAge: number,
  characterGender: 'male' | 'female',
  characterInterest: string,
  language: 'tr' | 'en' = 'en'
): Promise<{ story: string; imagePrompt: string }> {
  const prompt = `
    You are a master storyteller crafting a magical tale (200-300 words) that will captivate young minds. Your protagonist is:

    ✨ ${characterName}, a ${characterAge}-year-old ${characterGender === 'male' ? 'boy' : 'girl'} with a fascinating passion for ${characterInterest}

    Storytelling Guidelines:
    1. Begin with an unexpected event or a mysterious discovery related to ${characterInterest}
    2. Weave in elements of wonder and discovery
    3. Include a challenge that ${characterName} must overcome using creativity or knowledge about ${characterInterest}
    4. Add sensory details and vivid descriptions
    5. Include moments of humor or surprise
    6. End with a satisfying resolution that empowers the reader
    7. Subtly incorporate educational elements about ${characterInterest}
    8. Use age-appropriate language and concepts for ${characterAge}-year-olds
    9. Write in ${language === 'tr' ? 'Turkish' : 'English'} language

    The story should feel like a modern fairy tale that celebrates curiosity and learning.

    Return your response in the following format:
    STORY:
    [Write your enchanting tale here in ${language === 'tr' ? 'Turkish' : 'English'}]

    IMAGE_PROMPT:
    [Create a vivid, cinematic scene description capturing the most magical moment from the story]
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 0.9,
    max_tokens: 1000,
  });

  const content = completion.choices[0].message.content || '';
  
  // Parse the response manually
  const storyMatch = content.match(/STORY:\s*([\s\S]*?)\s*IMAGE_PROMPT:/);
  const imagePromptMatch = content.match(/IMAGE_PROMPT:\s*([\s\S]*?)$/);

  return {
    story: storyMatch ? storyMatch[1].trim() : '',
    imagePrompt: imagePromptMatch ? imagePromptMatch[1].trim() : '',
  };
}

export async function generateImage(imagePrompt: string): Promise<string> {
  const enhancedPrompt = `Create a highly detailed, vibrant illustration for a children's story with the following scene: ${imagePrompt}

Style specifications:
- Photorealistic elements mixed with stylized children's book aesthetics
- Rich, vibrant colors with careful attention to lighting and shadows
- Detailed textures and backgrounds
- Clear focal point with the main character/scene prominently featured
- Soft, warm lighting to create a welcoming atmosphere
- High level of detail in character expressions and environmental elements
- Safe and appropriate for children
- Cinematic composition with depth and perspective

Technical requirements: Create the image in a children's book illustration style but with enhanced realism, maintaining a balance between fantasy and photographic quality.`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: enhancedPrompt,
    n: 1,
    size: "1024x1024",
    quality: "hd",
    style: "vivid"
  });

  return response.data[0].url || '';
} 