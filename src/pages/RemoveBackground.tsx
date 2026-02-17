import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function RemoveBackground() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();
  const [progress, setProgress] = useState(0);

  const handleRemove = () => {
    processImage(async (f) => {
      setProgress(0);
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await removeBackground(f, {
        progress: (key: string, current: number, total: number) => {
          if (total > 0) setProgress(Math.round((current / total) * 100));
        },
      });
      setProgress(100);
      return blob;
    });
  };

  return (
    <ToolPageLayout
      title="Remove Image Background"
      metaTitle="Remove Image Background Online Free"
      metaDescription="Remove background from any image instantly using AI. No signup required, runs entirely in your browser."
      canonicalPath="/remove-background"
      description="Remove the background from photos automatically using AI. Works with portraits, product photos, logos, and more. All processing happens locally in your browser."
      howToSteps={[
        'Upload the image you want to process.',
        'Click "Remove Background" and wait for AI processing.',
        'Download the transparent PNG result.',
      ]}
      faqs={[
        { question: 'How does background removal work?', answer: 'Our tool uses an AI model that runs directly in your browser. It detects the main subject in your image and removes everything else, producing a transparent PNG.' },
        { question: 'Is my image uploaded to any server?', answer: 'No. All processing happens locally in your browser. Your images never leave your device, ensuring complete privacy.' },
        { question: 'What types of images work best?', answer: 'The tool works best with clear subjects like people, products, animals, or objects. Images with high contrast between subject and background produce the cleanest results.' },
        { question: 'Why does it take a while on first use?', answer: 'On the first use, the AI model (~30 MB) is downloaded and cached in your browser. Subsequent uses will be much faster as the model loads from cache.' },
        { question: 'What format is the output?', answer: 'The output is always a transparent PNG file, so you can easily place the subject on any new background.' },
      ]}
      contentSections={[
        {
          title: 'AI-Powered Background Removal',
          content: `Our background removal tool uses a state-of-the-art AI model that runs entirely in your browser. Unlike cloud-based services, your images are never uploaded to any server — all processing happens locally on your device.

The AI model is optimized for a variety of subjects including people, products, animals, and everyday objects. It automatically detects edges and separates the foreground from the background with high accuracy.

The result is a transparent PNG that you can use for e-commerce listings, social media posts, presentations, graphic design, or any project where you need a clean cutout.`,
        },
        {
          title: 'Tips for Best Results',
          content: `For the best background removal results, use images where the subject is clearly visible and distinct from the background. Good lighting and sharp focus help the AI detect edges more accurately.

If you need to refine the result, you can open the transparent PNG in any image editor to make manual adjustments. The tool handles most common cases well, including hair, fur, and semi-transparent objects.

For product photography, place items on a contrasting background before shooting. This helps the AI distinguish the product edges more precisely. The tool supports JPG, PNG, and WebP input formats.`,
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

            {isProcessing && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress < 100 ? 'Processing... This may take a moment on first use.' : 'Finalizing...'}
                </p>
              </div>
            )}

            <Button onClick={handleRemove} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Removing Background...</> : 'Remove Background'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border p-2" style={{ backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%)', backgroundSize: '20px 20px' }}>
              <img src={processedPreview} alt="Background removed" className="max-h-72 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">Transparent PNG — {formatFileSize(processedBlob.size)}</p>
            <Button onClick={() => download(file!.name.replace(/\.[^.]+$/, '') + '-no-bg.png')} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download PNG
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Process Another</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
