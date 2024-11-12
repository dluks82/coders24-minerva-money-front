# Minerva Money - Frontend

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
