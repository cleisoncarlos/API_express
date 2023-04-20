const express = require('express')
const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())


let db = {
    games: [
        {
            id: 1,
            title: 'Battlefront II',
            year: 2020,
            price: 200
        },

        {
            id: 2,
            title: 'Sea of Thieves',
            year: 2021,
            price: 100
        },

        {
            id: 3,
            title: 'Fortinite',
            year: 2019,
            price: 00
        },
    ]
}


// ednpoints
//ver games ------------------------
app.get('/games', (req, res)=> {
    res.statusCode = 200
    res.json(db.games)
})
// game por ID -------------------------------
app.get('/game/:id', (req, res) => {
if(isNaN(req.params.id)){
  //  res.send('Isso nao é um numero')
  res.sendStatus(400)
} else {   
let id = parseInt(req.params.id)
let game = db.games.find(g => g.id == id)
    if( game != undefined ){
        res.statusCode = 200
        res.json(game)
    } else {      
        res.sendStatus(404)
    }
}
})

// Rota para adicionar um novo jogo-------------
app.post('/game', (req, res) => {
    const game = {
      id: req.body.id,
      title: req.body.title,
      year: req.body.year,
      price: req.body.price
    };
  
    if (game.id === undefined || game.title === undefined || game.year === undefined || game.price === undefined) {
      res.sendStatus(400);
    } else {
      db.games.push(game);
      res.sendStatus(200);
    }  
    console.log(game);
  });
  
// fim dos endpoints-------------

app.listen(3000, ()=> {
    console.log('API funcionando !')
})