import { Schema, models, model, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
