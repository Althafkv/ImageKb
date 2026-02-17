import { useCallback, useRef, useState } from 'react';
import { Upload, X, ImageIcon, CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/imageProcessing';

interface FileUploaderProps {
  accept: string;
  onFilesSelected: (files: File[]) => void;
  multiple?: boolean;
  file?: File | null;
  onClear?: () => void;
  dropLabel?: string;
}

export default function FileUploader({
  accept,
  onFilesSelected,
  multiple = false,
  file,
  onClear,
  dropLabel = 'Drop your image here',
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        onFilesSelected(Array.from(e.target.files));
      }
    },
    [onFilesSelected]
  );

  if (file) {
    return (
      <div className="rounded-2xl border-2 border-primary/20 bg-accent/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium truncate max-w-[200px] sm:max-w-none">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
          </div>
          {onClear && (
            <Button variant="ghost" size="icon" onClick={onClear} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative rounded-2xl border-2 border-dashed p-10 sm:p-16 text-center cursor-pointer transition-all duration-300 ${
        isDragging
          ? 'border-primary bg-accent scale-[1.01]'
          : 'border-border hover:border-primary/40 hero-gradient-subtle'
      }`}
    >
      <div className="w-16 h-16 rounded-2xl hero-gradient mx-auto mb-5 flex items-center justify-center shadow-lg">
        <CloudUpload className="h-7 w-7 text-primary-foreground" />
      </div>
      <p className="text-xl font-semibold mb-1">{dropLabel}</p>
      <p className="text-sm text-muted-foreground mb-5">or click to browse from your device</p>
      <Button type="button" size="lg" className="rounded-xl px-8">
        Select File{multiple ? 's' : ''}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
