require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('../database');
const { insertEntryIntoDatabase } = require('../services');

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(res => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });

const app = express();

app.use(express.static(`${__dirname}/../build`));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/../build` });
});

app.post('/newEntry', (req, res) => {
  const { entryName, teams } = req.body;
  insertEntryIntoDatabase(entryName, teams, db);
  res.send('saved into the database!');
});

app.get('/fetchEntries', (req, res) => {
  db.Entry.find()
    .lean()
    .exec((err, response) => {
      if (response) {
        for (const entry of response) {
          entry.status =
            entry.status === 'TRUE' || entry.status === 'true' ? true : false;
          entry.teams = JSON.parse(entry.teams);
        }
        res.send(response);
      } else {
        console.log('error in fetching entries from database', err);
      }
    });
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
