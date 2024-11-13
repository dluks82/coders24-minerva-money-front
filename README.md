# Minerva Money - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <br/>
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Shadcn/ui-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn/ui"/>
  <img src="https://img.shields.io/badge/React%20Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query"/>
  <br/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <br/>
  <a href="https://minervamoney.11051982.xyz">
    <img src="https://img.shields.io/badge/Demo-Online-4dc71f?style=for-the-badge&logo=vercel&logoColor=white" alt="Demo Status"/>
  </a>
  <a href="https://github.com/dluks82/coders24-minerva-money">
    <img src="https://img.shields.io/badge/Backend-API-4dc71f?style=for-the-badge&logo=spring&logoColor=white" alt="Backend API"/>
  </a>
</div>

Aplicação web para controle financeiro pessoal desenvolvida com Next.js 15.

## Requisitos

- Node.js 18+ 
- npm (ou yarn/pnpm)
- Backend Minerva Money rodando em `localhost:8081` ([Minerva Money API](https://github.com/dluks82/coders24-minerva-money))

## Tecnologias

- Next.js 15
- React 18
- TailwindCSS
- Shadcn/ui
- React Query v5
- Axios

## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:dluks82/coders24-minerva-money-front.git
cd minerva-money-front
```

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação em modo desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Funcionalidades

- Autenticação de usuários
- Dashboard financeiro
- Gestão de transações
- Categorização de despesas e receitas
- Visualização de saldos e extratos
- Gestão de categorias personalizadas

## Estrutura do Projeto

```
src/
├── app/               # Rotas e páginas
├── components/        # Componentes React
├── contexts/          # Contextos React
├── hooks/            # Hooks personalizados
├── lib/              # Configurações e utilitários
└── types/            # Tipagens TypeScript
```

## License

[MIT License](LICENSE)
