// Import Prisma client
import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    try {
      if (req.method === 'GET') {
        const questtions = await prisma.image.findMany();
        return res.status(200).json({
            questtions,
          message: 'GET method called'
        });
      } 
  
      if (req.method === 'POST') {
        console.log('POST request received');
        const {uri, alt, questionId } = req.body;
  
        // if (!uri || !alt || !questionId) {
        //   console.error('Missing required fields');
        //   return res.status(400).json({ error: 'Missing required fields' });
        // }
  
        const newQuestion = await prisma.image.create({
          data: {
            uri,
            alt,
            questionId
          },
        });
  
        return res.status(201).json({
            newQuestion,
            message: 'create image of question successfully'
        });
      }
      // If method is not GET or POST, return method not allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
  
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
      });
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  