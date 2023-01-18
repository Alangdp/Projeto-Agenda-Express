const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')
const { default: isEmail } = require('validator/lib/isemail');

const loginSchema = new mongoose.Schema({
  email: {type: String, required:true},
  senha: {type: String, required:true},

});

const LoginModel = mongoose.model('login', loginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = []; 
    this.user = null;
  }

  async login() {
    this.valida()
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne( {email: this.body.email});

    if(!this.user) {
      this.errors.push('Usuário não existe.');
      this.user = null;
      return;
    }
    	
    if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return
    }
    console.log(3)

  }

  async register() {
    this.valida()
    if(this.errors.length > 0) return;
    await this.userExists();
    if(this.errors.length > 0) return;
    console.log(123)
    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt)

    this.user = await LoginModel.create(this.body)
    
  }
  
  async userExists() {
    this.user = await LoginModel.findOne( {email: this.body.email});
    if (this.user) this.errors.push('Usuário já existe')
  }

  valida() {
    this.cleanUp()

    // O email precisa ser válido
    if(! isEmail(this.body.email)) this.errors.push('Email inválido')

    // A senha precisa ter entre 3 e 50 caracteres
    if(this.body.senha.length < 3 || this.body.senha.length > 50) this.errors.push('Senha precisa ter de 3 a 50 caracteres')
  }

  cleanUp() {
    for (const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      senha: this.body.password,
    }
  }
}

module.exports = Login;
