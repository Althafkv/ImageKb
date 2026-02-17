import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Thanks() {
  return (
    <Layout>
      <SEOHead
        title="Message Sent — ImageKb"
        description="Your message has been sent successfully."
        canonicalPath="/thanks"
      />
      <div className="container mx-auto px-4 py-24 max-w-xl text-center">
        <CheckCircle className="h-16 w-16 mx-auto text-primary mb-6" />
        <h1 className="text-3xl font-bold mb-4">Message Sent Successfully</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for reaching out. We will reply soon.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Send Another</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
