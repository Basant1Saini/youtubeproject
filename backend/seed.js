import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Channel from './models/Channel.js';
import Video from './models/Video.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Channel.deleteMany();
    await Video.deleteMany();

    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    const channel = await Channel.create({
      name: 'Tech Channel',
      description: 'Technology and programming content',
      owner: user._id
    });

    const categories = ['Technology', 'Gaming', 'Music', 'Education', 'Entertainment', 'Sports'];
    const videos = [];

    for (let i = 1; i <= 12; i++) {
      videos.push({
        title: `Sample Video ${i}`,
        description: `This is a sample video description for video ${i}`,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: `https://picsum.photos/320/180?random=${i}`,
        category: categories[i % categories.length],
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 1000),
        channel: channel._id
      });
    }

    await Video.insertMany(videos);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
