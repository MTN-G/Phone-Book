const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'

const url =
`mongodb+srv://MTN-G:${password}@cluster0.wqqcx.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})


if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log(dbName)
        result.forEach(person => {
            console.log(person)
        })
    mongoose.connection.close()
    process.exit(1)
    })
} 

if (process.argv.length === 4) {
    Person.find({name: process.argv[3]}).then(result => {
        console.log(dbName)
        console.log(result);
        mongoose.connection.close()
        process.exit(1)
    })
} 


if (process.argv.length === 5){
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })  
}




