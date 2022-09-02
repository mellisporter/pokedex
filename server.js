//////// DEPENDENCIES

const express = require("express");
const app = express();
const port= 3000;

////// DATABASE

const pokedex = require("./models/pokemon");

app.use(express.urlencoded({ extended: false }))

/// static 

app.use(express.static('public'))


// Delete Method

const methodOverride = require("method-override")
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"))

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

app.delete("/pokemon/:id", (req, res) => {
    pokedex.splice(req.params.id, 1) //remove the item from the array
    res.redirect("/pokemon") //redirect back to index route
  })

// Update

app.put("/pokemon/:id", function(req, res){
    pokedex[req.params.id] = req.body
    res.redirect("/pokemon")
})

// Create

app.post("/pokemon" , function (req, res){
    // had trouble getting the stats to load for created pokemon so went through this with sarah
    // let pokeBody = req.body;
    // let newPoke = {};
    // let stats = {};
    // stats.hp = pokeBody.hp;
    // stats.attack = pokeBody.attack;
    // stats.defense = pokeBody.defense;
    // newPoke.name = pokeBody.name;
    // newPoke.type = pokeBody.type;
    // newPoke.img = pokeBody.img;
    // newPoke.stats = stats;
    // pokedex.push(newPoke);
    // let statsObject = {
    //     hp: req.body.hp,
    //     attackL
    // }
    // let type = req.body.type;

    // we went through all this together in office hours, but my code was still breaking

    // let typeArr = type.split(', ')
    // let newPokemon = {
    //     id: req.body.id,
    //     name: req.body.name,
    //     img: req.body.img,
    //     type: typeArr,
    //     stats: statsObject,
    // }
    pokedex.push(req.body)
    res.redirect("/pokemon")
})

// Edit

app.get("/pokemon/:id/edit", function(req, res){
    res.render("edit.ejs" , {
        poke: pokedex[req.params.id],
        id: req.params.id,
    })
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