/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import type { RequestHandler } from 'express';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';
import { nextTick } from 'process';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());
app.use(cookieParser() as unknown as RequestHandler);

app.use(
  '/api',
  cors({
    origin: ['http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/api/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newData = await db.query(
      'INSERT INTO users (username, email, hashpassword) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    res.status(200).json(newData);
  } catch (error: unknown) {
    next(error);
  }
});

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await db.query(
      `SELECT users_id, username, email, hashpassword FROM users WHERE email=$1`,
      [email]
    );

    if (userData.rows.length === 0) {
      res.status(200).json('user data doesnt exist');
    } else {
      const [user] = userData.rows;
      // const { userId, username, email } = user;
      const userId = user.users_id;

      const payload = { userId };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      res
        .status(200)
        .cookie('refresh_token', refreshToken, {
          secure: true,
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
        })
        .json({ accessToken });
      // res.status(200).json({ users_id, username, email });
    }

    res.status(200).json(userData);
  } catch (error: unknown) {
    next(error);
  }
});

function generateAccessToken(payload: { userId: number }): string {
  return jwt.sign(payload, process.env.ACCESS_TOKEN as string, {
    expiresIn: '15m',
  });
}

function generateRefreshToken(payload: { userId: number }): string {
  return jwt.sign(payload, process.env.REFRESH_TOKEN as string, {
    expiresIn: '7d',
  });
}

// app.delete('/api/deleteusers', async (req, res) => {
//   await db.query('DELETE FROM users');
//   res.status(200).json({ message: 'Deleted all users' });
// });

app.get('/api/users/username', authMiddleware, async (req, res, next) => {
  try {
    console.log('req.user: ', req.user);
    const result = await db.query(
      `SELECT username FROM users WHERE users_id=$1`,
      [req.user?.userId]
    );
    res.status(200).json(result.rows[0].username);
  } catch (error: unknown) {
    next(error);
  }
});

// *****************new access token from refresh token*********************
app.post('/api/users/refresh', (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      throw new ClientError(401, 'refresh token not found');
    }

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN as string,
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err || !decoded || typeof decoded === 'string') {
          return next(new ClientError(403, 'invalid or expired refresh token'));
        }

        const { userId } = decoded as { userId: number };

        const payload = { userId };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res
          .status(200)
          .cookie('refresh_token', refreshToken, {
            secure: true,
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
          })
          .json({ accessToken });
      }
    );
  } catch (error: unknown) {
    next(error);
  }
});

app.delete('/api/users/logout', (req, res, next) => {
  try {
    res.clearCookie('refresh_token', {
      secure: true,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
    res.status(200).json('token deleted.');
  } catch (error: unknown) {
    next(error);
  }
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
