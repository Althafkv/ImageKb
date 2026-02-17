import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

export default function Terms() {
  return (
    <Layout>
      <SEOHead
        title="Terms & Conditions — ImageKb"
        description="Terms and conditions for using ImageKb. Read our terms of service before using our free online image tools."
        canonicalPath="/terms"
      />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Acceptance of Terms</h2>
            <p>By accessing and using ImageKb, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you should not use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Use of Services</h2>
            <p>ImageKb provides free online image processing tools. You may use these tools for personal and commercial purposes. You are responsible for ensuring you have the right to process any images you upload.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">No Warranty</h2>
            <p>Our tools are provided "as is" without any warranties, expressed or implied. We do not guarantee that the tools will be error-free, uninterrupted, or meet your specific requirements. Processing results may vary depending on your browser and device capabilities.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Limitation of Liability</h2>
            <p>ImageKb shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our services. This includes but is not limited to loss of data, image quality degradation, or inability to process files.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Intellectual Property</h2>
            <p>All content on this website, including but not limited to text, graphics, logos, and software, is the property of ImageKb and is protected by intellectual property laws. You retain full ownership of any images you process using our tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
            <p>For questions about these terms, please contact us through our Contact page.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Detailed Terms of Use</h2>
            <p>
              By using ImageKb, you acknowledge and agree that all image processing occurs entirely within your web browser. No files are uploaded to our servers at any point during the conversion, compression, resizing, or editing process. As a result, ImageKb does not have access to, and cannot be held responsible for, the content of any images you process using our tools. You are solely responsible for ensuring that you have the legal right to use, modify, and distribute any images you process on this platform.
            </p>
            <p>
              You agree not to use ImageKb for any unlawful purpose or in any manner that could damage, disable, or impair the website or interfere with other users' access to the service. While our tools are free and open for both personal and commercial use, you may not attempt to reverse-engineer, decompile, or extract the source code of our proprietary tools and algorithms beyond what is visible in the browser's standard developer tools. You also agree not to use automated scripts, bots, or crawlers to access the website in a way that places unreasonable load on our infrastructure.
            </p>
            <p>
              ImageKb makes no representations or warranties regarding the accuracy, reliability, or completeness of the processing results. Image quality, file size reduction, and format conversion outcomes depend on a variety of factors including the original file characteristics, your browser's capabilities, your device's processing power, and the specific settings you choose within each tool. We strongly recommend that you keep backup copies of your original files before processing them, as we cannot recover or restore any images once they have been modified or the browser tab has been closed.
            </p>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by ImageKb. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that ImageKb shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of any such third-party content, goods, or services.
            </p>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. If any provision of these terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision of these terms shall not constitute a waiver of that right or provision. These terms constitute the entire agreement between you and ImageKb regarding your use of the website and supersede any prior agreements or understandings.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
