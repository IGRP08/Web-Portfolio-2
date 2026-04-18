import React from 'react'
import Header from './src/header/Header.jsx'
import HeroSection from './src/about/About.jsx'
import Separator from './src/components/separator.jsx'
import Projects from './src/projects/Projects.jsx'
import Services from './src/services/Services.jsx'
import Contact from './src/contact/Contact.jsx'

const App = () => {
  return (
    <div>
      <Header />


      <main>
        <HeroSection />
        <Separator />
        <Projects />
        <Separator />
        <Services />
        <Contact />
      </main>
    </div>
  )
}

export default App