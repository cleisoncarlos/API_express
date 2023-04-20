const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

const JWTsecret = 'sadabsodubasdds5d14as65d1as65d1sa65d1sa65d1sa6d5sa1'






app.use(express.urlencoded({extended: true}))
app.use(express.json())




//middleware-----------------

function auth(req, res, next) {
  const authToken = req.headers['authorization']
  console.log(authToken)

  next();

}

//--------------------------








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
        }
      ],
      users: [
        {
          id: 1,
          name: 'Cleison Carlos',
          email: 'cleisoncarlos@hotmail.com',
          password: 123456
        },
        {
          id: 2,
          name: 'Carlos Cleison',
          email: 'cleisoncarlos@hotmail.com',
          password: 654321
        }
      ]
}



// ednpoints
//ver games ------------------------
app.get('/games', auth (req, res)=> {
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



// deletar
  app.delete('/game/:id', (req, res) => {

    if(isNaN(req.params.id)){
           res.sendStatus(400)
      } else {   
      let id = parseInt(req.params.id)
      let index = db.games.findIndex(g => g.id == id)

      if(index == -1 ){

        res.sendStatus(404)

      } else {
        db.games.splice(index, 1)
        res.sendStatus(200)
      }    
      }
})

//editar 

app.put('/game/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    let id = parseInt(req.params.id);
    let game = db.games.find(g => g.id === id);
    if (game !== undefined) {
      let { title, price, year } = req.body;
      if (title !== undefined) {
        game.title = title;
      }
      if (price !== undefined) {
        game.price = price;
      }
      if (year !== undefined) {
        game.year = year;
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

// LOGIN


app.post('/auth', (req, res) => {
  let { email, password } = req.body;

  if (email !== undefined) {
    let user = db.users.find(u => u.email === email);

    if (user !== undefined) {
      if (user.password === password) {
        jwt.sign({ id: user.id, email: user.email }, JWTsecret, { expiresIn: '24h' }, (err, token) => {
          if (err) {
            res.status(400).json({ err: 'Falha interna' });
          } else {
            res.status(200).json({ token: token });
          }
        });
      } else {
        res.status(401).json({ err: 'Credenciais inválidas' });
      }
    } else {
      res.status(404).json({ err: 'Email enviado não existe na base de dados' });
    }
  } else {
    res.status(400).json({ err: 'Email enviado é inválido' });
  }
});


  
// fim dos endpoints-------------

app.listen(3000, ()=> {
    console.log('API funcionando !')
})
