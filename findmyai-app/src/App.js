'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Globe } from 'lucide-react'
import Button from './components/ui/Button'
import { Input } from './components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import educationalAITools from './data/educationalAITools'
import businessAITools from './data/businessAITools'
import './App.css'  // Make sure to import the CSS file for styling

// Translations
const translations = {
  es: {
    title: 'Bienvenido a FindMyAI',
    explore: 'Explorar',
    viewMore: 'Ver más',
    backToCategories: 'Volver a categorías',
    educationalTitle: 'Herramientas Educativas',
    businessTitle: 'Herramientas Empresariales',
  },
  en: {
    title: 'Welcome to FindMyAI',
    explore: 'Explore',
    viewMore: 'View More',
    backToCategories: 'Back to Categories',
    educationalTitle: 'Educational Tools',
    businessTitle: 'Business Tools',
  }
}

// ToolCard Component
const ToolCard = ({ tool, category, language, onExplore }) => (
  <Card key={tool.name} className="card">
    <CardHeader>
      <CardTitle className="card-title">{tool.name}</CardTitle>
      <p>{category}</p>
    </CardHeader>
    <CardContent className="card-content">
      {language === 'es' ? tool.description : tool.descriptionEn}
    </CardContent>
    <CardFooter>
      <Button onClick={() => onExplore(tool.link)}>{language === 'es' ? 'Explorar' : 'Explore'} <ExternalLink /></Button>
    </CardFooter>
  </Card>
)

// CategoryCard Component
const CategoryCard = ({ category, language, onSelectCategory }) => (
  <Card key={category.category} className="card">
    <CardHeader>
      <CardTitle className="card-title">{language === 'es' ? category.category : category.categoryEn}</CardTitle>
    </CardHeader>
    <CardFooter>
      <Button onClick={() => onSelectCategory(category)}>{language === 'es' ? 'Ver más' : 'View More'}</Button>
    </CardFooter>
  </Card>
)

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [language, setLanguage] = useState('es')
  const [activeTab, setActiveTab] = useState('educational')

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Update favorites in localStorage
  const updateFavorites = (tool) => {
    const newFavorites = favorites.some(fav => fav.name === tool.name)
      ? favorites.filter(fav => fav.name !== tool.name)
      : [...favorites, tool]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  // Filter categories based on search
  const filterCategories = (categories) => 
    categories.filter(category =>
      category[language === 'es' ? 'category' : 'categoryEn'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.tools.some(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool[language === 'es' ? 'description' : 'descriptionEn'].toLowerCase().includes(searchTerm.toLowerCase())
      )
    )

  const filteredEducationalCategories = filterCategories(educationalAITools)
  const filteredBusinessCategories = filterCategories(businessAITools)

  // Handle category selection
  const filteredTools = selectedCategory
    ? selectedCategory.tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool[language === 'es' ? 'description' : 'descriptionEn'].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  // Handle Explore action
  const handleExplore = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'es' ? 'en' : 'es'))
  }

  const t = translations[language]

  return (
    <div className="container">
      <header className="header">
        <h1>{t.title}</h1>
        <Button onClick={toggleLanguage}><Globe /> {language === 'es' ? 'EN' : 'ES'}</Button>
      </header>

      <Input
        value={searchTerm}
        placeholder={t.explore}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!selectedCategory ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="educational">{t.educationalTitle}</TabsTrigger>
            <TabsTrigger value="business">{t.businessTitle}</TabsTrigger>
          </TabsList>
          <TabsContent value="educational">
            <div className="cards-container">
              {filteredEducationalCategories.map(category => (
                <CategoryCard
                  key={category.category}
                  category={category}
                  language={language}
                  onSelectCategory={setSelectedCategory}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="business">
            <div className="cards-container">
              {filteredBusinessCategories.map(category => (
                <CategoryCard
                  key={category.category}
                  category={category}
                  language={language}
                  onSelectCategory={setSelectedCategory}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div>
          <Button onClick={() => setSelectedCategory(null)}>{t.backToCategories}</Button>
          <div className="cards-container">
            {filteredTools.map(tool => (
              <ToolCard
                key={tool.name}
                tool={tool}
                category={selectedCategory.category}
                language={language}
                onExplore={handleExplore}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
