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
        const { id } = req.query;
        const questions = await prisma.testName.findUnique({
          where: { id: String(id) }, include: { question: {
            select: { id: true, question: true, hint: true, answerDescription: true, options: true, image: true }
          }},
        });
        return res.status(200).json({
            questions,
          message: 'GET method called'
        });
      } 
  
      if (req.method === 'POST') {
        console.log('POST request received');
        const {id, question, hint, answerDescription, testNameId } = req.body;
  
        // if (!id || !question || !hint || !answerDescription || !testNameId) {
        //   console.error('Missing required fields');
        //   return res.status(400).json({ error: 'Missing required fields' });
        // }
  
        const newQuestion = await prisma.question.create({
          data: {
            question,
            hint,
            answerDescription,
            testNameId
          },
        });
  
        return res.status(201).json({
            newQuestion,
            message: 'create new question successfully'
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
  