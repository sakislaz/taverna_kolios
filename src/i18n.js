import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      'header': {
        'welcome': 'Welcome to Taverna Kolios'
      },
      'link': {
        'book_table': 'Book a Table',
        'order_beach': 'Order by the Beach',
        'special_offers': 'Special Offers',
        'book_umbrella': 'Book an Umbrella',
        'book_massage': 'Book a Massage',
        'daily_events': 'Daily Events'
      },
      'button': {
        'install': 'Install Taverna Kolios — Add to Home Screen',
        'install_short': 'Install App'
      }
    }
  },
  it: {
    translation: {
      'header': {
        'welcome': 'Benvenuti alla Taverna Kolios'
      },
      'link': {
        'book_table': 'Prenota un Tavolo',
        'order_beach': 'Ordina in Spiaggia',
        'special_offers': 'Offerte Speciali',
        'book_umbrella': 'Prenota un Ombrellone',
        'book_massage': 'Prenota un Massaggio',
        'daily_events': 'Eventi Giornalieri'
      },
      'button': {
        'install': 'Installa Taverna Kolios — Aggiungi alla Schermata Home',
        'install_short': 'Installa App'
      }
    }
  },
  ro: {
    translation: {
      'header': {
        'welcome': 'Bine ați venit la Taverna Kolios'
      },
      'link': {
        'book_table': 'Rezervă o Masă',
        'order_beach': 'Comandă pe Plajă',
        'special_offers': 'Oferte Speciale',
        'book_umbrella': 'Rezervă o Umbrelă',
        'book_massage': 'Rezervă un Masaj',
        'daily_events': 'Evenimente Zilnice'
      },
      'button': {
        'install': 'Instalează Taverna Kolios — Adaugă pe Ecranul Principal',
        'install_short': 'Instalează App'
      }
    }
  },
  de: {
    translation: {
      'header': {
        'welcome': 'Willkommen in der Taverna Kolios'
      },
      'link': {
        'book_table': 'Tisch Reservieren',
        'order_beach': 'Am Strand Bestellen',
        'special_offers': 'Sonderangebote',
        'book_umbrella': 'Sonnenschirm Buchen',
        'book_massage': 'Massage Buchen',
        'daily_events': 'Tägliche Veranstaltungen'
      },
      'button': {
        'install': 'Taverna Kolios Installieren — Zum Startbildschirm Hinzufügen',
        'install_short': 'App Installieren'
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'it', 'ro', 'de'],
    lng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      // default detectors (cookie, localStorage, navigator, htmlTag, path, subdomain)
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n
