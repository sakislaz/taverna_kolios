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
        'install': 'Install Taverna Kolios — Add to Home Screen'
      }
    }
  },
  it: { translation: {} },
  ro: { translation: {} },
  de: { translation: {} }
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
