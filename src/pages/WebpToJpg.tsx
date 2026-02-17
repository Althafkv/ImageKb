import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { convertFormat, formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function WebpToJpg() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [quality, setQuality] = useState(90);

  return (
    <ToolPageLayout
      title="WebP to JPG Converter"
      metaTitle="Convert WebP to JPG Online"
      metaDescription="Easily convert WebP images to JPG format online for forms and uploads."
      canonicalPath="/webp-to-jpg"
      description="Convert WebP images to the universally compatible JPG format. Fast, free, and private — everything runs in your browser."
      howToSteps={[
        'Upload your WebP image using drag-and-drop or the file browser.',
        'Adjust the output quality if desired.',
        'Click "Convert to JPG" and download your converted image.',
      ]}
      faqs={[
        { question: 'Why convert WebP to JPG?', answer: 'While WebP is efficient, JPG is universally supported across all devices, apps, and platforms. Converting to JPG ensures maximum compatibility when sharing or uploading images.' },
        { question: 'Is the conversion free?', answer: 'Yes, completely free. No registration, no limits, no watermarks. The tool runs entirely in your browser.' },
        { question: 'Does the conversion happen on a server?', answer: 'No. Your images are processed locally in your browser using the Canvas API. Nothing is uploaded to any server.' },
        { question: 'Will I lose image quality?', answer: 'JPG uses lossy compression, but at 90% quality the loss is negligible. You can adjust the quality slider to find the right balance for your needs.' },
      ]}
      contentSections={[
        {
          title: 'What is WebP Format?',
          content: `WebP is a modern image format developed by Google that provides both lossy and lossless compression. It typically produces files 25-34% smaller than equivalent JPG files while maintaining similar visual quality. Despite these advantages, WebP is not universally supported by all software and platforms.

Many websites serve images in WebP format for faster page loading. However, when you save or download these images, you may find that older software, email clients, or platforms don't recognize the WebP format. Converting to JPG solves this compatibility issue instantly.

Our WebP to JPG converter handles the conversion quickly and privately, ensuring your images can be used anywhere JPG is accepted.`,
        },
        {
          title: 'Browser-Based Privacy-First Conversion',
          content: `Our converter uses your browser's built-in image processing capabilities to convert WebP files to JPG format. The entire process happens on your device — no images are uploaded to any server, ensuring complete privacy and security.

This approach means the conversion is nearly instantaneous, regardless of your internet speed. It also means the tool continues to work even if you lose your internet connection after the page loads. Whether you're converting a single image or batch processing multiple files, your data remains on your device at all times.

The converter supports all WebP variants including lossy, lossless, and animated WebP (first frame). Output quality can be adjusted from 10% to 100% to give you full control over file size and visual quality.`,
        },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <FileUploader accept="image/webp,.webp" onFilesSelected={handleFileSelect} file={file} onClear={reset} />

        {file && !processedBlob && (
          <div className="space-y-4">
            {originalPreview && (
              <div className="rounded-xl overflow-hidden border bg-card p-2">
                <img src={originalPreview} alt="Original WebP" className="max-h-72 mx-auto object-contain" />
              </div>
            )}
            <div className="space-y-2">
              <Label>Quality: {quality}%</Label>
              <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={10} max={100} step={5} />
            </div>
            <Button onClick={() => processImage((f) => convertFormat(f, 'jpeg', quality / 100))} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting...</> : 'Convert to JPG'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Converted JPG" className="max-h-72 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">Output: {formatFileSize(processedBlob.size)}</p>
            <Button onClick={() => download(file!.name.replace(/\.webp$/i, '.jpg'))} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download JPG
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Convert Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
