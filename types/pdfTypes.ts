export interface PDFDocument {
    fileId?: number;
    file_text: string;

  }
  
export type PDFDocumentResponse = PDFDocument & {
    textPreview?: string;
  };

  export type CreatePDFDocument = Omit<PDFDocument, 'id'|'createdAt'>;
