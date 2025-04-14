import db from "../db/connection";
import { RowDataPacket } from "mysql2";

import seed from "../db/seeds/seed";
import data from "../db/data/test-data/index";

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
  describe("users table", () => {
    test("users table exists", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
            SELECT *
            FROM information_schema.tables 
            WHERE table_name = 'users'
          ) `
        )
        .then(([rows]) => {
          const exists = (rows[0] as { exists: number }).exists;
          expect(exists).toBe(1);
        });
    });

    test("users table has user_id column as the primary key", () => {
      return db
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
    test("files table exists", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE table_name = 'files'
          );`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("files table has file_id column as the primary key", () => {
      return db
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
          .query<RowDataPacket[]>(
            `SELECT EXISTS (
          SELECT * 
          FROM information_schema.tables 
          WHERE  table_name = 'quizzes'
      ) `
          )
          .then(([rows]) => {
            expect(rows[0].exists).toBe(1);
          });
      });

      test("quizzes table has quiz_id column as the auto increment primary key", () => {
        return db
          .query<RowDataPacket[]>(
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
          .query<RowDataPacket[]>(
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
          .query<RowDataPacket[]>(
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
          .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE  table_name = 'questions'
        ) `
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("questions table has question_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE  table_name = 'questionOptions'
        ) ;`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("questionOptions table has question_options_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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
        .query<RowDataPacket[]>(
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

  describe("attempt table", () => {
    test("questionOptions table exists", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE  table_name = 'attempt'
        ) ;`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("attempt table has attempt_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, extra
                            FROM information_schema.table_constraints AS tc
                            JOIN information_schema.key_column_usage AS kcu
                            ON tc.constraint_name = kcu.constraint_name
                            WHERE tc.constraint_type = 'PRIMARY KEY'
                            AND tc.table_name = 'attempt';`
        )
        .then(([rows]) => {
          expect(rows[0]).toBe("attempt_id");
          expect(rows[0].extra).toBe("auto_increment");
        });
    });

    test("attempt table has quiz_id column as type integer", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'attempt'
                                AND column_name = 'quiz_id';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("quiz_id");
          expect(column.data_type).toBe("integer");
        });
    });

    test("attempt table has quiz_id column as type integer", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'attempt'
                                AND column_name = 'score';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("score");
          expect(column.data_type).toBe("integer");
        });
    });
  });

  describe("attemptAnswer table", () => {
    test("attemptAnswer table exists", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE  table_name = 'attemptAnswer'
        )`
        )
        .then(([rows]) => {
          expect(rows[0].exists).toBe(1);
        });
    });

    test("attemptAnswer table has attempt_answer_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, extra
                            FROM information_schema.table_constraints AS tc
                            JOIN information_schema.key_column_usage AS kcu
                            ON tc.constraint_name = kcu.constraint_name
                            WHERE tc.constraint_type = 'PRIMARY KEY'
                            AND tc.table_name = 'attemptAnswer';`
        )
        .then(([rows]) => {
          expect(rows[0]).toBe("attempt_answer_id");
          expect(rows[0].extra).toBe("auto_increment");
        });
    });

    test("attemptAnswer table has question_id column as type integer", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'attemptAnswer'
                                AND column_name = 'question_id';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("question_id");
          expect(column.data_type).toBe("integer");
        });
    });

    test("attemptAnswer table has quiz_id column as type integer", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'attempt_id'
                                AND column_name = 'score';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.column_name).toBe("attempt_id");
          expect(column.data_type).toBe("integer");
        });
    });
  });
});
