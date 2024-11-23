// pages/api/testnames.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/db';
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from 'console';
// import { JWT_SECRET } from '../../lib/contants'

const ACCESS_TOKEN_EXPIRE_IN = 60 * 60;

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
      require('dotenv').config({ path: '.env' });
      const JWTSECRET = process.env.JWT_SECRET;
        const { email, password } = req.query;
        const user = await prisma.user.findUnique({
            where: {
                email: String(email)
            }
        })
        const isMatch = await bcrypt.compare(password, user?.password)
        if (!isMatch) {
            // throw new error("Wrong password");
            return res.json({ error: 'Wrong password' });
          }
          const createToken = jwt.sign({ userId: user?.id }, JWTSECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRE_IN,
          });
          const accessToken = createToken;

          return res.json({accessToken: accessToken, userfinded: user});    
    } 

    // if (req.method === 'POST') {
    //   console.log('POST request received');
    //   const { userName, email, password } = req.body;
    //   const salt = bcrypt.genSaltSync();
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   const newAccount = await prisma.user.create({
    //     data: {
    //       userName,
    //       email, 
    //       password: hashedPassword
    //     },
    //   });

    //   return res.status(201).json({
    //     newAccount,
    //     message: 'Create new account succeccfully'
    //   });
    // }
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
