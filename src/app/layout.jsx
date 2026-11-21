export const metadata = {
  title: { default: "EKTAZEPT | Technology for what's next", template: "%s | EKTAZEPT" },
  description: "EKTAZEPT provides IT services and software development for organizations ready to move forward.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }) {
  return <html lang="en"><body className="m-0 p-0 text-base leading-relaxed text-ink font-sans bg-paper scroll-smooth">{children}</body></html>;
}
