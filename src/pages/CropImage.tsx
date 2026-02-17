import { useState, useEffect } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { cropImage, loadImage, formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const aspectPresets = [
  { label: 'Free', ratio: null },
  { label: '1:1', ratio: 1 },
  { label: '4:3', ratio: 4 / 3 },
  { label: '3:2', ratio: 3 / 2 },
  { label: '16:9', ratio: 16 / 9 },
  { label: '9:16', ratio: 9 / 16 },
  { label: '3:4', ratio: 3 / 4 },
];

export default function CropImage() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [origDims, setOrigDims] = useState({ w: 0, h: 0 });
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);

  useEffect(() => {
    if (file) {
      loadImage(file).then((img) => {
        setOrigDims({ w: img.naturalWidth, h: img.naturalHeight });
        setCropX(0);
        setCropY(0);
        setCropW(img.naturalWidth);
        setCropH(img.naturalHeight);
      });
    }
  }, [file]);

  const applyAspect = (ratio: number | null) => {
    if (!ratio) {
      setCropX(0);
      setCropY(0);
      setCropW(origDims.w);
      setCropH(origDims.h);
      return;
    }
    const currentRatio = origDims.w / origDims.h;
    let w: number, h: number;
    if (currentRatio > ratio) {
      h = origDims.h;
      w = Math.round(h * ratio);
    } else {
      w = origDims.w;
      h = Math.round(w / ratio);
    }
    setCropX(Math.round((origDims.w - w) / 2));
    setCropY(Math.round((origDims.h - h) / 2));
    setCropW(w);
    setCropH(h);
  };

  return (
    <ToolPageLayout
      title="Crop Image Online"
      metaTitle="Crop Image Online Free — Custom Aspect Ratios | PixelPerfect Tools"
      metaDescription="Crop images with custom dimensions or preset aspect ratios like 1:1, 4:3, 16:9. Free browser-based tool, no upload needed."
      canonicalPath="/crop-image"
      description="Crop your images using preset aspect ratios or custom pixel coordinates. All processing happens in your browser."
      howToSteps={[
        'Upload the image you want to crop.',
        'Select a preset aspect ratio or enter custom crop coordinates.',
        'Click "Crop Image" to process and download the result.',
      ]}
      faqs={[
        { question: 'What aspect ratio presets are available?', answer: 'We offer 1:1 (square), 4:3, 3:2, 16:9, 9:16, and 3:4. You can also enter custom pixel coordinates for any crop area.' },
        { question: 'Can I crop to exact pixel dimensions?', answer: 'Yes. Enter the X, Y position and width, height in pixels to define your exact crop area.' },
        { question: 'Does cropping reduce image quality?', answer: 'No. Cropping simply removes pixels outside the crop area. The remaining pixels are preserved at their original quality.' },
        { question: 'What happens if I enter invalid coordinates?', answer: 'The tool will attempt to crop with the given values. Ensure your crop area is within the image dimensions for best results.' },
      ]}
      contentSections={[
        {
          title: 'Why Crop Images?',
          content: `Cropping removes unwanted areas from your photos, focusing on the subject matter. It's one of the most fundamental image editing operations, used for social media posts, profile pictures, product photos, and document preparation.

Different platforms require different aspect ratios — Instagram prefers 1:1 squares, YouTube thumbnails use 16:9, and standard photos are typically 4:3 or 3:2. Our preset aspect ratios make it easy to crop for any platform.

Cropping is a lossless operation — it simply removes pixels outside the selected area without affecting the quality of the remaining image. This makes it safe to crop multiple times from the original.`,
        },
        {
          title: 'How Our Crop Tool Works',
          content: `Our crop tool uses the HTML5 Canvas API to extract the selected portion of your image. When you select a preset aspect ratio, the tool calculates the largest possible crop area centered on the image. For custom crops, you specify exact pixel coordinates.

The tool preserves the original image format and quality. PNG images remain PNG with transparency support, while JPEG images maintain their quality level. No recompression occurs beyond what's necessary for the canvas export.

All processing happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy.`,
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

            <div>
              <Label className="mb-2 block">Aspect Ratio</Label>
              <div className="flex flex-wrap gap-2">
                {aspectPresets.map((p) => (
                  <Button key={p.label} variant="outline" size="sm" onClick={() => applyAspect(p.ratio)}>
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><Label>X</Label><Input type="number" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} min={0} /></div>
              <div><Label>Y</Label><Input type="number" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} min={0} /></div>
              <div><Label>Width</Label><Input type="number" value={cropW} onChange={(e) => setCropW(Number(e.target.value))} min={1} /></div>
              <div><Label>Height</Label><Input type="number" value={cropH} onChange={(e) => setCropH(Number(e.target.value))} min={1} /></div>
            </div>
            <p className="text-xs text-muted-foreground">Crop area: {cropW}×{cropH} starting at ({cropX}, {cropY})</p>

            <Button onClick={() => processImage((f) => cropImage(f, cropX, cropY, cropW, cropH))} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Cropping...</> : 'Crop Image'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Cropped" className="max-h-72 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">Output: {cropW}×{cropH} — {formatFileSize(processedBlob.size)}</p>
            <Button onClick={() => download('cropped-' + file!.name)} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Cropped Image
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Crop Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
