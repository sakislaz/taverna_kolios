import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
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
      // Display our custom install button
      setInstallVisible(true)
    }

    // Listen for the browser's install prompt event
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    
    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  }, [])

  async function handleInstallClick() {
    if (!deferredPrompt) return
    try {
      // Show the native browser installation prompt
      deferredPrompt.prompt()
      
      // Wait for the user's choice
      const { outcome } = await deferredPrompt.userChoice
      
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
      {/* ΔΙΟΡΘΩΜΕΝΟ NAV BAR: Home Link + Option Install Button */}
      <nav style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        
        {/* Αριστερή Πλευρά: Home Link (ΠΑΝΤΑ ΟΡΑΤΟ) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            
            {/* 1. Σύνδεσμος Home (πάντα ορατός) */}
            <Link to="/">Home</Link>
            
            {/* 2. Κουμπί Install (Ορατό μόνο αν το PWA είναι έτοιμο για προτροπή) */}
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
                        fontSize: '14px' // Μικρότερο για να χωράει στη Navbar
                    }}
                >
                    Εγκατάσταση App
                </button>
            )}
        </div>
        
        {/* Δεξιά Πλευρά: Γλωσσική επιλογή */}
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

      {/* Ρύθμιση Routing: Μόνο Home και Services */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>

      {/* Η περιοχή του Install button στο κάτω μέρος έχει αφαιρεθεί */}
      
    </BrowserRouter>
  )
}