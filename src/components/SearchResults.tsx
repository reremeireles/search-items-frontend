import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ totalPrice, results, onAddToWishlist }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
        product={results[index]}
        onAddToWishlist={onAddToWishlist}
      />
      </div>
    );
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* @ts-ignore */}
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

    </div>
  );
}

/*
Hooks do memo: useMemo (foi usado e dps excluído) e useCallback (index.tsx)

useMemo:

Hook utilizado para memorizar um valor

O useMemo tem 2 principais funcionalidades dentro da aplicação React:

1. Igualdade referencial: quando uma informação é repassada de um componente pai para um componente filho
2. Cálculos pesados (coisas menores não faz sentido, pois o useMemo também tem um custo de processamento)

1. Igualdade referencial:

Evitar que uma variável ocupe um novo local/posição na memória quando essa varivável é repassada para um componente filho (não vamos alongar a explicação deste, pois não usaremos ele no momento)

2. Cálculos pesados:

O useMemo tem como funcionalidade evitar que algo que ocupe muito processamento, um cálculo por exemplo, seja refeito toda vez que o componente renderizar, então basicamente ele evita processar cálculos desnecessários dentro da aplicação

Exemplo: como usamos o 'memo' dentro do componente ProductItem, nós já evitamos que o
componente renderize novamente só de digitar algo no input do campo 'buscar', já o componente SearchResults
está renderizando toda vez que digitamos algo no input de busca (a digitação também é uma troca de estado)

Então, o useMemo é utilizado para memorizar algum conteúdo, entre as renderizações, para não precisar
ser recalculado toda vez do zero

Antes de importar o useMemo para dentro do componente SearchResults, iremos até o navegador para ver quanto tempo
a aplicação está levando para renderizar o cálculo no componente sem o useMemo:

Testar a aplicação na web:
- Salvar os arquivos
- Rodar o server em um terminal: yarn server
- Rodar o servidor da aplicação em outro terminal: yarn dev
- Abrir o navegador (localhost:3000)
- Abrir o Devtools
- Ir na aba Profiler (da extensão React Developer Tools)
- Digitar 'camiseta 1' no input e buscar
- Após concluir a busca, iniciar a gravação (Start profiling)
- Apagar umas 3 letras da busca e buscar novamente
- Parar a gravação

Observe que sem o useMemo, a renderização do componente SearchResults está demorando aproximadamente 3.0ms (milissegundos)

Agora vamos importar o useMemo para dentro do componente SearchItem:
o useMemo é inserido por volta do cálculo
O useMemo recebe uma função como 1º parâmetro, essa função retorna um resultado
O 2º parâmetro é muito parecido com o 2º parâmetro do useEffect, um array de dependências
Neste caso a variável 'results' é a dependência para que toda vez que os resultados
da busca mudarem, o totalPrice deverá ser recalculado

Testar a aplicação na web:
- Salvar os arquivos
- Rodar o server em um terminal: yarn server
- Rodar o servidor da aplicação em outro terminal: yarn dev
- Abrir o navegador (localhost:3000)
- Abrir o Devtools
- Ir na aba Profiler (da extensão React Developer Tools)
- Digitar 'camiseta 1' no input e buscar
- Após concluir a busca, iniciar a gravação (Start profiling)
- Apagar umas 3 letras da busca e buscar novamente
- Parar a gravação

Ao testar a aplicação na web, observe que agora o componente SearchResults renderizou em muito menos
tempo do que sem o uso do useMemo, passou de 3.0ms (milissegundos) para 0.5ms ~ 0.7ms, pois o totalPrice não está
sendo recalculado, visto que os results que vem das propriedades não estão mudando seus valores, então basicamente essa informaçãonão não está sendo recalculada


TRABALHANDO COM VIRTUALIZAÇÃO: react-virtualized

Basicamente serve para mostrar em tela APENAS o conteúdo que está visível na tela do navegador do usuário,
sem aquele scroll gigante como está atualmente, pq a aplicação tem 1.000 itens

Usaremos uma biblioteca chamada 'react-virtualized'

Istalar a biblioteca: yarn add react-virtualized'

Importar a propriedade 'List' do react-virtualized para dentro do componente SearchResults

Instalar as tipagens do react-virtualized: yarn add @types/react-virtualized -D

No return da função SearchResults: substituir a importação do componente <ProductItem /> pelo <List /> (usaremos o componente ProductItem mais para frente, mas por enquanto recortar toda essa parte e reservar)

O List recebe algumas propriedades que irão formatar o conteúdo mostrado na tela do navegador:

height: altura do conteúdo mostrado em tela (faz com que seja mostrado menos produtos na lista)
rowHeight: cada linha tem 30px de altura
width: largura do conteúdo mostrado em tela
overscanRowCount: quantos itens serão pré-carregados para serem mostrados quando o scroll é usado (serão 5 itens pré-carregados tanto para cima quanto para baixo da lista)
rowCount: qual o total de itens que tem na lista, essa propriedade recebe: {results.length}
rowRenderer: função que renderiza cada item da lista

Por enquanto o List fica assim, agora só falta passar um parâmetro para o rowRenderer

<List
  height={300}
  rowHeight={30}
  width={900}
  overscanRowCount={5}
  rowCount={results.length}
  rowRenderer={}
/>

Agora vamos criar uma função para o rowRenderer: (dentro da função SearchResults)

Primeiro vamos importar a propriedade ListRowRenderer de dentro do react-virtualized

Após a importação criaremos uma variável const rowRenderer que recebe uma tipagem ListRowRenderer

A variável passa como parâmetro um objeto com 3 propriedades dentro dela { index, key e style} e uma função que retorna uma <div> contendo o componente <ProductItem>

A <div> recebe duas propriedades: 'key' e 'style':
- a propriedade 'key' é uma chave para tornar essa <div> única
- a propriedade 'style' controla a visibilidade dos elementos em tela

Agora aqui vamos colar aquela parte do componente ProductItem que foi recortada anteriormente, excluir a parte de fora do componente e deixar apenas o conteúdo dentro do componente

O componente <ProductItem> recebe as propriedades 'product' e 'onAddToWishlist'

A propriedade 'product' recebe um objeto contendo {results[index]} que retorna o resultado de cada item da lista

A propriedade 'onAddToWishlist' já conhecemos, ela é um componente que adiciona itens a uma lista de favoritos

const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
  return (
    <div key={key} style={style}>
      <ProductItem
        product={results[index]}
        onAddToWishlist={onAddToWishlist}
      />
    </div>
  );
}

Agora que a função rowRenderer foi criada é só passar ela para dentro da propriedade rowRenderer em List:

<List
  height={300}
  rowHeight={30}
  width={900}
  overscanRowCount={5}
  rowCount={results.length}
  rowRenderer={rowRenderer}
/>

Agora que tudo foi setado, basta fazer o teste na web:

Verificar se os servidores estão rodando:
server: yarn server
servidor da aplicação: yarn dev

Abrir o navegador em 'http://localhost:3000/'

Pesquisar 'camiseta' no input de busca

Observe que mudou a visualização da lista de itens, agora é mostrado apenas 10 itens e conforme vai dando scroll os outros itens vão aparecendo

Ao abrir o devtools na aba Elements e clicar no botão 'Select an element in the page to to inspect'

Selecionando e clicando no último item que está sendo exibido na tela, número 10, observe no console que abaixo do item 10 estão pré-carregados mais 5 itens prontos para serem exibidos em tela, é isso que o 'overscanRowCount' faz, ele deixa uma quantidade de itens pré-carregados tanto para cima quanto para baixo da listagem para estarem visíveis em tela, esse é um tipo de melhoria na performance da aplicação, pois ao invés da aplicação carregar os 1.000 itens que existem na lista, ela vai carregando conforme as ações do usuário, sem ter a necessidade de carregar todos os itens da
lista de uma só vez!

*/
