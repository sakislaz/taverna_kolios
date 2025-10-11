import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Order from './pages/Order'
import { useTranslation } from 'react-i18next'

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallVisible, setInstallVisible] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    function onBeforeInstallPrompt(e) {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Save the event for later trigger
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
      // Wait for the user's choice
      const { outcome } = await deferredPrompt.userChoice
      // outcome is 'accepted' or 'dismissed'
      console.log('A2HS choice:', outcome)
    } catch (err) {
      console.warn('Install prompt error', err)
    } finally {
      // Clear the saved prompt and hide the button
      setDeferredPrompt(null)
      setInstallVisible(false)
    }
  }

  return (
    <BrowserRouter>
      <nav style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <Link to="/order">Order</Link>
        </div>
        <div>
          <label htmlFor="lang-select" style={{ marginRight: 8, fontWeight: 600 }}>Lang</label>
          <select
            id="lang-select"
            defaultValue={i18n?.language || 'en'}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{ padding: '6px 8px', borderRadius: 6 }}
          >
            <option value="en">EN</option>
            <option value="it">IT</option>
            <option value="ro">RO</option>
            <option value="de">DE</option>
          </select>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
      </Routes>

      {/* Install button for Add to Home Screen (visible when beforeinstallprompt fires) */}
      {isInstallVisible && deferredPrompt && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
          <button
            onClick={handleInstallClick}
            style={{
              background: '#0b74de',
              color: '#fff',
              border: 'none',
              padding: '10px 16px',
              borderRadius: 8,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {t('button.install')}
          </button>
        </div>
      )}
    </BrowserRouter>
  )
}
