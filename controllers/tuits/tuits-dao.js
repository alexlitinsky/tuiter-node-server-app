import tuitsModel from './tuits-model.js';
import mongoose from 'mongoose';
export const findTuits = () => tuitsModel.find();
export const createTuit = (tuit) => tuitsModel.create(tuit);
export const deleteTuit = (tid) => tuitsModel.deleteOne({ _id: tid });
export const updateTuit = (tid, tuit) => tuitsModel.updateOne({ _id: tid }, { $set: tuit })


// console.log("all the tuits: ", tuitsModel.find());


tuitsModel.find({}).exec()
  .then((data) => {
    console.log('Testing collection data:');
    console.log(data);
  })
  .catch((err) => {
    console.error('Error retrieving collection data:', err);
  });
