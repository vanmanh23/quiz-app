// pages/api/testnames.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../lib/db';

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
      const { name } = req.query;

      if (name) {
        // Find testName by name
        const testName = await prisma.testName.findUnique({
          where: { testName: String(name) }
        });

        if (!testName) {
          return res.status(404).json({ error: 'Test name not found' });
        }

        return res.status(200).json({
          testName,
          message: 'Test name found'
        });
      } else {
        // If no name query parameter, return all testNames
        const testNames = await prisma.testName.findMany({
          include: {
            image: {
              select: {
                uri: true,
                alt: true
              }
            }
          }
        });
        return res.status(200).json({
          testNames,
          message: 'GET method called'
        });
      }
    } 

    if (req.method === 'POST') {
      console.log('POST request received');
      const { title, testName, numOfQuestions, duration } = req.body;

      if (!title || !testName || !numOfQuestions || !duration) {
        console.error('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newTestName = await prisma.testName.create({
        data: {
          title,
          testName,
          numOfQuestions,
          duration,
        },
      });

      return res.status(201).json({
        newTestName,
        message: 'POST method called'
      });
    }
    if(req.method === 'DELETE') {
      const { testid } = req.query;
      if (!testid) {
        console.error('Missing required fields');
    }else{
      const deletedTestName = await prisma.testName.delete({
        where: {
          id: String(testid)
        }, include: {
          image: {
            select: {
              uri: true,
              alt: true
            }
          }
        }
      })
      return res.status(200).json({
        message: "Test name deleted successfully",
      })
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
