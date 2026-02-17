import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { passportCrop, formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const standards = [
  { id: 'us', label: 'US (2×2 in)', w: 600, h: 600 },
  { id: 'uk', label: 'UK (35×45 mm)', w: 413, h: 531 },
  { id: 'india', label: 'India (35×45 mm)', w: 413, h: 531 },
  { id: 'eu', label: 'EU / Schengen (35×45 mm)', w: 413, h: 531 },
  { id: 'china', label: 'China (33×48 mm)', w: 390, h: 567 },
  { id: 'canada', label: 'Canada (50×70 mm)', w: 591, h: 827 },
  { id: 'australia', label: 'Australia (35×45 mm)', w: 413, h: 531 },
];

export default function PassportPhotoMaker() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [standard, setStandard] = useState('us');

  const selected = standards.find((s) => s.id === standard)!;

  return (
    <ToolPageLayout
      title="Passport Size Photo Maker"
      metaTitle="Passport Size Photo Maker Online Free"
      metaDescription="Create passport size photo for job and exam applications with correct size and background."
      canonicalPath="/passport-photo-maker"
      description="Create standard passport-size photos for any country. Select your country, upload a photo, and get a perfectly sized passport photo instantly."
      howToSteps={[
        'Select your country or passport photo standard from the dropdown.',
        'Upload a clear face photo — ideally a front-facing portrait.',
        'Click "Create Passport Photo" to auto-crop and resize to the standard dimensions.',
        'Download the passport-ready photo.',
      ]}
      faqs={[
        { question: 'What size is a US passport photo?', answer: 'US passport photos are 2×2 inches (51×51 mm), which equals 600×600 pixels at 300 DPI.' },
        { question: 'Does this tool check biometric requirements?', answer: 'This tool crops and resizes to the correct dimensions. For official use, ensure your original photo meets requirements like neutral expression, white background, and proper lighting.' },
        { question: 'Can I use a selfie for passport photos?', answer: 'While possible, official passport photos should be taken against a plain white or light background with even lighting. Selfies may not meet official requirements.' },
        { question: 'What countries are supported?', answer: 'We support US, UK, India, EU/Schengen, China, Canada, and Australia passport photo standards. Most countries use either 35×45mm or 2×2 inch formats.' },
      ]}
      contentSections={[
        {
          title: 'Passport Photo Size Requirements',
          content: `Different countries have specific passport photo size requirements. The most common standards are the US format (2×2 inches / 51×51 mm) and the international format (35×45 mm) used by the UK, EU, India, Australia, and many other countries.

Our passport photo maker automatically crops your photo to the correct aspect ratio and resizes it to the standard pixel dimensions at 300 DPI print resolution. The tool centers the crop on your photo, which works well for typical portrait-style photos.

For best results, start with a high-resolution photo taken against a plain, light-colored background. Ensure the face is well-lit, centered, and clearly visible. The tool handles the technical sizing — you just need to provide a good quality source photo.`,
        },
        {
          title: 'Tips for a Perfect Passport Photo',
          content: `To create a passport photo that meets official requirements, follow these guidelines: Use a plain white or off-white background. Ensure even lighting without harsh shadows on the face. Face the camera directly with a neutral expression. Keep both eyes open and clearly visible. Remove glasses if possible. Ensure the photo is in sharp focus.

After creating your passport photo with our tool, print it at exactly the required dimensions on high-quality matte or glossy photo paper. Many countries require the photo to be printed at exactly the specified size — even a few millimeters difference can result in rejection.

Our tool processes everything in your browser, so your photos remain completely private. No images are uploaded to any server.`,
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
            <div className="space-y-2">
              <Label>Country / Standard</Label>
              <Select value={standard} onValueChange={setStandard}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {standards.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Output: {selected.w}×{selected.h} px (300 DPI)</p>
            </div>
            <Button onClick={() => processImage((f) => passportCrop(f, selected.w, selected.h))} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : 'Create Passport Photo'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Passport Photo" className="max-h-72 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">{selected.w}×{selected.h} px — {formatFileSize(processedBlob.size)}</p>
            <Button onClick={() => download(`passport-photo-${standard}.jpg`)} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download Passport Photo
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Create Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
