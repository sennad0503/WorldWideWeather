const db = require("../models");

const index = (req, res) => {
  db.Weather.find({ userId: req.params.userId }, (err, obj) => {
    if (err) {
      console.log("Error:");
      console.log(err);
    }
    return res.json(obj);
  });
};

const show = (req, res) => {
  db.Weather.findById(req.params.id, (err, obj) => {
    if (err) {
      console.log("Error:");
      console.log(err);
    }
    res.json(obj);
  });
};

const create = (req, res) => {
  objData = req.body;
  db.Weather.create(objData, (err, obj) => {
    if (err) {
      console.log("Error:");
      console.log(err);
    }
    res.json(obj);
  });
};

const update = (req, res) => {
  const updateObj = req.body;

  db.Weather.findByIdAndUpdate(
    req.params.id,
    updateObj,
    { new: true },
    (err, obj) => {
      if (err) {
        console.log("Error:");
        console.log(err);
      }
      res.json(obj);
    }
  );
};

// const getPosts = (req,res) => {
//     db.Weather.findById(
//       req.params.id,
//       (err,obj) => {
//         if (err) {
//           console.log('Error:');
//           console.log(err);}
//     })
//         .then((obj) => {
//         db.Post.find(
//           {
//           _id: obj.posts
//           },
//           (err, obj) => {
//             if (err) {
//               console.log('Error:');
//               console.log(err);}
//             res.json(obj)
//         })
//      })
// }

const destroy = (req, res) => {
  db.Weather.findByIdAndDelete(req.params.id, (err, deleteWeather) => {
    if (err) return console.log(err);

    res.json(deleteWeather);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  // getPosts,
  destroy,
};
