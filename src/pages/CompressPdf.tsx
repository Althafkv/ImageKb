import { useState, useCallback } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { formatFileSize } from '@/lib/imageProcessing';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdf.js worker using installed version
import { version as pdfjsVersion } from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.mjs`;

async function renderPageToJpeg(
  pdfDoc: pdfjsLib.PDFDocumentProxy,
  pageNum: number,
  quality: number,
  scaleFactor: number
): Promise<{ jpeg: Uint8Array; width: number; height: number }> {
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: scaleFactor });

  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext('2d')!;

  await page.render({ canvasContext: ctx, viewport }).promise;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error('Failed to render page'));
        blob.arrayBuffer().then((buf) => {
          resolve({
            jpeg: new Uint8Array(buf),
            width: viewport.width,
            height: viewport.height,
          });
        });
      },
      'image/jpeg',
      quality / 100
    );
  });
}

async function compressPdfFile(
  fileBuffer: ArrayBuffer,
  quality: number,
  onProgress?: (page: number, total: number) => void
): Promise<Uint8Array> {
  // Load the PDF with pdf.js for rendering
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
  const srcPdf = await loadingTask.promise;
  const numPages = srcPdf.numPages;

  // Determine scale based on quality
  // Higher quality = higher DPI render, lower quality = lower DPI
  const scaleFactor = quality <= 30 ? 1.0 : quality <= 50 ? 1.2 : quality <= 70 ? 1.5 : 2.0;

  // Create a new PDF with pdf-lib
  const newPdf = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(i, numPages);

    // Render page to JPEG
    const { jpeg, width, height } = await renderPageToJpeg(srcPdf, i, quality, scaleFactor);

    // Embed the JPEG in the new PDF
    const jpegImage = await newPdf.embedJpg(jpeg.buffer as ArrayBuffer);

    // Get original page size to maintain dimensions
    const srcPage = await srcPdf.getPage(i);
    const srcViewport = srcPage.getViewport({ scale: 1.0 });

    // Add a page with original dimensions and draw the compressed image
    const page = newPdf.addPage([srcViewport.width, srcViewport.height]);
    page.drawImage(jpegImage, {
      x: 0,
      y: 0,
      width: srcViewport.width,
      height: srcViewport.height,
    });
  }

  srcPdf.destroy();

  return newPdf.save({ useObjectStreams: true });
}

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(60);
  const [progress, setProgress] = useState('');

  const handleFileSelect = useCallback((files: File[]) => {
    const f = files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setProcessedBlob(null);
      setError(null);
      setProgress('');
    } else {
      setError('Please select a valid PDF file.');
    }
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setProcessedBlob(null);
    setError(null);
    setProgress('');
  }, []);

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setProgress('Loading PDF...');

    try {
      const arrayBuffer = await file.arrayBuffer();

      const compressedBytes = await compressPdfFile(
        arrayBuffer,
        quality,
        (page, total) => setProgress(`Compressing page ${page} of ${total}...`)
      );

      const blob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

      if (blob.size >= file.size) {
        setError('This PDF is already well-optimized. Try lowering the quality slider for more aggressive compression.');
        setIsProcessing(false);
        setProgress('');
        return;
      }

      setProcessedBlob(blob);
      setProgress('');
    } catch (err) {
      console.error('PDF compression error:', err);
      setError('Failed to compress PDF. The file may be corrupted or protected.');
      setProgress('');
    } finally {
      setIsProcessing(false);
    }
  };

  const download = () => {
    if (!processedBlob || !file) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed-' + file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reductionPercent = file && processedBlob
    ? Math.round((1 - processedBlob.size / file.size) * 100)
    : 0;

  return (
    <ToolPageLayout
      title="PDF Compressor — Reduce PDF File Size"
      metaTitle="Compress PDF to 100KB, 200KB, 500KB Online Free"
      metaDescription="Reduce PDF file size for email and application form upload without losing readability."
      canonicalPath="/compress-pdf"
      description="Reduce your PDF file size for easy sharing via email, uploading to portals, or saving storage space. All processing happens in your browser."
      howToSteps={[
        'Upload the PDF file you want to compress.',
        'Adjust the compression quality using the slider.',
        'Click "Compress PDF" and download the optimized file.',
      ]}
      faqs={[
        { question: 'How does PDF compression work?', answer: 'Our tool renders each page at the selected quality level and rebuilds the PDF with optimized JPEG images. This dramatically reduces file size, especially for image-heavy or scanned PDFs.' },
        { question: 'Will compression affect the quality of my PDF?', answer: 'The compressed PDF converts pages to high-quality JPEG images. At 60-80% quality, the difference is barely noticeable. Lower settings give smaller files with some visible quality reduction.' },
        { question: 'Is my PDF uploaded to any server?', answer: 'No! All compression happens entirely in your browser. Your PDF never leaves your device, ensuring complete privacy and security.' },
        { question: 'What is the maximum PDF size I can compress?', answer: 'There is no hard limit since processing happens locally. However, very large PDFs (over 50 MB) may take longer depending on your device capabilities.' },
        { question: 'Will text in my PDF still be selectable?', answer: 'The compressed PDF renders pages as images for maximum compression. Text will not be selectable in the output, but it will be perfectly readable. This is ideal for sharing and archiving.' },
      ]}
      contentSections={[
        {
          title: 'Why Compress PDF Files?',
          content: `PDF files can grow large due to embedded images, fonts, and complex layouts. Large PDFs are difficult to share via email (which typically limits attachments to 25 MB), slow to upload to web portals, and consume unnecessary storage space.

Our PDF compressor re-renders each page at your chosen quality level and rebuilds the document with optimized JPEG compression. This can typically reduce file sizes by 50–90% for image-heavy documents like scanned papers, presentations, and photo-rich reports.

Common use cases include compressing scanned documents, reducing file sizes for email attachments, optimizing PDFs for web uploads, and preparing documents for government or job application portals with strict size limits.`,
        },
        {
          title: 'Privacy-First PDF Compression',
          content: `Unlike most online PDF compressors that upload your files to remote servers, ImageKb processes everything directly in your browser using advanced JavaScript libraries. Your PDF never leaves your device — there's no upload, no cloud processing, and no data retention.

This makes our tool ideal for compressing sensitive documents like tax returns, legal contracts, medical records, and personal identification documents. You get the convenience of an online tool with the privacy of desktop software.

The tool works offline after the initial page load, making it reliable even with slow or no internet connection. Processing speed depends on your device but most PDFs compress in just a few seconds.`,
        },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {!file ? (
          <FileUploader accept="application/pdf,.pdf" onFilesSelected={handleFileSelect} dropLabel="Drop your PDF here" />
        ) : (
          <div className="rounded-2xl border-2 border-primary/20 bg-accent/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium truncate max-w-[200px] sm:max-w-none">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={reset} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                <span className="sr-only">Clear</span>✕
              </Button>
            </div>
          </div>
        )}

        {file && !processedBlob && !error && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Compression quality: {quality}%</Label>
              <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={10} max={90} step={5} />
              <p className="text-xs text-muted-foreground">
                Lower = smaller file size. 50-70% recommended for good balance.
              </p>
            </div>
            <Button onClick={handleCompress} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{progress || 'Compressing...'}</>
              ) : (
                'Compress PDF'
              )}
            </Button>
          </div>
        )}

        {error && (
          <div className="space-y-3">
            <p className="text-destructive text-center text-sm">{error}</p>
            <Button variant="outline" onClick={reset} className="w-full">Try Another PDF</Button>
          </div>
        )}

        {processedBlob && file && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-6 text-center">
              <FileText className="h-16 w-16 mx-auto text-primary mb-4" />
              <p className="font-medium">Compression Complete!</p>
              <div className="text-sm text-muted-foreground mt-2">
                <p>{formatFileSize(file.size)} → {formatFileSize(processedBlob.size)}</p>
                <p className="text-success font-medium mt-1">
                  {reductionPercent}% smaller
                </p>
              </div>
            </div>
            <Button onClick={download} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Compressed PDF
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Compress Another PDF</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
