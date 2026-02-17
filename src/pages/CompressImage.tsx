import { useState } from 'react';
import { Link } from "react-router-dom";
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { compressImage, formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function CompressImage() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [targetKB, setTargetKB] = useState(200);

  return (
    <ToolPageLayout
      title="Image Compressor — Reduce Image Size in KB"
      metaTitle="Compress Image to 10KB, 20KB, 50KB, 100KB Online"
      metaDescription="Reduce image file size to exact KB for exam and application forms. Works on phone and computer."
      canonicalPath="/compress-image"
      description="Reduce your image file size to a target KB. Perfect for email attachments, website uploads, and meeting file size requirements."
      howToSteps={[
        'Upload the image you want to compress.',
        'Set your target file size using the KB slider.',
        'Click "Compress Image" and download the optimized result.',
      ]}
      faqs={[
        { question: 'How does image compression work?', answer: 'Our tool adjusts image quality and dimensions automatically to reach your selected file size while preserving clarity.' },
        { question: 'Can I compress image to 50KB or 100KB?', answer: 'Yes, simply choose the required KB value using the slider and download the optimized result.' },
        { question: 'Will compression ruin quality?', answer: 'No, the algorithm minimizes visible quality loss while reducing file size.' },
        { question: 'Is it safe?', answer: 'Yes. All processing happens locally in your browser and files never upload to servers.' },
        { question: 'Works on mobile?', answer: 'Yes it works on Android, iPhone, tablet and desktop browsers.' },
        { question: 'What formats supported?', answer: 'JPG, PNG and WebP supported. Output is optimized JPEG.' },
        { question: 'Can I use for government exam forms?', answer: 'Yes, perfect for passport, PSC, SSC, UPSC and job applications requiring small file size.' },
        { question: 'Does it work offline?', answer: 'After loading page, compression works even without internet.' },
      ]}
      contentSections={[
        {
          title: 'Why Compress Images?',
          content: `Modern smartphone photos are very high resolution and large in size. Many websites and forms restrict upload size to small limits such as 50KB, 100KB or 200KB. Without compression your image upload fails. This tool solves that instantly by optimizing size automatically.`,
        },
      ]}
    >

      <div className="max-w-2xl mx-auto space-y-6">

        <p className="text-muted-foreground text-center">
          Compress images online to an exact KB size instantly. Perfect for job applications,
          government forms, websites and email attachments.
        </p>

        <FileUploader accept="image/*" onFilesSelected={handleFileSelect} file={file} onClear={reset} />

        {file && !processedBlob && (
          <div className="space-y-4">
            {originalPreview && (
              <div className="rounded-xl overflow-hidden border bg-card p-2">
                <img src={originalPreview} alt="Original uploaded image preview before compression" className="max-h-72 mx-auto object-contain" />
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">Original: {formatFileSize(file.size)}</p>
            <div className="space-y-2">
              <Label>Target size: {targetKB} KB</Label>
              <Slider value={[targetKB]} onValueChange={(v) => setTargetKB(v[0])} min={10} max={2000} step={10} />
            </div>
            <Button onClick={() => processImage((f) => compressImage(f, targetKB))} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Compressing...</> : 'Compress Image'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Compressed optimized image preview after reducing file size" className="max-h-72 mx-auto object-contain" />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>{formatFileSize(file.size)} → {formatFileSize(processedBlob.size)}</p>
              <p className="text-success font-medium">
                {Math.round((1 - processedBlob.size / file.size) * 100)}% smaller
              </p>
            </div>
            <Button onClick={() => download('compressed-' + file.name.replace(/\.\w+$/, '.jpg'))} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Compressed Image
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Compress Another</Button>
          </div>
        )}

      </div>

      {/* SEO CONTENT */}
      <section className="max-w-3xl mx-auto mt-16 space-y-10 text-base leading-relaxed">

        <div>
          <h2 className="text-2xl font-bold">How to Compress Image to Exact KB Size</h2>
          <p>
            Upload your image, choose required size like 20KB, 50KB, 100KB or 200KB and download instantly.
            The tool automatically adjusts quality and resolution to match your target size.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Common Uses</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Government job application photos</li>
            <li>Passport & visa uploads</li>
            <li>Email attachments</li>
            <li>Website performance optimization</li>
            <li>Profile pictures</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Related Tools</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li><Link to="/resize-image" className="text-primary underline">Resize Image</Link></li>
            <li><Link to="/jpg-to-png" className="text-primary underline">JPG to PNG Converter</Link></li>
            <li><Link to="/png-to-jpg" className="text-primary underline">PNG to JPG Converter</Link></li>
            <li><Link to="/signature-resizer" className="text-primary underline">Signature Resizer</Link></li>
            <li><Link to="/passport-photo-maker" className="text-primary underline">Passport Photo Maker</Link></li>
            <li><Link to="/remove-background" className="text-primary underline">Background Remover</Link></li>
          </ul>
        </div>

      </section>

    </ToolPageLayout>
  );
}
