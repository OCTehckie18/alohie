'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { rooms, lodgeInfo } from '@/data/rooms';

function getSuggestedRoomId(guestCount) {
  const count = Number(guestCount) || 1;
  const eligibleRooms = rooms
    .filter((room) => room.maxGuests >= count)
    .sort((a, b) => a.maxGuests - b.maxGuests);

  return eligibleRooms[0]?.id || rooms[rooms.length - 1]?.id || rooms[0].id;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room');
  const checkInParam = searchParams.get('checkIn') || '';
  const checkOutParam = searchParams.get('checkOut') || '';
  const guestsParam = searchParams.get('guests') || '1';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomType: roomParam || rooms[0].id,
    checkIn: checkInParam,
    checkOut: checkOutParam,
    guests: guestsParam,
    paymentMethod: 'pay_at_property',
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setNights(diffDays);
        const selectedRoom = rooms.find(r => r.id === formData.roomType);
        setTotalPrice(selectedRoom?.price == null ? 0 : selectedRoom.price * diffDays);
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  }, [formData.checkIn, formData.checkOut, formData.roomType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const nextState = { ...prev, [name]: value };

      if (name === 'guests') {
        nextState.roomType = getSuggestedRoomId(value);
      }

      return nextState;
    });
  };

  const handleBookNow = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut) {
      alert("Please fill in all required fields.");
      return;
    }

    const selectedRoom = rooms.find(r => r.id === formData.roomType) || rooms[0];
    const priceLine = selectedRoom?.price == null
      ? '*Price:* To be confirmed'
      : `*Total Amount:* ₹${totalPrice}`;

    const message = `*New Reservation Request* 🏨
    
*Name:* ${formData.name}
*Phone:* ${formData.phone}

*Room:* ${selectedRoom.name}
*Check-in:* ${formData.checkIn}
*Check-out:* ${formData.checkOut}
*Nights:* ${nights}
*Guests:* ${formData.guests}

*Payment Method:* ${formData.paymentMethod === 'upi' ? 'UPI (QR)' : 'Pay at Property'}
${priceLine}

Please confirm my booking.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${lodgeInfo.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  const selectedRoom = rooms.find(r => r.id === formData.roomType) || rooms[0];
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const suggestedRoomId = getSuggestedRoomId(formData.guests);
    if (suggestedRoomId && suggestedRoomId !== formData.roomType) {
      setFormData((prev) => ({ ...prev, roomType: suggestedRoomId }));
    }
  }, [formData.guests, formData.roomType]);

  return (
    <div className={styles.grid}>

      {/* LEFT: FORM */}
      <div>
        <form onSubmit={handleBookNow}>

          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Guest Details
            </h2>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input type="text" name="name" className={styles.input} value={formData.name} onChange={handleInputChange} required placeholder="John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input type="tel" name="phone" className={styles.input} value={formData.phone} onChange={handleInputChange} required placeholder="+91 98765 43210" />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Stay Details
            </h2>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Check-in Date *</label>
                <input type="date" name="checkIn" className={styles.input} min={today} value={formData.checkIn} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Check-out Date *</label>
                <input type="date" name="checkOut" className={styles.input} min={formData.checkIn || today} value={formData.checkOut} onChange={handleInputChange} required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Room Type</label>
                <select name="roomType" className={`${styles.input} ${styles.select}`} value={formData.roomType} onChange={handleInputChange}>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} {room.price == null ? '(Price coming soon)' : `(₹${room.price}/night)`}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Guests</label>
                <select name="guests" className={`${styles.input} ${styles.select}`} value={formData.guests} onChange={handleInputChange}>
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              Payment Method
            </h2>
            <div className={styles.paymentOptions}>
              <label className={`${styles.paymentOption} ${formData.paymentMethod === 'pay_at_property' ? styles.selected : ''}`}>
                <input type="radio" name="paymentMethod" value="pay_at_property" checked={formData.paymentMethod === 'pay_at_property'} onChange={handleInputChange} style={{ accentColor: 'var(--brand-red)' }} />
                <span style={{ fontWeight: 500 }}>Pay at Property (Booking can't be confirmed)</span>
              </label>
              <label className={`${styles.paymentOption} ${formData.paymentMethod === 'upi' ? styles.selected : ''}`}>
                <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} style={{ accentColor: 'var(--brand-red)' }} />
                <span style={{ fontWeight: 500 }}>Pay now via UPI (10% off on Check-in)</span>
              </label>
            </div>

            {formData.paymentMethod === 'upi' && (
              <div className={styles.upiBox}>
                <p style={{ marginBottom: '16px', color: 'var(--gray-600)' }}>Scan the QR code or use the UPI ID below to pay.</p>
                <div style={{ width: '150px', height: '150px', background: 'var(--white)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--gray-200)', borderRadius: '8px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                </div>
                <p style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{lodgeInfo.upiId}</p>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '24px' }}>
              Confirm Booking
            </button>
          </div>

        </form>
      </div>

      {/* RIGHT: SIDEBAR */}
      <div className={styles.sidebar}>
        <div className={styles.summaryCard}>
          <h3>Your Stay</h3>
          <div className={styles.summaryRow}>
            <span>Room Type</span>
            <span style={{ fontWeight: 500, color: 'var(--white)' }}>{selectedRoom.name}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Duration</span>
            <span style={{ fontWeight: 500, color: 'var(--white)' }}>{nights} Night{nights !== 1 ? 's' : ''}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Price per night</span>
            <span style={{ fontWeight: 500, color: 'var(--white)' }}>
              {selectedRoom.price == null ? 'Price coming soon' : `₹${selectedRoom.price}`}
            </span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total Amount</span>
            <span>{selectedRoom.price == null ? 'Price coming soon' : `₹${totalPrice.toLocaleString('en-IN')}`}</span>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h4>Why Book Direct?</h4>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Best price guaranteed
            </div>
            <div className={styles.infoItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              No hidden booking fees
            </div>
            <div className={styles.infoItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Final confirmation via WhatsApp
            </div>
            <div className={styles.infoItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Priority room assignment
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function BookingPage() {
  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Complete Your Booking</h1>
          <p className={styles.subtitle}>
            Secure your stay in just a few clicks. No hidden fees.
          </p>
        </div>
      </section>

      <section className={`section ${styles.bookingSection}`}>
        <div className="container">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading booking details...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
