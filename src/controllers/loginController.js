const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    return res.render('login');
}; 

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save( () => {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('sucess', 'Seu usuário foi criado com sucesso.');
            req.session.save( () => {
                return res.redirect('/login/index');
        });

    } catch(e) {
        console.log(e)
        res.render('404');
    }

};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save( () => {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('sucess', 'você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/login/index');
        });

    } catch(e) {
        console.log(e)
    }

};

exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/login/index');

}