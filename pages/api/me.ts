import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, 'your_secret_key');
        const userId = (decoded as { userId: string }).userId;

        const user = {
          id: userId,
          username: 'admin',
          email: 'admin@example.com',
        };

        res.status(200).json(user);
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
      }
    } else {
      res.status(401).json({ error: 'No token provided' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}   