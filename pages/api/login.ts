import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ userId: 'user123' }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
