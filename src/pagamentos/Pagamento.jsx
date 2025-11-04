import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./pagamento.css";

function Pagamento() {
    const location = useLocation();
    const [carregando, setCarregando] = useState(false);
    const [produto, setProduto] = useState({ nome: "", preco: 0 });

    // Lê os parâmetros da URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nome = params.get("nome");
        const preco = params.get("valor"); // vem da URL
        setProduto({ nome, preco });
    }, [location.search]);

    // Envia pedido para o servidor e abre o checkout do Mercado Pago
    const pagar = async () => {
        try {
            setCarregando(true);

            const res = await fetch("http://localhost:3001/api/pagamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: produto.nome,
                    preco: Number(produto.preco),
                }),
            });

            // Tenta converter a resposta para JSON
            let data;
            try {
                data = await res.json();
            } catch {
                console.error("⚠️ O servidor retornou uma resposta vazia ou inválida.");
                alert("Erro: o servidor não respondeu corretamente.");
                setCarregando(false);
                return;
            }

            console.log("Resposta do servidor:", data);

            if (res.ok && data.init_point) {
                // Redireciona para o Checkout do Mercado Pago
                window.location.href = data.init_point;
            } else {
                console.error("Erro do servidor:", data);
                alert("Erro ao iniciar pagamento. Verifique o backend.");
            }
        } catch (err) {
            console.error("Erro ao pagar:", err);
            alert("Falha na comunicação com o servidor.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="pagamento-container">
            <h2>Pagamento</h2>
            <h3>{produto.nome}</h3>
            <p>Valor: R$ {Number(produto.preco).toFixed(2)}</p>
            <button onClick={pagar} disabled={carregando}>
                {carregando ? "Processando..." : "Pagar com Mercado Pago"}
            </button>
        </div>
    );
}

export default Pagamento;

