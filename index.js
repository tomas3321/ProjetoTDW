const express = require("express");
const mongoose = require("mongoose");
const postosRoutes = require("./Controllers/postos.js");
const basicAuth = require("./Middleware/auth.js");
const logger = require("./Middleware/logger.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());


// Middleware de autenticação simples - hardcoded
const authMiddleware = function (req, res, next) {
    if (req.body && req.body.accessToken != null) {
        next(); //
    } else {
        res.send("Não autenticado");
    }
};

// Ligar ao MongoDB
const URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rede_carregamento";
mongoose.connect(URL)
    .then(() => {
        console.log("Ligado ao MongoDB com sucesso."); 
        // Rotas e arranque do servidor
        app.use("/postos", basicAuth, postosRoutes);
        app.listen(PORT, () => {
            console.log(`Servidor na porta ${PORT}`);
        });
    })
    .catch((erro) => {
        console.error("Erro ao ligar ao MongoDB:", erro.message);
        process.exit(1);
    });
