import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata = {
  title: 'Alohie Lodge – Affordable & Best Stay',
  description: 'Book your comfortable and affordable stay at Alohie Lodge. Clean rooms, great location, and warm hospitality. Single, Double & Family rooms available.',
  keywords: 'lodge, hotel, affordable stay, rooms, booking, accommodation',
  openGraph: {
    title: 'Alohie Lodge – Affordable & Best Stay',
    description: 'Book your comfortable and affordable stay at Alohie Lodge.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/color-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/color-logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/color-logo.png',
    apple: [
      { url: '/color-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/color-logo.png" />
        <link rel="apple-touch-icon" href="/color-logo.png" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
