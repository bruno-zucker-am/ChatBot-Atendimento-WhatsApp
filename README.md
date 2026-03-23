# 🤖 ChatBot de Atendimento - WhatsApp

Um bot de atendimento automático para WhatsApp construído com **whatsapp-web.js**. Este projeto foi desenvolvido para uso pessoal como exemplo prático de como criar um bot de atendimento com menu interativo, envio de arquivos e fluxo de pagamento via PIX.

> **Para quem está começando:** Este bot é um ótimo ponto de partida. Ele cobre os casos de uso mais comuns: menu de opções, envio de mensagens, envio de arquivos e controle de estado por usuário.

---

## 📋 O que o bot faz

- Envia uma **saudação automática** na primeira mensagem de cada contato
- Exibe um **menu de opções** numerado
- Cada opção executa uma ação diferente (enviar texto, arquivos, informações)
- Detecta quando o usuário envia um **comprovante de pagamento** (imagem ou documento)
- Mantém estado por número usando arquivos JSON

---

## 🚀 Como usar

### 1. Pré-requisitos

- Ubuntu 20+ (ou superior)
- [Node.js](https://nodejs.org/) v16 ou superior
- npm

### 2. Instalar dependências

```bash
npm install whatsapp-web.js qrcode-terminal
```

### 3. Rodar o bot

```bash
node chatbot.js
```

Durante o desenvolvimento, você pode usar o **nodemon** para reiniciar o bot automaticamente ao salvar alterações:

```bash
npm install -g nodemon
nodemon chatbot.js
```

Na primeira execução, um **QR Code** vai aparecer no terminal. Escaneie com o WhatsApp do celular em:

> WhatsApp > Dispositivos conectados > Conectar dispositivo

A sessão é salva localmente pela `LocalAuth`, então nas próximas execuções o login é automático.

---

## 🔧 Adaptando para o seu uso

Este bot foi construído para um negócio específico. Para adaptar ao seu caso:

**Menu de opções** — edite a variável `menu` e os blocos `if/else if` do evento `message` para refletir seus produtos ou serviços.

**Envio de arquivos** — o bot usa `MessageMedia.fromFilePath()` para enviar arquivos do servidor. Ajuste os caminhos para onde seus arquivos estão armazenados na sua máquina.

**Mensagens de texto** — todas as respostas são strings normais. Edite o conteúdo conforme sua necessidade. O WhatsApp aceita formatação com `*negrito*`, `_itálico_` e `~tachado~`.

**Fluxo de comprovante** — a lógica de detectar imagem/documento e confirmar recebimento pode ser reaproveitada para qualquer fluxo que precise aguardar uma mídia do usuário.

---

## 🗂️ Estrutura do projeto

```
/
├── chatbot.js               # Código principal do bot
├── package.json
└── /seus-arquivos/          # Pasta com arquivos que o bot vai enviar (APK, configs, etc.)
```

---

## ⚙️ Mantendo o bot online com PM2

Para manter o bot rodando em segundo plano (em servidor ou máquina dedicada) use o [PM2](https://pm2.keymetrics.io/):

```bash
npm install -g pm2
pm2 start ChatBot_Atendimento.js --name chatbot
pm2 save
pm2 startup
```

Com isso o bot reinicia automaticamente se o processo cair ou a máquina reiniciar.

---

## 📦 Dependências

| Pacote | Função |
|---|---|
| `whatsapp-web.js` | Controla o WhatsApp via navegador headless |
| `qrcode-terminal` | Exibe o QR Code no terminal para autenticação |

---

## ⚠️ Observações

- Este projeto foi feito para uso pessoal e serve como **exemplo de estrutura**
- Os caminhos de arquivos, textos e dados de contato no código original são específicos do ambiente onde foi criado — adapte conforme sua realidade
- Mantenha suas chaves PIX e dados pessoais fora do código se for publicar o repositório

---

## 📄 Licença

MIT — use, modifique e distribua à vontade.
