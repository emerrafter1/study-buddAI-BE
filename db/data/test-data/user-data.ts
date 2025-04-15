interface UserTestData {

    username: string;
    password: string;
    email: string;  
  }
  const usersTestData: UserTestData[] = [
    {  username: 'TestUser1', password: 'testpassword', email: 'test1@example.com' },
    { username: 'AnotherUser', password: 'anotherpass', email: 'user2@example.com' },
    {  username: 'StudyBuddy', password: 'securestudy', email: 'buddy@study.com' },
    {  username: 'QuizMaster', password: 'knowledge123', email: 'quiz@master.net' },
    { username: 'CodeNinja', password: 'javascript4ever', email: 'ninja@code.org' }
  ];
  
  export default  usersTestData; 