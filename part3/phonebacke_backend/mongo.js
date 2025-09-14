const mongoose = require("mongoose");

// Usage check
if (process.argv.length < 3) {
  console.log("Usage:");
  console.log("  node mongo.js <password> [name] [number]");
  process.exit(1);
}

// CLI args
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// Connection string — include your username and database name
const url = `mongodb+srv://mujeebullah15604:${password}@innoexp-training.xykyi3e.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=innoexp-training`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Schema & Model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Case 1: Only password → list all persons
if (process.argv.length === 3) {
  Person.find({})
    .then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    })
    .catch((err) => console.error("Error fetching data:", err))
    .finally(() => mongoose.connection.close());
}

// Case 2: Password + name + number → add new person
if (process.argv.length === 5) {
  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
    })
    .catch((err) => console.error("Error saving person:", err))
    .finally(() => mongoose.connection.close());
}
