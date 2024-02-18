import mongoose from 'mongoose';

// MongoDB contact schema
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
  },
  avatar: {
    type: String,
  },
  notes: {
    type: String,
  },
  favorite: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define a virtual property 'contactId' that's derived from '_id'.
contactSchema.virtual('contactId').get(function () {
  return this._id;
});

// If you want to include virtuals in your output, you can set the toJSON and toObject options
contactSchema.set('toJSON', { virtuals: true });
contactSchema.set('toObject', { virtuals: true });

export const Contact = mongoose.model('Contact', contactSchema);
