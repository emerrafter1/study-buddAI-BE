import db from "../connection";

interface SeedData {
  usersData: any[];
  filesData: any[];
  quizzesData: any[];
  questionsData: any[];
  questionOptionsData: any[];
  attemptAnswerData: any[];
  attemptData: any[];
}

const seed = async ({
  usersData,
  filesData,
  quizzesData,
  questionsData,
  questionOptionsData,
  attemptAnswerData,
  attemptData,
}: SeedData): Promise<void> => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  await connection.query(`DROP TABLE IF EXISTS attemptAnswer`);
  await connection.query(`DROP TABLE IF EXISTS attempt`);
  await connection.query(`DROP TABLE IF EXISTS questionOptions`);
  await connection.query(`DROP TABLE IF EXISTS questions`);
  await connection.query(`DROP TABLE IF EXISTS quizzes;`);
  await connection.query(`DROP TABLE IF EXISTS files;`);
  await connection.query(`DROP TABLE IF EXISTS users;`);

  await connection.query(`CREATE TABLE users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        email_address VARCHAR(255) UNIQUE
      );
    `);
  await connection.query(`CREATE TABLE files (
        file_id INT AUTO_INCREMENT PRIMARY KEY,
        file_pdf VARCHAR(255) NOT NULL,
        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
  await connection.query(`CREATE TABLE quizzes (
        quiz_id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(3),
        user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id),
        quiz_name VARCHAR(255) NOT NULL, 
        file_id INT NOT NULL, FOREIGN KEY (file_id) REFERENCES files(file_id)
      );
    `);
  await connection.query(`CREATE TABLE questions (
        question_id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        question_body VARCHAR(255)
      );
    `);
  await connection.query(`CREATE TABLE questionOptions (
        question_options_id INT AUTO_INCREMENT PRIMARY KEY,
        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),
        option_body VARCHAR(255) NOT NULL,
        is_correct BOOLEAN NOT NULL,
        label VARCHAR(255) NOT NULL
      );
    `);
  await connection.query(`CREATE TABLE attempt (
        attempt_id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT NOT NULL, FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
        score DECIMAL(2,2) DEFAULT 0 
      );
    `);

  //0 total digits can’t hold 2 decimal digits.
  await connection.query(`CREATE TABLE attemptAnswer (
        attempt_answer_id INT AUTO_INCREMENT PRIMARY KEY,
        question_options_id INT NOT NULL, FOREIGN KEY (question_options_id) REFERENCES questionOptions(question_options_id),
        question_id INT NOT NULL, FOREIGN KEY (question_id) REFERENCES questions(question_id),
        attempt_id INT NOT NULL, FOREIGN KEY (attempt_id) REFERENCES attempt(attempt_id)
      );
    `);

    for (const user of usersData) {
      await connection.execute(
        `INSERT INTO users (username, password, email_address) VALUES (?, ?, ?)`,
        [user.username, user.password, user.email]
      );
    }

    for (const file of filesData) {
      await connection.execute(
        `INSERT INTO files (file_pdf, user_id) VALUES (?, ?)`,
        [file.file_path, file.user_id]
      );
    }

    for (const quiz of quizzesData) {
      const date = new Date(quiz.created_at);
      await connection.execute(
        `INSERT INTO quizzes (created_at, user_id , quiz_name, file_id) VALUES (?, ?, ?, ?)`,
        [date, quiz.user_id, quiz.quiz_name, quiz.file_id]
      );
    }

    for (const questions of questionsData) {
      await connection.execute(
        `INSERT INTO questions (quiz_id, question_body) VALUES (?, ?)`,
        [questions.quiz_id, questions.question_text]
      );
    }


};

export default seed;
