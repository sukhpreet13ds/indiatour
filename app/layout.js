import "./globals.css";

export const metadata = {
  title: "India Tour Experiences | Thoughtfully Crafted, Personally Yours",
  description: "Discover India's timeless beauty with bespoke luxury itineraries, Japanese-speaking concierge, and mindful journeys.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500;600&family=Noto+Serif:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome 6 Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* RemixIcon */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
