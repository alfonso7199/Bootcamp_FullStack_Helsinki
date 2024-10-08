const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minilength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
          return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
      },
      message: props => `${props.value} no es un número de teléfono válido!`,
  },
  },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Phonebook', phonebookSchema);