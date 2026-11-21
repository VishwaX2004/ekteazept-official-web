import "./globals.css";

export const metadata = {
  title: { default: "EKTAZECT | Technology for what's next", template: "%s | EKTAZECT" },
  description: "EKTAZECT provides IT services and software development for organizations ready to move forward.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
