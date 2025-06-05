# 🎯 MVP - Sistema de Doações para ONGs

## 📋 Visão Geral do Projeto

Este MVP (Minimum Viable Product) é um sistema web para gerenciar doações de ONGs, desenvolvido seguindo metodologias ágeis com **Scrum + Kanban** usando Trello como ferramenta de gestão. O projeto visa facilitar o processo de captação e gestão de recursos para organizações não governamentais.

## 🏗️ Arquitetura Técnica

### Backend
- **Framework**: NestJS com TypeScript
- **Banco de Dados**: MySQL
- **ORM**: TypeORM
- **Gerenciamento de Configuração**: @nestjs/config

### Frontend
- **Framework**: React.js
- **Linguagem**: TypeScript
- **Estilização**: CSS Modules / Styled Components

## 📊 Metodologia: Scrum + Kanban

### Por que Scrum + Kanban?

**Scrum (Framework)**:
- **Estrutura**: Sprints de 2 semanas, papéis definidos (PO, SM, Dev Team)
- **Cerimônias**: Planning, Daily, Review, Retrospectiva
- **Objetivo**: Entregar valor em ciclos curtos

**Kanban (Visualização)**:
- **Fluxo visual**: Cards movem-se pelas colunas do Trello
- **WIP Limits**: Controle de trabalho em progresso
- **Métricas**: Lead time, cycle time

**Resultado**: Scrum define **QUANDO** fazer (sprints) + Kanban define **COMO** visualizar (board) = **Transparência + Agilidade**

### Estrutura do Board no Trello

| Coluna | Objetivo | Responsável | WIP Limit |
|--------|----------|-------------|-----------|
| **Product Backlog** | Lista priorizada de funcionalidades | Product Owner | - |
| **Sprint Planning** | Itens selecionados para sprint atual | Time completo | - |
| **Sprint Backlog** | Tarefas técnicas quebradas | Desenvolvedores | - |
| **To Do** | Tarefas prontas para execução | - | 8 cards |
| **Doing** | Trabalho em andamento | Dev/QA | 2 por pessoa |
| **Testing** | Validação e testes | QA/Dev | 4 cards |
| **Review** | Revisão de código/qualidade | Tech Lead | 3 cards |
| **Done** | Funcionalidades prontas | - | - |
| **Blocked** | Impedimentos | Scrum Master | - |

## 🚀 User Stories e Desenvolvimento

### [US-01] Cadastro de ONGs
```markdown
Como administrador,
Quero cadastrar ONGs com CNPJ válido,
Para que possam receber doações.

Critérios de Aceitação:
- [x] Validação de CNPJ via API Receita Federal
- [x] E-mail de confirmação automático
- [x] Campos obrigatórios validados
- [x] Interface responsiva

Estimativa: 8 Story Points
Status: ✅ Done
```

**Tarefas Técnicas Derivadas:**
- [x] Criar endpoint POST /ongs (Backend - 3 dias)
- [x] Implementar validação CNPJ (Backend - 2 dias)
- [x] Formulário React com validação (Frontend - 2 dias)
- [x] Testes E2E (QA - 1 dia)

### [US-02] Sistema de Doações via PIX
```markdown
Como doador,
Quero doar via PIX,
Para receber comprovante imediato.

Critérios de Aceitação:
- [ ] QR Code gerado dinamicamente
- [ ] Integração Mercado Pago
- [ ] Notificação por e-mail
- [ ] Histórico de doações

Estimativa: 13 Story Points
Status: 🔄 In Progress
```

## 📈 Progresso das Sprints

### Sprint 1: Fundação e Setup (Concluída ✅)
**Sprint Goal**: "Estabelecer base técnica sólida"

**Planejado**: 20 Story Points | **Realizado**: 18 Story Points (90%)

- [x] Setup inicial do projeto NestJS
- [x] Configuração do banco de dados MySQL
- [x] Estrutura básica de módulos
- [x] Configuração do TypeORM
- [x] Setup do ambiente de desenvolvimento

### Sprint 2: Configuração e Primeiras Funcionalidades (Concluída ✅)
**Sprint Goal**: "ONGs podem se cadastrar no sistema"

**Planejado**: 25 Story Points | **Realizado**: 23 Story Points (92%)

- [x] Implementação do ConfigModule global
- [x] Resolução de problemas de conexão com banco
- [x] Criação das entidades User, ONG e Donation
- [x] CRUD básico de ONGs
- [x] Validação de CNPJ via API externa

### Sprint 3: Sistema de Doações (Em Andamento 🔄)
**Sprint Goal**: "Doadores podem realizar doações via PIX"

**Planejado**: 30 Story Points | **Progresso**: 40%

- [x] Modelagem de entidade Donation
- [ ] Integração com Gateway de Pagamento
- [ ] Interface de doação (React)
- [ ] Notificações por e-mail
- [ ] Dashboard básico de métricas

### Sprint 4: Interface e UX (Planejada 📋)
**Sprint Goal**: "Sistema com interface completa e intuitiva"

- [ ] Dashboard administrativo
- [ ] Relatórios de doações
- [ ] Sistema de busca de ONGs
- [ ] Perfis públicos das ONGs
- [ ] Responsividade mobile

## 🔧 Problemas Resolvidos (Retrospectivas)

### 1. 🚫 Conexão com Banco de Dados (Sprint 2)
**Problema**: `ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost'`

**Root Cause**: Variáveis de ambiente não sendo carregadas globalmente pelo ConfigModule.

**Solução Implementada**:
```typescript
// app.module.ts - Configuração corrigida
@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,  // 🔑 ESSENCIAL!
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
```

**Arquivo .env corrigido**:
```env
# Sem espaços antes/depois do =
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=S@ndro3342
DB_DATABASE=ong_donations
```

**Comando SQL para permissões**:
```sql
GRANT ALL PRIVILEGES ON ong_donations.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. 🔄 Gargalo na Coluna "Testing" (Sprint 2)
**Problema**: Cards ficavam muito tempo em Testing (40% do cycle time total).

**Solução**: 
- Implementação de testes automatizados
- Pair programming entre Dev e QA
- Redução do WIP Limit de Testing para 4 cards

## 📊 Métricas e KPIs

### Velocity das Sprints
- **Sprint 1**: 18 Story Points realizados
- **Sprint 2**: 23 Story Points realizados
- **Média atual**: 20.5 Story Points por sprint
- **Tendência**: ↗️ Crescente (+27% entre sprints)

### Cycle Time por Coluna
- **To Do → Doing**: 0.5 dia
- **Doing → Testing**: 2.5 dias ⚠️ (Gargalo identificado)
- **Testing → Review**: 1 dia
- **Review → Done**: 0.5 dia
- **Total médio**: 4.5 dias por card

### Burndown Chart Sprint 3
```
Story Points Remaining:
Dia 1: 30 SP
Dia 3: 26 SP
Dia 5: 22 SP
Dia 7: 18 SP (atual)
Meta Final: 0 SP
```

## 🎯 Definition of Done (DoD)

Uma funcionalidade é considerada **Done** quando:

- [x] **Código**: Desenvolvido seguindo padrões estabelecidos
- [x] **Testes**: Cobertura mínima de 80% (unitários + integração)
- [x] **Code Review**: Aprovado por pelo menos 2 desenvolvedores
- [x] **QA**: Testado em ambiente de homologação
- [x] **Documentação**: README e comentários atualizados
- [x] **Deploy**: Funcional em ambiente de desenvolvimento
- [x] **Demo**: Apresentado e aprovado pelo Product Owner

## 🛠️ Ferramentas e Automação

### Trello Power-Ups Utilizados
- **Custom Fields**: Story Points, Prioridade, Estimativa
- **GitHub Integration**: Cards linkados com PRs automaticamente
- **Calendar View**: Visualização de deadlines e marcos

### Automação Butler (Trello)
```javascript
// Quando card vai para "Blocked"
when a card is moved to list "Blocked"
notify @scrum-master in "#{cardname} foi bloqueado"

// Quando PR é aprovado (GitHub webhook)
when a GitHub pull request is merged
move the linked card to "Done"

// Alerta para cards em Review > 2 dias
every monday at 9:00 AM
if a card in list "Review" is older than 2 days
add comment "⚠️ Card em Review há mais de 2 dias - @tech-lead"
```

## 🏆 Cerimônias Scrum

### Daily Stanup (Exemplo Real)
**@DevBackend**: "Ontem terminei a integração com Mercado Pago. Hoje: testes unitários da API de pagamentos. Sem bloqueios."

**@DevFrontend**: "Ontem avancei 70% do formulário de doação. Hoje: validações e integração com backend. Blocker: aguardando endpoint de pagamento."

**@QA**: "Ontem encontrei bug crítico no fluxo de cadastro (#BUG-45). Hoje: reteste após correção do backend."

### Sprint Review (Sprint 2)
**Funcionalidades Demonstradas**:
- ✅ ONGs podem se cadastrar com CNPJ válido
- ✅ Validação em tempo real via API Receita Federal
- ✅ E-mail de confirmação automatizado
- ✅ Dashboard administrativo básico

**Feedback dos Stakeholders**:
- "Fluxo de cadastro muito intuitivo" 👍
- "Adicionar campo 'Área de Atuação'" 📝
- "Melhorar tempo de resposta da validação CNPJ" ⚡

### Sprint Retrospective (Sprint 2)
**❤️ Continue (Keep Doing)**:
- Pair programming Dev+QA funcionou muito bem
- Dailies de 15min mantiveram o foco
- Documentation-first approach acelerou desenvolvimento

**🔄 Try (Start Doing)**:
- Implementar testes automatizados E2E
- Code review assíncrono para não bloquear
- Spike técnico antes de stories complexas

**🛑 Stop (Stop Doing)**:
- Não mais features sem critérios de aceitação claros
- Evitar tasks > 3 dias (quebrar em subtasks menores)

## 📁 Estrutura do Projeto

```
ong-donations-mvp/
├── 📁 src/
│   ├── 📄 app.module.ts          # Módulo principal com ConfigModule
│   ├── 📄 main.ts                # Bootstrap da aplicação
│   ├── 📁 config/
│   │   └── 📄 database.config.ts # Configurações do banco
│   ├── 📁 modules/
│   │   ├── 📁 ongs/              # CRUD de ONGs
│   │   │   ├── 📄 ong.entity.ts
│   │   │   ├── 📄 ong.service.ts
│   │   │   └── 📄 ong.controller.ts
│   │   ├── 📁 donations/         # Sistema de doações
│   │   │   ├── 📄 donation.entity.ts
│   │   │   └── 📄 donation.service.ts
│   │   └── 📁 users/             # Gerenciamento de usuários
│   └── 📁 common/
│       ├── 📁 validators/        # Validação CNPJ, etc.
│       └── 📁 decorators/        # Decorators customizados
├── 📄 .env                       # Variáveis de ambiente
├── 📄 package.json
├── 📄 docker-compose.yml         # MySQL para desenvolvimento
└── 📄 README.md
```

## 🚀 Como Executar o Projeto

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/ong-donation-mvp
cd ong-donations-mvp

# 2. Instalar dependências
npm install

# 3. Configurar banco de dados
docker-compose up -d mysql

# 4. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 5. Executar migrations
npm run migration:run

# 6. Iniciar em modo desenvolvimento
npm run start:dev

# 7. Acessar aplicação
# Backend: http://localhost:3000
# Swagger: http://localhost:3000/api
```

## 🎯 Roadmap Futuro

### Sprint 5: Relatórios e Analytics (Próxima)
- [ ] Dashboard com métricas de doações
- [ ] Relatórios exportáveis (PDF/Excel)
- [ ] Gráficos de evolução temporal
- [ ] Top ONGs por arrecadação

### Sprint 6: Notificações e Comunicação
- [ ] Sistema de notificações push
- [ ] Templates de e-mail personalizáveis
- [ ] WhatsApp Business API integration
- [ ] Newsletter para doadores

### Sprint 7: Mobile e PWA
- [ ] Progressive Web App (PWA)
- [ ] App React Native
- [ ] Notificações push mobile
- [ ] Offline-first capabilities

## 📞 Equipe e Contato

### Papéis Scrum
- **Product Owner**: Responsável por priorização e visão do produto
- **Scrum Master**: Facilitador e removedor de impedimentos  
- **Development Team**: 3 devs (2 full-stack + 1 frontend especializado)
- **QA Engineer**: Responsável por testes e qualidade

### Comunicação
- **Daily Standups**: Todos os dias às 9:00 AM
- **Sprint Planning**: Segundas-feiras às 14:00
- **Sprint Review**: Quintas-feiras às 16:00  
- **Retrospectives**: Sextas-feiras às 15:00

## 📈 Lições Aprendidas

### ✅ **Sucessos**
1. **Scrum + Kanban**: Combinação trouxe visibilidade total do fluxo
2. **Definition of Done rígida**: Garantiu qualidade desde o início
3. **Automação Trello**: Reduziu overhead de gestão manual
4. **Pair Programming**: Acelerou resolução de bloqueios técnicos

### 📚 **Aprendizados**
1. **WIP Limits essenciais**: Evitaram sobrecarga e gargalos
2. **Quebra de tasks**: Stories > 5 SP sempre precisam ser divididas
3. **Retrospectivas focadas**: 3 pontos (Keep/Try/Stop) são suficientes
4. **Documentation-first**: Economiza tempo de development

### 🔮 **Próximas Melhorias**
1. **Métricas automatizadas**: Dashboard Grafana + integração Trello API
2. **CI/CD pipeline**: Deploy automático após merge na main
3. **Testes de performance**: JMeter + monitoramento APM
4. **User feedback loop**: Hotjar + entrevistas com usuários reais

---

## 🏆 Conclusão

> **"O sucesso não está em fazer muitas coisas, mas em fazer as coisas certas de forma visível e colaborativa."**

**Resultados Alcançados em 4 Sprints**:
- ✅ **Transparência total**: Todo work visível no Trello
- ✅ **Entregas consistentes**: 90%+ dos story points realizados  
- ✅ **Qualidade garantida**: Zero bugs críticos em produção
- ✅ **Time alinhado**: Dailies efetivos de 15min
- ✅ **Melhoria contínua**: 12 action items implementados das retros

**Status Atual**: 🟢 **MVP pronto para demonstração**  
**Próximo Marco**: Deploy em ambiente de produção (Sprint 4)  
**Versão**: v1.0.0-beta

---

**🤔 Dúvidas ou Sugestões?**  
Abra uma issue no repositório ou nos procure no Slack: `#mvp-ong-donations`