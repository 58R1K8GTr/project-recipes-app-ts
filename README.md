# 🍲 App de Receitas (Recipes App)

Este repositório contém um aplicativo completo de receitas de comidas e bebidas focado na experiência em dispositivos móveis. O projeto foi desenvolvido de forma colaborativa (em grupo), simulando um fluxo real de desenvolvimento de software (*Code Review*, *Kanban* e integração contínua).

O principal objetivo foi consumir duas APIs distintas para entregar uma interface onde o usuário consegue buscar, filtrar, favoritar, acompanhar o progresso e concluir receitas.

---

## 🧠 Aprendizados e Habilidades Desenvolvidas

Neste projeto, consolidei conceitos avançados do ecossistema **React** e gerenciamento de estado complexo:

### 1. Gerenciamento de Estado Global (Hooks vs Redux)
*   Aplicação prática da **Context API** do React combinada com os Hooks `useState`, `useContext` e `useEffect` para criar fluxos de dados limpos e compartilhados.
*   Uso estratégico de **Redux** e da biblioteca **React-Redux** para estruturas de estado que exigiam alta escalabilidade.
*   Criação de **Hooks customizados** para abstrair lógicas repetitivas e requisições assíncronas, mantendo os componentes mais limpos.

### 2. Consumo de APIs Assíncronas e Múltiplas Fontes
*   Manipulação de requisições HTTP nativas utilizando exclusivamente a **Fetch API** para obter dados dinâmicos de duas plataformas distintas: **TheMealDB** (comidas) e **TheCocktailDB** (bebidas).
*   Tratamento e mapeamento de dados estruturados em formatos complexos e dinâmicos (como a extração de listas de ingredientes e medidas indexadas numericamente).

### 3. Persistência de Dados (Local Storage)
*   Sincronização do estado da aplicação com o `localStorage` do navegador para evitar a perda de dados ao atualizar a página, gerenciando dados de sessão do usuário, receitas favoritas (`favoriteRecipes`), receitas em progresso (`inProgressRecipes`) e histórico de receitas concluídas (`doneRecipes`).

### 4. Integração com APIs Nativas do Navegador
*   Uso da **Clipboard API** nativa (`navigator.clipboard.writeText`) para a funcionalidade de compartilhamento de links de receitas sem a necessidade de dependências externas.

### 5. Testes Automatizados (E2E, Integração e Cobertura)
*   Desenvolvimento de **testes unitários e de integração** com **React Testing Library (RTL)** sob a metodologia TDD (*Test-Driven Development*), alcançando uma meta de **mais de 90% de cobertura de código**.
*   Validação de fluxos de comportamento de usuário através de testes end-to-end (E2E) utilizando o **Cypress**.

---

## 🛠️ Tecnologias Utilizadas

*   **React** (TypeScript)
*   **Context API & Hooks**
*   **Redux / React-Redux**
*   **React Router** (Mapeamento de sub-rotas dinâmicas como `/meals/:id/in-progress`)
*   **Bootstrap / React-Bootstrap** (Componentização visual e estilização adaptada para *Mobile First* — 360x640)
*   **React Testing Library (RTL) & Jest**
*   **Cypress** (Testes de comportamento de ponta a ponta)
*   **ESLint / StyleLint** (Garantia de padrões de código limpo)

---

## 🛣️ Rotas Mapeadas na Aplicação

O app foi estruturado sob o seguinte sistema de rotas dinâmicas:

*   ` / ` — Tela de Login
*   `/meals` — Tela principal de receitas de comidas
*   `/drinks` — Tela principal de receitas de bebidas
*   `/meals/:id` — Detalhes de uma receita de comida
*   `/drinks/:id` — Detalhes de uma receita de bebida
*   `/meals/:id/in-progress` — Processo de preparação de uma comida
*   `/drinks/:id/in-progress` — Processo de preparação de uma bebida
*   `/profile` — Perfil do usuário logado
*   `/done-recipes` — Histórico de receitas concluídas
*   `/favorite-recipes` — Lista de receitas favoritadas

---

## 🚀 Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone git@github.com:seu-usuario/sd-0x-project-recipes-app.git
   cd sd-0x-project-recipes-app
2. Instale as dependências:
    `npm install`
3. Inicialize o servidor de desenvolvimento:
    `npm start`
4. Execute e verifique a cobertura dos testes unitários (rtl):
    `npm run coverage`
5. Execute a suíte de testes de comportamento Cypress:
    ```
    # terminal
    npm run cy
    # abrir a interface visual
    npm run cy:open
    ```
