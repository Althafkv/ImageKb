import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { compressImage, formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function SignatureResizer() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [targetKB, setTargetKB] = useState(30);

  return (
    <ToolPageLayout
      title="Signature Resizer — Resize to Target KB"
      metaTitle="Resize Signature to 10KB, 20KB, 50KB Online Free"
      metaDescription="Resize signature image for government and exam forms quickly and accurately."
      canonicalPath="/signature-resizer"
      description="Resize your signature image to a specific file size between 10 KB and 100 KB. Perfect for government forms, job applications, and online submissions."
      howToSteps={[
        'Upload your signature image — any format is accepted.',
        'Set the target file size using the KB slider (10–100 KB).',
        'Click "Resize Signature" to compress to the target size.',
        'Download the resized signature image.',
      ]}
      faqs={[
        { question: 'Why do I need to resize my signature?', answer: 'Many online application portals, government forms, and exam registration sites require signature images to be under a specific file size, typically 10-50 KB.' },
        { question: 'What format should my signature be?', answer: 'Most portals accept JPG or JPEG signatures. Our tool outputs in JPEG format for maximum compatibility and small file size.' },
        { question: 'Will the signature look blurry after resizing?', answer: 'At reasonable target sizes (20-50 KB), the signature remains clearly legible. Very small targets (10-15 KB) may show some quality reduction but signatures typically compress well.' },
        { question: 'What are typical signature size requirements?', answer: 'Common requirements: UPSC/SSC forms: 10-20 KB; Bank applications: 10-50 KB; University forms: 20-50 KB; Corporate documents: up to 100 KB.' },
      ]}
      contentSections={[
        {
          title: 'Why Resize Signatures?',
          content: `Online application forms frequently impose strict file size limits on uploaded signature images. Government portals like UPSC, SSC, bank recruitment sites, and university admission forms often require signatures between 10 KB and 50 KB in JPEG format.

Manually achieving these specific file sizes using general-purpose image editors is tedious and imprecise. Our signature resizer automatically compresses your signature to the exact target size, saving you time and frustration. Simply set the target KB and the tool handles the rest.

The tool preserves signature legibility while meeting file size requirements. It works with signatures scanned on paper, digital signatures, and photos of handwritten signatures.`,
        },
        {
          title: 'How to Get the Best Results',
          content: `For the cleanest result, start with a high-contrast scan or photo of your signature on white paper. Good lighting and a plain background help the compressor achieve smaller sizes without sacrificing legibility.

If your original signature image is very large (several MB), the compression to 10-30 KB will involve both quality reduction and dimension scaling. This is normal and the signature will remain legible for form submission purposes.

Our tool uses intelligent JPEG compression that prioritizes maintaining the sharp lines of your signature. The entire process runs in your browser — your signature image is never uploaded to any server, ensuring complete privacy for this sensitive document.`,
        },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <FileUploader accept="image/*" onFilesSelected={handleFileSelect} file={file} onClear={reset} />

        {file && !processedBlob && (
          <div className="space-y-4">
            {originalPreview && (
              <div className="rounded-xl overflow-hidden border bg-card p-2">
                <img src={originalPreview} alt="Original signature" className="max-h-48 mx-auto object-contain" />
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">Original: {formatFileSize(file.size)}</p>
            <div className="space-y-2">
              <Label>Target size: {targetKB} KB</Label>
              <Slider value={[targetKB]} onValueChange={(v) => setTargetKB(v[0])} min={10} max={100} step={5} />
            </div>
            <Button onClick={() => processImage((f) => compressImage(f, targetKB))} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Resizing...</> : 'Resize Signature'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Resized signature" className="max-h-48 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {formatFileSize(file!.size)} → {formatFileSize(processedBlob.size)}
            </p>
            <Button onClick={() => download('signature-' + targetKB + 'kb.jpg')} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Signature
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Resize Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
