import { Schema, models, model, Document } from "mongoose";

export interface IResults extends Document {
  profile: object;
  results: object;
}

const ResultsSchema = new Schema({
  profile: { type: Object, required: true },
  results: { type: Object, required: true },
});

const Results = models.Results || model("Results", ResultsSchema);

export default Results;
