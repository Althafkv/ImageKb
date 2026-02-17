import ToolPageLayout from '@/components/ToolPageLayout';

export default function HowToReduceImageSize() {
  return (
    <ToolPageLayout
      title="How to Fix Photo Upload Error in Online Application Forms"
      metaTitle="Fix Photo Upload Error – Reduce Image Size, DPI & Dimensions"
      metaDescription="Step-by-step guide to fix image upload errors in job and exam forms. Reduce image size, resize dimensions and set correct DPI."
      canonicalPath="/how-to-reduce-image-size"
      description="Learn why online forms reject your photo and how to fix size, dimension and DPI errors easily."
      howToSteps={[
        'Compress image to required KB',
        'Resize dimensions properly',
        'Adjust DPI if required',
        'Upload successfully without rejection'
      ]}
      faqs={[
        {
          question: 'Why is my photo not uploading?',
          answer: 'Most portals reject images because file size exceeds KB limit or dimensions are incorrect.'
        },
        {
          question: 'What size photo is required for online forms?',
          answer: 'Usually between 20KB and 200KB depending on the application.'
        },
        {
          question: 'Does compression reduce quality?',
          answer: 'Proper compression keeps image visually clear while reducing size.'
        }
      ]}
      contentSections={[
        {
          title: 'Why Online Forms Reject Photos',
          content: `Modern mobile photos are usually 2MB to 8MB, but most government and job portals allow only 10KB to 200KB images. This mismatch causes upload failure errors.`
        },
        {
          title: 'Step 1 — Reduce File Size',
          content: `Use an image compressor to reduce your photo to the required KB size before uploading.`
        },
        {
          title: 'Step 2 — Fix Dimensions',
          content: `Many forms require exact width and height, so resizing is necessary to avoid rejection.`
        },
        {
          title: 'Step 3 — Adjust DPI',
          content: `Some portals require specific DPI such as 300 DPI for proper clarity and acceptance.`
        },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6 text-base leading-7">

        <h2 className="text-2xl font-semibold">Common Upload Errors</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Image must be less than specific KB</li>
          <li>Invalid dimensions</li>
          <li>Upload failed</li>
          <li>Incorrect DPI</li>
        </ul>

        <h2 className="text-2xl font-semibold">Before Upload Checklist</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>File size matches requirement</li>
          <li>Dimensions correct</li>
          <li>Face clearly visible</li>
          <li>Background clean</li>
          <li>Format JPG/JPEG</li>
        </ul>

        <h2 className="text-2xl font-semibold">Conclusion</h2>
        <p>
          Almost every upload rejection happens due to size, dimensions or DPI mismatch.
          Fix them in order — compress, resize, then adjust DPI — and your photo will upload successfully.
        </p>

        {/* INTERNAL LINKS FOR GOOGLE TRUST */}
        <h2 className="text-2xl font-semibold">Tools You Can Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="/compress-image" className="text-blue-600 underline">Compress Image to Required KB</a></li>
          <li><a href="/resize-image" className="text-blue-600 underline">Resize Image Dimensions</a></li>
          <li><a href="/change-dpi" className="text-blue-600 underline">Change Image DPI</a></li>
          <li><a href="/signature-resizer" className="text-blue-600 underline">Resize Signature</a></li>
          <li><a href="/remove-background" className="text-blue-600 underline">Remove Background</a></li>
        </ul>

      </div>
    </ToolPageLayout>
  );
}
