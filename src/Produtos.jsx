import React from "react";
import { useNavigate } from "react-router-dom";
import "./produtos.css";

function Produtos() {
    const navigate = useNavigate();

    const produtos = [
        { id: 1, nome: "Açai 1 Litro", preco: 0.1, imagem: "/camisa.jpg" },
        { id: 2, nome: "Banda de Frango", preco: 0.01, imagem: "/tenis.jpg" },
        { id: 3, nome: "Espetinho", preco: 0.01, imagem: "/bone.jpg" },
    ];

    const comprar = (produto) => {
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
                        <button onClick={() => comprar(p)}>Comprar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Produtos;
