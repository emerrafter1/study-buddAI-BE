import db from './connection';

interface SeedData {
    usersData: any[];  
    filesData: any[];
    quizzesData: any[];
    questionsData: any[];
    questionOptionsData: any[];
    attemptAnswerData: any[];
    attemptData: any[];
  }

  const seed = async ({usersData, filesData, quizzesData, questionsData, questionOptionsData, attemptAnswerData,attemptData}: SeedData): Promise<void> => {
      const connection = await db.getConnection();
      await connection.beginTransaction();
      await connection.query(`DROP TABLE IF EXISTS attempt`);
      await connection.query(`DROP TABLE IF EXISTS attemptAnswer`);
      await connection.query(`DROP TABLE IF EXISTS questionOptions`);
      await connection.query(`DROP TABLE IF EXISTS questions`);
      await connection.query(`DROP TABLE IF EXISTS quizzes;`);
      await connection.query(`DROP TABLE IF EXISTS files;`);
      await connection.query(`DROP TABLE IF EXISTS users;`);
      
      await connection.query(`CREATE TABLE users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        password VARCHAR,
        email_address VARCHAR UNIQUE
      );
    `);
    await connection.query(`CREATE TABLE files (
        file_id INT AUTO_INCREMENT PRIMARY KEY,
        file_pdf VARCHAR NOT NULL,
        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    await connection.query(`CREATE TABLE quizzes (
        quiz_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id),
        quiz_name VARCHAR NOT NULL, 
        file_id INT NOT NULL, FOREIGN KEY (file_id) REFERENCES files(file_id)
      );
    `);
    await connection.query(`CREATE TABLE questions (
        question_id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        question_body VARCHAR
      );
    `);
    await connection.query(`CREATE TABLE questionOptions (
        question_options_id INT AUTO_INCREMENT PRIMARY KEY,
        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),
        option_body VARCHAR NOT NULL,
        is_correct BOOLEAN NOT NULL,
        label VARCHAR NOT NULL
      );
    `);
    await connection.query(`CREATE TABLE attempt (
        attempt_id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        score DECIMAL(0,2) DEFAULT 0 
      );
    `);
    await connection.query(`CREATE TABLE attemptAnswer (
        attempt_answer_id INT AUTO_INCREMENT PRIMARY KEY,
        question_options_id INT NOT NULL, FOREIGN KEY (question_options_id) REFERENCES questionOptions(question_options_id),
        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),
        attempt_id INT NOT NULL, FOREIGN KEY (attempt_id) REFERENCES attempt(attempt_id)
      );
    `);
      
  }