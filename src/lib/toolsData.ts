export interface ToolInfo {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  keywords: string[];
}

export const tools: ToolInfo[] = [
  { id: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert JPG images to PNG format with transparency support', path: '/jpg-to-png', icon: 'FileImage', keywords: ['jpg', 'png', 'convert', 'transparency'] },
  { id: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert PNG images to JPG format for smaller file sizes', path: '/png-to-jpg', icon: 'FileOutput', keywords: ['png', 'jpg', 'convert', 'compress'] },
  { id: 'webp-to-jpg', name: 'WebP to JPG', description: 'Convert WebP images to widely compatible JPG format', path: '/webp-to-jpg', icon: 'FileType', keywords: ['webp', 'jpg', 'convert'] },
  { id: 'compress-image', name: 'Compress Image', description: 'Reduce image file size in KB while maintaining quality', path: '/compress-image', icon: 'Minimize2', keywords: ['compress', 'reduce', 'size', 'kb', 'smaller'] },
  { id: 'resize-image', name: 'Resize Image', description: 'Change image dimensions with custom or preset sizes', path: '/resize-image', icon: 'Maximize2', keywords: ['resize', 'dimensions', 'width', 'height', 'scale'] },
  { id: 'passport-photo', name: 'Passport Photo Maker', description: 'Create standard passport size photos for any country', path: '/passport-photo-maker', icon: 'UserSquare', keywords: ['passport', 'photo', 'visa', 'id', 'biometric'] },
  { id: 'signature-resizer', name: 'Signature Resizer', description: 'Resize signature images to target file sizes (10–100 KB)', path: '/signature-resizer', icon: 'PenLine', keywords: ['signature', 'resize', 'kb', 'document'] },
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert single or multiple images to a PDF document', path: '/image-to-pdf', icon: 'FileText', keywords: ['image', 'pdf', 'convert', 'document'] },
  
  { id: 'change-dpi', name: 'Change DPI to 300', description: 'Adjust image resolution to 300 DPI for print-ready quality', path: '/change-dpi', icon: 'ScanLine', keywords: ['dpi', 'resolution', 'print', '300', 'ppi'] },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size while maintaining document quality', path: '/compress-pdf', icon: 'FileDown', keywords: ['pdf', 'compress', 'reduce', 'size', 'smaller'] },
  { id: 'remove-background', name: 'Remove Background', description: 'Remove image background instantly using AI — runs in your browser', path: '/remove-background', icon: 'Eraser', keywords: ['background', 'remove', 'transparent', 'cutout', 'ai'] },
];
