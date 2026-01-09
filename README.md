# Pereira & Silva - Advocacia e Consultoria

Site institucional moderno e responsivo desenvolvido para o escritório de advocacia Pereira & Silva, com foco em experiência do usuário e design profissional.

## 🎯 Sobre o Projeto

Este projeto consiste em um site one-page completo para um escritório de advocacia, apresentando informações sobre os serviços, equipe, áreas de atuação e canais de contato. O site foi desenvolvido com foco em responsividade, garantindo uma excelente experiência em todos os dispositivos, desde smartphones compactos até desktops.

## 🚀 Tecnologias Utilizadas

### Core
- **React 18.3.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript para maior segurança e produtividade
- **Vite 6.3.5** - Build tool moderna e rápida para desenvolvimento frontend

### Estilização
- **Tailwind CSS 4.1.12** - Framework CSS utility-first para estilização rápida e consistente
- **@tailwindcss/vite** - Plugin de integração do Tailwind com Vite
- **clsx & tailwind-merge** - Utilitários para gerenciamento de classes CSS

### Componentes UI
- **Radix UI** - Conjunto de componentes acessíveis e sem estilo:
  - Accordion, Alert Dialog, Avatar, Checkbox
  - Dialog, Dropdown Menu, Navigation Menu
  - Popover, Progress, Radio Group, Select
  - Separator, Slider, Switch, Tabs, Tooltip
  - E muitos outros componentes primitivos

### Ícones e Animações
- **Lucide React 0.487.0** - Biblioteca de ícones moderna e customizável
- **Motion 12.23.24** - Biblioteca de animações para React
- **tw-animate-css** - Animações CSS integradas com Tailwind

### Outras Bibliotecas
- **React Hook Form 7.55.0** - Gerenciamento de formulários com validação
- **Sonner** - Sistema de notificações toast
- **date-fns** - Manipulação de datas
- **Embla Carousel** - Carousel responsivo e performático


#### ImagemDeSeguranca
Componente personalizado desenvolvido para melhorar a experiência do usuário ao lidar com imagens. Este componente foi implementado com base em aprendizados de outras aplicações e resolve um problema comum em sites: o que acontece quando uma imagem falha ao carregar.

**Funcionamento:**
- Monitora o carregamento de todas as imagens do site
- Em caso de erro (URL quebrada, arquivo não encontrado, problemas de rede), exibe automaticamente uma imagem placeholder elegante
- Mantém o layout do site intacto mesmo com falhas
- Evita que o usuário veja ícones de imagem quebrada do navegador

**Por que usar?**
- **Experiência do usuário**: Garante que problemas técnicos não prejudiquem a navegação
- **Profissionalismo**: Mantém o site visualmente consistente mesmo em situações de erro
- **Melhor UX**: O usuário continua navegando normalmente sem perceber falhas técnicas

Este componente é utilizado em todas as imagens críticas do site, como fotos da equipe e imagem de fundo do Hero.

## 📁 Estrutura do Projeto

```
Pereira-Silva/
├── public/
│   └── assets/              # Imagens e recursos estáticos
├── src/
│   ├── components/
│   │   ├── layout/          # Componentes de layout
│   │   │   ├── Header.tsx   # Cabeçalho/Menu de navegação
│   │   │   └── Footer.tsx   # Rodapé com links e redes sociais
│   │   ├── sections/        # Seções da página
│   │   │   ├── About.tsx            # Seção "Sobre o escritório"
│   │   │   ├── Contact.tsx          # Formulário de contato
│   │   │   ├── Hero.tsx             # Seção Hero principal
│   │   │   ├── PracticeAreas.tsx    # Áreas de atuação
│   │   │   └── Team.tsx             # Equipe de advogados
│   │   ├── common/          # Componentes compartilhados
│   │   │   └── ImagemDeSeguranca.tsx  # Componente de imagem com fallback
│   │   └── ui/              # Componentes UI reutilizáveis (Radix UI)
│   ├── types/               # Definições TypeScript
│   │   ├── team.ts          # Interface TeamMember
│   │   ├── practiceArea.ts  # Interface PracticeArea
│   │   └── contact.ts       # Interfaces ContactInfo e ContactFormData
│   ├── data/                # Dados centralizados
│   │   ├── team.ts          # Dados dos advogados
│   │   ├── practiceAreas.ts # Dados das áreas de atuação
│   │   └── contact.ts       # Informações de contato
│   ├── styles/              # Arquivos de estilos CSS
│   ├── App.tsx              # Componente principal da aplicação
│   └── main.tsx             # Ponto de entrada da aplicação
├── package.json             # Dependências e scripts
├── vite.config.ts           # Configuração do Vite
├── tailwind.config.ts       # Configuração do Tailwind CSS
└── tsconfig.json            # Configuração do TypeScript
```

### Organização por Funcionalidade

A estrutura foi otimizada seguindo as melhores práticas do React:

- **`layout/`** - Componentes estruturais (Header, Footer)
- **`sections/`** - Componentes de seções específicas da página
- **`common/`** - Componentes compartilhados e utilitários
- **`ui/`** - Componentes de interface reutilizáveis
- **`types/`** - Definições de tipos TypeScript para type safety
- **`data/`** - Dados centralizados separados dos componentes

Esta organização facilita a manutenção, escalabilidade e colaboração no projeto.

### Boas Práticas Implementadas

#### Separação de Responsabilidades
- **Dados separados dos componentes**: Toda informação de conteúdo está em `src/data/`, facilitando atualizações sem modificar código
- **Interfaces TypeScript**: Tipos bem definidos em `src/types/` garantem segurança e autocomplete
- **Componentes focados**: Cada componente tem uma única responsabilidade

#### Type Safety
- Interfaces TypeScript para todas as estruturas de dados
- Validação de tipos em tempo de desenvolvimento
- Redução de erros em runtime

#### User Experience
- **Sistema de Notificações**: Sonner integrado para feedback visual ao usuário
- **Formulário de Contato**: Substituição de `alert()` por toast notifications modernas
- **Validação**: React Hook Form para gerenciamento e validação de formulários

## 🎨 Características do Design

### Paleta de Cores
- **Primária**: `#5E0D13` (Vinho escuro)
- **Secundária**: `#AC8B57` (Dourado)
- **Destaque**: `#DCC48F` (Bege claro)
- **Escuro**: `#2E0506` (Marrom escuro)

### Responsividade
O site foi desenvolvido com abordagem mobile-first e inclui breakpoints customizados para:
- Smartphones compactos (Galaxy Z Fold e menores)
- Smartphones padrão
- Tablets
- Desktops

### Seções do Site
1. **Hero** - Apresentação principal com logo e mensagem de impacto
2. **Sobre** - Informações sobre o escritório com estatísticas
3. **Áreas de Atuação** - Cards com as especialidades jurídicas
4. **Equipe** - Perfis dos advogados com fotos e especializações
5. **Contato** - Formulário e informações de contato
6. **Footer** - Links rápidos e redes sociais

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou pnpm

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta do projeto
cd Pereira-Silva

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Crie a build otimizada
npm run build

# Os arquivos estarão na pasta dist/
```

## 🌐 Funcionalidades

- ✅ Design responsivo e mobile-first
- ✅ Navegação suave entre seções
- ✅ Formulário de contato com notificações toast
- ✅ Cards interativos com hover effects
- ✅ Integração com redes sociais (Instagram e LinkedIn)
- ✅ Links diretos para WhatsApp
- ✅ Otimização de imagens com fallback
- ✅ Animações e transições suaves
- ✅ Acessibilidade com componentes Radix UI
- ✅ TypeScript para type safety
- ✅ Separação de dados e componentes
- ✅ Sistema de notificações moderno (Sonner)

## 📱 Integrações Externas

- **WhatsApp Business** - Links diretos para iniciar conversas
- **Instagram** - Perfis dos advogados
- **LinkedIn** - Perfil profissional da advogada

## 🎯 Áreas de Atuação

- Direito Trabalhista
- Direito de Família
- Direito Civil
- Direito Penal
- Direito Previdenciário
- Direitos Humanos

## 📄 Licença

Este projeto é privado e proprietário do escritório Pereira & Silva Advocacia.

## 👥 Equipe

- **Dr. Valdison da Anunciação Pereira** - OAB/SP 398.623
- **Dra. Melissa Carla Silva** - OAB/SP 440.900



