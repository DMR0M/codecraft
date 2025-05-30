import CodeSnippet from "../models/CodeSnippet.mjs";

export const createSnippet = async (req, res) => {
    try {
      const { title, code, language, usecase, tags, createdAt, createdBy } = req.body;
      
      // Assuming you have the authenticated user's ID from the token middleware
      const userId = req.user.id; 
  
      const newSnippet = await CodeSnippet.create({
        title,
        code,
        language,
        usecase,
        tags,
        createdAt,
        createdBy: userId,
      });

      await newSnippet.save();
  
      res.status(201).json(newSnippet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

export const getAllSnippets = async (req, res) => {
  try {
    const userId = req.user.id;

    const snippets = await CodeSnippet.find({ createdBy: userId })  // 🔐 Filter by user
      .populate('createdBy', 'username email')
      .exec();

    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch code snippets' });
  }
};

export const updateSnippet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, language, code, usecase, tags } = req.body;

    if (!title || !language || !code || !usecase || !tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: "All fields are required and tags must be an array." });
    }

    const snippet = await CodeSnippet.findById(id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    if (snippet.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this snippet." });
    }

    snippet.title = title;
    snippet.language = language;
    snippet.code = code;
    snippet.usecase = usecase;
    snippet.tags = tags;

    const updatedSnippet = await snippet.save();

    res.status(200).json(updatedSnippet);
  } catch (err) {
    console.error("Error updating snippet:", err);
    res.status(500).json({ message: "Failed to update the code snippet." });
  }
};


export const deleteSnippet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const snippet = await CodeSnippet.findById(id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    if (snippet.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this snippet." });
    }

    await CodeSnippet.findByIdAndDelete(id);

    res.status(200).json({ message: "Snippet deleted successfully." });
  } catch (err) {
    console.error("Error deleting snippet:", err);
    res.status(500).json({ message: "Failed to delete the code snippet." });
  }
};

