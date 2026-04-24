import styles from './page.module.css';
import { lodgeInfo } from '@/data/rooms';

export const metadata = {
  title: 'Contact Us | Alohie Lodge',
  description: 'Get in touch with Alohie Lodge in Bangalore. We are here to help you with your bookings and queries.',
};

export default function ContactPage() {
  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Contact & Location</h1>
          <p className={styles.subtitle}>
            We're here to help. Reach out anytime.
          </p>
        </div>
      </section>

      <section className={`section ${styles.contactSection}`}>
        <div className={`container ${styles.grid}`}>
          
          <div className={styles.infoCards}>
            {/* Phone */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <h3>Reservations</h3>
              </div>
              <p>Available 24/7 for bookings & queries</p>
              <span className={styles.cardValue}>{lodgeInfo.phone}</span>
              <a href={`tel:${lodgeInfo.phone}`} className="btn btn-outline btn-sm">Call Now</a>
            </div>

            {/* WhatsApp */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} style={{ color: '#25D366' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <h3>WhatsApp</h3>
              </div>
              <p>Quick responses & instant confirmations</p>
              <a href={`https://wa.me/${lodgeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">Chat on WhatsApp</a>
            </div>

            {/* Address */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <h3>Our Location</h3>
              </div>
              <p>{lodgeInfo.address}</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(lodgeInfo.address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <iframe
              src={lodgeInfo.mapEmbedUrl}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alohie Lodge Location Map"
            ></iframe>
          </div>

        </div>
      </section>
    </main>
  );
}
