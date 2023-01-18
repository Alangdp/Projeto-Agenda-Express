const validator = require('validator');

export default class Login{
    constructor(formClass, alerClass) {
        this.form = document.querySelector(`.${formClass}`);
        this.init();
    }

    init() {
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.valida();
        });
    }

    valida() {
        let valid = true;
        for(const campo of this.form) {
            if(campo.name === '__csrf') {
                continue;
            };

            if(campo.name === 'email') {
                if(! validator.isEmail(campo.value)){
                    alert('Email inválido');
                    valid = false;
                }
            }

            if(campo.name === 'password'){
                if(campo.value.length < 3 || campo.value.length > 50)  {
                    alert('Senha inválida');
                    valid = false;
                }
            }
        }

        this.enviaForm(valid);
    }

    enviaForm(valid) {
        if (valid) this.form.submit()
    }
}