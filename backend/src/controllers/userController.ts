import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Story from '../models/Story';

// Apple ile giriş/kayıt
export const signInWithApple = async (req: Request, res: Response) => {
  try {
    const { appleId, name, email } = req.body;

    console.log({ appleId, name, email });

    // Kullanıcıyı bul veya oluştur
    let user = await User.findOne({ appleId });

    console.log({ user });

    if (!user) {
      // Yeni kullanıcı oluştur
      user = new User({
        appleId,
        name,
        email
      });
      await user.save();
    }

    // JWT token oluştur
    const token = jwt.sign(
      { _id: user._id, appleId: user.appleId },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    console.log({ token, user });

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(400).json({ error: 'Authentication failed' });
  }
};

// Kullanıcı bilgilerini getir
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// Kullanıcı hikayelerinin özeti
export const getUserStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    
    // Toplam hikaye sayısı
    const totalStories = await Story.countDocuments({ userId });
    
    // Son oluşturulan hikaye
    const lastStory = await Story.findOne({ userId })
      .sort({ createdAt: -1 })
      .select('title createdAt');
    
    // Tema bazında hikaye sayıları
    const storiesByTheme = await Story.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$theme', count: { $sum: 1 } } }
    ]);

    res.json({
      totalStories,
      lastStory,
      storiesByTheme
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user stats' });
  }
};