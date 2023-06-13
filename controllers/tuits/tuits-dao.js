import tuitsModel from './tuits-model.js';
import mongoose from 'mongoose';
export const findTuits = () => tuitsModel.find();
export const createTuit = (tuit) => tuitsModel.create(tuit);
export const deleteTuit = (tid) => tuitsModel.deleteOne({ _id: tid });
export const updateTuit = (tid, tuit) => tuitsModel.updateOne({ _id: tid }, { $set: tuit })

// console.log("users hopefully: ", tuitsModel.find({ liked: true }).exec().then());
//
// console.log("testing collection data part 2:", tuitsModel.find().exec().then((data) => { console.log(data) }));
// const username = mongoose.connection.getClient();
// console.log('Username:', username);

tuitsModel.find()
  .exec()
  .then((tuits) => {
    console.log('All Users:');
    tuits.forEach((tuit) => {
      console.log(tuit);
    });
  })
  .catch((err) => {
    console.error('Error retrieving users:', err);
  });
