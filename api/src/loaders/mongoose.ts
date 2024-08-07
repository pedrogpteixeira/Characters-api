import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../../config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    user: config.dbUser,
    pass: config.dbPassword,
  });
  return connection.connection.db;
};
