import pdf from 'pdf-parse';

const extractTextFromPdf = async (buffer: Buffer) => {
  try {

    const data = await pdf(buffer);
    return { text: data.text };
  } catch (err) {
    console.error("PDF Parse Error:")
  
    throw new Error(`PDF processing failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
};

export default extractTextFromPdf