import { createAllTables, dropAllTables } from './connection.js';

const args = process.argv.slice(2);

switch (args[0]) {
  case '--create-tables':
    createAllTables();
    break;
  case '--drop-tables':
    dropAllTables();
    break;
  default:
    createAllTables();
    break;
}
