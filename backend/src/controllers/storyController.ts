import { Request, Response } from 'express';
import Story from '../models/Story';
import User from '../models/User';
import { generateStory, generateImage } from '../services/openai';

interface AuthRequest extends Request {
  user?: {
    _id: string;
    [key: string]: any;
  };
}

// Tüm hikayeleri getir
export const getStories = async (req: AuthRequest, res: Response) => {
  try {
    const stories = await Story.find({ userId: req.user?._id })
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stories' });
  }
};

// Tek bir hikaye getir
export const getStory = async (req: Request, res: Response) => {
  try {
    console.log({ req });
    const story = await Story.findOne({ 
      _id: req.params.id,
      userId: (req as AuthRequest).user?._id 
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(story);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching story' });
  }
};

export const createStory = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as AuthRequest).user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { characterName, characterAge, characterGender, characterInterest, language } = req.body;

    // AI ile hikaye ve resim prompt'u oluştur
    const { story, imagePrompt } = await generateStory(
      characterName,
      characterAge,
      characterGender,
      characterInterest,
      language || 'en'
    );

    // Oluşturulan prompt ile resim generate et
    const imageUrl = await generateImage(imagePrompt);

    // Yeni hikayeyi oluştur - sadece gerekli alanları kaydet
    const newStory = new Story({
      userId: user._id,
      content: story,
      imageUrl
    });
    
    await newStory.save();

    // Kullanıcı bilgileriyle birlikte hikayeyi döndür
    const populatedStory = await Story.findById(newStory._id)
      .populate('userId', 'name');
    
    res.status(201).json(populatedStory);
  } catch (error) {
    console.error('Story creation error:', error);
    res.status(400).json({ error: 'Error creating story' });
  }
};

// Hikaye sil
export const deleteStory = async (req: Request, res: Response) => {
  try {
    const story = await Story.findOneAndDelete({
      _id: req.params.id,
      userId: (req as AuthRequest).user?._id
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting story' });
  }
};