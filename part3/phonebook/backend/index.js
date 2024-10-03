const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');



app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



let personas = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Phonebook API</h1>');
});

app.get('/api/personas', (req, res) => {
    res.json(personas);
})

app.get('/api/personas/:id', (req, res) => {
    const id = Number(req.params.id)
    const persona = persons.find(persona => persona.id === id)

    if(persona){
        res.json(persona)
    } else {
        res.status(404).send({ error: 'Person not founf'})
    }
})

app.post('/api/personas', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    const nameExists = personas.some(persona => persona.name === body.name);
    if (nameExists) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPersona = {
        id: Math.floor(Math.random() * 10000), 
        name: body.name,
        number: body.number
    }

    personas = personas.concat(newPersona)
    res.json(newPersona)
});

app.delete('/api/personas/:id', (req, res) => {
    const id = Number(req.params.id)
    const personaInd = personas.findIndex(persona => persona.id === id)

    if(personaInd !== -1){
        personas = personas.filter(persona => persona.id !== id)
        res.status(204).end()
    } else {
        res.status(404).send({ error: 'Person not founf'})
    }
})

app.get('/info', (req, res) => {
    const totalPersonas = personas.length

    res.send(`
        <div>
            <p>Phonebook has info of ${totalPersonas}</p>
            <p>${new Date()}</p>
        </div>
        
    `)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 8080
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);


})
