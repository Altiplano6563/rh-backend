const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Importar plugin de criptografia
const mongooseEncryption = require('mongoose-encryption');

const UserSchema = new Schema({
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
  senha: {
    type: String,
    required: true
  },
  perfil: {
    type: String,
    enum: ['Admin', 'Gestor', 'RH', 'Usuário'],
    default: 'Usuário'
  },
  departamento: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  ativo: {
    type: Boolean,
    default: true
  },
  ultimoAcesso: {
    type: Date
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
UserSchema.pre('save', function(next) {
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
    encryptedFields: ['senha'],
    excludeFromEncryption: ['_id', 'nome', 'email', 'perfil', 'ativo']
  };
  
  UserSchema.plugin(mongooseEncryption, encryptionOptions);
}

// Método para comparar senhas
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
