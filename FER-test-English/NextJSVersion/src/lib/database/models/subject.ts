import { Document } from "mongoose";
import { Schema, models, model, Model } from "mongoose";

//* This integration of typescript works but it may not be the best practice. I leave it for now until I get a better idea on how to use typescript with mongoose.
export interface ISubject extends Document {
  profile: {
    firstName: string;
    lastName: string;
    fullName: string;
    age: string;
    gender: string;
    groupCode: string;
    caseCode: string;
  };
  results: {
    byEachQuestion: [];
    byEachEmotion: [
      {
        emotion: string;
        emoji: string;
        correct: number;
        wrong: number;
        missed: number;
      }
    ];

    byAnswerStatus: {
      correct: number;
      wrong: number;
      missed: number;
    };
  };
}

const SubjectSchema = new Schema<ISubject>({
  profile: {
    firstName: String,
    lastName: String,
    fullName: String,
    age: String,
    gender: String,
    groupCode: String,
    caseCode: String,
  },
  results: {
    byEachQuestion: Array,
    byEachEmotion: [
      {
        emotion: String,
        emoji: String,
        correct: Number,
        wrong: Number,
        missed: Number,
        _id: false,
      },
    ],

    byAnswerStatus: {
      correct: Number,
      wrong: Number,
      missed: Number,
    },
  },
});

const Subject: Model<ISubject> =
  models.Subject || model("Subject", SubjectSchema);

export default Subject;
