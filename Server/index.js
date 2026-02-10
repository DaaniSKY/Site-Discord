require('dotenv').config(); // Carrega as variáveis do arquivo .env (se existir)
const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
// O Render define a porta automaticamente na variável PORT. 
// Se não tiver (no seu PC), usa a 3001.
const port = process.env.PORT || 3001;

// --- CONFIGURAÇÃO DE SEGURANÇA (CORS) ---
// Isso permite que o seu site React (Front-end) converse com esse Bot (Back-end)
app.use(cors());

// --- CONFIGURAÇÃO DO BOT ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

// --- ROTA DA API ---
app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Busca o usuário no Discord (force: true garante que não pegue cache velho)
        const user = await client.users.fetch(userId, { force: true });

        // Pega as badges públicas que a API permite (HypeSquad, Dev, etc.)
        const flags = user.flags ? user.flags.toArray() : [];

        res.json({
            username: user.username,
            // Pega o avatar. Se for animado, pega o GIF. Se não, PNG.
            avatar: user.displayAvatarURL({ dynamic: true, size: 512, extension: 'png' }),
            badges: flags
        });

    } catch (error) {
        console.error(`Erro ao buscar ID ${req.params.id}:`, error.message);
        res.status(500).json({ error: "Usuário não encontrado ou Bot sem permissão." });
    }
});

// Aviso quando o bot ligar
client.once('ready', () => {
    console.log(`✅ Bot logado como ${client.user.tag}`);
});

// --- LOGIN SEGURO ---
// No seu PC, crie um arquivo .env com: TOKEN=SEU_TOKEN_AQUI
// No Render, adicione a variável de ambiente TOKEN nas configurações.
const token = process.env.TOKEN;

if (!token) {
    console.error("❌ ERRO: Token não encontrado! Verifique seu arquivo .env ou as configurações do Render.");
    process.exit(1);
}

client.login(token);

// Inicia o servidor API
app.listen(port, () => {
    console.log(`🚀 API rodando na porta ${port}`);
});