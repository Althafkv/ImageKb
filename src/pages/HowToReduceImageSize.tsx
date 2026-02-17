import ToolPageLayout from "@/components/ToolPageLayout";

export default function HowToReduceImageSize() {
  return (
    <ToolPageLayout
      title="How to Reduce Image Size for Online Forms"
      metaTitle="Fix Image Upload Error – Reduce Photo Size for Job & Exam Forms"
      metaDescription="Learn how to reduce image size to 10KB, 20KB, 50KB or 100KB for online applications. Step-by-step guide."
      canonicalPath="/how-to-reduce-image-size"
      description="Step by step guide to fix photo upload errors in government and job application forms."
      howToSteps={[
        "Compress the image to required KB size",
        "Resize dimensions if required",
        "Set proper DPI",
        "Upload successfully without rejection",
      ]}
      faqs={[
        {
          question: "Why is my photo not uploading?",
          answer:
            "Most portals reject images because file size exceeds KB limit or dimensions are incorrect.",
        },
        {
          question: "What is best size for online forms?",
          answer:
            "Usually between 20KB and 200KB depending on portal requirements.",
        },
        {
          question: "Does compression reduce quality?",
          answer:
            "Good compression keeps visual quality while reducing file size.",
        },
      ]}
      contentSections={[
        {
          title: "Reduce Image Size for Online Applications",
          content: `Many government and job portals reject uploads because images are too large. Modern mobile photos are 2MB to 8MB while forms usually allow only 10KB to 200KB.`,
        },
        {
          title: "Step 1 — Compress Image",
          content: `Use the compress image tool to reduce file size:
https://www.imagekb.online/compress-image`,
        },
        {
          title: "Step 2 — Resize Dimensions",
          content: `Some portals require fixed width and height:
https://www.imagekb.online/resize-image`,
        },
        {
          title: "Step 3 — Change DPI",
          content: `Certain applications require 300 DPI:
https://www.imagekb.online/change-dpi`,
        },
        {
          title: "Fix Signature Upload Error",
          content: `Resize signature properly:
https://www.imagekb.online/signature-resizer`,
        },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6 text-base leading-7">
        <h2>Common Upload Errors</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Image must be less than 50KB</li>
          <li>Signature should be under 20KB</li>
          <li>Invalid dimensions</li>
          <li>Upload failed</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          By compressing image size, fixing dimensions, and setting DPI
          correctly, you can upload photos to any portal without rejection.
        </p>
      </div>
    </ToolPageLayout>
  );
}
