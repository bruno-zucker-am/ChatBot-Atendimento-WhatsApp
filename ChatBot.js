// Bloco 1: Importações e configuração do cliente
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Criando o cliente do WhatsApp com autenticação local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

// Exibe o QR Code no terminal para autenticação
client.on('qr', qr => {
    console.log('Escaneie o QR Code abaixo para conectar:');
    qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on('ready', () => {
    console.log('🤖 Bot está pronto!');
});

// Bloco 2: Menu principal
const menu = `
Escolha uma das opções abaixo:
1️⃣ Criar Teste Android
2️⃣ Criar Teste iPhone
3️⃣ Tabela Revenda
4️⃣ Tabela Cliente Final
5️⃣ Comprar/Renovar [PIX]

Digite o número da opção desejada.`;

// Guarda quais números já receberam a saudação
let saudacoesEnviadas = new Set();
// Guarda os números que estão aguardando envio de comprovante
let aguardandoComprovante = new Set();

// Bloco 3: Evento ao receber mensagem
client.on('message', async message => {
    let msg = message.body.trim();
    let numero = message.from;

    console.log(`📩 Mensagem recebida de ${numero}: ${msg}`);

    // Se o usuário está enviando um comprovante
    if (aguardandoComprovante.has(numero) && (message.hasMedia || message.type === 'image' || message.type === 'document')) {
        message.reply(`✅ Comprovante recebido! Aguarde um momento enquanto validamos o pagamento. Em breve, seu serviço será entregue.`);
        aguardandoComprovante.delete(numero); // Remove da lista de aguardando
        return;
    }

    // Verifica se já foi enviada saudação para esse número
    if (!saudacoesEnviadas.has(numero)) {
        message.reply(`☁️ Bem-vindo(a) CLOUD BRASIL! Escolha um dos serviços digitando o número da opção!`);
        message.reply(menu);
        saudacoesEnviadas.add(numero);
        return;
    }

    // Opção 1: Criar Teste Android
if (msg === '1') {
    const androidText = `🎉 *Usuário Criado* 🎉\n\n🔎 *Usuário:* ZUCKER\n🔑 *Senha:* ZUCKER\n\n🎯 *Expira:* 2 Horas\n🕟 *Limite:* 1\n\n1️⃣ Instale o App...\n2️⃣ Coloque Usuário e Senha Igual Recebeu...\n3️⃣ Escolha sua Operadora...\n4️⃣ Clique em Conectar/Iniciar...\n\n📲 *Nosso APP na Playstore:*\n🔹 CLOUDBR_DT: https://play.google.com/store/apps/details?id=google.android.a16\n🔹 CB-TNNEL: https://play.google.com/store/apps/details?id=google.android.a48`;

    // Enviar arquivos APK com descrição antes de cada um
    const apkFiles = [
        { path: '/att/cloudbr_4g.apk', description: '📲 *App CLOUDBR_4G* - atualizado Offline, não precisa ter internet, só sinal de rede.' },
        { path: '/att/cloudbr_gpt.apk', description: '📲 *App CLOUDBR_GPT* - atualizado Offline, não precisa ter internet, só sinal de rede.' }
    ];

    message.reply(androidText);
    for (const file of apkFiles) {
        await client.sendMessage(numero, file.description); // Envia a descrição antes do arquivo
        await client.sendMessage(numero, MessageMedia.fromFilePath(file.path)); // Envia o arquivo
    }
} // <---- FECHA O BLOCO AQUI ANTES DE CONTINUAR

// Opção 2: Criar Teste iPhone
else if (msg === '2') {  
    const iphoneText = `📲 *Passo a Passo para Configuração:*  

1️⃣ *Instale o App* NapsternetV (NPV Tunnel) no seu iPhone.  
2️⃣ *Clique no arquivo* e salve-o no seu iPhone.  
3️⃣ *Abra o App* e importe o arquivo salvo.  

🔗 *Baixe o NapsternetV na App Store:*  
https://apps.apple.com/br/app/napsternetv/id1629465476`;

    // Lista de arquivos com descrição
    const npvtFiles = [
        { path: '/att/vivoPrezao.npvt', description: '🟣 Vivo Prezão' },
        { path: '/att/vivoFlare.npvt', description: '🟣 Vivo Flare' },
        { path: '/att/vivoControle.npvt', description: '🟢 Vivo Controle' },
        { path: '/att/vivoPrime.npvt', description: '🟢 Vivo Prime' },
        { path: '/att/vivoPrime2.npvt', description: '🟢 Vivo Prime 2' },
        { path: '/att/claroPlanos.npvt', description: '🔴 Claro Planos' },
        { path: '/att/timF1.npvt', description: '🔵 TIM Flare' },
        { path: '/att/timF2.npvt', description: '🔵 TIM Flare 2' },
        { path: '/att/timF3.npvt', description: '🔵 TIM Flare 3' }
    ];

    message.reply(iphoneText);
    for (const file of npvtFiles) {
        await client.sendMessage(numero, file.description); // Envia a descrição antes do arquivo
        await client.sendMessage(numero, MessageMedia.fromFilePath(file.path)); // Envia o arquivo
    }
}

    // Opção 3: Tabela Revenda
    else if (msg === '3') {
        const tabelaRevenda = `*Tabela de Preços Internet V.P.N CLOUD BRASIL* 🇧🇷 

PLANO DE REVENDA 👇 

⬇️ Operadoras Disponíveis
🟣 Vivo Todos DDDS
🔵 Tim Vários DDDS 

✅ *App Na Playstore* 

VIVO & TIM 

*Quantidade Mínima Para Adquirir o painel, 30 LOGINS* 

*Quantidade Mínima pra Você Abrir Sub Revenda, 100 Logins* 

30 LOGINS R$ 75,00
40 LOGINS R$ 80,00 
50 LOGINS R$ 100
60 LOGINS R$ 120
70 LOGINS R$ 140
80 LOGINS R$ 160
90 LOGINS R$ 180 
100 LOGINS R$ 200
200 LOGINS R$ 200 

*⚠️Painel Pra iPhone só a Partir de 100 Logins⚠️* 

*PAGAMENTO MENSAL*
*PAGAMENTO MENSAL*
*PAGAMENTO MENSAL* 

O Atraso no Pagamento Vai Gerar a Interrupção no Serviço de Forma Imediata!`;

        message.reply(tabelaRevenda);
    }

    // Opção 4: Tabela Cliente Final
    else if (msg === '4') {
        const tabelaClienteFinal = `*TABELA DE PREÇOS INTERNET V.P.N PARA USO PRÓPRIO (PESSOAL)*

🤖 *ANDROID*
🟣VIVO - 🔵TIM 

💬 1 login | 30 dias | : R$ 15,00 

...................................................... 

📱 *IOS (IPHONE)*
🟣VIVO - 🔵TIM 

💬 1 login | 30 dias | : R$ 20,00 

Funcionando em iPhone no app *Napsternetv (NPV TUNNEL)*`;

        message.reply(tabelaClienteFinal);
    }

    // Opção 5: Comprar Serviço [PIX]
    else if (msg === '5') {
        const pixInfo = `💳 *Informações para pagamento via PIX:*\n\n📱 *Chave Pix Celular:* (92)98586-3404\n👤 *Nome:* Antônio Carioca\n🏦 *Banco:* Inter\n\n📥 *Envie o comprovante de pagamento aqui para validação.*`;

message.reply(pixInfo);
        aguardandoComprovante.add(numero); // Adiciona o número à lista de quem precisa enviar o comprovante
    }
});

// Bloco 4: Inicia o cliente WhatsApp
client.initialize();