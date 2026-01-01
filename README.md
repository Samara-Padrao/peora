# PEORA - PEOPLE CARE AI - Assistente de Afastamentos e Retorno ao Trabalho

Aplicação front-end desenvolvida em React + TypeScript que simula um assistente inteligente para gestão de afastamentos, licenças médicas, benefícios previdenciários e retorno ao trabalho no contexto corporativo brasileiro.

A aplicação utiliza um modelo de linguagem (LLM) integrado via groq.chat.completions, com um system prompt estruturado que conduz o usuário por uma jornada guiada, objetiva e transacional, baseada em regras de negócio e cenários pré-definidos.

## Tecnologias
* React ^19.2.0
* TypeScript ^5.9.3
* Vite ^7.2.4
* Tailwind CSS ^3.4.19
* Framer Motion ^12.23.26
* lucide-react ^0.562.0
* react-icons ^5.5.0
* react-media-recorder ^1.7.2
* groq-sdk ^0.37.0
* Axios ^1.13.2

## Pré-requisitos
* Node.js >= 18
* npm ou yarn
* Chaves de API para integração com Groq Chat SDK (`GROQ_API_KEY`, `GROQ_TRANSLATE_API_UR` e `TOKEN_TRANSLATE`)

## Instalação e execução

```bash
# Clonar o repositório
git clone <repo-url>

# Instalar dependências
npm install
# ou yarn install

# Rodar em modo desenvolvimento
npm run dev

# Build de produção
npm run build

```

## Variáveis de ambiente

Crie um arquivo `.env` ou `.env.local` com as seguintes variáveis:

```
VITE_GROQ_API_TOKEN=your_api_key_here
VITE_TRANSLATE_API_TOKEN=your_api_key_here
VITE_GROQ_TRANSLATE_API_URL=https://api.groq.example
```


## Como usar

1. Execute `npm run dev`.
2. Selecione o perfil (gestor ou colaborador).
3. Informe um identificador de colaborador (simulado).
4. Inicie a conversa descrevendo o afastamento.
A IA irá:
* Solicitar a data de início do afastamento
* Identificar o fluxo mais adequado
* Conduzir o usuário passo a passo até a regularização do caso

## Lógica De cenários

A aplicação utiliza cenários internos apenas para guiar o fluxo da conversa.
Esses cenários não são revelados ao usuário.

Exemplo de comportamento:
* Datas que simulam afastamentos sem perícia definida
* Datas que simulam benefício sem renda ou decisão
* Datas fora do escopo utilizam o cenário mais próximo para manter a fluidez da jornada
* O objetivo é demonstrar controle de fluxo conversacional, não regras reais de negócio.

## Prompt do sistema

Localizado em `utils/functions/index.ts` na função `getSystemPrompt(role)`. Ele define:

* Persona da IA (assistente administrativo de afastamentos)
* Regras de comportamento (uma pergunta por vez, objetividade)
* Escopo de atuação (licenças, benefícios, retorno ao trabalho)
* FAQs utilizados como base de orientação
