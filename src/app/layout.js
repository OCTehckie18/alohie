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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
