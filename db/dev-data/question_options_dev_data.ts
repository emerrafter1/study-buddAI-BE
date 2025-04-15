interface QuestionOptionsDevDataItem {
    
    question_id: number;
    option_body: string;
    is_correct: boolean;
    label: string;
  }
  const questionOptionsDevData: QuestionOptionsDevDataItem[] = [
    {  question_id: 1, option_body: 'H2O', is_correct: true, label: 'A' },
    {  question_id: 1, option_body: 'CO2', is_correct: false, label: 'B' },
    {  question_id: 1, option_body: 'NaCl', is_correct: false, label: 'C' },
    {  question_id: 1, option_body: 'O2', is_correct: false, label: 'D' },
    {  question_id: 2, option_body: 'Eight', is_correct: true, label: 'A' },
    {  question_id: 2, option_body: 'Nine', is_correct: false, label: 'B' },
    {  question_id: 2, option_body: 'Seven', is_correct: false, label: 'C' },
    {  question_id: 2, option_body: 'Ten', is_correct: false, label: 'D' },
    {  question_id: 3, option_body: 'Julius Caesar', is_correct: false, label: 'A' },
    {  question_id: 3, option_body: 'Augustus', is_correct: true, label: 'B' },
    {  question_id: 3, option_body: 'Nero', is_correct: false, label: 'C' },
    {  question_id: 3, option_body: 'Constantine', is_correct: false, label: 'D' },
    {  question_id: 4, option_body: '3', is_correct: false, label: 'A' },
    {  question_id: 4, option_body: '4', is_correct: true, label: 'B' },
    {  question_id: 4, option_body: '5', is_correct: false, label: 'C' },
    {  question_id: 4, option_body: '6', is_correct: false, label: 'D' },
    {  question_id: 5, option_body: 'A function that remembers variables from its outer scope.', is_correct: true, label: 'A' },
    {  question_id: 5, option_body: 'A way to hide variables within a class.', is_correct: false, label: 'B' },
    {  question_id: 5, option_body: 'A loop that iterates over object properties.', is_correct: false, label: 'C' },
    {  question_id: 5, option_body: 'A special type of array.', is_correct: false, label: 'D' },
    {  question_id: 6, option_body: 'It refers to the global object.', is_correct: false, label: 'A' },
    {  question_id: 6, option_body: 'It refers to the object that is currently calling the function.', is_correct: true, label: 'B' },
    {  question_id: 6, option_body: 'It refers to the function itself.', is_correct: false, label: 'C' },
    {  question_id: 6, option_body: 'It is always undefined in strict mode.', is_correct: false, label: 'D' }
  ];
    
  export default questionOptionsDevData;