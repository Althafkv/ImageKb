import { useState } from 'react';
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
        { question: 'How does image compression work?', answer: 'Our tool iteratively adjusts JPEG compression quality and, if needed, scales down the image dimensions to reach your target file size while preserving as much visual quality as possible.' },
        { question: 'Can I compress to a specific KB size?', answer: 'Yes! Use the slider to set any target size from 10 KB to 2000 KB. The compressor will optimize the image to be at or below your target.' },
        { question: 'Will compression ruin my image quality?', answer: 'We use an intelligent algorithm that prioritizes quality reduction over dimension scaling. For reasonable target sizes, the quality difference is minimal.' },
        { question: 'What formats are supported?', answer: 'You can upload JPG, PNG, or WebP images. The output is always in JPEG format for optimal compression.' },
        { question: 'Is there a file size limit for uploads?', answer: 'No upload limit since everything is processed locally. Performance depends on your device but most images compress in seconds.' },
      ]}
      contentSections={[
        {
          title: 'Why Compress Images?',
          content: `Large image files can cause problems when uploading to websites, sending via email, or meeting platform-specific size requirements. Many online forms, job applications, and government portals require images under a specific file size — often 100 KB, 200 KB, or 500 KB.

Our image compressor lets you target a specific file size in KB, ensuring your images meet any requirement. Unlike simple quality sliders, our tool intelligently balances quality reduction and dimension scaling to achieve the target size with minimal visible quality loss.

Common use cases include compressing photos for email attachments, reducing image sizes for faster website loading, preparing images for online applications, and optimizing profile pictures for social media platforms.`,
        },
        {
          title: 'Smart Compression Technology',
          content: `Our compression algorithm works in steps. First, it attempts to reach the target size by reducing JPEG compression quality. If quality reduction alone is insufficient, the algorithm gradually reduces the image dimensions while maintaining the aspect ratio.

This approach ensures that your image retains the highest possible quality at the target file size. A photo compressed to 200 KB, for example, will look significantly better with our approach compared to simply setting a low JPEG quality value.

The entire process runs in your browser using the Canvas API and JPEG encoder. No data is sent to any server, making this the most private image compression tool available. The tool works offline after loading and processes images in seconds.`,
        },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <FileUploader accept="image/*" onFilesSelected={handleFileSelect} file={file} onClear={reset} />

        {file && !processedBlob && (
          <div className="space-y-4">
            {originalPreview && (
              <div className="rounded-xl overflow-hidden border bg-card p-2">
                <img src={originalPreview} alt="Original" className="max-h-72 mx-auto object-contain" />
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
              <img src={processedPreview} alt="Compressed" className="max-h-72 mx-auto object-contain" />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>{formatFileSize(file!.size)} → {formatFileSize(processedBlob.size)}</p>
              <p className="text-success font-medium">
                {Math.round((1 - processedBlob.size / file!.size) * 100)}% smaller
              </p>
            </div>
            <Button onClick={() => download('compressed-' + file!.name.replace(/\.\w+$/, '.jpg'))} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Compressed Image
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Compress Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
