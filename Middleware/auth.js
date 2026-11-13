const User = require('../Models/user');

const basicAuth = function (req, res, next) {
    // 1) Verificar se o header 'authorization' foi enviado
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Acesso Restrito"');
        return res.status(401).send("Autenticação necessária.");
    }

    // 2) Extrair e descodificar a string Base64
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    
    // credentials fica no formato "username:password"
    const [username, password] = credentials.split(':');

    // 3) Verificar na base de dados se o utilizador existe
    User.findOne({ username: username, password: password })
        .then(user => {
            if (!user) {
                res.setHeader('WWW-Authenticate', 'Basic realm="Acesso Restrito"');
                return res.status(401).send("Credenciais inválidas.");
            }
            // Credenciais corretas, avança para a rota
            next();
        })
        .catch(err => {
            return res.status(500).send("Erro no servidor: " + err.message);
        });
};

module.exports = basicAuth;