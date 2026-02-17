import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { tools } from '@/lib/toolsData';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoImg} alt="ImageKb logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-lg font-bold text-gradient">ImageKb</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-1 mt-8">
                {navLinks.map((l) => (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 text-base rounded-lg hover:bg-muted transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="border-t pt-3 mt-3">
                  <p className="px-3 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    Tools
                  </p>
                  {tools.map((t) => (
                    <Link
                      key={t.id}
                      to={t.path}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t pt-3 mt-3">
                  <Link to="/privacy" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">Privacy Policy</Link>
                  <Link to="/terms" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">Terms & Conditions</Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="footer-gradient border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/80">Converters</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/jpg-to-png" className="hover:text-primary transition-colors">JPG to PNG</Link>
                <Link to="/png-to-jpg" className="hover:text-primary transition-colors">PNG to JPG</Link>
                <Link to="/webp-to-jpg" className="hover:text-primary transition-colors">WebP to JPG</Link>
                <Link to="/image-to-pdf" className="hover:text-primary transition-colors">Image to PDF</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/80">Image Tools</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/compress-image" className="hover:text-primary transition-colors">Compress Image</Link>
                <Link to="/resize-image" className="hover:text-primary transition-colors">Resize Image</Link>
                
                <Link to="/change-dpi" className="hover:text-primary transition-colors">Change DPI</Link>
                <Link to="/compress-pdf" className="hover:text-primary transition-colors">Compress PDF</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/80">Specialty</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/passport-photo-maker" className="hover:text-primary transition-colors">Passport Photo</Link>
                <Link to="/signature-resizer" className="hover:text-primary transition-colors">Signature Resizer</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/80">Company</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="ImageKb logo" className="w-6 h-6 rounded-md object-cover" />
              <span className="text-sm font-semibold text-gradient">ImageKb</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ImageKb. All processing happens in your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
