const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
  res.render('contato', {contato: ''});
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
  
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save( () => res.redirect('/contato/index'));
      return;
    }
    
    req.flash('sucess', 'Contato registrado com sucesso.');
    req.session.save( () => res.redirect(`/contato/index/${contato.contato._id}`))
    return;
    
  } catch(e) {
    console.log(e);
    res.redirect('404')
  }
};

exports.editIndex = async (req, res) => {
  id = req.params.id
  if(!id) return res.render('404');
  const contato = await Contato.buscaPorId(id)
  if(!contato) return res.render('404');

  res.render('contato', {contato:contato})
}

exports.edit = async (req, res) => {
  try{
    if(!id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);
    
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save( () => res.redirect('/contato/index'));
      return;
    }
    
    req.flash('sucess', 'Contato editado com sucesso.');
    req.session.save( () => res.redirect(`/contato/index/${contato.contato._id}`))
    return;
  } catch(e) {
    console.log(e)
    res.redirect('404')
  }

}

exports.delete = async (req, res) => {
  try {
    id = req.params.id
    if(!id) return res.render('404');

    await Contato.deletaContato(id)

    req.flash('sucess', 'Contato apagado com sucesso.');
    req.session.save( () => res.redirect(`/`))


  } catch(e) {
    console.log(e)
    res.redirect('404')
  }

}