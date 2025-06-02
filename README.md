# Sistema de Gestão de RH - Backend

Este é o backend do Sistema de Gestão de RH, uma API RESTful desenvolvida com Node.js, Express e MongoDB para gerenciar recursos humanos de uma empresa.

## Estrutura do Projeto

```
backend/
├── src/                   # Código-fonte
│   ├── config/            # Configurações do sistema
│   ├── controllers/       # Controladores da API
│   ├── middleware/        # Middlewares de autenticação e tratamento de erros
│   ├── models/            # Modelos de dados (Mongoose)
│   ├── routes/            # Rotas da API
│   └── utils/             # Utilitários
├── .env                   # Variáveis de ambiente (não versionado)
├── .gitignore             # Arquivos ignorados pelo Git
├── ecosystem.config.js    # Configuração do PM2 (opcional)
├── package.json           # Dependências do projeto
├── railway.json           # Configuração para deploy no Railway
├── README.md              # Este arquivo
└── server.js              # Ponto de entrada da aplicação
```

## Requisitos

- Node.js (v16 ou superior)
- MongoDB (Atlas ou local)
- NPM ou Yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```
     PORT=5000
     MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
     JWT_SECRET=sua_chave_secreta_jwt_muito_segura_e_longa
     JWT_EXPIRE=30d
     ENCRYPTION_KEY=sua_chave_de_criptografia_para_dados_sensiveis
     NODE_ENV=development
     CORS_ORIGIN=http://localhost:3000
     ```

## Execução

1. Para iniciar o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Para iniciar o servidor em modo de produção:
   ```bash
   npm start
   ```

O servidor será iniciado na porta 5000 por padrão (ou na porta definida na variável de ambiente `PORT`).

## Deploy no Railway

Este projeto está configurado para deploy no Railway. Para fazer o deploy:

1. Certifique-se de que o arquivo `railway.json` está na raiz do projeto.

2. Configure as variáveis de ambiente no Railway:
   - `MONGO_URI`: URI de conexão com o MongoDB
   - `JWT_SECRET`: Chave secreta para geração de tokens JWT
   - `JWT_EXPIRE`: Tempo de expiração dos tokens JWT
   - `ENCRYPTION_KEY`: Chave para criptografia de dados sensíveis
   - `NODE_ENV`: Ambiente de execução (production)
   - `CORS_ORIGIN`: URL do frontend (ou * para permitir qualquer origem)

3. Faça o deploy usando o CLI do Railway ou conectando seu repositório GitHub.

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Obter usuário atual
- `POST /api/auth/logout` - Logout de usuário

### Funcionários
- `GET /api/employees` - Listar funcionários
- `GET /api/employees/:id` - Obter funcionário por ID
- `POST /api/employees` - Criar funcionário
- `PUT /api/employees/:id` - Atualizar funcionário
- `DELETE /api/employees/:id` - Excluir funcionário

### Departamentos
- `GET /api/departments` - Listar departamentos
- `GET /api/departments/:id` - Obter departamento por ID
- `POST /api/departments` - Criar departamento
- `PUT /api/departments/:id` - Atualizar departamento
- `DELETE /api/departments/:id` - Excluir departamento

### Cargos
- `GET /api/positions` - Listar cargos
- `GET /api/positions/:id` - Obter cargo por ID
- `POST /api/positions` - Criar cargo
- `PUT /api/positions/:id` - Atualizar cargo
- `DELETE /api/positions/:id` - Excluir cargo

### Movimentações
- `GET /api/movements` - Listar movimentações
- `GET /api/movements/:id` - Obter movimentação por ID
- `POST /api/movements` - Criar movimentação
- `PUT /api/movements/:id` - Atualizar movimentação
- `PUT /api/movements/:id/approve` - Aprovar movimentação
- `PUT /api/movements/:id/reject` - Rejeitar movimentação
- `DELETE /api/movements/:id` - Excluir movimentação

### Tabelas Salariais
- `GET /api/salary-tables` - Listar tabelas salariais
- `GET /api/salary-tables/:id` - Obter tabela salarial por ID
- `POST /api/salary-tables` - Criar tabela salarial
- `PUT /api/salary-tables/:id` - Atualizar tabela salarial
- `DELETE /api/salary-tables/:id` - Excluir tabela salarial

### Dashboard
- `GET /api/dashboard/stats` - Obter estatísticas gerais
- `GET /api/dashboard/department-distribution` - Obter distribuição por departamento
- `GET /api/dashboard/position-distribution` - Obter distribuição por cargo
- `GET /api/dashboard/workmode-distribution` - Obter distribuição por modalidade de trabalho
- `GET /api/dashboard/workload-distribution` - Obter distribuição por carga horária
- `GET /api/dashboard/movement-history` - Obter histórico de movimentações
- `GET /api/dashboard/salary-analysis` - Obter análise salarial
- `GET /api/dashboard/budget-comparison` - Obter comparativo de orçamento

## Segurança

O sistema implementa várias medidas de segurança:

- Autenticação JWT com refresh tokens
- Criptografia de dados sensíveis no banco de dados
- Proteção contra ataques comuns (CSRF, XSS, etc.) com Helmet
- Rate limiting para prevenir ataques de força bruta
- Validação de entrada para prevenir injeção
- Controle de acesso baseado em perfis

## Licença

ISC
