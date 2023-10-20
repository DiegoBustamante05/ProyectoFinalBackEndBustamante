//@ts-check
import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    title: { type: String, required: true, max: 100, index: true },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true},
    thumbnail: { type: String, required: false, max: 100 },
    code: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true},
    category: { type: String, required: true, max: 100, index: true },
    status: { type: Boolean, required: true, max: 100},
    owner: {
        level: { type: String, enum: ['admin', 'premium'], required: true, default: 'admin' },
        email: { type: String},
    },
});

schema.plugin(mongoosePaginate);
export const ProductModel = model('products', schema);


