# 🧐 Search Items

## 💡 Projeto

Desenvolvimento de uma aplicação que faz busca em um banco de dados e retorna os valores requisitados. A aplicação trabalha com conceitos de code splitting, virtualização e react devtools.

## 💻 Tecnologias e Bibliotecas

- ReactJS
- NextJS
- Typescript
- SASS
- memo
  - biblioteca utilizada para evitar que a primeira instrução do fluxo de renderização do ReactJS (criar uma nova versão do componente) seja executada, caso nenhuma propriedade do componente tenha sido alterada.
- useMemo: utilizado para memorizar um valor	
- useCallback: utilizado para memorizar uma função
- React Devtools

## 👩‍💻 Conceitos aplicados no projeto

- Code Splitting
  - Lazy no React, ou Dynamic no Next, servem para uma importação ser realizada somente quando ela for utilizada, basicamente é importar algum arquivo, funcionalidade, componente somente quando for utilizar, pois algumas funcionalidades só serão usadas caso o usuário tome uma determinada ação.

- Virtualização com react-virtualized
  - biblioteca utilizada para mostrar em tela apenas o conteúdo que está visível na tela do navegador do usuário, evitando que a aplicação faça o carregamento completo de todos o conteúdo.
  
- Bundle Analyzer (Next)
  - biblioteca utilizada para analisar o tamanho de tudo que compõe a build. É uma funcionalidade que não faz alterações significativas no código da aplicação, mas dará uma dimensão do quão pesada está a aplicação e quais partes do código faz com que esse carregamento esteja mais lento ou pesado, na maioria das vezes o que pesa são as dependências instaladas.
