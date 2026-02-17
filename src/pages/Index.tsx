import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { tools } from '@/lib/toolsData';
import { preloadAllRoutes } from '@/lib/routePreloader';
import { Search, Shield, Zap, Wifi } from 'lucide-react';
import { Input } from '@/components/ui/input';

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Process images instantly in your browser' },
  { icon: Shield, title: '100% Private', desc: 'Files never leave your device' },
  { icon: Wifi, title: 'Works Offline', desc: 'No internet needed after page load' },
];

export default function Index() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    preloadAllRoutes();
  }, []);

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.keywords.some((k) => k.includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <SEOHead
        title="ImageKb — Free Online Image Converter & Compressor"
        description="Convert, compress, resize, and edit images online for free. JPG to PNG, image compressor, passport photo maker, and more. 100% browser-based — your files never leave your device."
        canonicalPath="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient py-20 md:py-28">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-5 leading-tight">
                Free Online
                <br />
                Image Tools
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto">
                Convert, compress, resize, and edit images — entirely in your browser. Fast, free, and private.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search tools... (e.g., compress, resize, passport)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 h-12 rounded-xl bg-background/95 border-0 shadow-lg text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="container mx-auto px-4 -mt-6 relative z-20">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-2.5 bg-card rounded-full px-5 py-2.5 shadow-card border border-border/50">
                <f.icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold leading-tight">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder position="top" />

      {/* Tools grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">All Image Tools</h2>
          <p className="text-muted-foreground text-center mb-10">Choose a tool to get started — no signup required</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No tools found matching &ldquo;{search}&rdquo;
            </p>
          )}
        </div>
      </section>

      <AdPlaceholder position="bottom" />
    </Layout>
  );
}
