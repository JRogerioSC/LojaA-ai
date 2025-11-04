import { BrowserRouter, Routes, Route } from "react-router-dom";
import Produtos from "./Produtos";
import Pagamento from "./pagamentos/Pagamento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sucesso" element={<h2>✅ Pagamento Aprovado!</h2>} />
        <Route path="/erro" element={<h2>❌ Pagamento Recusado!</h2>} />
        <Route path="/pendente" element={<h2>⏳ Pagamento Pendente...</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

