import mongoose from 'mongoose';

const codeSnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  usecase: { type: String, required: true },
  tags: { type: [String], require: true },
  createdAt: { type: Date, default: Date.now },

  // Reference to the user who created this snippet
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('code_snippets', codeSnippetSchema);