const mongoose = require('mongoose')
require('dotenv').config();


if (process.argv.length < 2) {
  console.log('give password as argument')
  process.exit(1)
}

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 2) {
    Phonebook.find({}).then(result => {
      console.log('Phonebook:');
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  }

  if (process.argv.length === 4) {
    const name = process.argv[2];
    const number = process.argv[3];
  
    const phonebook = new Phonebook({
      name: name,
      number: number,
    });

phonebook.save().then(result => {
  console.log(`Added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
}