import React from "react";
import { useNavigate } from "react-router-dom";
import "./produtos.css";

function Produtos() {
    const navigate = useNavigate();

    const produtos = [
        { id: 1, nome: "Camisa Premium", preco: 59.9, imagem: "/camisa.jpg" },
        { id: 2, nome: "Tênis Conforto", preco: 199.9, imagem: "/tenis.jpg" },
        { id: 3, nome: "Boné Estiloso", preco: 39.9, imagem: "/bone.jpg" },
    ];

    const comprar = (produto) => {
        navigate(`/pagamento?nome=${encodeURIComponent(produto.nome)}&valor=${produto.preco}`);
    };

    return (
        <div className="produtos-container">
            <h2>Loja React + Checkout Pro</h2>
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
