var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// API

var mongoose = require('mongoose');

// mongo lab
mongoose.connect('mongodb://ezraadmin:test123@ds161574.mlab.com:61574/zebralabs')

// This line of code is for local development only:
// mongoose.connect('mongodb://localhost:27017/bookshop')


var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error:'))

// ------>>> SET UP SESSIONS <<<----------

app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})

}))

  // Save to SESSION

  app.post('/cart', function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
      if(err){
        throw err;
      }
      res.json(req.session.cart);
    })
  })
  // Get Session Cart API
  app.get('/cart', function(req, res){
    if(typeof req.session.cart !== 'undefined'){
      res.json(req.session.cart);
    }
  })
// ------>>> END SESSION SET UP <<<---------

var Books = require('./models/books.js');

// ------->>> POST BOOKS <<<-------

app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      console.log("# API DELETE ", err)
    }
    res.json(books);
  })
})

// ------->>> GET BOOKS <<<-------

app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err
    }
    res.json(books)
  })
});

// ------->>> DELETE BOOKS <<<-------

app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      throw err
    }
    res.json(books)
  })
});

// ------->>> UPDATE BOOKS <<<-------

app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = req.params._id;

  // if field doesn't exist $set will set a new field

  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })

});

// ---->>> GET BOOKS IMAGES API <<<------

app.get('/images', function(req,res){
  const imgFolder = __dirname + '/public/images';
  // require file system
  const fs = require('fs');
  // read all files in the directory
  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.error(err)
    }
    // create an empty array
    const filesArr = [];
    // iterate all images in the directory and add to the array
    files.forEach(function(file){
      filesArr.push({name: file})
    });

    // send the json response with the array
    res.json(filesArr)
  })
})

// END API

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001')
})
