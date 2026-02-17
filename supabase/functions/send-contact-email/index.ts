import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { from_name, from_email, message } = await req.json();

    if (!from_name || !from_email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const serviceId = Deno.env.get("VITE_EMAILJS_SERVICE_ID");
    const autoReplyTemplateId = Deno.env.get("VITE_EMAILJS_TEMPLATE_ID");
    const adminTemplateId = Deno.env.get("EMAILJS_ADMIN_TEMPLATE_ID");
    const publicKey = Deno.env.get("VITE_EMAILJS_PUBLIC_KEY");
    const privateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");

    if (!serviceId || !autoReplyTemplateId || !adminTemplateId || !publicKey || !privateKey) {
      console.error("Missing EmailJS env vars:", {
        hasServiceId: !!serviceId,
        hasAutoReplyTemplateId: !!autoReplyTemplateId,
        hasAdminTemplateId: !!adminTemplateId,
        hasPublicKey: !!publicKey,
        hasPrivateKey: !!privateKey,
      });
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const templateParams = { name: from_name, email: from_email, title: message, message };

    const fetchHeaders = {
      "Content-Type": "application/json",
      "Origin": "https://imagekb.com",
      "User-Agent": "Mozilla/5.0",
    };

    // Send both emails in parallel
    const [adminResponse, autoReplyResponse] = await Promise.all([
      // 1. Admin notification to althafwayanad@gmail.com
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify({
          service_id: serviceId,
          template_id: adminTemplateId,
          user_id: publicKey,
          accessToken: privateKey,
          template_params: templateParams,
        }),
      }),
      // 2. Auto-reply to the user
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify({
          service_id: serviceId,
          template_id: autoReplyTemplateId,
          user_id: publicKey,
          accessToken: privateKey,
          template_params: templateParams,
        }),
      }),
    ]);

    const adminOk = adminResponse.ok;
    const autoReplyOk = autoReplyResponse.ok;

    if (!adminOk) {
      const errorText = await adminResponse.text();
      console.error("EmailJS admin email error:", errorText);
    } else {
      await adminResponse.text();
    }

    if (!autoReplyOk) {
      const errorText = await autoReplyResponse.text();
      console.error("EmailJS auto-reply error:", errorText);
    } else {
      await autoReplyResponse.text();
    }

    if (!adminOk && !autoReplyOk) {
      return new Response(JSON.stringify({ error: "Failed to send emails" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, adminSent: adminOk, autoReplySent: autoReplyOk }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
