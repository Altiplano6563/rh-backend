const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Importar plugin de criptografia
const mongooseEncryption = require('mongoose-encryption');

const EmployeeSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  telefone: {
    type: String,
    trim: true
  },
  endereco: {
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  departamento: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  cargo: {
    type: Schema.Types.ObjectId,
    ref: 'Position',
    required: true
  },
  salario: {
    type: Number,
    required: true
  },
  dataAdmissao: {
    type: Date,
    required: true,
    default: Date.now
  },
  dataDemissao: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Ativo', 'Inativo', 'Afastado', 'Férias'],
    default: 'Ativo'
  },
  modalidadeTrabalho: {
    type: String,
    enum: ['Presencial', 'Remoto', 'Híbrido'],
    default: 'Presencial'
  },
  cargaHoraria: {
    type: Number,
    enum: [150, 180, 200, 220],
    default: 220
  },
  jornadaTrabalho: {
    type: String,
    enum: ['8h-17h', '9h-18h', '10h-19h', 'Flexível'],
    default: '8h-17h'
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Não-binário', 'Prefiro não informar'],
    default: 'Prefiro não informar'
  },
  raca: {
    type: String,
    enum: ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Prefiro não informar'],
    default: 'Prefiro não informar'
  },
  notaAvaliacao: {
    type: Number,
    min: 0,
    max: 10
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
EmployeeSchema.pre('save', function(next) {
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
    encryptedFields: ['cpf', 'salario', 'dataNascimento'],
    excludeFromEncryption: ['_id', 'nome', 'email', 'departamento', 'cargo', 'status']
  };
  
  EmployeeSchema.plugin(mongooseEncryption, encryptionOptions);
}

module.exports = mongoose.model('Employee', EmployeeSchema);