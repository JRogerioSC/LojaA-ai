import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./produtos.css";

function Produtos() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([
        { id: 1, nome: "Açai 1 Litro", preco: 1.0, imagem: "/acai.jpg", estoque: 12 },
        { id: 2, nome: "Banda de Frango", preco: 1.0, imagem: "/frango.jpg", estoque: 0 },
        { id: 3, nome: "Espetinho", preco: 1.0, imagem: "/espetinho.jpg", estoque: 20 },
    ]);

    const comprar = (produto) => {
        setProdutos((produtosAntigos) =>
            produtosAntigos.map((p) =>
                p.id === produto.id && p.estoque > 0
                    ? { ...p, estoque: p.estoque - 1 }
                    : p
            )
        );

        navigate(`/pagamento?nome=${encodeURIComponent(produto.nome)}&valor=${produto.preco}`);
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

            {/* Rodapé estilizado */}
            <footer className="rodape">
                <div className="rodape-conteudo">
                    <p className="direitos">© {new Date().getFullYear()} LojaAçai — Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Produtos;
