
// https://mongoosejs.com/docs/guide.html


const mongoose = require("mongoose"); //  Import do mongoose
const Schema = mongoose.Schema; // tarefa 7b Declaração da variável Schema

// tarefa c, d, f - Criação do schema com campos, validações, mensagens personalizadas e timestamps
const postoSchema = new Schema({
    id: { 
        type: String, 
        required: [true, "O ID do posto é obrigatório"], // 7f.ii - mensagem personalizada
        unique: true,
        trim: true,
        minlength: [3, "O ID deve ter pelo menos 3 caracteres"], // 7f.i - limite mínimo para strings
        maxlength: [10, "O ID não pode exceder 10 caracteres"]    // 7f.i -  limite máximo para strings
    },
    local: { 
        type: String, 
        required: [true, "O local do posto é obrigatório"],
        trim: true,
        minlength: [2, "O local deve ter pelo menos 2 caracteres"],
        maxlength: [50, "O local não pode exceder 50 caracteres"] 
    },
    potenciakw: { 
        type: Number, 
        required: [true, "A potência em kW é obrigatória"], // 7c.iii - 
        validate: {
            validator: function(value) {
                return value > 0;        // potência em kw superior a zero
            },
            message: "A potência em kW deve ser superior a zero." /* implemente um exemplo prático no Schema do posto
                                                                    (por exemplo, uma mensagem própria para potenciaKw
                                                                    inferior ou igual a zero). */
        },
        max: [520, "A potência máxima permitida é 520 kW"]
    },
    disponivel: { 
        type: Boolean, 
        required: [true, "O campo de disponibilidade é obrigatório"] //c.iv
    }
}, { 
    timestamps: true // 7d. Activação de timestamps
});

// 7.e export deste modelo
module.exports = mongoose.model("Posto", postoSchema, "postos");