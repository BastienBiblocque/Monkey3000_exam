  const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'pug');

// Add a bit of logging
app.use(morgan('short'))


/*models.singes.belongsTo(models.cages);
models.cages.hasMany(models.singes, { as: "singes" })*/

  app.get('/', function (req, res) {
    models.cages.create({
      Number : 0
    })
    .then (()=>{
        res.redirect('/home');
    })
});


app.get('/cages/:id', function(req, res) {
  models.singes.findAll({
    where : {Cage : req.params.id}
  })
  .then((singe) => {
      res.render( 'index', { title : 'Singes de la cage ' + req.params.id ,message : "de la cage " + req.params.id , singes : singe })
  })
})


//ajouter un singe
 app.get('/addmonkey', function (req, res) {
  models.cages.findAndCountAll()
  .then((result) => {
  res.render( 'addmonkey', { title : 'Singes' , count : result.count})
  })
});

app.post('/addmonkey', function(req, res){
        models.singes.create({
          Nom : req.body.Nom,
          Race : req.body.Race,
          Age : req.body.Age,
          Cage : req.body.Cage
        })
      .then(()=>{
        res.render( 'monkeyadded', { title : 'Singe créer !'})
      } )
})

//ajouter une cage
app.get('/addcage', function (req, res) {
 res.render( 'addcage', { title : "Ajout d'une cage"})
});

app.post('/addcage', function(req, res){
  models.cages.create({
    Number : req.body.Number
  })
  .then(()=> {
    res.render( 'cageadded', { title : 'Cage créer !'})
  })
})

//afficher tous les singes
 /*
app.get('/singes', function(req, res) {
   models.singes.findAll()
   .then ((singe) => {
      res.render( 'index', { title : 'Singes', singes : singe })
   })
})*/

app.post('/addcage', function(req, res){
  models.cages.create({
    Number : req.body.Number
  })
  .then(()=> {
    res.send('Cage added ! ')
  })
})

//afficher tous les singes
app.get('/singes', function(req, res) {
   models.singes.findAll()
   .then ((singe) => {
      res.render( 'index', { title : 'Singes',message : "singes", singes : singe })
   })
})

//isoler un singe
app.get('/singes/:id', function(req, res) {
  models.singes.findOne({
      id : req.params.id
  })
})



app.post('/monkeys/delete', function(req, res, next) {

   models.singes.destroy({
    where : { id : req.body.id }
  });
});

app.post('/monkeys/delete/:id', function(req, res, next) {

   models.singes.destroy({
    where : { id : req.params.id }
  })
   .then(()=> {
    res.redirect('back')
  })
});

//page d'acceuil
app.get('/home', function (req, res) {
 res.render( 'home', { title : "Monkey 3000"})
});

//modifier un singe en fonction de son ID

app.get('/modifmonkey/:id', function(req, res) {
  models.singes.findOne({
    where : {id : req.params.id}
  })
  .then((singe) =>{
      res.render('modifmonkey', {singes : singe})
  })
    .then((singe)=>{
          models.cages.findOne({ where: { id: req.body.Cage } })
            .then((cage) => {
              models.singes.findOne({where : {Cage : cage.id }})
                .then((singe)=>{
                  cage.addMonkey(singe)
                })
                  .then(() => {
                     res.render( 'monkeychanged', { title : 'Singe Modifier !'})
                  })
            })
        })
})

/*app.get('/cage', function (req, res) {
 res.render( 'cage', { title : "Monkey 3000"})
});*/

app.get('/cage', function(req, res) {
   models.cages.findAll()
   .then ((cage) => {
      res.render( 'cage', { title : 'Cages',message : "cage", cages : cage })
   })
})

//modifier un singe en fonction de son ID

app.post('/modifmonkey/:id', function(req, res){
  models.singes.update(
  req.body,
  {
    where : { id : req.params.id }
  })
  .then(()=> {
    res.send('Monkey added ! ')
  })
})

// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   *
   * Listen only when database connection is sucessfull
   */
    app.listen(process.env.PORT/*3000*/, function() {
    console.log('Express server listening on port 3000'+process.env.PORT);
  })
  })

  /*app.get('/',function(req,res){
    res.send("Hello World !")
  })



//});
/* ceci est un test*/
