import pool from './pool';
import query from './query';

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUserTable = () => {
  query('createUserTable.sql', null)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const dropUserTable = () => {
  query('dropUserTable.sql', null)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

//TODO: create / drop for all tables

const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
  dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export { createAllTables, dropAllTables };
