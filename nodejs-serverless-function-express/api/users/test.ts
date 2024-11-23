// pages/api/testnames.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const userId = req.query.userId;
      if(userId) {
          const testfinded = await prisma.test.findMany({
            where: {
              userId: String(userId)
            }
          })
          return res.status(200).json({
            testfinded,
            message: 'GET method called'
          })
      }else{
        // If no name query parameter, return all testNames
        const test = await prisma.test.findMany({
          include: {
            user: true,
            testName: true
          }
        });
        return res.status(200).json({
          test,
          message: 'GET method called'
        });
      }       
    } 

    if (req.method === 'POST') {
      console.log('POST request received');
      const { score, timeTaken, correctAnswers, userId, testNameId } = req.body;
      const newTest = await prisma.test.create({
        data: {
          score,
          timeTaken,
          correctAnswers,
          userId,
          testNameId
        },
      });

      return res.status(201).json({
        newTest,
        message: 'test had been completed'
      });
    }
    if(req.method === 'DELETE') {
      const { id } = req.query;
      try {
        await prisma.test.delete({
          where: {
            id: String(id)
          }, include: {
            user: true,
            testName: true
          }
        })
        return res.status(200).json({ message: 'test had been deleted' });
      } catch (error) {
        throw error;
      }
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
