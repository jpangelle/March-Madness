async function insertEntryIntoDatabase(entryName, teams, db) {
  const newEntry = new db.Entry({
    entryName: entryName,
    teams: teams,
    dateLost: new Date(),
    status: false,
  });
  await newEntry.save(() => {
    console.log('Saved user into Database');
  });
}

exports.modules = { insertEntryIntoDatabase };
