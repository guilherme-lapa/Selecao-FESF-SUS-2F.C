# 📊 Saúde Dashboard

Dashboard interativo de gestão de saúde com métricas em tempo real, gráficos de evolução e tabelas de consultas. Desenvolvido com **Next.js 14**, **TypeScript**, **Tailwind CSS** e **Recharts**.

## 🚀 Tecnologias

- **Next.js 14** — App Router com layout aninhado
- **TypeScript** — tipagem estática em toda a aplicação
- **Tailwind CSS** — design responsivo e moderno
- **Recharts** — gráficos interativos (área e pizza)

## 📁 Estrutura do Projeto

```
saude-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Redireciona para /dashboard
│   │   └── dashboard/
│   │       ├── layout.tsx              # Layout com Sidebar
│   │       ├── page.tsx                # Visão geral com métricas
│   │       ├── pacientes/
│   │       │   └── page.tsx            # Listagem de pacientes com busca
│   │       └── consultas/
│   │           └── page.tsx            # Consultas com filtro por status
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Sidebar.tsx             # Navegação lateral
│   │   │   ├── MetricCard.tsx          # Card de métrica com variação
│   │   │   └── StatusBadge.tsx         # Badge de status colorido
│   │   └── charts/
│   │       ├── ConsultasChart.tsx      # Gráfico de área (evolução mensal)
│   │       └── EspecialidadeChart.tsx  # Gráfico de pizza (distribuição)
│   ├── data/
│   │   └── mock.ts                     # Dados simulados
│   └── types/
│       └── index.ts                    # Interfaces TypeScript
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## ⚙️ Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/guilherme-lapa/saude-dashboard.git
cd saude-dashboard

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` — será redirecionado automaticamente para o dashboard.

## 📄 Páginas

| Rota | Descrição |
|------|-----------|
| `/dashboard` | Visão geral com 4 métricas, 2 gráficos, tabela de consultas recentes e feed de atividades |
| `/dashboard/pacientes` | Listagem de pacientes com busca por nome ou CPF |
| `/dashboard/consultas` | Consultas com filtro por status (agendada, realizada, cancelada) |

## 🛠️ Autor

Desenvolvido por **Guilherme Lapa** — [contato.guilhermelapa@gmail.com](mailto:contato.guilhermelapa@gmail.com)
