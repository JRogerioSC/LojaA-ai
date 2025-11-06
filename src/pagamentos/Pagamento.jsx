import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./pagamento.css";

function Pagamento() {
    const location = useLocation();
    const [carregando, setCarregando] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [produto, setProduto] = useState({ nome: "", preco: 0 });
    const [cliente, setCliente] = useState({
        nome: "",
        telefone: "",
        endereco: "",
    });

    // Lê os parâmetros da URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nome = params.get("nome");
        const preco = params.get("valor");
        setProduto({ nome, preco });
    }, [location.search]);

    // Abre o formulário
    const pagar = () => {
        setMostrarFormulario(true);
    };

    // Função para validar o telefone brasileiro
    const validarTelefone = (telefone) => {
        const apenasNumeros = telefone.replace(/\D/g, "");
        return /^[1-9]{2}9\d{8}$/.test(apenasNumeros); // Ex: 11987654321
    };

    const confirmarDados = async () => {
        const { nome, telefone, endereco } = cliente;

        if (!nome || !telefone || !endereco) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (!validarTelefone(telefone)) {
            alert("Digite um número de telefone válido com DDD. Ex: 11987654321");
            return;
        }

        // Exibe o resumo do pedido
        const resumo = `
🧾 CONFIRMAR PEDIDO

Produto: ${produto.nome}
Valor: R$ ${Number(produto.preco).toFixed(2)}

👤 Nome: ${nome}
📞 Telefone: ${telefone}
🏠 Endereço: ${endereco}

Deseja confirmar e enviar para o WhatsApp do vendedor?
`;

        const confirmar = window.confirm(resumo);
        if (!confirmar) return;

        // 📱 Envia o formulário para o WhatsApp do vendedor
        const mensagem = `🛒 NOVO PEDIDO\n\nProduto: ${produto.nome}\nValor: R$ ${Number(
            produto.preco
        ).toFixed(2)}\n\n👤 Cliente: ${nome}\n📞 Telefone: ${telefone}\n🏠 Endereço: ${endereco}`;

        // Substitua pelo número do vendedor (55 + DDD + número)
        const numeroVendedor = "5596991624580"; // exemplo: 5598999999999
        const linkWhatsApp = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(
            mensagem
        )}`;

        // Abre o WhatsApp em nova aba
        window.open(linkWhatsApp, "_blank");

        // Após o envio, segue para o pagamento Mercado Pago
        try {
            setCarregando(true);

            const res = await fetch(
                "https://servidora-ai.onrender.com/api/pagamento",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome: produto.nome,
                        preco: Number(produto.preco),
                    }),
                }
            );

            const data = await res.json();
            console.log("Resposta do servidor:", data);

            if (res.ok && data.init_point) {
                window.location.href = data.init_point;
            } else {
                alert("Erro ao iniciar pagamento. Verifique o servidor.");
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
                {carregando ? "Processando..." : "Comprar"}
            </button>

            {mostrarFormulario && (
                <div className="form-overlay">
                    <div className="formulario-pedido">
                        <h3>Informações do Cliente</h3>
                        <input
                            type="text"
                            placeholder="Nome completo"
                            value={cliente.nome}
                            onChange={(e) =>
                                setCliente({ ...cliente, nome: e.target.value })
                            }
                        />
                        <input
                            type="tel"
                            placeholder="Telefone (com DDD)"
                            value={cliente.telefone}
                            onChange={(e) =>
                                setCliente({ ...cliente, telefone: e.target.value })
                            }
                        />
                        <textarea
                            placeholder="Endereço completo"
                            value={cliente.endereco}
                            onChange={(e) =>
                                setCliente({ ...cliente, endereco: e.target.value })
                            }
                        ></textarea>

                        <div className="botoes-form">
                            <button onClick={confirmarDados} disabled={carregando}>
                                {carregando ? "Enviando..." : "CONFIRMAR"}
                            </button>
                            <button onClick={() => setMostrarFormulario(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pagamento;
