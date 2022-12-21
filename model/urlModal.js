import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    domain: { type: String, required: true },
    favorite: { type: Boolean, required: true,default:false },
    words: { type: String, required: true },
    images: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('url', urlSchema);