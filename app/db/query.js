import pool from './pool';
const fs = require('fs');

const query = (queryFile, params) => {
  const queryText = fs.readFileSync(`./app/sql/${queryFile}`, 'utf8');

  return new Promise((resolve, reject) => {
    pool
      .query(queryText, params)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export default query;
