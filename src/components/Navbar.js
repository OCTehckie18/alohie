'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { lodgeInfo } from '@/data/rooms';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <a href={`tel:${lodgeInfo.phone}`} className={styles.topLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            {lodgeInfo.phone}
          </a>
          <a href={`mailto:${lodgeInfo.email}`} className={styles.topLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {lodgeInfo.email}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo} id="nav-logo">
            <Image src="/color-logo.png" alt="Alohie Lodge" width={120} height={48} priority />
          </Link>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`} id="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.link}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className={styles.navCta}>
              <Link href="/booking" className={`btn btn-primary btn-sm ${styles.bookBtn}`} onClick={() => setMenuOpen(false)}>
                Book Now
              </Link>
            </li>
          </ul>

          <div className={styles.navActions}>
            <Link href="/booking" className={`btn btn-primary btn-sm ${styles.bookBtnDesktop}`}>
              Book Now
            </Link>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
      </nav>
    </>
  );
}
