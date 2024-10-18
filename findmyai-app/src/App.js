'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronRight, ExternalLink, Star, ArrowLeft, Globe } from 'lucide-react'
import Button  from './components/ui/Button';
import { Input } from "./components/ui/Input"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "./components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs"
import educationalAITools from './data/educationalAITools';
import businessAITools from './data/businessAITools';





// Educational and Business AI Tools data would go here, as well as translations

const translations = {
  es: {
    title: "Bienvenido a FindMyAI",
    explore: "Explorar",
    viewMore: "Ver más",
    backToCategories: "Volver a categorías",
    educationalTitle: "Herramientas Educativas",
    businessTitle: "Herramientas Empresariales",
  },
  en: {
    title: "Welcome to FindMyAI",
    explore: "Explore",
    viewMore: "View More",
    backToCategories: "Back to Categories",
    educationalTitle: "Educational Tools",
    businessTitle: "Business Tools",
  }
};

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [language, setLanguage] = useState('es')
  const [activeTab, setActiveTab] = useState('educational')

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const updateFavorites = (tool) => {
    const newFavorites = favorites.some(fav => fav.name === tool.name)
      ? favorites.filter(fav => fav.name !== tool.name)
      : [...favorites, tool]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const filteredEducationalCategories = educationalAITools.filter(category =>
    category[language === 'es' ? 'category' : 'categoryEn'].toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.tools.some(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool[language === 'es' ? 'description' : 'descriptionEn'].toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const filteredBusinessCategories = businessAITools.filter(category =>
    category[language === 'es' ? 'category' : 'categoryEn'].toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.tools.some(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool[language === 'es' ? 'description' : 'descriptionEn'].toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const filteredTools = selectedCategory
    ? selectedCategory.tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool[language === 'es' ? 'description' : 'descriptionEn'].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleExplore = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'es' ? 'en' : 'es')
  }

  const t = translations[language]

  const renderToolCard = (tool, category) => (
    <Card key={tool.name}>
      <CardHeader>
        <CardTitle>{tool.name}</CardTitle>
        <CardDescription>{language === 'es' ? category : category}</CardDescription>
      </CardHeader>
      <CardContent>{language === 'es' ? tool.description : tool.descriptionEn}</CardContent>
      <CardFooter>
        <Button onClick={() => handleExplore(tool.link)}>{t.explore} <ExternalLink /></Button>
      </CardFooter>
    </Card>
  )

  const renderCategoryCards = (categories) => (
    <div>
      {categories.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{language === 'es' ? category.category : category.categoryEn}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => setSelectedCategory(category)}>{t.viewMore}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div>
      <header>
        <h1>{t.title}</h1>
        <Button onClick={toggleLanguage}><Globe /> {language === 'es' ? 'EN' : 'ES'}</Button>
      </header>
      
      <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {!selectedCategory ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="educational">{t.educationalTitle}</TabsTrigger>
            <TabsTrigger value="business">{t.businessTitle}</TabsTrigger>
          </TabsList>
          <TabsContent value="educational">
            {renderCategoryCards(filteredEducationalCategories)}
          </TabsContent>
          <TabsContent value="business">
            {renderCategoryCards(filteredBusinessCategories)}
          </TabsContent>
        </Tabs>
      ) : (
        <div>
          <Button onClick={() => setSelectedCategory(null)}>{t.backToCategories}</Button>
          {filteredTools.map(tool => renderToolCard(tool, selectedCategory.category))}
        </div>
      )}
    </div>
  )
}
