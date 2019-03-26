require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
        const pickCount = [];
        const dataResponse = {
          pickData: response,
        };
        let maxSize = 0;
        const { pickData } = dataResponse;
        for (const entry of pickData) {
          entry.status =
            entry.status === 'TRUE' || entry.status === 'true' ? true : false;
          entry.teams = JSON.parse(entry.teams);
          if (entry.teams.length > maxSize) {
            maxSize = entry.teams.length;
          }
          if (entry.status) {
            const latestTeam = entry.teams[entry.teams.length - 1];
            const foundIndex = pickCount.findIndex(
              item => item.teamName === latestTeam
            );
            if (foundIndex < 0) {
              pickCount.push({
                teamName: latestTeam,
                count: 1,
              });
            } else {
              pickCount[foundIndex].count++;
            }
          }
        }
        dataResponse.pickCount = pickCount.sort((a, b) => b.count - a.count);
        dataResponse.day = maxSize;
        res.send(dataResponse);
      } else {
        console.log('error in fetching entries from database', err);
      }
    });
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
