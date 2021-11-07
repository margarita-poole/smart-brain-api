import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "5439fc5859a74392be2252adf23e6505",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    // "5439fc5859a74392be2252adf23e6505",
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

export default {
  handleImage,
  handleApiCall,
};
