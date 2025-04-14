interface FilesTestDataItem {
    file_id: number;
    file_path: string;
    user_id: number;
  }
  
  const filesTestData: FilesTestDataItem[] = [
    { file_id: 101, file_path: '/pdfs/science101.pdf', user_id: 1 },
    { file_id: 102, file_path: '/pdfs/history_rome.pdf', user_id: 2 },
    { file_id: 103, file_path: '/pdfs/math_challenge.pdf', user_id: 1 },
    { file_id: 104, file_path: '/pdfs/literature_survey.pdf', user_id: 3 }
  ];
    
    module.exports = filesTestData;