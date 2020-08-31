const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

let persons = [
    {
        name: "Ilay Baruch",
        number: "054-5363678",
        id: 1
      },
      {
        name: "Stav Zamir",
        number: "054-4747207",
        id: 2
      },
      {
        name: "Omer Nir",
        number: "054-6256258",
        id: 3
      },
      {
        name: "Ido Nochi",
        number: "052-8328328",
        id: 4
      }
]

app.get('/', (req, res) => {
  res.send(`<h1>Hello</h1>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    const personsAmount = persons.length;
    res.send(
        `<div>PhoneBook has info for ${personsAmount} persons</div>
         <div>${new Date}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
      return res.status(400).json({ 
        error: 'name or number missing' 
      })
    } 
    else if (persons.some(person => person.name === body.name)) {
      return res.status(400).json({ 
        error: 'name must be unique'
      })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: persons[persons.length - 1].id + 1
    }

    persons.push(newPerson);
    res.json(persons);
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})