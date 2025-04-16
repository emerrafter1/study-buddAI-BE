import pdf from 'pdf-parse';

const extractTextFromPdf = async (buffer: Buffer) => {
  try {

    if (!buffer || buffer.length < 8) {
      throw new Error('File too small to be a valid PDF');
    }

    const header = buffer.toString('utf8', 0, 8);
    if (!header.includes('%PDF')) {
      throw new Error(`Not a PDF file. Starts with: ${header.substring(0, 20)}`);
    }
    const data = await pdf(buffer);
    return { text: data.text };
  } catch (err) {
    console.error("PDF Parse Error:", {
      error: err,
      bufferStart: buffer?.subarray(0, 8).toString('hex')
    });
    throw new Error(`PDF processing failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
};

export default extractTextFromPdf