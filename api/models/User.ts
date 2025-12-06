// Create Schema

import {
  HydratedDocument,
  InferSchemaType,
  model,
  Model,
  models,
  Schema,
} from 'mongoose';

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
    },

    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: false,
      trim: true,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      required: false,
      default: 'user',
    },

    plan: {
      type: String,
      enum: ['free', 'premium'],
      required: false,
      default: 'free',
    },

    status: {
      type: String,
      enum: ['active', 'banned', 'suspended'],
      required: false,
      default: 'active',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Inferred TypeScript types from the schema
export type UserType = InferSchemaType<typeof UserSchema>;
export type UserDocument = HydratedDocument<UserType>;
type UserModel = Model<UserDocument>;

// Safe model export (prevents model overwrite in hot reloads)
const User =
  (models.User as UserModel) || model<UserType, UserModel>('User', UserSchema);

export default User;
