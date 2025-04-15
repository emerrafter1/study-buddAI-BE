interface QuestionsDevDataItem {
    question_id: number;
    quiz_id: number;
    question_text: string;
  }
  const questionsDevData: QuestionsDevDataItem[] = [
    { question_id: 1, quiz_id: 1, question_text: 'What is the chemical symbol for water?' },
    { question_id: 2, quiz_id: 1, question_text: 'How many planets are in our solar system?' },
    { question_id: 3, quiz_id: 2, question_text: 'Who was the first Roman Emperor?' },
    { question_id: 4, quiz_id: 3, question_text: 'What is 2 + 2?' },
    { question_id: 5, quiz_id: 5, question_text: 'What is a closure in JavaScript?' },
    { question_id: 6, quiz_id: 5, question_text: 'Explain the concept of "this" in JavaScript.' }
    
  ];
  export default  questionsDevData;