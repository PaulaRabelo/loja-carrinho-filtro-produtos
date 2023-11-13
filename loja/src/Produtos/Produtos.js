import React from "react";

import { CabecalhoDiv, GrupoDeCartoes } from "./estiloDosProdutos";
import Itens from "../Componentes/Carrinho/Itens/Itens";
import Cabecalho from "../Componentes/Cabecalho/Cabecalho";

function Produtos(props) {

  // const adicionarProdutoNoCarrinho = (produto) => {
    
  //   const produtoNoCarrinho = props.carrinho.filter((item) => {
  //     if (item.id === produto.id) {
  //       return item;
  //     } else {
  //       return false;
  //     }
  //   });

  //   if (produtoNoCarrinho.length === 0) {
      
  //     produto.quantidade = 1;
  //     console.log("adicionar mais um",produto.quantidade)
      
  //     const novoCarrinho = [produto, ...props.carrinho];
  //     props.setCarrinho(novoCarrinho);
      
  //     console.log("adicionar novo produto",novoCarrinho)
  //   } 
    
  //   else {
  //     const novoCarrinho = props.carrinho.map((item) => {
  //       if (produto.id === item.id) {
  //         debugger
  //         return { ...item, quantidade: item.quantidade + 1 };
  //       } else {
  //         return item;
  //       }
  //     });

  //     props.setCarrinho(novoCarrinho);
  //   }
  //   adicionarValorTotal(produto.price);
  // };

  const adicionarProdutoNoCarrinho = (produto) => {
    let carrinhoAtualizado = [...props.carrinho];
    let produtoExistenteNoCarrinho = carrinhoAtualizado.find(item => item.id === produto.id);
  
    let produtosAtualizados = [...props.arrayProdutos];
    let produtoEncontrado = produtosAtualizados.find(p => p.id === produto.id);
    
      console.log(produtosAtualizados, 'atualizados')
      console.log(produtoEncontrado, 'produtoEncontrado')



  if (produtoExistenteNoCarrinho) {
    // Calcula a quantidade total de produto disponível (carrinho + estoque)
  let quantidadeTotalDisponivel = produtoExistenteNoCarrinho.quantidade + produtoEncontrado.quantidade;
  

    console.log(produtoExistenteNoCarrinho.quantidade, 'antes produtoExistenteNoCarrinho')

    if (quantidadeTotalDisponivel > produtoExistenteNoCarrinho.quantidade) {
        console.log(produtoExistenteNoCarrinho.quantidade, 'produtoExistenteNoCarrinho')
        console.log(produtoEncontrado.quantidade, 'produtoEncontrado')

        produtoExistenteNoCarrinho.quantidade += 1;
        produtoEncontrado.quantidade -= 1; // Decrementa a quantidade do estoque
      } else {
        alert("Quantidade disponível insuficiente.");
        return;
      }
    } else {
      if (produtoEncontrado.quantidade > 0) {
        const novoProduto = { ...produtoEncontrado, quantidade: 1 };
        console.log(novoProduto,'novoproduto')
        carrinhoAtualizado.push(novoProduto);
        produtoEncontrado.quantidade -= 1; // Decrementa a quantidade do estoque
      } else {
        alert("Produto esgotado.");
        return;
      }
    }
  
    props.setCarrinho(carrinhoAtualizado);
    adicionarValorTotal(produtoEncontrado.price);
  };
  
  
  
  
  


  
  
  const adicionarValorTotal = (valor) => {
    props.setValorTotal(props.valorTotal + valor);
  };
  
  const produtosOrdenados =
    props.produtos &&
    props.produtos.sort((a, b) => {
      if (props.ordenacao === "Crescente") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  const produtosMapeados =
    produtosOrdenados &&
    produtosOrdenados.map((produto) => {
      return (
        <Itens
          key={produto.id}
          imagem={produto.photo}
          nome={produto.name}
          quantidade={produto.quantidade}
          valor={produto.price}
          itemBotao={() => adicionarProdutoNoCarrinho(produto)}
          texto={"Adicionar"}
        />
      );
    });

  return (
    <div>
      <Cabecalho/>
      <CabecalhoDiv>
        <p>Quantidade de produtos: {props.quantidade}</p>
        <label>
          Ordenação:
          <select onChange={props.onChangeCabecalho}>
            <option value={"Crescente"}>Crescente</option>
            <option value={"Decrescente"}>Decrescente</option>
          </select>
        </label>
      </CabecalhoDiv>
      <GrupoDeCartoes>{produtosMapeados}</GrupoDeCartoes>
    </div>
  );
}

export default Produtos;
