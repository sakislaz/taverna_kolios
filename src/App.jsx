import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import BookingForm from './pages/BookingForm'
import { useTranslation } from 'react-i18next'
import { db } from './firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallVisible, setInstallVisible] = useState(false)
  const { t, i18n } = useTranslation()

  // ✅ Test Firebase connection
  useEffect(() => {
    async function testFirebase() {
      try {
        const testCollection = collection(db, 'test')
        await getDocs(testCollection)
        console.log('✅ Firebase connected successfully!')
      } catch (error) {
        console.error('❌ Firebase connection error:', error)
      }
    }
    testFirebase()
  }, [])

  // ✅ Handle install prompt
  useEffect(() => {
    function onBeforeInstallPrompt(e) {
      e.preventDefault()
      setDeferredPrompt(e)
      setInstallVisible(true)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  }, [])

  async function handleInstallClick() {
    if (!deferredPrompt) return
    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log('A2HS choice:', outcome)
    } catch (err) {
      console.warn('Install prompt error', err)
    } finally {
      setDeferredPrompt(null)
      setInstallVisible(false)
    }
  }

  return (
    <BrowserRouter>
      {/* ✅ Simplified Top Bar */}
      <nav
        style={{
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fff',
          borderBottom: '1px solid #ddd',
        }}
      >
        <div>
          {isInstallVisible && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              style={{
                background: '#e35f0f',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 6,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {t('button.install_short')}
            </button>
          )}
        </div>

        <div>
          <label htmlFor="lang-select" style={{ marginRight: 8, fontWeight: 600 }}>Lang</label>
          <select
            id="lang-select"
            defaultValue={i18n.language || 'en'}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontWeight: 500,
            }}
          >
            <option value="en">EN</option>
            <option value="it">IT</option>
            <option value="ro">RO</option>
            <option value="de">DE</option>
          </select>
        </div>
      </nav>

      {/* ✅ Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  )
}
