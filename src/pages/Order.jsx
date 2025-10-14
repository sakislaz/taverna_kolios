import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const RESTAURANT_KEY = 'JkymRTnnRiv1RV0DAb'

export default function Order() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = `https://www.gloriafood.com/widgets/order.js?restaurant_key=${RESTAURANT_KEY}&lang=${i18n.language}`
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [i18n.language])

  return (
    <div style={{ padding: 20 }}>
      {/* GloriaFood widget will be loaded dynamically */}
      <p>Loading online ordering widget...</p>
    </div>
  )
}
