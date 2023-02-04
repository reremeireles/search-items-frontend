import { memo, useState } from "react";
import { AddProductToWishlistProps } from './AddProductToWishlist';
import dynamic from "next/dynamic";
import lodash from "lodash";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>

      { isAddingToWishlist && (
        <AddProductToWishlist
        onAddToWishlist={() => onAddToWishlist(product.id)}
        onRequestClose={() => setIsAddingToWishlist(false)}
      />
      ) }
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})
//   return Object.is(prevProps.product, nextProps.product)
// })

/*
MEMO:
O memo evita que a primeira instrução do fluxo de renderização do React
(criar uma nova versão do componente) seja executada, caso nenhuma propriedade
do componente tenha sido alterada

Por exemplo: se não houve nenhuma alteração dentro do componente 'product', então
antes que o React possa executar sua 1ª instrução, o memo vai lá e faz a comparação
das versões e caso note que não houve alteração de conteúdo, ele não vai permitir
gerar uma nova versão dos componentes

Por padrão, o Javascript faz uma comparação entre objetos, para analisar as alterações, chamada de Igualdade Referencial: basicamente ele compara se os objetos estão ainda ocupando a mesma posição dentro da memória,
ele não compara o conteúdo dos objetos, apenas a sua posição

{} === {} - Síntaxe de comparação entre objetos (Igualdade referencial)

Se os objetos são iguais, então o retorno é FALSE, ou seja,
não será feita uma nova renderização do componente

Voltando ao memo, ele recebe um 2º parâmetro chamado de 'shallow compare':
comparação rasa, basicamente ele verifica a igualdade das informações dentro das
propriedades, esse parâmetro é uma função, tem como retorno se o componente é igual ou não,
essa função recebe dois parâmetros: as propriedades anteriores a renderização (prevProps) e as próximas propriedades
(nextProps), dentro da função é retornado um elemento que vai dizer se as propriedades
são iguais ou não, uma comparação mesmo!

NO geral, o Memo evita que o componente entre no fluxo de renderização caso a condição imposta dentro do retorno do 2º parâmetro não for satisfeita. Caso não seja passada nenhuma condição, ele faz uma comparação rasa das propriedades (shallow compare), utilizando a comparação padrão do Javascript: {} === {}

EM QUAIS SITUAÇÕES USAR O MEMO?
Toda funcionalidade de performance do React usada de forma prematura ou desnecessária faz com que os componentes sofram um efeito rebote se tornando mais lentos do que mais rápidos, pois o custo de comparação do Memo também existe e pesa na aplicação

Situações em que o uso do Memo é aplicável:

1. em componentes que são puros: Pure Functional Components;
2. componentes que renderizam muitas vezes: Renders too often;
3. componente que renderiza novamente com as mesmas propriedades: Re-renders props;
4. quando o componente tem um tamanho médio a grande, em componentes pequenos o Memo não tem muita relevância, neste caso seria melhor usar a própria comparação de fluxo de renderização do React

Obs: sempre que um componente pai sofrer um fluxo de renderização, todos os componentes filhos também sofrem o fluxo de renderização, isso é automático dentro do React!

CODE-SPLITTING

Lazy no React, ou Dynamic no Next, servem para uma importação ser realizada somente quando ela for utilizada

Basicamente é importar algum arquivo/funcionalidade/componente SOMENTE no momento em que for utilizar

Algumas funcionalidades só serão usadas caso o usuário tome uma determinada ação

BUNDLE ANALYZER

Biblioteca para analisar o tamanho de tudo que compõe a build

Funcionalidade que não faz alterações significativas no código da aplicação, mas dará uma dimensão do quão pesada está a aplicação e quais partes do código faz com que esse carregamento esteja mais lento ou pesado

Na maioria das vezes o que pesa são as dependências instaladas, portanto vamos simular uma situação em que uma dependência torna a aplicação mais pesada através de uma biblioteca chamada 'lodash' que se usada de forma incorreta, pode acarretar em uma aplicação extremamente pesada

Instalar o 'lodash' na aplicação: yarn add lodash

Instalar as tipagens do 'lodash': yarn add @types/lodash -D

Importar o lodash para dentro do componente ProductItem

Inserir o lodash na const ProductItem, substituindo o Object.is por lodash.isEqual:

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})

Salvar o arquivo

Agora vamos ver uma documentação do Next sobre o Bundle Analyzer:

https://github.com/vercel/next.js/blob/canary/packages/next-bundle-analyzer/readme.md

Vamos instalar o Bundle Analyzer na aplicação: yarn add @next/bundle-analyzer

No arquivo next.config.js vamos colar o código abaixo:

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})

Salvar o arquivo

Agora vamos rodar um comando para fazer a build da nossa aplicação: ANALYZE=true yarn build

*/
