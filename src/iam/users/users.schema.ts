import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { isEmail } from 'class-validator';

@Schema({
  toJSON: {
    transform: (_, ret) => {
      delete ret.__v;
    },
  },
  toObject: {
    transform: (_, ret) => {
      delete ret.__v;
    },
  },
})
export class User extends Document {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    validate: [isEmail, 'Must be a valid email'],
  })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ select: false })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
