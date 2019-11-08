const pool = require('../models/databaseModel');

module.exports = {
  getQuestions(req, res, next) {
    const queryText = `SELECT * FROM "QsAndAs" ORDER BY RANDOM()`;
    pool.query(queryText)
      .then(data => {
        res.locals.qsAndAs = data.rows;
        return next();
      })
      .catch(err => 
        next({ log: `Error in getting questions, ${err}`, message: `Server could not get questions` })
      )
  },
  insertResults(req, res, next) {
    const queryText = `INSERT INTO "History" (user_id, num_questions, num_correct) VALUES ($1, $2, $3)`;
    let { id, numQs, numCorrect } = req.body;
    console.dir(req.body);
    pool.query(queryText, [+id, +numQs, +numCorrect], (err, dbResponse) => {
      if(err) {
        return next({log: `Error adding result to history, ${err}`, message: `Server could not record results`})
      }
      console.log('successfully added result to History', dbResponse.rows[0]);
      return next();
    })
  },
  getResults(req, res, next) {
    const queryText = `SELECT username, num_questions, num_questions, num_correct FROM "History" INNER JOIN "Users" ON "History".user_id = "Users".id;`;
    pool.query(queryText, (err, dbResponse) => {
      if(err) {
        return next({log: `Error getting history, ${err}`, message: `Server could not get results`});
      }
      console.log('getting results from history.....', dbResponse.rows)
      res.locals.history = dbResponse.rows;
      return next();
    }) 
  }
}