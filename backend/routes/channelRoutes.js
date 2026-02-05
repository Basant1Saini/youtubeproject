import express from 'express';
import { getAllChannels, getChannel, createChannel, updateChannel } from '../controllers/channelController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllChannels);
router.get('/:id', getChannel);
router.post('/', protect, createChannel);
router.put('/:id', protect, updateChannel);

export default router;
