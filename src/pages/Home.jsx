import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="hub-root">
      <h1 className="hub-title">{t('header.welcome')}</h1>

      <div className="hub-grid">
        <a
          href="https://www.foodbooking.com/api/res/4_qgpn"
          target="_blank"
          rel="noopener noreferrer"
          className="hub-box dark-blue"
        >
          <span className="hub-emoji">📅</span>
          <span className="hub-text">{t('link.book_table')}</span>
        </a>

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

      <style>{`
        .hub-root {
          padding: 16px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          color: #111;
          box-sizing: border-box;
        }

        .hub-title {
          font-size: 1.8rem;
          margin: 18px 0;
          text-align: center;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .hub-grid {
          width: 100%;
          max-width: 720px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .hub-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px;
          border-radius: 10px;
          text-decoration: none;
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          min-height: 84px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
        }

        .hub-emoji { font-size: 1.6rem; }

        /* High contrast background colors */
        .dark-blue { background: #003366; }
        .turquoise { background: #00C2B8; color: #002; }
        .orange { background: #FF6A00; }
        .light-grey { background: #E6E6E6; color: #111; }
        .purple { background: #7A5CC6; }
        .light-green { background: #A9DFBF; color: #062; }

        /* Ensure text remains readable */
        .dark-blue .hub-text, .orange .hub-text, .purple .hub-text { color: #fff; }

        /* Mobile-first: full width single column on very small screens */
        @media (max-width: 420px) {
          .hub-grid { grid-template-columns: 1fr; }
          .hub-title { font-size: 1.6rem; }
        }

        @media (min-width: 421px) and (max-width: 900px) {
          .hub-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  )
}

