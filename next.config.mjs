/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/team.html", destination: "/team", permanent: true },
      { source: "/solutions.html", destination: "/solutions", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/flow.html", destination: "/products/flow", permanent: true },
      { source: "/pulse.html", destination: "/products/pulse", permanent: true },
      { source: "/vault.html", destination: "/products/vault", permanent: true },
      { source: "/mesh.html", destination: "/products/mesh", permanent: true },
      { source: "/id.html", destination: "/products/id", permanent: true },
      { source: "/pricing.html", destination: "/pricing", permanent: true },
      { source: "/resources.html", destination: "/resources", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true }
    ];
  }
};

export default nextConfig;
