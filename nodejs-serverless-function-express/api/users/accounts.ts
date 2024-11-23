// pages/api/testnames.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/db';
import * as bcrypt from "bcrypt";

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
        const user = await prisma.user.findMany();
        if (!user) {
          return res.status(404).json({ error: 'user not found' });
        }
        return res.status(200).json({
          user,
          message: 'user found'
        });
    } 

    if (req.method === 'POST') {
      console.log('POST request received');
      const { userName, email, password } = req.body;
      const salt = bcrypt.genSaltSync();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newAccount = await prisma.user.create({
        data: {
          userName,
          email, 
          password: hashedPassword
        },
      });

      return res.status(201).json({
        newAccount,
        message: 'Create new account succeccfully'
      });
    }
    if(req.method === 'DELETE') {
      const { id } = req.query;
      try {
        await prisma.user.delete({
          where: {
            id: String(id)
          }
        })
        return res.status(200).json({ message: 'Delete user successfully' });
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
