import db from '../db/connection';

afterAll(() => db.end());

describe('Database Connection', () => {
  test('should connect to the database successfully', async () => {
    const [rows] = await db.query('SELECT 1+1 AS result');
    expect(rows).toBeDefined();
  });

  
});