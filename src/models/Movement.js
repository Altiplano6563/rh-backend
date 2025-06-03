const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Importar plugin de criptografia
const mongooseEncryption = require('mongoose-encryption');

const MovementSchema = new Schema({
  funcionario: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  tipo: {
    type: String,
    enum: ['Promoção', 'Transferência', 'Ajuste Salarial', 'Desligamento', 'Afastamento', 'Licença Maternidade'],
    required: true
  },
  departamentoOrigem: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  departamentoDestino: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  cargoOrigem: {
    type: Schema.Types.ObjectId,
    ref: 'Position'
  },
  cargoDestino: {
    type: Schema.Types.ObjectId,
    ref: 'Position'
  },
  salarioAnterior: {
    type: Number
  },
  salarioNovo: {
    type: Number
  },
  dataSolicitacao: {
    type: Date,
    default: Date.now
  },
  dataEfetivacao: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pendente', 'Aprovado', 'Rejeitado', 'Cancelado'],
    default: 'Pendente'
  },
  justificativa: {
    type: String,
    required: true
  },
  observacoes: {
    type: String
  },
  aprovadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
MovementSchema.pre('save', function(next) {
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
    encryptedFields: ['salarioAnterior', 'salarioNovo', 'justificativa'],
    excludeFromEncryption: ['_id', 'funcionario', 'tipo', 'status']
  };
  
  MovementSchema.plugin(mongooseEncryption, encryptionOptions);
}

module.exports = mongoose.model('Movement', MovementSchema);