const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../middleware/auth');
const authController = require('../controllers/authController');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Registrar usuário
// @access  Public
router.post(
  '/register',
  [
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Email válido é obrigatório').isEmail(),
    check('senha', 'Senha deve ter pelo menos 6 caracteres').isLength({ min: 6 })
  ],
  authController.register
);

// @route   POST /api/auth/login
// @desc    Login de usuário
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Email válido é obrigatório').isEmail(),
    check('senha', 'Senha é obrigatória').exists()
  ],
  authController.login
);

// @route   POST /api/auth/logout
// @desc    Logout de usuário
// @access  Private
router.post('/logout', authController.logout);

// @route   GET /api/auth/me
// @desc    Obter usuário atual
// @access  Private
router.get('/me', protect, authController.getMe);

// @route   PUT /api/auth/updatedetails
// @desc    Atualizar detalhes do usuário
// @access  Private
router.put('/updatedetails', protect, authController.updateDetails);

// @route   PUT /api/auth/updatepassword
// @desc    Atualizar senha
// @access  Private
router.put(
  '/updatepassword',
  [
    protect,
    check('senhaAtual', 'Senha atual é obrigatória').exists(),
    check('novaSenha', 'Nova senha deve ter pelo menos 6 caracteres').isLength({ min: 6 })
  ],
  authController.updatePassword
);

// @route   POST /api/auth/forgotpassword
// @desc    Esqueci minha senha
// @access  Public
router.post(
  '/forgotpassword',
  [
    check('email', 'Email válido é obrigatório').isEmail()
  ],
  authController.forgotPassword
);

// @route   PUT /api/auth/resetpassword/:resettoken
// @desc    Redefinir senha
// @access  Public
router.put(
  '/resetpassword/:resettoken',
  [
    check('senha', 'Senha deve ter pelo menos 6 caracteres').isLength({ min: 6 })
  ],
  authController.resetPassword
);

// @route   POST /api/auth/refresh-token
// @desc    Renovar token de acesso
// @access  Public
router.post(
  '/refresh-token',
  [
    check('refreshToken', 'Token de refresh é obrigatório').exists()
  ],
  authController.refreshToken
);

// Rota temporária para criar admin - REMOVER APÓS USO
router.get('/setup-admin', async (req, res) => {
  try {
    const adminExists = await User.findOne({ email: 'admin@exemplo.com' });
    if (adminExists) {
      return res.status(400).json({ msg: 'Admin já existe' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('senha123', salt);
    
    const admin = new User({
      nome: 'Admin',
      email: 'admin@exemplo.com',
      senha: hashedPassword,
      perfil: 'Admin',
      ativo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await admin.save();
    res.json({ msg: 'Admin criado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
