'use strict'

import Mongoose from 'mongoose';
import config from '../config';

// Set up default mongoose connection
const mongoDB = config.MONGODB;
Mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
Mongoose.Promise = global.Promise;
// Get the default connection
const db = Mongoose.connection;

export default db;