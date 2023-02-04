import { SearchResults } from "@/components/SearchResults";
import { FormEvent, useCallback, useState } from "react"

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home() {
  const [search, setSearch] = useState('');

  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    // if (!search.trim()) {
    //   return;
    // }

    let response: any;

    try {
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?q=${search}`)
    } catch (error) {
      console.error(error);
    }
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    });

    const totalPrice = data.reduce((total: any, product: any) => {
      return total + product.price;
  }, 0);

    setResults({ totalPrice, data: products });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, [])

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}

/*

PARA RODAR A APLICAÇÃO:
- abrir um terminal e rodar o server: yarn server
- abrir outro terminal e rodar a aplicação: yarn dev

FLUXO DE RENDERIZAÇÃO DO REACT:

1. Criar uma nova versão do componente,
2. Comparar com a versão anterior,
3. Caso haja alterações, então ele vai atualizar o que foi alterado

Obs: os fluxos 1 e 2 sempre serão executados, independente se houve mudança ou não do conteúdo,
o React sempre cria uma nova versão desses componentes

Toda vez que o componente Home for renderizado, as funções dentro dele
serão renderizadas novamente do zero, ocupando um novo espaço na memória

useCallback:

Hook utilizado para memorizar uma função

O useCallback é usado APENAS em uma situação:
Serve para memorizar uma função, não um valor!

Atualmente a aplicação possui apenas a funcionalidade: busca de produtos,
então iremos adicionar mais uma funcionalidade: uma wishlist

Vamos criar uma função addToWishList que permitirá que o usuário adicione produtos em uma lista de favoritos

Toda vez que o componente Home for renderizado, todas as funções dentro dele serão recriadas do zero,
ocupando um novo espaço na memória, lembrando recriar a função não é um problema

O useCallback é usado por questões de Igualdade referencial: quando uma informação é repassada de um componente pai para um componente filho

Vamos criar uma nova função chamada addToWishList

Vamos imaginar que a função addToWishlist não seja acessada APENAS pelo componente Home, mas sim por outros componentes
da aplicação, atráves de camadas (pai para filho), então usaremos o conceito de 'prop drilling' para que outros componentes possam acessar a função addToWishList através dessas camadas

A lógica aqui é a a seguinte: a função addToWishlist é criada dentro do componente Home, passada para dentro componente SerachResults que é passada para dentro do componente ProductItem (camadas de acesso!)

Então depois de criar a função addToWishlist, passamos ela para dentro do componente <SearchResults/>, como propriedade:

<SearchResults
  results={results}
  onAddToWishList={addToWishList}
/>

Agora dentro do componente SearchResults inserimos a propriedade onAddToWishList na interface para tipá-la:

onAddToWishList: (id: number) => void;


E então passamos onAddToWishList como parâmetro da função SearchResults:

export function SearchResults({ results, onAddToWishList }:...

E logo depois passamos ela para dentro do componente <ProductItem/> como propriedade:

<ProductItem
  key={product.id}
  product={product}
  onAddToWishList={onAddToWishList}
/>

Agora dentro do componente ProductItem fazemos o mesmo processo de inserimos a propriedade onAddToWishList na interface para tipá-la:

onAddToWishList: (id: number) => void;

Depois passamos onAddToWishList como parâmetro da função ProductItemComponent:

function ProductItemComponent({ product, onAddToWishList }:...

Observe que a função addToWishList está sendo repassada para vários componentes filhos da aplicação através de camadas de acesso

Agora vamos transformar a função em uma useCallback

A função: async function addToWishList vira uma variável:

const addToWishList = useCallback()

Dentro de useCallback passamos como primeiro parâmetro 'id: number'

E como segundo parâmetro um array de dependências vazio

const addToWishList = useCallback(async (id: number) => {
console.log(id);
}, [])

*/
