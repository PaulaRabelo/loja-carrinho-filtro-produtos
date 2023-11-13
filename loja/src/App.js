import React, { useEffect, useState } from "react";
import Carrinho from "./Componentes/Carrinho/Carrinho";
import Filtros from "./Componentes/Filtros/Filtros";

import { ConjuntoDeComponentes } from "./estiloDoApp";
import { pacoteDeProdutos } from "./pacoteDeProdutos";
import Produtos from "./Produtos/Produtos";

function App() {
  const [filtroMinimo, setFiltroMinimo] = useState(10);
  const [filtroMaximo, setFiltroMaximo] = useState(100000);
  const [filtroBuscaPorNome, setFiltroBuscaPorNome] = useState("");

  
  const [ordenacao, setOrdenacao] = useState("Crescente");
  const [carrinho, setCarrinho] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [produtos, setProdutos] = useState(pacoteDeProdutos)

    const filtroDeProdutos = ()=>{
      const produtosFiltrados = produtos
      .filter((item)=>{
          return item.price >= filtroMinimo
      })
      .filter((item)=>{
         return item.price <= filtroMaximo
      })
      .filter((item)=>{
        return item.name.includes(filtroBuscaPorNome)
      })
      return produtosFiltrados;
    }

    const filtrados = filtroDeProdutos();
   
 
 
  const ordenarProdutos = (event) => {
    setOrdenacao(event.target.value);
  };

 


  const removerItemDoCarrinho = (itemParaRemover) => {
    // Atualiza a quantidade do produto no estoque
    const produto = produtos.find(prod => prod.id === itemParaRemover.id);
    
    let novoCarrinho;
    
    if (itemParaRemover.quantidade === 1) {
      // Se a quantidade do item no carrinho for 1, remove o item completamente
      novoCarrinho = carrinho.filter(item => item.id !== itemParaRemover.id);
      if (produto) {
        produto.quantidade += 1; // Incrementa apenas 1 de volta ao estoque
      }
    } else {
      // Se a quantidade for maior que 1, apenas decrementa a quantidade
      novoCarrinho = carrinho.map(item => {
        if (item.id === itemParaRemover.id) {
          console.log("Quantidade antes da remoção:", item.quantidade);
          if (produto) {
            produto.quantidade += 1; // Incrementa apenas 1 de volta ao estoque
          }
          return { ...item, quantidade: item.quantidade - 1 };
        } else {
          return item;
        }
      });
    }
  
    // Atualiza o carrinho com o novo estado
    setCarrinho(novoCarrinho);
  
    // Atualiza o valor total do carrinho
    if (novoCarrinho.length !== 0) {
      setValorTotal(valorTotal - itemParaRemover.price);
    } else {
      setValorTotal(0);
    }
  };
  
  

  const removerValorTotal = (valor) => {
    setValorTotal(valorTotal - valor);
  };

 

  return (
    <ConjuntoDeComponentes>
      <Filtros
      filtroMinimo={filtroMinimo}
      setFiltroMinimo={setFiltroMinimo}
      filtroMaximo={filtroMaximo} 
      setFiltroMaximo={setFiltroMaximo}
      filtroBuscaPorNome={filtroBuscaPorNome} 
      setFiltroBuscaPorNome={setFiltroBuscaPorNome}
      />
      <Produtos
        setOrdenacao={setOrdenacao}
        quantidade={filtrados.length}
        onChangeCabecalho={ordenarProdutos}
        ordenacao={ordenacao}
        produtos={filtrados}
        arrayProdutos={produtos}
        
        carrinho={carrinho}
        setCarrinho={setCarrinho}
        
        setValorTotal={setValorTotal}
        valorTotal={valorTotal}
      />
      <Carrinho
        carrinho={carrinho}
        setCarrinho={setCarrinho}
        valorTotal={valorTotal}
        removerItemDoCarrinho={removerItemDoCarrinho}
        removerValorTotal={removerValorTotal}
      />
    </ConjuntoDeComponentes>
  );
}

export default App;
