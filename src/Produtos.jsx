import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./produtos.css";

function Produtos() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([
        { id: 1, nome: "Açai 1 Litro", preco: 1.0, imagem: "/acai.jpg", estoque: 12, quantidade: 1 },
        { id: 2, nome: "Banda de Frango", preco: 1.0, imagem: "/frango.jpg", estoque: 10, quantidade: 1 },
        { id: 3, nome: "Espetinho", preco: 1.0, imagem: "/espetinho.jpg", estoque: 0, quantidade: 1 },
    ]);

    // 🛒 Atualiza a quantidade selecionada
    const alterarQuantidade = (id, novaQtd) => {
        setProdutos((antigos) =>
            antigos.map((p) =>
                p.id === id
                    ? { ...p, quantidade: Math.min(Math.max(novaQtd, 1), p.estoque) }
                    : p
            )
        );
    };

    // 💳 Função de compra
    const comprar = (produto) => {
        const qtd = produto.quantidade;
        if (qtd > produto.estoque) return alert("Quantidade indisponível em estoque.");

        setProdutos((antigos) =>
            antigos.map((p) =>
                p.id === produto.id
                    ? { ...p, estoque: p.estoque - qtd }
                    : p
            )
        );

        const valorTotal = produto.preco * qtd;
        navigate(`/pagamento?nome=${encodeURIComponent(produto.nome)}&valor=${valorTotal}`);
    };

    return (
        <div className="produtos-container">
            <h2>LojaAçai</h2>
            <div className="lista">
                {produtos.map((p) => (
                    <div className="card" key={p.id}>
                        <img src={p.imagem} alt={p.nome} />
                        <h3>{p.nome}</h3>
                        <p>R$ {p.preco.toFixed(2)}</p>
                        <p className="estoque">
                            Estoque: <strong>{p.estoque}</strong> unidade{p.estoque !== 1 ? "s" : ""}
                        </p>

                        {p.estoque > 0 && (
                            <div className="quantidade-container">
                                <label>Qtd:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={p.estoque}
                                    value={p.quantidade}
                                    onChange={(e) =>
                                        alterarQuantidade(p.id, parseInt(e.target.value) || 1)
                                    }
                                />
                            </div>
                        )}

                        <button
                            onClick={() => comprar(p)}
                            disabled={p.estoque === 0}
                            className={p.estoque === 0 ? "btn-desativado" : ""}
                        >
                            {p.estoque === 0 ? "Indisponível" : "Comprar"}
                        </button>
                    </div>
                ))}
            </div>

            <footer className="rodape">
                <div className="rodape-conteudo">
                    <p className="direitos">
                        © {new Date().getFullYear()} LojaAçai — Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Produtos;
