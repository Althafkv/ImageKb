import { useState, useCallback } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { loadImage, downloadBlob } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [done, setDone] = useState(false);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newFiles.map((f) => URL.createObjectURL(f))]);
    setDone(false);
    setError('');
  }, []);

  const removeFile = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const reset = () => {
    setFiles([]);
    setPreviews([]);
    setDone(false);
    setError('');
  };

  const handleConvert = async () => {
    if (!files.length) return;
    setIsProcessing(true);
    setError('');
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation, unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < files.length; i++) {
        if (i > 0) pdf.addPage();
        const img = await loadImage(files[i]);
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const pageRatio = pageW / pageH;
        let w: number, h: number, x: number, y: number;
        if (imgRatio > pageRatio) {
          w = pageW - 20;
          h = w / imgRatio;
          x = 10;
          y = (pageH - h) / 2;
        } else {
          h = pageH - 20;
          w = h * imgRatio;
          x = (pageW - w) / 2;
          y = 10;
        }
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        pdf.addImage(dataUrl, 'JPEG', x, y, w, h);
      }

      const blob = pdf.output('blob');
      downloadBlob(blob, 'images.pdf');
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'PDF creation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="Convert Image to PDF"
      metaTitle="Convert Image to PDF Online Free"
      metaDescription="Combine images into one PDF file instantly with high quality."
      canonicalPath="/image-to-pdf"
      description="Convert one or more images to a PDF document. Supports JPG, PNG, and WebP. Combine multiple images into a single PDF file."
      howToSteps={[
        'Upload one or more images using the drag-and-drop area.',
        'Choose page orientation (portrait or landscape).',
        'Click "Convert to PDF" to generate and download the PDF.',
      ]}
      faqs={[
        { question: 'How many images can I combine into one PDF?', answer: 'There is no fixed limit. Each image becomes one page in the PDF. Processing happens locally, so performance depends on your device.' },
        { question: 'What image formats are supported?', answer: 'JPG, JPEG, PNG, WebP, and most browser-supported image formats can be converted to PDF.' },
        { question: 'What paper size is used?', answer: 'The PDF uses A4 paper size (210×297 mm) by default. Images are automatically scaled to fit the page while maintaining their aspect ratio.' },
        { question: 'Can I reorder images before converting?', answer: 'Currently images are added in upload order. Remove and re-upload to change the order.' },
      ]}
      contentSections={[
        {
          title: 'Image to PDF Conversion',
          content: `Converting images to PDF is essential for creating documents, portfolios, and archival files. PDF format ensures your images are presented consistently across all devices and operating systems.

Our tool places each image on a separate A4 page, automatically scaling and centering the image to fit while maintaining the original aspect ratio. This produces clean, professional-looking PDF documents suitable for printing or digital sharing.

Common use cases include converting scanned documents to PDF, creating photo collections, combining receipts or invoices, and preparing image portfolios for submission.`,
        },
        {
          title: 'Private & Secure Processing',
          content: `Unlike most online image-to-PDF converters, our tool processes everything in your browser using the jsPDF library. No images are uploaded to any server, making this ideal for sensitive documents like IDs, financial records, or personal photos.

The tool supports both portrait and landscape page orientations. Images are compressed to JPEG quality during PDF generation to keep file sizes reasonable while maintaining good visual quality. The resulting PDF can be opened in any PDF viewer and is fully compatible with printing services.

For best results, use high-resolution images. Low-resolution images may appear pixelated when scaled to fit an A4 page.`,
        },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {files.length === 0 && (
          <FileUploader accept="image/*" onFilesSelected={handleFilesSelected} multiple />
        )}

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {previews.map((p, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden border bg-card">
                  <img src={p} alt={`Page ${i + 1}`} className="w-full h-24 object-cover" />
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground py-0.5">Page {i + 1}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.multiple = true;
              input.onchange = (e) => {
                const t = e.target as HTMLInputElement;
                if (t.files?.length) handleFilesSelected(Array.from(t.files));
              };
              input.click();
            }}>
              + Add More Images
            </Button>

            <div className="space-y-2">
              <Label>Orientation</Label>
              <Select value={orientation} onValueChange={(v) => setOrientation(v as 'portrait' | 'landscape')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!done && (
              <Button onClick={handleConvert} disabled={isProcessing} className="w-full" size="lg">
                {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating PDF...</> : `Convert ${files.length} Image${files.length > 1 ? 's' : ''} to PDF`}
              </Button>
            )}

            {done && (
              <div className="space-y-3 text-center">
                <p className="text-success font-medium">✓ PDF downloaded successfully!</p>
                <Button variant="outline" onClick={reset} className="w-full">Convert More Images</Button>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}
      </div>
    </ToolPageLayout>
  );
}
