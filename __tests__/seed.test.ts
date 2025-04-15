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
          ) AS doesExist`
        )
        .then(([rows]) => {
          const doesExist = (rows[0] as { doesExist: number }).doesExist;
          expect(doesExist).toBe(1);
        });
    });

    test("users table has user_id column as the primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT kcu.column_name
       FROM information_schema.table_constraints AS tc
       JOIN information_schema.key_column_usage AS kcu
         ON tc.constraint_name = kcu.constraint_name
         AND tc.table_name = kcu.table_name
         AND tc.table_schema = kcu.table_schema
       WHERE tc.constraint_type = 'PRIMARY KEY'
         AND tc.table_name = 'users'
         AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          const column = rows[0]?.COLUMN_NAME;
          expect(column).toBe("user_id");
        });
    });

    test("users table has user_id column as auto increment", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name FROM information_schema.columns WHERE  table_name = 'users' AND extra = 'auto_increment';`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("user_id");
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
          expect(column.COLUMN_NAME).toBe("password");
          expect(column.DATA_TYPE).toBe("varchar");
        });
    });

    test("users table has a unique email column as varying character", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'users'
                                AND column_name = 'email_address';`
        )
        .then(([rows]) => {
          const column = rows[0];

          expect(column.COLUMN_NAME).toBe("email_address");
          expect(column.DATA_TYPE).toBe("varchar");
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
                        AND tc.table_name = 'users'
                        AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("email_address");
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
          ) as doesExist;`
        )
        .then(([rows]) => {
          const doesExist = (rows[0] as { doesExist: number }).doesExist;
          expect(doesExist).toBe(1);
        });
    });

    test("files table has file_id column as the primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT kcu.column_name
       FROM information_schema.table_constraints AS tc
       JOIN information_schema.key_column_usage AS kcu
         ON tc.constraint_name = kcu.constraint_name
         AND tc.table_name = kcu.table_name
         AND tc.table_schema = kcu.table_schema
       WHERE tc.constraint_type = 'PRIMARY KEY'
         AND tc.table_name = 'files'
         AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("file_id");
        });
    });

    test("files table has file_id column as auto increment", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name FROM information_schema.columns WHERE  table_name = 'files' AND extra = 'auto_increment';`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("file_id");
        });
    });

    test("files table has file_pdf column as varying character", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                              FROM information_schema.columns
                              WHERE table_name = 'files'
                              AND column_name = 'file_text';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.COLUMN_NAME).toBe("file_text");
          expect(column.DATA_TYPE).toBe("longtext");
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
          expect(column.COLUMN_NAME).toBe("user_id");
          expect(column.DATA_TYPE).toBe("int");
        });
    });
  });

  describe("quizzes table", () => {
    test("quizzes table exists", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
          SELECT * 
          FROM information_schema.tables 
          WHERE  table_name = 'quizzes'
      ) AS doesExist `
        )
        .then(([rows]) => {
          const doesExist = (rows[0] as { doesExist: number }).doesExist;
          expect(doesExist).toBe(1);
        });
    });

    test("quizzes table has quiz_id column as the  primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT kcu.column_name
       FROM information_schema.table_constraints AS tc
       JOIN information_schema.key_column_usage AS kcu
         ON tc.constraint_name = kcu.constraint_name
         AND tc.table_name = kcu.table_name
         AND tc.table_schema = kcu.table_schema
       WHERE tc.constraint_type = 'PRIMARY KEY'
         AND tc.table_name = 'quizzes'
         AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("quiz_id");
        });
    });

    test("quizzes table has user_id column as auto increment", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name FROM information_schema.columns WHERE  table_name = 'quizzes' AND extra = 'auto_increment';`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("quiz_id");
        });
    });

    // quizzes table has a reference column to user_id

    test("quizzes table has quiz_name as varying character", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                              FROM information_schema.columns
                              WHERE table_name = 'quizzes'
                              AND column_name = 'quiz_name';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.COLUMN_NAME).toBe("quiz_name");
          expect(column.DATA_TYPE).toBe("varchar");
        });
    });

    test("quizzes table has a created_at column column as an int", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'quizzes'
                                AND column_name = 'created_at';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.COLUMN_NAME).toBe("created_at");
          expect(column.DATA_TYPE).toBe("timestamp");
        });
    });

    test("quizzes table has a file_id column as an int", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'quizzes'
                                AND column_name = 'file_id';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.COLUMN_NAME).toBe("file_id");
          expect(column.DATA_TYPE).toBe("int");
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
        ) AS doesExist `
        )
        .then(([rows]) => {
          const doesExist = (rows[0] as { doesExist: number }).doesExist;
          expect(doesExist).toBe(1);
        });
    });

    test("questions table has question_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT kcu.column_name
       FROM information_schema.table_constraints AS tc
       JOIN information_schema.key_column_usage AS kcu
         ON tc.constraint_name = kcu.constraint_name
         AND tc.table_name = kcu.table_name
         AND tc.table_schema = kcu.table_schema
       WHERE tc.constraint_type = 'PRIMARY KEY'
         AND tc.table_name = 'questions'
         AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("question_id");
        });
    });

    test("questions table has question_id column as auto increment", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name FROM information_schema.columns WHERE  table_name = 'questions' AND extra = 'auto_increment';`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("question_id");
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
          expect(column.COLUMN_NAME).toBe("quiz_id");
          expect(column.DATA_TYPE).toBe("int");
        });
    });

    test("questions table has a question_body column as varying character", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                  FROM information_schema.columns
                                  WHERE table_name = 'questions'
                                  AND column_name = 'question_body';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.COLUMN_NAME).toBe("question_body");
          expect(column.DATA_TYPE).toBe("longtext");
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
        ) AS doesExist;`
        )
        .then(([rows]) => {
          const doesExist = (rows[0] as { doesExist: number }).doesExist;
          expect(doesExist).toBe(1);
        });
    });

    test("questionOptions table has question_options_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT kcu.column_name
       FROM information_schema.table_constraints AS tc
       JOIN information_schema.key_column_usage AS kcu
         ON tc.constraint_name = kcu.constraint_name
         AND tc.table_name = kcu.table_name
         AND tc.table_schema = kcu.table_schema
       WHERE tc.constraint_type = 'PRIMARY KEY'
         AND tc.table_name = 'questionOptions'
         AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          const column = rows[0]?.COLUMN_NAME;
          expect(column).toBe("question_options_id");
        });
    });

    test("questionOptions table has question_options_id column as auto increment", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name FROM information_schema.columns WHERE  table_name = 'questionOptions' AND extra = 'auto_increment';`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("question_options_id");
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
          expect(column.COLUMN_NAME).toBe("question_id");
          expect(column.DATA_TYPE).toBe("int");
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
          expect(column.COLUMN_NAME).toBe("option_body");
          expect(column.DATA_TYPE).toBe("longtext");
        });
    });

    // check why this is tiny int because 1 0
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
          expect(column.COLUMN_NAME).toBe("is_correct");
          expect(column.DATA_TYPE).toBe("tinyint");
        });
    });

    test("questionOptions table has a label column as varying character", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                  FROM information_schema.columns
                                  WHERE table_name = 'questionOptions'
                                  AND column_name = 'label';`
        )
        .then(([rows]) => {
          const column = rows[0];
          expect(column.COLUMN_NAME).toBe("label");
          expect(column.DATA_TYPE).toBe("varchar");
        });
    });
  });

  describe("attempt table", () => {
    test("attempt table exists", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT EXISTS (
            SELECT * 
            FROM information_schema.tables 
            WHERE  table_name = 'attempt'
        ) as doesExist;`
        )
        .then(([rows]) => {
          const doesExist = (rows[0] as { doesExist: number }).doesExist;
          expect(doesExist).toBe(1);
        });
    });

    test("attempt table has attempt_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT kcu.column_name
          FROM information_schema.table_constraints AS tc
          JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_name = kcu.table_name
            AND tc.table_schema = kcu.table_schema
          WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'attempt'
            AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("attempt_id");
        });
    });

    test("attempt table has attempt_id column as auto increment", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name FROM information_schema.columns WHERE  table_name = 'attempt' AND extra = 'auto_increment';`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("attempt_id");
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
          expect(column.COLUMN_NAME).toBe("quiz_id");
          expect(column.DATA_TYPE).toBe("int");
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
          expect(column.COLUMN_NAME).toBe("score");
          expect(column.DATA_TYPE).toBe("decimal");
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
        ) as doesExist`
        )
        .then(([rows]) => {
          const doesExist = (rows[0] as { doesExist: number }).doesExist;
          expect(doesExist).toBe(1);
        });
    });

    test("attemptAnswer table has attempt_answer_id column as the auto increment primary key", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT kcu.column_name
       FROM information_schema.table_constraints AS tc
       JOIN information_schema.key_column_usage AS kcu
         ON tc.constraint_name = kcu.constraint_name
         AND tc.table_name = kcu.table_name
         AND tc.table_schema = kcu.table_schema
       WHERE tc.constraint_type = 'PRIMARY KEY'
         AND tc.table_name = 'attemptAnswer'
         AND tc.table_schema = DATABASE();`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("attempt_answer_id");
        });
    });

    test("attemptAnswer table has user_id column as auto increment", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name FROM information_schema.columns WHERE  table_name = 'attemptAnswer' AND extra = 'auto_increment';`
        )
        .then(([rows]) => {
          expect(rows[0].COLUMN_NAME).toBe("attempt_answer_id");
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
          expect(column.COLUMN_NAME).toBe("question_id");
          expect(column.DATA_TYPE).toBe("int");
        });
    });

    test("attemptAnswer table has attempt_id column as type integer", () => {
      return db
        .query<RowDataPacket[]>(
          `SELECT column_name, data_type
                                FROM information_schema.columns
                                WHERE table_name = 'attemptAnswer'
                                AND column_name = 'attempt_id';`
        )
        .then(([rows]) => {
          const column = rows[0];

          expect(column.COLUMN_NAME).toBe("attempt_id");
          expect(column.DATA_TYPE).toBe("int");
        });
    });
  });
});

describe("data insertion", () => {
  test("users data has been inserted correctly", () => {
    return db.query<RowDataPacket[]>(`SELECT * FROM users;`).then(([users]) => {
      expect(users).toHaveLength(5);
      users.forEach((user) => {
        expect(user).toHaveProperty("user_id");
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("email_address");
      });
    });
  });

  test("files data has been inserted correctly", () => {
    return db.query<RowDataPacket[]>(`SELECT * FROM files;`).then(([files]) => {
      expect(files).toHaveLength(4);
      files.forEach((file) => {
        expect(file).toHaveProperty("file_id");
        expect(file).toHaveProperty("file_text");
        expect(file).toHaveProperty("user_id");
      });
    });
  });

  test("quizzes data has been inserted correctly", () => {
    return db
      .query<RowDataPacket[]>(`SELECT * FROM quizzes;`)
      .then(([quizzes]) => {
        expect(quizzes).toHaveLength(4);
        quizzes.forEach((quiz) => {
          expect(quiz).toHaveProperty("quiz_id");
          expect(quiz).toHaveProperty("user_id");
          expect(quiz).toHaveProperty("quiz_name");
          expect(quiz).toHaveProperty("file_id");
        });
      });
  });

  test("questions data has been inserted correctly", () => {
    return db
      .query<RowDataPacket[]>(`SELECT * FROM questions;`)
      .then(([questions]) => {
        expect(questions).toHaveLength(4);
        questions.forEach((question) => {
          expect(question).toHaveProperty("question_id");
          expect(question).toHaveProperty("quiz_id");
          expect(question).toHaveProperty("question_body");
        });
      });
  });

  test("questionOptions data has been inserted correctly", () => {
    return db
      .query<RowDataPacket[]>(`SELECT * FROM questionOptions;`)
      .then(([questionOptions]) => {
        expect(questionOptions).toHaveLength(16);
        questionOptions.forEach((questionOption) => {
          expect(questionOption).toHaveProperty("question_options_id");
          expect(questionOption).toHaveProperty("question_id");
          expect(questionOption).toHaveProperty("option_body");
          expect(questionOption).toHaveProperty("is_correct");
          expect(questionOption).toHaveProperty("label");
        });
      });
  });

  test("attempt data has been inserted correctly", () => {
    return db
      .query<RowDataPacket[]>(`SELECT * FROM attempt;`)
      .then(([attempts]) => {
        console.log(attempts);
        expect(attempts).toHaveLength(4);
        attempts.forEach((attempt) => {
          expect(attempt).toHaveProperty("attempt_id");
          expect(attempt).toHaveProperty("quiz_id");
          expect(attempt).toHaveProperty("score");
        });
      });
  });

  test("attemptAnswer data has been inserted correctly", () => {
    return db
      .query<RowDataPacket[]>(`SELECT * FROM attemptAnswer;`)
      .then(([attemptAnswers]) => {
        expect(attemptAnswers).toHaveLength(4);
        attemptAnswers.forEach((attemptAnswer) => {
          expect(attemptAnswer).toHaveProperty("attempt_answer_id");
          expect(attemptAnswer).toHaveProperty("question_options_id");
          expect(attemptAnswer).toHaveProperty("question_id");
          expect(attemptAnswer).toHaveProperty("attempt_id");
        });
      });
  });
});
