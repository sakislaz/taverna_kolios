import React, { useState } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    notes: '',
    visitedBefore: false
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Saving...')

    try {
      await addDoc(collection(db, 'booking_table'), {
        ...form,
        createdAt: serverTimestamp()
      })
      setStatus('✅ Booking saved successfully!')
      setForm({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 1,
        notes: '',
        visitedBefore: false
      })
    } catch (error) {
      console.error('Error saving booking:', error)
      setStatus('❌ Failed to save booking')
    }
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>🍷 Book a Table</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.row}>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{ ...styles.input, flex: 1 }}
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            style={{ ...styles.input, flex: 1 }}
          />
        </div>

        <input
          type="number"
          name="guests"
          min="1"
          value={form.guests}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="notes"
          placeholder="Special requests..."
          value={form.notes}
          onChange={handleChange}
          rows={3}
          style={styles.textarea}
        />

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="visitedBefore"
            checked={form.visitedBefore}
            onChange={handleChange}
            style={{ marginRight: 8 }}
          />
          Been here before
        </label>

        <button type="submit" style={styles.button}>
          Reserve Now
        </button>
      </form>

      {status && (
        <p
          style={{
            ...styles.status,
            color: status.includes('✅') ? '#1b5e20' : '#b71c1c',
          }}
        >
          {status}
        </p>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    background: 'linear-gradient(to bottom right, #fff7f0, #ffe6cc)',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Georgia, serif',
    color: '#e35f0f',
    fontSize: '2rem',
    marginBottom: 20,
  },
  form: {
    background: 'white',
    padding: 25,
    borderRadius: 10,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 450,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  input: {
    padding: '10px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    transition: '0.2s',
  },
  textarea: {
    padding: '10px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    resize: 'none',
  },
  button: {
    background: '#e35f0f',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '10px 15px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: '0.3s',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.95rem',
  },
  row: {
    display: 'flex',
    gap: 10,
  },
  status: {
    marginTop: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
}
