import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { getFormsForReview, updateFormReviewStage } from '../../logic/broker/forms-review-logic';

const router = Router();

// Get all forms for broker to review
router.get('/forms-review', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log("in the route to get forms for review")

    const forms = await getFormsForReview(userId);
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms for review:', error);
    res.status(500).json({ error: 'Failed to fetch forms for review' });
  }
});

// Update form review stage
router.patch('/forms-review/:formId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.sub;
    const { formId } = req.params;
    const { review_stage } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!['not_sent', 'reviewing', 'approved'].includes(review_stage)) {
      return res.status(400).json({ error: 'Invalid review stage' });
    }

    const result = await updateFormReviewStage(userId, formId, review_stage);
    res.json(result);
  } catch (error) {
    console.error('Error updating form review stage:', error);
    res.status(500).json({ error: 'Failed to update form review stage' });
  }
});

export default router;