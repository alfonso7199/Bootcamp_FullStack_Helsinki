const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose')
const Phonebook = require('./models/phonebookModel');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/personas', (req, res, next) => {
    Phonebook.find({})
        .then(personas => {
            res.json(personas);
        })
        .catch(error => next(error));
});

app.get('/api/personas/:id', (req, res, next) => {
    const id = req.params.id;

    Phonebook.findById(id)
        .then(persona => {
            if (persona) {
                res.json(persona);
            } else {
                res.status(404).send({ error: 'Person not found' });
            }
        })
        .catch(error => next(error));
});

app.post('/api/personas', (req, res, next) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }

    const phonebookEntry = new Phonebook({
        name: body.name,
        number: body.number,
    });

    phonebookEntry.save()
        .then(savedEntry => {
            res.json(savedEntry);
        })
        .catch(error => next(error));
});

app.delete('/api/personas/:id', (req, res, next) => {
    const id = req.params.id;

    console.log("ID recibido para eliminar:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    Phonebook.findByIdAndDelete(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.put('/api/personas/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Faltan datos de la persona' });
    }

    const updatedPersona = {
        name: body.name,
        number: body.number
    };

    Phonebook.findByIdAndUpdate(id, updatedPersona, { new: true, runValidators: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson);
            } else {
                res.status(404).json({ error: 'Persona no encontrada' });
            }
        })
        .catch(error => next(error));
});

app.get('/info', (req, res, next) => {
    Phonebook.countDocuments({})
        .then(count => {
            res.send(`
                <div>
                    <p>Phonebook has info of ${count} people</p>
                    <p>${new Date()}</p>
                </div>
            `);
        })
        .catch(error => next(error));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 8080
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});