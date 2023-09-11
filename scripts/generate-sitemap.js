import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const routes = [
    { path: "/", priority: 1.0 },
    { path: "/thank-you", priority: 0.8 },
    { path: "/about-us", priority: 0.8 },
    { path: "/contact-us", priority: 0.8 },
    { path: "/policies/privacy-policy", priority: 0.8 },
    { path: "/become-an-affiliate", priority: 0.8 },
    { path: "/policies/terms-of-service", priority: 0.8 },
    { path: "/policies/shipping-policy", priority: 0.8 },
    { path: "/policies/refund-policy", priority: 0.8 },
];

const links = routes.map(route => ({ url: route.path, changefreq: 'monthly', priority: route.priority }));

const stream = new SitemapStream({ hostname: 'https://www.artefice.ai' });

// Write each link to the stream
links.forEach(link => {
  stream.write(link);
});

// End the stream
stream.end();

// Wait for the stream to finish and write the result to a file
streamToPromise(stream).then((data) => {
  createWriteStream('./public/sitemap.xml').write(data.toString());
});
