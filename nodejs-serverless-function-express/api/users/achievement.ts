// pages/api/testnames.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/db';
import * as bcrypt from "bcrypt";

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
       const userId = req.query.userId;
       if(userId) {
            const getUser = await prisma.user.findUnique({
                where: {
                    id: String(userId)
                },
                include: {
                    tests: {
                        select: {
                            score: true,
                            correctAnswers: true,
                            testName: true,
                            day: true,
                            id: true,
                            testNameId: true,
                            timeTaken: true,
                            userId: true,
                            user: true
                        }
                    }
                }
            })
            return res.status(200).json({
            getUser,
            message: 'user found'
            });
       }else{
            const user = await prisma.user.findMany({
                include: {
                    tests: {
                        select: {
                            score: true,
                            correctAnswers: true,
                            testName: true,
                            day: true,
                            id: true,
                            testNameId: true,
                            timeTaken: true,
                            userId: true,
                            user: true
                        }
                    }
                }
            });
            if (!user) {
            return res.status(404).json({ error: 'user not found' });
            }
            return res.status(200).json({
            user,
            message: 'user found'
            });
       }
    } 

    if (req.method === 'POST') {
      console.log('POST request received');

      return res.status(201).json({
        message: 'post method in achivement called',
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
