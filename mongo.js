const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://Ratchat1918:${password}@cluster0.ctjwcdz.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery',false);

mongoose.connect(url);
//tehtävä 3.12
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const phoneName=process.argv[3];
const phoneNumber=process.argv[4];

const person=new Person({
  name: phoneName,
  number:phoneNumber,
});
if (process.argv.length < 4) {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close();
  })
}else{
  person.save().then(result=>{
  console.log(`added ${phoneName} ${phoneNumber} to phonebook`);
  mongoose.connection.close();
})
}

