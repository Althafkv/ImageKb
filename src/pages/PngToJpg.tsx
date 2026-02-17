import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { convertFormat, formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function PngToJpg() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [quality, setQuality] = useState(90);

  return (
    <ToolPageLayout
      title="PNG to JPG Converter"
      metaTitle="Convert PNG to JPG Online Free"
      metaDescription="Fast PNG to JPG converter. Reduce image size and download instantly."
      canonicalPath="/png-to-jpg"
      description="Convert PNG images to JPG format to reduce file size. Adjust quality and download instantly — all in your browser."
      howToSteps={[
        'Upload your PNG image using the drag-and-drop area or file browser.',
        'Adjust the quality slider to balance file size and image quality.',
        'Click "Convert to JPG" and download the result.',
      ]}
      faqs={[
        { question: 'Will I lose quality converting PNG to JPG?', answer: 'JPG uses lossy compression, so some quality loss occurs. Use the quality slider to control the trade-off between file size and visual quality. At 90% quality, the difference is usually imperceptible.' },
        { question: 'What happens to transparent areas?', answer: 'JPG does not support transparency. Transparent areas in your PNG will be filled with a white background in the converted JPG.' },
        { question: 'How much smaller will the JPG be?', answer: 'Typically 50-90% smaller than the PNG, depending on the image content and quality setting. Photos compress much better than graphics with sharp edges.' },
        { question: 'Is there a file size limit?', answer: 'No strict limit. Processing happens on your device, so performance depends on your hardware. Most images process in under a second.' },
      ]}
      contentSections={[
        {
          title: 'Why Convert PNG to JPG?',
          content: `PNG files can be significantly larger than JPGs, especially for photographs. While PNG is ideal for graphics with sharp edges, text, and transparency, JPG is better suited for photographs and images where a smaller file size is more important than pixel-perfect quality.

Converting PNG to JPG is commonly needed for uploading photos to websites, sending images via email, reducing storage space, and meeting file size requirements for social media platforms. JPG format is universally supported across all devices, browsers, and applications, making it the most compatible image format available.

Our converter gives you full control over the compression quality, letting you find the perfect balance between file size and visual quality for your specific needs.`,
        },
        {
          title: 'Understanding JPG Quality Settings',
          content: `The quality slider controls how much compression is applied to your image. At 100% quality, minimal compression is used, resulting in larger files but near-perfect visual quality. At lower quality settings, the file size decreases significantly, but compression artifacts may become visible.

For most purposes, a quality setting of 80-90% produces excellent results with significant file size reduction. At these levels, compression artifacts are virtually invisible to the naked eye. For web usage, 70-80% is often sufficient and produces very small files. Only reduce below 60% when file size is critical and some visible quality loss is acceptable.

Our converter uses the browser's built-in JPEG encoder, which produces high-quality output comparable to professional image editing software. The transparent areas in PNG images are automatically filled with white before conversion.`,
        },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <FileUploader accept="image/png,.png" onFilesSelected={handleFileSelect} file={file} onClear={reset} />

        {file && !processedBlob && (
          <div className="space-y-4">
            {originalPreview && (
              <div className="rounded-xl overflow-hidden border bg-card p-2">
                <img src={originalPreview} alt="Original PNG" className="max-h-72 mx-auto object-contain" />
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
            <Button onClick={() => download(file!.name.replace(/\.png$/i, '.jpg'))} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download JPG
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Convert Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
