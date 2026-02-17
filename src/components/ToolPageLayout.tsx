import { ReactNode } from 'react';
import Layout from './Layout';
import SEOHead from './SEOHead';
import AdPlaceholder from './AdPlaceholder';
import FAQSection from './FAQSection';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  description: string;
  children: ReactNode;
  howToSteps: string[];
  faqs: FAQ[];
  contentSections: { title: string; content: string }[];
}

export default function ToolPageLayout({
  title,
  metaTitle,
  metaDescription,
  canonicalPath,
  description,
  children,
  howToSteps,
  faqs,
  contentSections,
}: ToolPageLayoutProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <Layout>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonicalPath={canonicalPath}
        jsonLd={faqJsonLd}
      />

      {/* Tool header with gradient background */}
      <div className="hero-gradient-subtle border-b">
        <div className="container mx-auto px-4 pt-6 pb-8 sm:pt-8 sm:pb-10">
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-10">
        <AdPlaceholder position="top" />

        {/* Tool area */}
        <div className="mb-14">{children}</div>

        <AdPlaceholder position="middle" />

        {/* How to use section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-8">How to Use</h2>
          <div className="grid gap-5">
            {howToSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-card rounded-xl border p-5 shadow-sm">
                <div className="flex-shrink-0 w-9 h-9 rounded-full hero-gradient flex items-center justify-center text-sm font-bold text-primary-foreground shadow-sm">
                  {i + 1}
                </div>
                <p className="pt-1 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content sections */}
        {contentSections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </section>
        ))}

        <FAQSection faqs={faqs} />

        <AdPlaceholder position="bottom" />
      </div>
    </Layout>
  );
}
