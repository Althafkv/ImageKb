import ToolPageLayout from '@/components/ToolPageLayout';
import FileUploader from '@/components/FileUploader';
import { useImageTool } from '@/hooks/useImageTool';
import { convertFormat, formatFileSize } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

export default function JpgToPng() {
  const { file, originalPreview, processedBlob, processedPreview, isProcessing, error, handleFileSelect, processImage, download, reset } = useImageTool();

  return (
    <ToolPageLayout
      title="JPG to PNG Converter"
      metaTitle="Convert JPG to PNG Online Free"
      metaDescription="Free online JPG to PNG converter. Convert images instantly without losing quality on mobile or desktop."
      canonicalPath="/jpg-to-png"
      description="Convert your JPG images to PNG format instantly in your browser. Your files stay private — nothing is uploaded."
      howToSteps={[
        'Upload your JPG image by dragging it into the area above or clicking to browse files.',
        'Click "Convert to PNG" to start the conversion process.',
        'Preview the result and click "Download PNG" to save the converted file.',
      ]}
      faqs={[
        { question: 'Is this JPG to PNG converter free?', answer: 'Yes, completely free with no limits on the number of conversions. No registration required.' },
        { question: 'Are my images uploaded to a server?', answer: 'No. All processing happens directly in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy.' },
        { question: 'Will converting JPG to PNG increase file size?', answer: 'Yes, typically. PNG uses lossless compression while JPG uses lossy compression. However, PNG supports transparency and preserves quality perfectly for future edits.' },
        { question: 'Does converting to PNG improve quality?', answer: 'Converting from JPG to PNG will not restore quality lost during JPG compression, but it prevents further quality degradation in subsequent saves.' },
        { question: 'What is the maximum file size supported?', answer: 'There is no strict file size limit. However, very large images may take longer to process depending on your device capabilities.' },
      ]}
      contentSections={[
        {
          title: 'Why Convert JPG to PNG?',
          content: `JPG (JPEG) and PNG are two of the most widely used image formats on the web. While JPG excels at compressing photographs into small file sizes, PNG offers distinct advantages that make conversion worthwhile in many scenarios.

PNG supports transparency (alpha channel), making it essential for logos, icons, graphics with transparent backgrounds, and web design elements. Unlike JPG, PNG uses lossless compression, meaning no image data is lost when saving. This makes PNG ideal for images that will be edited multiple times, screenshots with text, technical diagrams, and any graphic where sharp edges and text clarity are important.

Converting JPG to PNG is commonly needed when you want to add the image to a design project, overlay it on different backgrounds, or ensure maximum quality preservation for archival purposes. Web developers and graphic designers frequently convert between formats to optimize images for different use cases.`,
        },
        {
          title: 'How Our Browser-Based Converter Works',
          content: `Our JPG to PNG converter leverages modern browser technologies — specifically the HTML5 Canvas API and File API — to process your images entirely on your device. When you upload a JPG file, the browser reads the image data, renders it onto an invisible canvas element, and then exports it in PNG format.

This approach offers several key advantages over server-based converters. First, your images never leave your device, providing absolute privacy and security. Second, the conversion is nearly instantaneous since there's no upload/download time. Third, the tool works offline after the initial page load, perfect for converting images without an internet connection.

The converter preserves the original resolution and color depth of your image. Since PNG is a lossless format, the output will contain every pixel from the original JPG, now stored without any compression artifacts. This makes our tool perfect for designers, developers, photographers, and anyone who needs to change image formats quickly and privately.`,
        },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <FileUploader accept="image/jpeg,image/jpg,.jpg,.jpeg" onFilesSelected={handleFileSelect} file={file} onClear={reset} />

        {file && !processedBlob && (
          <div className="space-y-4">
            {originalPreview && (
              <div className="rounded-xl overflow-hidden border bg-card p-2">
                <img src={originalPreview} alt="Original JPG" className="max-h-72 mx-auto object-contain" />
              </div>
            )}
            <Button onClick={() => processImage((f) => convertFormat(f, 'png'))} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting...</> : 'Convert to PNG'}
            </Button>
          </div>
        )}

        {error && <p className="text-destructive text-center text-sm">{error}</p>}

        {processedBlob && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-card p-2">
              <img src={processedPreview} alt="Converted PNG" className="max-h-72 mx-auto object-contain" />
            </div>
            <p className="text-center text-sm text-muted-foreground">Output: {formatFileSize(processedBlob.size)}</p>
            <Button onClick={() => download(file!.name.replace(/\.(jpg|jpeg)$/i, '.png'))} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" /> Download PNG
            </Button>
            <Button variant="outline" onClick={reset} className="w-full">Convert Another Image</Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
