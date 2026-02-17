import { useState, useCallback } from 'react';

export function useImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState('');
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [processedPreview, setProcessedPreview] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = useCallback((files: File[]) => {
    const f = files[0];
    if (f) {
      setFile(f);
      setOriginalPreview(URL.createObjectURL(f));
      setProcessedBlob(null);
      setProcessedPreview('');
      setError('');
    }
  }, []);

  const processImage = useCallback(
    async (fn: (file: File) => Promise<Blob>) => {
      if (!file) return;
      setIsProcessing(true);
      setError('');
      try {
        const blob = await fn(file);
        setProcessedBlob(blob);
        setProcessedPreview(URL.createObjectURL(blob));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Processing failed. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    },
    [file]
  );

  const download = useCallback(
    (filename: string) => {
      if (!processedBlob) return;
      const url = URL.createObjectURL(processedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [processedBlob]
  );

  const reset = useCallback(() => {
    setFile(null);
    setOriginalPreview('');
    setProcessedBlob(null);
    setProcessedPreview('');
    setError('');
  }, []);

  return {
    file,
    originalPreview,
    processedBlob,
    processedPreview,
    isProcessing,
    error,
    handleFileSelect,
    processImage,
    download,
    reset,
  };
}
