const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Importar plugin de criptografia
const mongooseEncryption = require('mongoose-encryption');

const SalaryTableSchema = new Schema({
  cargo: {
    type: Schema.Types.ObjectId,
    ref: 'Position',
    required: true
  },
  nivel: {
    type: String,
    enum: ['Junior', 'Pleno', 'Senior', 'Especialista', 'Coordenador', 'Gerente', 'Gerente Executivo', 'Diretor'],
    required: true
  },
  faixaMinima: {
    type: Number,
    required: true
  },
  faixaMaxima: {
    type: Number,
    required: true
  },
  dataVigencia: {
    type: Date,
    default: Date.now
  },
  ativo: {
    type: Boolean,
    default: true
  },
  observacoes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar o campo updatedAt antes de salvar
SalaryTableSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Configuração de criptografia para campos sensíveis
// Modificado para usar variáveis de ambiente ou valores padrão seguros
const encKey = process.env.ENCRYPTION_KEY || 'sua_chave_de_criptografia_padrao_muito_segura_12345';

// Aplicar plugin de criptografia apenas se a chave estiver disponível
if (encKey) {
  const encryptionOptions = {
    secret: encKey,
    encryptedFields: ['faixaMinima', 'faixaMaxima'],
    excludeFromEncryption: ['_id', 'cargo', 'nivel', 'ativo']
  };
  
  SalaryTableSchema.plugin(mongooseEncryption, encryptionOptions);
}

module.exports = mongoose.model('SalaryTable', SalaryTableSchema);