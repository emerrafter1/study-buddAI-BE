interface UserDevData {
    user_id: number;
    username: string;
    password: string;
    email: string;  
  }
  const usersDevData: UserDevData[] = [
    { user_id: 1, username: 'DevUser1', password: 'devpassword', email: 'dev1@example.com' },
    { user_id: 2, username: 'AnotherUser', password: 'anotherpass', email: 'user2@example.com' },
    { user_id: 3, username: 'StudyBuddy', password: 'securestudy', email: 'buddy@study.com' },
    { user_id: 4, username: 'QuizMaster', password: 'knowledge123', email: 'quiz@master.net' },
    { user_id: 5, username: 'CodeNinja', password: 'javascript4ever', email: 'ninja@code.org' }
  ];
  
  export default  usersDevData;