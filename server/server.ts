/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { ClientError, errorMiddleware } from './lib/index.js';

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
    const result = await db.query(
      `SELECT users_id, username, email, hashpassword FROM users WHERE email=$1`,
      [email]
    );
    const userData = result.rows[0];
    res.status(200).json(userData);
  } catch (error: unknown) {
    next(error);
  }
});

app.delete('/api/deleteusers', async (req, res) => {
  await db.query('DELETE FROM users');
  res.status(200).json({ message: 'Deleted all users' });
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
