import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About Us — ImageKb"
        description="Learn about ImageKb, the free online image processing platform. Privacy-first, browser-based tools for everyone."
        canonicalPath="/about"
      />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About ImageKb</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            ImageKb is a free online platform providing fast, private image processing tools that run entirely in your browser. We believe image editing should be accessible to everyone, without requiring expensive software, account registrations, or uploading sensitive files to unknown servers.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
          <p>
            Our mission is to provide the best free online image tools that are fast, private, and easy to use. Every tool on our platform processes images locally on your device using modern browser APIs. Your files never leave your computer.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Privacy First</h2>
          <p>
            Unlike most online image tools, we don't upload your images to any server. All processing happens in your browser using the HTML5 Canvas API and File API. This means your photos, documents, and signatures remain completely private. No data collection, no tracking, no cloud storage.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Our Tools</h2>
          <p>
            We offer a comprehensive suite of image tools including format converters (JPG, PNG, WebP), image compression, resizing, cropping, passport photo creation, signature resizing, image-to-PDF conversion, and DPI adjustment. Each tool is designed to be simple, fast, and effective.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Technology</h2>
          <p>
            ImageKb is built with modern web technologies including React, TypeScript, and the HTML5 Canvas API. Our tools work on all modern browsers and devices, including mobile phones and tablets. After the initial page load, most tools work offline.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Why Choose ImageKb?</h2>
          <p>
            In a world where most image tools require you to upload your files to a remote server, ImageKb stands apart by keeping everything local. We understand that your images — whether they are personal photographs, scanned documents, official identification photos, or professional signatures — are sensitive. That is why we built every tool from the ground up to process files entirely within your browser, using client-side JavaScript and the HTML5 Canvas API. There is no backend processing, no temporary file storage, and no hidden data pipelines.
          </p>
          <p>
            Our platform is designed for speed and simplicity. Whether you need to convert a JPG file to PNG format, compress an image down to a specific file size in kilobytes, resize a photo to exact pixel dimensions, or create a passport-sized photo that meets government specifications, ImageKb has you covered. Each tool loads instantly, presents a clean and intuitive interface, and delivers results in seconds — regardless of whether you are using a desktop computer, a tablet, or a mobile phone.
          </p>
          <p>
            We also believe that powerful tools should be free. There are no premium tiers, no watermarks on your output, no limits on the number of files you can process, and no registration required. ImageKb is and always will be free to use. Our goal is to remove barriers between people and the image tools they need, whether they are a student preparing documents for a visa application, a freelancer optimizing images for a website, or a professional adjusting print-resolution files for a publication.
          </p>
          <p>
            Accessibility is at the heart of everything we do. Our interface is designed with semantic HTML, proper contrast ratios, and keyboard navigation support. We test across a wide range of devices and browsers to ensure that everyone can use ImageKb comfortably, regardless of their technical setup or physical abilities. After the initial page load, most tools continue to work even without an active internet connection, making ImageKb a reliable companion in low-connectivity environments.
          </p>
          <p>
            We are constantly improving and expanding our toolkit. If you have suggestions for new features or tools you would like to see, we welcome your feedback through our Contact page. ImageKb is built for you, and your input helps shape the future of the platform.
          </p>
        </div>
      </div>
    </Layout>
  );
}
