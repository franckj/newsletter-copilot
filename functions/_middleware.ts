// Send www and the newsletter-copilot.pages.dev copy to newslettercopilot.co (one indexable host).
// Per-deploy preview URLs (<hash>.newsletter-copilot.pages.dev) stay reachable; Cloudflare serves them with noindex.
export const onRequest: PagesFunction = async (context) => {
  try {
    const url = new URL(context.request.url);
    if (url.hostname === 'www.newslettercopilot.co' || url.hostname === 'newsletter-copilot.pages.dev') {
      url.hostname = 'newslettercopilot.co';
      return Response.redirect(url.toString(), 301);
    }
  } catch {}
  return context.next();
};
