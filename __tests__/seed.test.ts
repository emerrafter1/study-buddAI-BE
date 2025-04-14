import db from "../db/connection";

// const seed = require("../db/seeds/seed");
// const data = require("../db/data/test-data/index");

// beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
  describe("users table", () => {
    test.only("users table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE table_name = 'users'
          ) AS exists;`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("users table has user_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name, extra
                          FROM information_schema.table_constraints AS tc
                          JOIN information_schema.key_column_usage AS kcu
                          ON tc.constraint_name = kcu.constraint_name
                          WHERE tc.constraint_type = 'PRIMARY KEY'
                          AND tc.table_name = 'users';`
        )
        .then(([rows]) => {
          expect(rows[0]).toBe("user_id");
          expect(rows[0].extra).toBe("auto_increment");
        });
    });

    test("users table has password column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
                              FROM information_schema.columns
                              WHERE table_name = 'users'
                              AND column_name = 'password';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("password");
          expect(column.data_type).toBe("varchar");
        });
    });

    test("users table has a unique email column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'users'
                                AND column_name = 'email';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("email");
          expect(column.data_type).toBe("varchar");
        });
    });

    test("users table has an email column that is unique", () => {
      return db
        .query(
          `SELECT column_name
                        FROM information_schema.table_constraints AS tc
                        JOIN information_schema.key_column_usage AS kcu
                        ON tc.constraint_name = kcu.constraint_name
                        WHERE tc.constraint_type = 'UNIQUE'
                        AND tc.table_name = 'users';`
        )
        .then(([rows]) => {
          expect(rows[0]).toBe("email");
        });
    });
  });

  describe("files table", () => {
    test.only("files table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE table_name = 'files'
          ) AS exists;`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("files table has file_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name, extra
                          FROM information_schema.table_constraints AS tc
                          JOIN information_schema.key_column_usage AS kcu
                          ON tc.constraint_name = kcu.constraint_name
                          WHERE tc.constraint_type = 'PRIMARY KEY'
                          AND tc.table_name = 'files';`
        )
        .then(([rows]) => {
          expect(rows[0]).toBe("file_id");
          expect(rows[0].extra).toBe("auto_increment");
        });
    });

    test("files table has file_pdf column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
                              FROM information_schema.columns
                              WHERE table_name = 'files'
                              AND column_name = 'file_pdf';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("file_pdf");
          expect(column.data_type).toBe("varchar");
        });
    });

    test("files table has a unique user_id column as integer", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'files'
                                AND column_name = 'user_id';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("user_id");
          expect(column.data_type).toBe("integer");
        });
    });
  });

  describe("quizzes", () => {
    describe("quizzes table", () => {
      test("quizzes table exists", () => {
        return db
          .query(
            `SELECT EXISTS (
          SELECT * 
          FROM information_schema.tables 
          WHERE  table_name = 'quizzes'
      ) AS exists;`
          )
          .then(([rows]) => {
            expect(rows[0].exists).toBe(1);
          });
      });

      test("quizzes table has quiz_id column as the auto increment primary key", () => {
        return db
          .query(
            `SELECT column_name, extra
                          FROM information_schema.table_constraints AS tc
                          JOIN information_schema.key_column_usage AS kcu
                          ON tc.constraint_name = kcu.constraint_name
                          WHERE tc.constraint_type = 'PRIMARY KEY'
                          AND tc.table_name = 'quizzes';`
          )
          .then(([rows]) => {
            expect(rows[0]).toBe("quiz_id");
            expect(rows[0].extra).toBe("auto_increment");
          });
      });

      // quizzes table has a reference column to user_id

      test("quiz table has password column as varying character", () => {
        return db
          .query(
            `SELECT column_name, data_type
                              FROM information_schema.columns
                              WHERE table_name = 'users'
                              AND column_name = 'password';`
          )
          .then(([rows]) => {
            const column = rows[0];
            expect(column.column_name).toBe("password");
            expect(column.data_type).toBe("varchar");
          });
      });

      test("users table has a unique email column as varying character", () => {
        return db
          .query(
            `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'users'
                                AND column_name = 'email';`
          )
          .then(([rows]) => {
            const column = rows[0];
            expect(column.column_name).toBe("email");
            expect(column.data_type).toBe("varchar");
          });
      });

      test("users table has an email column that is unique", () => {
        return db
          .query(
            `SELECT column_name
                        FROM information_schema.table_constraints AS tc
                        JOIN information_schema.key_column_usage AS kcu
                        ON tc.constraint_name = kcu.constraint_name
                        WHERE tc.constraint_type = 'UNIQUE'
                        AND tc.table_name = 'users';`
          )
          .then(([rows]) => {
            expect(rows[0]).toBe("email");
          });
      });
    });
  });

  describe("questions table", () => {
    test("questions table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE  table_name = 'questions'
        ) AS exists;`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("questions table has question_id column as the auto increment primary key", () => {
      return db
        .query(
          `SELECT column_name, extra
                            FROM information_schema.table_constraints AS tc
                            JOIN information_schema.key_column_usage AS kcu
                            ON tc.constraint_name = kcu.constraint_name
                            WHERE tc.constraint_type = 'PRIMARY KEY'
                            AND tc.table_name = 'questions';`
        )
        .then(([rows]) => {
          expect(rows[0]).toBe("question_id");
          expect(rows[0].extra).toBe("auto_increment");
        });
    });

    test("questions table has quiz_id column as type integer", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'questions'
                                AND column_name = 'quiz_id';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("quiz_id");
          expect(column.data_type).toBe("integer");
        });
    });

    test("questions table has a question_body column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                  FROM information_schema.columns
                                  WHERE table_name = 'quizzes'
                                  AND column_name = 'question_body';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("question_body");
          expect(column.data_type).toBe("varchar");
        });
    });
  });

  describe("questionsOptions table", () => {
    test("questionOptions table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE  table_name = 'questionOptions'
        ) AS exists;`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("questionOptions table has question_options_id column as the auto increment primary key", () => {
      return db
        .query(
          `SELECT column_name, extra
                            FROM information_schema.table_constraints AS tc
                            JOIN information_schema.key_column_usage AS kcu
                            ON tc.constraint_name = kcu.constraint_name
                            WHERE tc.constraint_type = 'PRIMARY KEY'
                            AND tc.table_name = 'questionOptions';`
        )
        .then(([rows]) => {
          expect(rows[0]).toBe("question_options_id");
          expect(rows[0].extra).toBe("auto_increment");
        });
    });

    test("questionOptions table has question_id column as type integer", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'questions'
                                AND column_name = 'question_id';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("question_id");
          expect(column.data_type).toBe("integer");
        });
    });

    test("questionOptions table has a option_body column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                  FROM information_schema.columns
                                  WHERE table_name = 'questionOptions'
                                  AND column_name = 'option_body';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("option_body");
          expect(column.data_type).toBe("varchar");
        });
    });

    test("questionOptions table has a is_correct column as boolean", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                  FROM information_schema.columns
                                  WHERE table_name = 'questionOptions'
                                  AND column_name = 'is_correct';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("is_correct");
          expect(column.data_type).toBe("boolean");
        });
    });

    test("questionOptions table has a label column as varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
                                  FROM information_schema.columns
                                  WHERE table_name = 'questionOptions'
                                  AND column_name = 'option_body';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("option_body");
          expect(column.data_type).toBe("label");
        });
    });
  });
});
