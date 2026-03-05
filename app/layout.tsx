import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookYachtParty – Rent a Yacht in Marbella with Free DJ Included",
  description:
    "Rent a luxury yacht in Marbella with a professional DJ included for free. Puerto Banús, Mediterranean. 5-star experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3E7C58RCKE" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3E7C58RCKE');
              gtag('config', 'AW-758350698');
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
