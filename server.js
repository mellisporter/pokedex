//////// DEPENDENCIES

const express = require("express");
const app = express();
const port= 3000;

////// DATABASE

const pokedex = require("./models/pokemon");

app.use(express.urlencoded({ extended: false }))

// splash page -- saw this on the gitpub example we looked at on thursday morning

app.get("/" , function (req, res){
    res.send(`Welcome to the Pokedex Project! To get started, visit <a href="/pokemon"> /pokemon. </a>`)
})

// Index

app.get("/pokemon", function(req, res){
    res.render("index.ejs" , {
        allPokemon: pokedex
    })
})

// New

app.get("/pokemon/new", function(req, res){
res.render("new.ejs")
})

// Delete

// Update

// Create

app.post("/pokemon" , function (req, res){
    pokedex.push(req.body)
    res.redirect("/pokemon")
})

// Edit

app.get("/pokemon/:id/edit", function(req, res){
    res.send("Add New Pokemon")
})

// Show

app.get("/pokemon/:id", function(req, res){
    res.render("show.ejs" , {
        pokeInfo: pokedex[req.params.id],
    })
})


/// app listener

app.listen(port, function(){
    console.log(`Gotta catch 'em all on ${port}`)
})