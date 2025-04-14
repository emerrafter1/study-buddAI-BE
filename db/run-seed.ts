import devData from '../data/development-data';
import seed from './seed';
import db from './connection';
const runSeed = async () => {
  try {
    await seed(devData)
  } catch (err) {
    console.log(err);
  } finally {
    await db.end()
  }
};
runSeed();