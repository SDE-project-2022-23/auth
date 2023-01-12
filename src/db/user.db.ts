import { User, UserWithPassword } from "@type/User";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<UserWithPassword>({
  // id: {
  //   type: String,
  //   required: true,
  // },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

// // Enlève les propriétés non voulu lorsque l'on transforme en JSON
[UserSchema].forEach((schema) => {
  schema.set("toJSON", {
    // pour avoir `id`, alias natif de `_id`. virtual = alias
    virtuals: true,
    // pour ne pas avoir __v, version du document par Mongoose
    versionKey: false,
    // true par défaut, mais pour que vous sachiez: convertie les Maps en POJO
    flattenMaps: true,
    getters: false,
    // delete `_id` manuellement
    transform: (_doc, ret) => {
      delete ret._id;
      delete ret.password;
      return ret;
    },
  });
});

export const UserModel = model("User", UserSchema);
