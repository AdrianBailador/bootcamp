const { request, response } = require('express')
const express = require('express')
const app = express()


app.use(express.json())
//const http = require('http')

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]
 /* const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
  })*/

//creamos un servidor y lo guardamos en la const app
/*
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})
*/

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
}) //cuando se haga una peticion del tipo get

app.get('/api/notes', (request, response)=>{
    response.json(notes)
})

app.get('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    const note = notes.find(note=>note.id==id)
    if(note){
    response.json(note)
    }else{
        response.status(404).end()
    }
})



app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note || !note.content){
        return response.status(400).json({
            error:'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)

const maxId= Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date : new Date().toISOString()
    }

    notes = [...notes, newNote]
    //notes = notes.concat(newNote) //Otra forma de hacerlo


    response.json(newNote)
})

app.delete('/api/notes/:id', (request,response)=> {
    const id = Number(request.params.id)
    notes = notes.filter(note=>note.id != id)
    response.status(204).end()

})
/*
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
*/
const PORT = 3001
app.listen(PORT, ()=> { //El servidor en express es asincrono, cuando termine el servidor de levantarse, ejecutame esto
    console.log(`Server running on port ${PORT}`)
})