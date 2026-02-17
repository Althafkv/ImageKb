import { useState, useEffect } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { resizeImage, formatFileSize, loadImage } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const presets = [
  { label: '800×600', w: 800, h: 600 },
  { label: '1024×768', w: 1024, h: 768 },
  { label: '1280×720 (HD)', w: 1280, h: 720 },
  { label: '1920×1080 (FHD)', w: 1920, h: 1080 },
  { label: '500×500', w: 500, h: 500 },
  { label: '256×256', w: 256, h: 256 },
];

export default function ResizeImage() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [origDims, setOrigDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (file) {
      loadImage(file).then((img) => {
        setOrigDims({ w: img.naturalWidth, h: img.naturalHeight });
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
      });
    }
  }, [file]);

  return (
    <ToolPageLayout
      title="Resize Image Online"
      metaTitle="Resize Image to Exact Width and Height Online"
      metaDescription="Resize photo dimensions to required pixels instantly without installing software."
      canonicalPath="/resize-image"
      description="Change image dimensions to any custom width and height, or pick from popular presets. All processing is local."
      howToSteps={[
        'Upload the image you want to resize.',
        'Enter custom width and height, or select a preset size.',
        'Click "Resize Image" and download the result.',
      ]}
      faqs={[
        { question: 'Can I resize without losing quality?', answer: 'Downscaling generally preserves quality well. Upscaling beyond the original resolution will cause some blur since new pixel data must be interpolated.' },
        { question: 'What does "maintain aspect ratio" mean?', answer: 'When enabled, the image proportions stay the same — if you set width to 800px, the height adjusts automatically to avoid stretching or squishing.' },
        { question: 'What image formats are supported?', answer: 'JPG, PNG, WebP, BMP, and most browser-supported image formats. The output format matches your input.' },
        { question: 'Is there a maximum output size?', answer: 'No fixed maximum, but extremely large dimensions may be slow to process on mobile devices. The tool handles up to 10,000×10,000 pixels on most modern devices.' },
      ]}
      contentSections={[
        {
          title: 'Why Resize Images?',
          content: `Resizing images is one of the most common image editing tasks. Whether you need to reduce a photo for web upload, create a specific size for social media, or prepare images for print, our resizer handles it all.

Common reasons to resize: meeting upload dimension requirements, optimizing images for faster web loading, creating thumbnails, preparing images for presentations, and adjusting photos for specific display areas. Our tool lets you set exact pixel dimensions or choose from popular presets.

The maintain aspect ratio option ensures your images are never stretched or distorted. When enabled, changing one dimension automatically calculates the other to preserve the original proportions.`,
        },
        {
          title: 'Resizing Best Practices',
          content: `For best results, always resize from the original high-resolution source image rather than resizing an already-resized copy. Downscaling (making images smaller) always produces better results than upscaling (making them larger).

When resizing for web usage, consider that most screens display at 72-96 DPI. An image of 1920×1080 pixels is sufficient for full-screen display on most monitors. For email and social media, 800-1200 pixels wide is typically adequate.

Our resizer uses high-quality bilinear interpolation for smooth results. The tool preserves the original format — PNG inputs produce PNG outputs, maintaining transparency if present. All processing happens in your browser for maximum speed and privacy.`,
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
            <p className="text-sm text-muted-foreground text-center">Original: {origDims.w} × {origDims.h}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Width (px)</Label>
                <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} min={1} />
              </div>
              <div>
                <Label>Height (px)</Label>
                <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} min={1} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="aspect" checked={maintainAspect} onCheckedChange={(c) => setMaintainAspect(!!c)} />
              <Label htmlFor="aspect">Maintain aspect ratio</Label>
            </div>

            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <Button key={p.label} variant="outline" size="sm" onClick={() => { setWidth(p.w); setHeight(p.h); setMaintainAspect(false); }}>
                  {p.label}
                </Button>
              ))}
            </div>

            <Button onClick={() => processImage((f) => resizeImage(f, width, height, maintainAspect))} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Resizing...</> : 'Resize Image'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Resized" className="max-h-72 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">Output: {formatFileSize(processedBlob.size)}</p>
            <Button onClick={() => download('resized-' + file!.name)} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Resized Image
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Resize Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
