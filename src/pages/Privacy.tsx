import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

export default function Privacy() {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy — ImageKb"
        description="Privacy policy for ImageKb. Learn how we protect your data and ensure your images remain private."
        canonicalPath="/privacy"
      />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
            <p>ImageKb is committed to protecting your privacy. This privacy policy explains how we handle your data when you use our website and image processing tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Image Processing</h2>
            <p>All image processing on ImageKb happens entirely in your web browser. Your images are never uploaded to our servers or any third-party servers. We do not store, access, or transmit your image files in any way. When you close the browser tab, all processed images are removed from memory.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Data Collection</h2>
            <p>We may collect anonymous usage analytics to improve our services, including page views and tool usage frequency. This data does not contain any personally identifiable information or image data. We use cookies only for essential website functionality and analytics.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Third-Party Services</h2>
            <p>We may use third-party analytics services that collect anonymous browsing data. We may display advertisements through Google AdSense or similar services, which may use cookies to serve relevant ads. These services have their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Cookies</h2>
            <p>We use essential cookies for website functionality. Third-party advertising and analytics services may also set cookies. You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
            <p>If you have questions about this privacy policy, please contact us through our Contact page.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Rights and Data Protection</h2>
            <p>
              At ImageKb, we take your data protection rights seriously. Because our image processing tools run entirely within your browser, the vast majority of your interactions with our platform generate no personal data on our end. There are no user accounts, no login credentials stored, and no image files transmitted to or from our infrastructure. This privacy-by-design approach means that most traditional data protection concerns simply do not apply to ImageKb.
            </p>
            <p>
              However, we want to be transparent about the limited data we do interact with. When you visit our website, standard web server logs may record your IP address, browser type, referring URL, and the pages you visit. This information is used solely for maintaining website security, diagnosing technical issues, and understanding aggregate traffic patterns. We do not attempt to identify individual users from this data, and server logs are automatically purged on a regular basis.
            </p>
            <p>
              If we use third-party analytics services such as Google Analytics, these services may place cookies on your device to collect anonymized browsing behavior. You have the right to opt out of analytics tracking by adjusting your browser's cookie settings, using browser extensions designed to block tracking scripts, or enabling "Do Not Track" signals in your browser. We respect these preferences wherever technically feasible.
            </p>
            <p>
              For users located in the European Union, you are entitled to rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, or delete any personal data we may hold. Given that we collect minimal data, these requests are typically straightforward. Users in California may have additional rights under the California Consumer Privacy Act (CCPA). In either case, you can reach out to us through our Contact page, and we will respond to your inquiry promptly.
            </p>
            <p>
              We do not sell, rent, or share any user data with third parties for marketing purposes. Any third-party services integrated into our website operate under their own privacy policies, and we encourage you to review those policies independently. We are committed to maintaining the highest standards of privacy and will update this policy as needed to reflect changes in our practices or applicable regulations. Any significant changes will be clearly noted with an updated revision date at the top of this page.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
