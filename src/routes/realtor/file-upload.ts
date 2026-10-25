import { Router } from 'express';
import { getSignedUrl } from '../../logic/file-upload-logic';

const router = Router();

router.get('/get-signed-url/:filePath', async (req, res) => {
  const { filePath } = req.params;
  const signedUrl = await getSignedUrl(filePath);
  res.json(signedUrl);
});

export default router;