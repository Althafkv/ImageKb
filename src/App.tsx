import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "./components/ScrollToTop";
import HowToReduceImageSize from "./pages/HowToReduceImageSize";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const JpgToPng = lazy(() => import("./pages/JpgToPng"));
const PngToJpg = lazy(() => import("./pages/PngToJpg"));
const WebpToJpg = lazy(() => import("./pages/WebpToJpg"));
const CompressImage = lazy(() => import("./pages/CompressImage"));
const ResizeImage = lazy(() => import("./pages/ResizeImage"));
const PassportPhotoMaker = lazy(() => import("./pages/PassportPhotoMaker"));
const SignatureResizer = lazy(() => import("./pages/SignatureResizer"));
const ImageToPdf = lazy(() => import("./pages/ImageToPdf"));

const ChangeDpi = lazy(() => import("./pages/ChangeDpi"));
const CompressPdf = lazy(() => import("./pages/CompressPdf"));
const RemoveBackground = lazy(() => import("./pages/RemoveBackground"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));


const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jpg-to-png" element={<JpgToPng />} />
              <Route path="/png-to-jpg" element={<PngToJpg />} />
              <Route path="/webp-to-jpg" element={<WebpToJpg />} />
              <Route path="/compress-image" element={<CompressImage />} />
              <Route path="/resize-image" element={<ResizeImage />} />
              <Route path="/passport-photo-maker" element={<PassportPhotoMaker />} />
              <Route path="/signature-resizer" element={<SignatureResizer />} />
              <Route path="/image-to-pdf" element={<ImageToPdf />} />
              
              <Route path="/change-dpi" element={<ChangeDpi />} />
              <Route path="/compress-pdf" element={<CompressPdf />} />
              <Route path="/remove-background" element={<RemoveBackground />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/how-to-reduce-image-size" element={<HowToReduceImageSize />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
