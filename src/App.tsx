import { useState, useEffect, useRef } from 'react'
import './App.css'
import logoImg from './assets/logo.png'
import heroImg from './assets/FrontPage.jpeg'

// Declare Landbot on window for TypeScript
declare global {
  interface Window {
    Landbot: any
  }
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [landbotLoaded, setLandbotLoaded] = useState(false)
  const landbotRef = useRef<HTMLDivElement>(null)
  const landbotInstance = useRef<any>(null)

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="landbot-3.0.0.mjs"]')
    
    if (existingScript) {
      // Script already exists, initialize if Landbot is available
      if (window.Landbot && landbotRef.current && !landbotInstance.current) {
        initLandbot()
      }
      return
    }

    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs'
    
    script.onload = () => {
      // Wait a bit for the module to be fully parsed and Landbot to be available
      const checkLandbot = setInterval(() => {
        if (window.Landbot) {
          clearInterval(checkLandbot)
          setLandbotLoaded(true)
          initLandbot()
        }
      }, 100)
      
      // Timeout after 10 seconds
      setTimeout(() => clearInterval(checkLandbot), 10000)
    }
    
    document.head.appendChild(script)

    return () => {
      if (landbotInstance.current) {
        try {
          landbotInstance.current.destroy()
        } catch (e) {
          // Ignore destroy errors
        }
        landbotInstance.current = null
      }
    }
  }, [])

  const initLandbot = () => {
    if (landbotRef.current && !landbotInstance.current && window.Landbot) {
      try {
        landbotInstance.current = new window.Landbot.Container({
          container: landbotRef.current,
          configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3279690-1LWD0PPQ1YQAPWBP/index.json',
        })
      } catch (e) {
        console.error('Error initializing Landbot:', e)
      }
    }
  }

  const features = [
    {
      id: 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      ),
      title: 'Información ITAM',
      shortTitle: 'Info',
      description: '¿Necesitas información sobre caja, servicios web, trámites o contactos importantes? Aquí encuentras todo lo esencial del ITAM.',
      details: [
        'Ubicación y horarios de caja',
        'Servicios web y plataformas digitales',
        'Contactos de departamentos',
        'Trámites administrativos'
      ]
    },
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
        </svg>
      ),
      title: 'Lugares para Comer',
      shortTitle: 'Comida',
      description: '¿No sabes dónde comer? Explora las mejores opciones gastronómicas dentro y cerca del campus. Escoge una categoría y recibe recomendaciones personalizadas.',
      details: [
        'Cafeterías del campus',
        'Restaurantes cercanos',
        'Opciones económicas',
        'Comida rápida y saludable'
      ]
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
        </svg>
      ),
      title: 'Mapa ITAM',
      shortTitle: 'Mapa',
      description: '¿Estás perdido? ¿Dónde está el salón 201? Utiliza nuestro mapa interactivo para encontrar cualquier ubicación dentro del campus.',
      details: [
        'Salones y edificios',
        'Bibliotecas y áreas de estudio',
        'Servicios estudiantiles',
        'Estacionamientos y accesos'
      ]
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
        </svg>
      ),
      title: 'Horarios ITAM',
      shortTitle: 'Horarios',
      description: '¿No sabes cómo armar tu horario para el siguiente semestre? Te ayudamos a planificar tus materias de manera óptima.',
      details: [
        'Planificador de materias',
        'Horarios disponibles',
        'Evita traslapes',
        'Guarda tus horarios favoritos'
      ]
    }
  ]

  const navLinks = [
    { label: 'Inicio', url: 'https://www.itam.mx/' },
    { label: 'Nuestras carreras', url: 'https://carreras.itam.mx/carreras/' },
    { label: 'Admisiones', url: 'https://carreras.itam.mx/admisiones/', hasDropdown: true },
    { label: 'Vida universitaria', url: 'https://carreras.itam.mx/vida-universitaria/', active: true },
    { label: 'Intercambio académico', url: 'https://carreras.itam.mx/intercambio/' },
    { label: 'Estudiantes foráneos', url: 'https://carreras.itam.mx/foraneos/' },
  ]

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <a href="https://www.itam.mx/" className="logo">
            <img src={logoImg} alt="ITAM" className="logo-img" />
          </a>
          <nav className="nav">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`nav-link ${link.active ? 'active' : ''}`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                )}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-title-container">
          <h1 className="hero-title">Asistente Farah</h1>
        </div>
        <div className="hero-contact">
          <a href="tel:5556284028" className="hero-contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            55 5628 4028
          </a>
          <a href="mailto:informes@itam.mx" className="hero-contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            informes@itam.mx
          </a>
          <div className="hero-social">
            <a href="https://www.facebook.com/ITAM.MX" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
            </a>
            <a href="https://twitter.com/ITAM_mx" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.youtube.com/user/videoITAM" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
            </a>
            <a href="https://wa.me/525556284028" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.instagram.com/itam_mx/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@itam_mx" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="intro-section">
            <h2 className="section-title">Comunidad ITAM</h2>
            <p className="intro-text">
              Bienvenido a tu asistente virtual Farah. Estoy aquí para ayudarte con todas 
              tus dudas sobre el primer semestre, trámites, horarios y vida universitaria.
            </p>
          </div>

          {/* Chatbot Container */}
          <div className="chatbot-section">
            <div className="chatbot-container">
              <div className="chatbot-header-bar">
                <div className="chatbot-header-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div className="chatbot-header-info">
                  <span className="chatbot-header-name">Farah - Asistente ITAM</span>
                  <span className="chatbot-header-status">
                    <span className="status-dot"></span>
                    En línea
                  </span>
                </div>
              </div>
              <div ref={landbotRef} className="landbot-container"></div>
            </div>

            {/* Features Tabs Section */}
            <div className="features-section">
              <h3 className="features-title">Explora nuestras herramientas</h3>
              <div className="features-tabs">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    className={`feature-tab ${activeFeature === feature.id ? 'active' : ''}`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <span className="feature-tab-icon">{feature.icon}</span>
                    <span className="feature-tab-title">{feature.shortTitle}</span>
                  </button>
                ))}
              </div>
              <div className="feature-content">
                <div className="feature-header">
                  <div className="feature-icon-large">
                    {features[activeFeature].icon}
                  </div>
                  <h4 className="feature-name">{features[activeFeature].title}</h4>
                </div>
                <p className="feature-description">{features[activeFeature].description}</p>
                <ul className="feature-details">
                  {features[activeFeature].details.map((detail, index) => (
                    <li key={index}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
                
              </div>
            </div>

            {/* System Diagram Button */}
            <button 
              className="diagram-button"
              onClick={() => setIsModalOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-7l-4 5h8z"/>
              </svg>
              Ver Diagrama del Sistema
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-copyright">© 2025 ITAM - Asistente Farah para primer semestre</p>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <h3 className="modal-title">Diagrama del Sistema</h3>
            <div className="modal-content">
              <div className="diagram-placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#1a3c34">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <p>Diagrama del Sistema Farah</p>
                <span className="placeholder-label">[Imagen placeholder]</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
