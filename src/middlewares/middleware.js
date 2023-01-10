exports.meuMiddleware = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Este é o valor da variavel local.';
    next();
}

exports.checkCsfrErro = (err, req, res) => {
    if(err && 'EBADCSRFTOKEN' === err.code) {
        return res.send('BAD CSRF.')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next();
}