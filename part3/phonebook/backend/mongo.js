const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://alfonsosanchez1799:${password}@cluster0.71bko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
    Phonebook.find({}).then(result => {
      console.log('Phonebook:');
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  }

  if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
  
    const phonebook = new Phonebook({
      name: name,
      number: number,
    });

phonebook.save().then(result => {
  console.log(`Added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
}