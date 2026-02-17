// Map paths to their lazy import functions for preloading
const routeImports: Record<string, () => Promise<unknown>> = {
  '/jpg-to-png': () => import('@/pages/JpgToPng'),
  '/png-to-jpg': () => import('@/pages/PngToJpg'),
  '/webp-to-jpg': () => import('@/pages/WebpToJpg'),
  '/compress-image': () => import('@/pages/CompressImage'),
  '/resize-image': () => import('@/pages/ResizeImage'),
  '/passport-photo-maker': () => import('@/pages/PassportPhotoMaker'),
  '/signature-resizer': () => import('@/pages/SignatureResizer'),
  '/image-to-pdf': () => import('@/pages/ImageToPdf'),
  
  '/change-dpi': () => import('@/pages/ChangeDpi'),
  '/about': () => import('@/pages/About'),
  '/contact': () => import('@/pages/Contact'),
  '/privacy': () => import('@/pages/Privacy'),
  '/terms': () => import('@/pages/Terms'),
};

const preloaded = new Set<string>();

export function preloadRoute(path: string) {
  if (preloaded.has(path)) return;
  preloaded.add(path);
  const loader = routeImports[path];
  if (loader) loader();
}

export function preloadAllRoutes() {
  // Preload all routes after a short idle delay
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      Object.keys(routeImports).forEach(preloadRoute);
    });
  } else {
    setTimeout(() => {
      Object.keys(routeImports).forEach(preloadRoute);
    }, 2000);
  }
}
