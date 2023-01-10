exports.paginaInicial = (req, res, next) => {
    res.render('index', {
        titulo: 'Este sera o titulo da página',
        numeros: [1,2,3,4,5,6,7,8,9,10]
    });
    console.log(req.session)
    next()
}

exports.teste = (req, res, next) => {
    res.send(` Aqui está a resposta do formulario: <br> ${req.body.nome}`)
}
