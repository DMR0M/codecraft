import express from 'express';
import { 
    getAllSnippets, 
    createSnippet, 
    updateSnippet, 
    deleteSnippet 
} from '../controllers/snippetController.mjs';
import { authenticate } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get('/snippets', authenticate, getAllSnippets);
router.post('/create-snippet', authenticate, createSnippet);
router.put('/update-snippet/:id', authenticate, updateSnippet);
router.delete('/snippets/:id', authenticate, deleteSnippet);

export default router;