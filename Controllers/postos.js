/* 5. "(o que acontece ao fazer GET a /postos/PC-404 se esse posto não existir?).
R: Se o posto não existir na base de dados, devolve o código 404  */

/* Explique como personalizar as mensagens de erro de validação no Mongoose e implemente um
exemplo prático no Schema do posto (por exemplo, uma mensagem própria para potenciaKw
inferior ou igual a zero). 
R:  */

//tarefa 9. e 10.
const express = require('express');
const router = express.Router();
const Posto = require('../Models/posto');

// [GET] Listar todos os postos 
router.get('/', (req, res) => {
    Posto.find({})
        .then(postos => {
            if (postos == null) {
                return res.status(404).send("Postos não encontrados"); 
            }
            return res.status(200).json(postos);
        })
        .catch(error => res.status(500).send(error.message));
});

// [GET] Obter posto específico por ID
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    Posto.findOne({ id: idParam }) 
        .then(posto => {
            if (posto == null) {
                return res.status(404).send("Posto não encontrado"); // Se o posto não existir na base de dados, devolve o código 404
            }
            return res.status(200).json(posto);
        })
        .catch(error => res.status(500).send(error.message));
});

// [POST] Adicionar novo posto 
router.post('/', (req, res) => {
    if (req.body == null) return res.status(400).send();
    
    const { id, local, potenciakw, disponivel } = req.body;
    
    return Posto.create({ id, local, potenciakw, disponivel })
        .then(posto => res.status(201).json(posto))
        .catch(error => res.status(400).send(error.message));
});

// [PATCH] Atualizar parcialmente 
router.patch('/:id', (req, res) => {
    if (req.body == null) return res.status(400).send();
    
    return Posto.updateOne(
        { id: req.params.id },
        { $set: req.body },
        { runValidators: true }
    )
    .then(result => {
        if (!result.matchedCount) return res.status(404).send("Posto não encontrado");
        return res.status(200).json(result);
    })
    .catch(error => res.status(400).send(error.message));
});

// [DELETE] Remover por ID
router.delete('/:id', (req, res) => {
    Posto.deleteOne({ id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send("Posto não encontrado");
            }
            return res.status(200).send("Posto removido com sucesso");
        })
        .catch(error => res.status(400).send(error.message));
});

module.exports = router;


/* const sf = require('../shared/functions.js');
const express = require('express');

const router = express.Router;

module.exports = function (app, collection) {

    app.get('/', (req, res) => {
        res.redirect('/postos');
    });

    // GET: Listar todos os postos
    app.get('/postos', (req, res) => {
        collection.find().toArray().then(result => {
            return res.json(result);
        });
    });

    // GET por ID
    app.get('/postos/:id', (req, res) => {
        const idParam = req.params.id;
        collection.findOne({ id: idParam }).then(posto => {
            if (posto) {
                return res.json(posto);
            }
            return res.status(404).send("Posto não encontrado");
        });
    });

    // POST: Adicionar novo posto
    app.post("/postos", (req, res) => {
        const posto = {
            id: req.body.id,
            local: req.body.local,
            potenciakw: req.body.potenciakw,
            disponivel: req.body.disponivel,
            categoria: req.body.categoria,
            tipo: req.body.tipo
        };

        return collection.insertOne(posto)
            .then(() => res.status(201).json(posto))
            .catch(error => {
                console.log(error);
                return res.status(400).send();
            });
    });

    // PATCH: Atualizar parcialmente
    app.patch('/postos/:id', (req, res) => {
        const idParam = req.params.id;
        const dadosAtualizados = req.body;

        collection.updateOne({ id: idParam }, { $set: dadosAtualizados })
            .then(result => {
                if (result.matchedCount > 0) {
                    return res.status(200).send("Posto atualizado com sucesso");
                }
                return res.status(404).send("Posto não encontrado");
            })
            .catch(error => {
                console.log(error);
                return res.status(400).send();
            });
    });

    // DELETE por ID
    app.delete('/postos/:id', (req, res) => {
        const idParam = req.params.id;

        collection.deleteOne({ id: idParam })
            .then(result => {
                if (result.deletedCount > 0) {
                    return res.status(200).send("Posto removido com sucesso");
                }
                return res.status(404).send("Posto não encontrado");
            })
            .catch(error => {
                console.log(error);
                return res.status(400).send();
            });
    });

};

*/