import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Home.css'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="hub-root">
      <h1 className="hub-title">{t('header.welcome')} </h1>

      <div className="hub-grid">
        {/* ✅ Replaced old GloriaFood link with internal Firebase form */}
        <Link to="/booking" className="hub-box dark-blue">
          <span className="hub-emoji">📅</span>
          <span className="hub-text">{t('link.book_table')}</span>
        </Link>

        <a
          href="https://www.foodbooking.com/api/fb/4_qgpn"
          target="_blank"
          rel="noopener noreferrer"
          className="hub-box turquoise"
        >
          <span className="hub-emoji">🏖️</span>
          <span className="hub-text">{t('link.order_beach')}</span>
        </a>

        <Link to="/services" className="hub-box orange">
          <span className="hub-emoji">🔥</span>
          <span className="hub-text">{t('link.special_offers')}</span>
        </Link>

        <Link to="/services" className="hub-box light-grey">
          <span className="hub-emoji">⛱️</span>
          <span className="hub-text">{t('link.book_umbrella')}</span>
        </Link>

        <Link to="/services" className="hub-box purple">
          <span className="hub-emoji">💆‍♀️</span>
          <span className="hub-text">{t('link.book_massage')}</span>
        </Link>

        <Link to="/services" className="hub-box light-green">
          <span className="hub-emoji">🎶</span>
          <span className="hub-text">{t('link.daily_events')}</span>
        </Link>
      </div>
    </div>
  )
}
