// Import required modules
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import express from 'express';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, { polling: true });

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to Solana
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = process.env.WEBAPP_URL || 'https://127.0.0.1:5500/index.html';
    bot.sendMessage(chatId, 'Welcome to Sulino Trading Bot! 🚀\n\nStart trading Solana tokens and earn rewards!', {
        reply_markup: {
            inline_keyboard: [[{ text: "🌟 Open Sulino App", web_app: { url: webAppUrl } }]]
        }
    });
});

// Wallet Connection Endpoint
app.post('/api/wallet/connect', async (req, res) => {
    const { walletAddress } = req.body;
    // Dummy response for wallet connection
    res.json({ message: `Wallet ${walletAddress} connected!` });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
