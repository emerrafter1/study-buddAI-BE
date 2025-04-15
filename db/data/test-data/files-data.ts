interface FilesTestDataItem {
  file_path: string;
  user_id: number;
}

const filesTestData: FilesTestDataItem[] = [
  { file_path: "/pdfs/science101.pdf", user_id: 1 },
  { file_path: "/pdfs/history_rome.pdf", user_id: 2 },
  { file_path: "/pdfs/math_challenge.pdf", user_id: 1 },
  { file_path: "/pdfs/literature_survey.pdf", user_id: 3 },
];

export default filesTestData;
