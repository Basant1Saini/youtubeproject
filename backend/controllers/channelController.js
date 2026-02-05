import Channel from '../models/Channel.js';
import Video from '../models/Video.js';

export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate('owner', 'username');
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    const videos = await Video.find({ channel: channel._id });
    res.json({ ...channel.toObject(), videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChannel = async (req, res) => {
  try {
    const channel = await Channel.create({ ...req.body, owner: req.user._id });
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
