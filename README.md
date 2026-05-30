# Broadcast-fake

MVP SASS para disparos de mensagens, atenticação e crud completo para conexões, contatos e mensagens.

- Functions para atualizar status de mensagens agendadas.
- Rules com regras para proteção de dados.
- Cada usuário vê somente os dados criados por ele.
- Guards para proteção de rotas

# Tecnologias utilizadas

- Firebase Auth para autenticação
- Firebase Firestore para dados
- Firebase Functions automação de simulação de disparos
- Firebase Hosting deploy

## Estilização e componentes

- Material
- Tailwind

## Páginas

- login
- register
- conexões
- contatos
- mensagens

# Funcionalidades

- registro de usúario
- login
- logout
- proteção das rotas
- crud completo: create, update, delete de conexões, contatos e mensagens
- listagem de dados
- enviar ou agendar mensagens
- fitro para mensagens enviadas ou agendadas
- atualização de mensagens na hora do agendamento

## Pré requisitos

- node
- java para rodar o emulador

## rodar functions no emulador do firebase

`firebase emulators:start`

disparo altomático 

`firebase functions:shell`

`processScheduledMessages()`

## rodar projeto local

`npm run dev`

# MVP pode ser testado em 

https://broadcast-415db.web.app/

Somente as functions não rodam em produção pois para deploy delas o plano firebase gratuito não cobre. Mas podem ser testadas no emulador.

# Melhoria a serem feitas

- tratamento de dados
- validações nos inputs
- Melhorias na estilização