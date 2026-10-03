const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Configure suas credenciais aqui
const API_KEY = "API_KEY";
const AGENT_ENDPOINT = "?api-version=v1";

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await fetch(
            AGENT_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": API_KEY
                },
                body: JSON.stringify({
                    input: message
                })
            }
        );

        const data = await response.json();
        console.log("Status:", data.status);

        // Busca o item do tipo 'message' no array output (ignora 'reasoning')
        const messageOutput = data?.output?.find(item => item.type === "message");
        const resposta =
            messageOutput?.content?.[0]?.text ||
            "Não foi possível gerar uma resposta.";

        res.json({
            response: resposta
        });

    } catch (error) {
        console.error("Erro na requisição:", error);
        res.status(500).json({
            response: "Deu pau ao consultar a SkillForge AI."
        });
    }
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
    console.log("");
    console.log("🚀 Servidor Backend Online (SkillForge AI)");
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
    console.log("Aguardando conexões do chat...");
    console.log("");
});

// Tratamento de erros caso a porta esteja em uso ou haja falha na rede
server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`A porta ${PORT} já está em uso por outro programa. Tente fechar o outro programa ou mude a porta.`);
    } else {
        console.error("Ocorreu um erro no servidor:", err);
    }
});

// Força o processo do Node a se manter ativo no Windows
process.stdin.resume();

// Tratamento para desligamento gracioso (Ctrl+C)
process.on("SIGINT", () => {
    console.log("\nDesligando o servidor...");
    server.close(() => {
        process.exit(0);
    });
});
