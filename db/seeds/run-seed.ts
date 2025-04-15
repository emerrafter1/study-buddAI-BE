import devData from "../data/development-data/index"
import seed from './seed';
import db from '../connection';




const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
