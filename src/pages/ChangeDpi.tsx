import { useState, useEffect } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { changeDpiResize, loadImage, formatFileSize } from '@/lib/imageProcessing';
import { setImageDpi } from '@/lib/dpiUtils';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ChangeDpi() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [dpi, setDpi] = useState(300);
  const [physW, setPhysW] = useState(4);
  const [physH, setPhysH] = useState(6);
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [origDims, setOrigDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (file) {
      loadImage(file).then((img) => setOrigDims({ w: img.naturalWidth, h: img.naturalHeight }));
    }
  }, [file]);

  const wInch = unit === 'cm' ? physW / 2.54 : physW;
  const hInch = unit === 'cm' ? physH / 2.54 : physH;
  const targetPxW = Math.round(wInch * dpi);
  const targetPxH = Math.round(hInch * dpi);

  return (
    <ToolPageLayout
      title="Change Image DPI to 300 DPI"
      metaTitle="Change Image DPI to 300 DPI Online"
      metaDescription="Set photo DPI for printing and application form requirements instantly."
      canonicalPath="/change-dpi"
      description="Adjust your image resolution for print. Set physical dimensions and target DPI to calculate and resize to the required pixel dimensions."
      howToSteps={[
        'Upload the image you want to adjust.',
        'Enter the desired physical print size (width × height in inches or cm).',
        'Set target DPI (300 is standard for print).',
        'Click "Resize for DPI" to process and download.',
      ]}
      faqs={[
        { question: 'What does DPI mean?', answer: 'DPI (Dots Per Inch) measures print resolution. Higher DPI means more detail when printed. 300 DPI is the industry standard for high-quality prints.' },
        { question: 'Does this tool change the DPI metadata?', answer: 'This tool resizes the image to the pixel dimensions required for your specified physical size at the target DPI. For example, a 4×6 inch print at 300 DPI requires a 1200×1800 pixel image.' },
        { question: 'Will changing DPI affect screen display?', answer: 'On screens, DPI is irrelevant — only pixel dimensions matter. This tool is specifically for preparing images for physical printing.' },
        { question: 'What DPI should I use?', answer: '300 DPI for high-quality prints (photos, marketing). 150 DPI for decent quality. 72 DPI for web/screen only.' },
        { question: 'Can I increase DPI without losing quality?', answer: 'Increasing DPI for a given physical size means increasing pixel count. If the original image doesn\'t have enough pixels, upscaling will create a softer image. Start with the highest resolution source available.' },
      ]}
      contentSections={[
        {
          title: 'Understanding DPI and Print Resolution',
          content: `DPI (Dots Per Inch) determines how many dots of ink are placed per inch when printing an image. A higher DPI means finer detail and smoother gradients in the printed output. The industry standard for high-quality photo prints is 300 DPI.

To print an image at a specific physical size and DPI, you need a minimum pixel count. For example, to print a 4×6 inch photo at 300 DPI, you need at least 1200×1800 pixels. Our tool calculates these pixel dimensions automatically based on your specified physical size and DPI.

This tool resizes your image to match the required pixel dimensions. If your source image has fewer pixels than needed, the result will be upscaled, which may cause some softening. Always start with the highest resolution source image available.`,
        },
        {
          title: 'Common Print Sizes and Pixel Requirements',
          content: `Here are common print sizes and the pixel dimensions needed at 300 DPI:

• 4×6 inches: 1200×1800 pixels
• 5×7 inches: 1500×2100 pixels
• 8×10 inches: 2400×3000 pixels
• 11×14 inches: 3300×4200 pixels
• A4 (8.27×11.69 in): 2481×3507 pixels

For lower-quality prints (posters, banners viewed from a distance), 150 DPI is often acceptable, halving the required pixel dimensions. For web and screen display, DPI is irrelevant — only the pixel dimensions matter.

Our tool lets you specify dimensions in both inches and centimeters, and supports any DPI value from 72 to 600.`,
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
            <p className="text-sm text-muted-foreground text-center">Original: {origDims.w} × {origDims.h} px</p>

            <div className="space-y-2">
              <Label>Target DPI</Label>
              <Input type="number" value={dpi} onChange={(e) => setDpi(Number(e.target.value))} min={72} max={600} />
            </div>

            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as 'in' | 'cm')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">Inches</SelectItem>
                  <SelectItem value="cm">Centimeters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Width ({unit})</Label><Input type="number" value={physW} onChange={(e) => setPhysW(Number(e.target.value))} min={0.1} step={0.1} /></div>
              <div><Label>Height ({unit})</Label><Input type="number" value={physH} onChange={(e) => setPhysH(Number(e.target.value))} min={0.1} step={0.1} /></div>
            </div>

            <p className="text-sm text-muted-foreground">
              Required pixels: {targetPxW} × {targetPxH} px at {dpi} DPI
            </p>

            <Button onClick={() => processImage(async (f) => {
              const resized = await changeDpiResize(f, wInch, hInch, dpi);
              return setImageDpi(resized, dpi);
            })} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : 'Resize for DPI'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Result" className="max-h-72 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">{targetPxW}×{targetPxH} px — {formatFileSize(processedBlob.size)}</p>
            <Button onClick={() => download(`${dpi}dpi-` + file!.name)} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Image
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Process Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
