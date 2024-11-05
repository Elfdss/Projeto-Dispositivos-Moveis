import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

// Componente para exibir o vídeo de capa
function VideoCapa() {
  return (
    <div className="video-capa">
      <video controls>
        <source src="https://cdn.pixabay.com/video/2022/10/31/137247-766338227_large.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );
}

// Componente para exibir cada produto individualmente
function Produto({ produto, adicionarAoCarrinho }) {
  return (
    <div className="produto">
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>Preço: R${produto.preco.toFixed(2)}</p>
      <p>Validade: {produto.validade}</p>
      {produto.promocao && <span className="promocao">Promoção!</span>}
      <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
    </div>
  );
}

// Componente para exibir o carrinho de compras com a opção de finalizar compra
function Carrinho({ carrinho, atualizarQuantidade, removerDoCarrinho }) {
  const calcularTotal = () => {
    return carrinho
      .reduce((total, item) => total + item.preco * item.quantidade, 0)
      .toFixed(2);
  };

  return (
    <div className="carrinho">
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item, index) => (
            <div key={index} className="item-carrinho">
              <p>{item.nome} - R${item.preco.toFixed(2)}</p>
              <div className="quantidade-container">
                <button onClick={() => atualizarQuantidade(index, item.quantidade + 1)}>+</button>
                <input
                  type="number"
                  value={item.quantidade}
                  min="1"
                  onChange={(e) => atualizarQuantidade(index, parseInt(e.target.value))}
                />
                <button onClick={() => atualizarQuantidade(index, item.quantidade - 1)}>-</button>
              </div>
              <button onClick={() => removerDoCarrinho(index)}>Remover</button>
            </div>
          ))}
          <h3>Total: R${calcularTotal()}</h3>
          <button className="finalizar-compra">Finalizar Compra</button>
        </>
      )}
    </div>
  );
}

// Componente para exibir as promoções
function Promocoes() {
  const [promocoes, setPromocoes] = useState([]);

  useEffect(() => {
    setPromocoes([
      { id: 1, descricao: "Leve 4 bandejas de morango e pague 3!" },
      { id: 2, descricao: "10% de desconto com cartão Feirinha." },
      { id: 3, descricao: "Mamão Formosa apenas 4,99 unidade!" },
      { id: 4, descricao: "A partir de 100 reais em compras leve uma sacola reutilizável!" },
    ]);
  }, []);

  return (
    <div className="promocoes">
      <h2>Promoções Da Semana!</h2>
      <ul>
        {promocoes.map((promo) => (
          <li key={promo.id}>{promo.descricao}</li>
        ))}
      </ul>
    </div>
  );
}

// Componente principal da aplicação
function App() {
  const [produtos, setProdutos] = useState([
    {
      nome: "Mamão Formosa Unidade",
      preco: 4.99,
      validade: "30/11/2024",
      imagem: "https://www.frutiver.com.br/app/uploads/2022/10/6392-600x600.png",
      promocao: true,
    },
    {
      nome: "Morango 250g",
      preco: 6.99,
      validade: "20/11/2024",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAjBe5z0_1d3XAqKc5k4js9XnTgk4WREZJ-Q&s",
      promocao: true,
    },
    {
      nome: "Banana kg",
      preco: 12.49,
      validade: "12/10/2024",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTiT3v7PuC0ntWBE1Ha9H5HMju_2MUirDtfg&s",
      promocao: false,
    },
    {
      nome: "Uva Thompson 500g",
      preco: 7.99,
      validade: "12/10/2024",
      imagem: "https://cdn.irmaospatrocinio.com.br/img/p/1/7/7/5/3/4/177534-large_default.jpg",
      promocao: false,
    },
    {
      nome: "Maçã Red kg",
      preco: 8.99,
      validade: "12/10/2024",
      imagem: "https://acdn.mitiendanube.com/stores/746/397/products/maca-argentina1-a86acef532d11addf315221676880019-480-0.jpg",
      promocao: false,
    },
    {
      nome: "Abacaxi Unidade",
      preco: 9.99,
      validade: "12/10/2024",
      imagem: "https://images.tcdn.com.br/img/img_prod/763396/abacaxi_perola_3_1_1ea04d2f14a9190ed218422bffc49d9d.jpg",
      promocao: false,
    },
  ]);

  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    const index = carrinho.findIndex((item) => item.nome === produto.nome);
    if (index === -1) {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    } else {
      const novoCarrinho = [...carrinho];
      novoCarrinho[index].quantidade += 1;
      setCarrinho(novoCarrinho);
    }
  };

  const atualizarQuantidade = (index, novaQuantidade) => {
    if (novaQuantidade < 1) return removerDoCarrinho(index);
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade = novaQuantidade;
    setCarrinho(novoCarrinho);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  return (
    <div className="app">
      <h1>Bem vindo(a) a Feirinha Digital!</h1>
      <div className="conteudo">
        <div className="quadrante-esquerdo">
          <VideoCapa />
          <div className="produtos">
            {produtos.map((produto, index) => (
              <Produto key={index} produto={produto} adicionarAoCarrinho={adicionarAoCarrinho} />
            ))}
          </div>
        </div>
        <div className="quadrante-direito">
          <Carrinho
            carrinho={carrinho}
            atualizarQuantidade={atualizarQuantidade}
            removerDoCarrinho={removerDoCarrinho}
          />
          <Promocoes />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
