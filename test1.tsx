'use client'
//hola 
import { useState, useEffect } from 'react'
import { Search, ChevronRight, ExternalLink, Star, ArrowLeft, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const educationalAITools = [
  {
    category: "Matemáticas",
    categoryEn: "Mathematics",
    tools: [
      { 
        name: "Photomath", 
        link: "https://photomath.com",
        description: "Resuelve problemas matemáticos escaneando ecuaciones con la cámara del teléfono.",
        descriptionEn: "Solves math problems by scanning equations with your phone's camera."
      },
      { 
        name: "Mathway", 
        link: "https://www.mathway.com",
        description: "Proporciona soluciones paso a paso para una amplia gama de problemas matemáticos.",
        descriptionEn: "Provides step-by-step solutions for a wide range of math problems."
      },
      { 
        name: "Symbolab", 
        link: "https://www.symbolab.com",
        description: "Resuelve problemas de álgebra, cálculo y más con explicaciones detalladas.",
        descriptionEn: "Solves algebra, calculus, and more with detailed explanations."
      },
      { 
        name: "Wolfram Alpha", 
        link: "https://www.wolframalpha.com",
        description: "Motor de conocimiento computacional que responde preguntas directamente.",
        descriptionEn: "Computational knowledge engine that answers questions directly."
      },
      { 
        name: "Socratic by Google", 
        link: "https://socratic.org",
        description: "Ayuda en múltiples materias, incluyendo matemáticas, usando IA de Google.",
        descriptionEn: "Helps with multiple subjects, including math, using Google AI."
      },
    ]
  },
  {
    category: "Inglés y Aprendizaje de Idiomas",
    categoryEn: "English and Language Learning",
    tools: [
      { 
        name: "Grammarly", 
        link: "https://www.grammarly.com",
        description: "Corrector gramatical y ortográfico que mejora la escritura en inglés.",
        descriptionEn: "Grammar and spell checker that improves English writing."
      },
      { 
        name: "Duolingo", 
        link: "https://www.duolingo.com",
        description: "Plataforma de aprendizaje de idiomas gamificada y personalizada.",
        descriptionEn: "Gamified and personalized language learning platform."
      },
      { 
        name: "Writefull", 
        link: "https://writefull.com",
        description: "Ofrece retroalimentación sobre la escritura académica en inglés.",
        descriptionEn: "Provides feedback on academic writing in English."
      },
      { 
        name: "Ginger Software", 
        link: "https://www.gingersoftware.com",
        description: "Corrector gramatical y herramienta de mejora de la escritura.",
        descriptionEn: "Grammar checker and writing enhancement tool."
      },
      { 
        name: "Reverso Context", 
        link: "https://context.reverso.net",
        description: "Proporciona traducciones en contexto y ejemplos de uso real.",
        descriptionEn: "Provides translations in context and real usage examples."
      },
    ]
  },
  {
    category: "Ciencias (Biología, Química, Física)",
    categoryEn: "Sciences (Biology, Chemistry, Physics)",
    tools: [
      { 
        name: "Labster", 
        link: "https://www.labster.com",
        description: "Ofrece laboratorios virtuales interactivos para ciencias.",
        descriptionEn: "Offers interactive virtual labs for sciences."
      },
      { 
        name: "BioInteractive", 
        link: "https://www.biointeractive.org",
        description: "Recursos educativos gratuitos para la enseñanza de la biología.",
        descriptionEn: "Free educational resources for teaching biology."
      },
      { 
        name: "MEL Chemistry", 
        link: "https://melscience.com",
        description: "Experimentos de química en realidad virtual y aumentada.",
        descriptionEn: "Chemistry experiments in virtual and augmented reality."
      },
      { 
        name: "PhET Interactive Simulations", 
        link: "https://phet.colorado.edu",
        description: "Simulaciones interactivas gratuitas de física, química, biología y matemáticas.",
        descriptionEn: "Free interactive simulations for physics, chemistry, biology, and math."
      },
      { 
        name: "Cognito", 
        link: "https://cognitoedu.org",
        description: "Videos educativos y recursos para ciencias y matemáticas.",
        descriptionEn: "Educational videos and resources for science and math."
      },
    ]
  },
  {
    category: "Historia y Ciencias Sociales",
    categoryEn: "History and Social Sciences",
    tools: [
      { 
        name: "Khan Academy", 
        link: "https://www.khanacademy.org",
        description: "Plataforma educativa gratuita con cursos en múltiples disciplinas.",
        descriptionEn: "Free educational platform with courses in multiple disciplines."
      },
      { 
        name: "Explain Everything", 
        link: "https://explaineverything.com",
        description: "Pizarra digital interactiva para crear lecciones y presentaciones.",
        descriptionEn: "Interactive digital whiteboard for creating lessons and presentations."
      },
      { 
        name: "History Extra", 
        link: "https://www.historyextra.com",
        description: "Recursos y artículos sobre historia de la BBC.",
        descriptionEn: "History resources and articles from the BBC."
      },
      { 
        name: "HistoryBot", 
        link: "https://www.historybot.com",
        description: "Chatbot de IA especializado en historia.",
        descriptionEn: "AI chatbot specialized in history."
      },
    ]
  },
  {
    category: "Lenguas Extranjeras",
    categoryEn: "Foreign Languages",
    tools: [
      { 
        name: "Babbel", 
        link: "https://www.babbel.com",
        description: "Plataforma de aprendizaje de idiomas con enfoque en conversación.",
        descriptionEn: "Language learning platform with a focus on conversation."
      },
      { 
        name: "Busuu", 
        link: "https://www.busuu.com",
        description: "Aprendizaje de idiomas con interacción con hablantes nativos.",
        descriptionEn: "Language learning with interaction with native speakers."
      },
      { 
        name: "Lingvist", 
        link: "https://lingvist.com",
        description: "Aprendizaje de idiomas adaptativo basado en IA.",
        descriptionEn: "AI-powered adaptive language learning."
      },
      { 
        name: "Memrise", 
        link: "https://www.memrise.com",
        description: "Plataforma de aprendizaje de idiomas basada en la memoria.",
        descriptionEn: "Memory-based language learning platform."
      },
      { 
        name: "Mondly", 
        link: "https://www.mondly.com",
        description: "Aprendizaje de idiomas con realidad aumentada y chatbots.",
        descriptionEn: "Language learning with augmented reality and chatbots."
      },
    ]
  },
]

const businessAITools = [
  {
    category: "Análisis de Datos y Business Intelligence",
    categoryEn: "Data Analysis and Business Intelligence",
    tools: [
      { 
        name: "Tableau", 
        link: "https://www.tableau.com",
        description: "Visualización interactiva de datos.",
        descriptionEn: "Interactive data visualization."
      },
      { 
        name: "Power BI", 
        link: "https://powerbi.microsoft.com",
        description: "Plataforma de Business Intelligence de Microsoft para análisis y visualización de datos.",
        descriptionEn: "Microsoft's Business Intelligence platform for data analysis and visualization."
      },
      { 
        name: "RapidMiner", 
        link: "https://rapidminer.com",
        description: "Plataforma de machine learning para análisis de datos.",
        descriptionEn: "Machine learning platform for data analysis."
      },
      { 
        name: "KNIME", 
        link: "https://www.knime.com",
        description: "Plataforma de análisis de datos y reporting automatizado.",
        descriptionEn: "Data analysis and automated reporting platform."
      },
      { 
        name: "Alteryx", 
        link: "https://www.alteryx.com",
        description: "Herramienta de análisis de datos con automatización.",
        descriptionEn: "Data analysis tool with automation."
      },
    ]
  },
  {
    category: "Contabilidad y Finanzas",
    categoryEn: "Accounting and Finance",
    tools: [
      { 
        name: "Kabbage", 
        link: "https://www.kabbage.com",
        description: "Plataforma que usa IA para ofrecer préstamos a pequeñas empresas.",
        descriptionEn: "Platform using AI to offer loans to small businesses."
      },
      { 
        name: "Xero", 
        link: "https://www.xero.com",
        description: "Software de contabilidad basado en la nube con automatización de tareas contables.",
        descriptionEn: "Cloud-based accounting software with automation of accounting tasks."
      },
      { 
        name: "QuickBooks", 
        link: "https://quickbooks.intuit.com",
        description: "Plataforma de contabilidad y gestión financiera con funciones asistidas por IA.",
        descriptionEn: "Accounting and financial management platform with AI-assisted functions."
      },
      { 
        name: "Zest AI", 
        link: "https://www.zest.ai",
        description: "Herramienta que utiliza IA para analizar riesgos crediticios y puntajes de crédito.",
        descriptionEn: "Tool that uses AI to analyze credit risks and credit scores."
      },
    ]
  },
  {
    category: "Recursos Humanos y Automatización",
    categoryEn: "Human Resources and Automation",
    tools: [
      { 
        name: "Breezy HR", 
        link: "https://breezy.hr",
        description: "Software de reclutamiento con IA para la selección de candidatos.",
        descriptionEn: "Recruitment software with AI for candidate selection."
      },
      { 
        name: "Hiretual", 
        link: "https://hiretual.com",
        description: "Plataforma de reclutamiento que utiliza IA para búsqueda y filtrado de candidatos.",
        descriptionEn: "Recruitment platform that uses AI for candidate search and filtering."
      },
      { 
        name: "Gusto", 
        link: "https://gusto.com",
        description: "Plataforma de nómina y gestión de empleados con automatización de procesos.",
        descriptionEn: "Payroll and employee management platform with process automation."
      },
      { 
        name: "UiPath", 
        link: "https://www.uipath.com",
        description: "Plataforma de automatización robótica de procesos (RPA) para tareas repetitivas.",
        descriptionEn: "Robotic Process Automation (RPA) platform for repetitive tasks."
      },
      { 
        name: "Automation Anywhere", 
        link: "https://www.automationanywhere.com",
        description: "Herramienta RPA que permite automatizar procesos empresariales.",
        descriptionEn: "RPA tool that allows automation of business processes."
      },
    ]
  },
  {
    category: "Automatización de Marketing y Ventas",
    categoryEn: "Marketing and Sales Automation",
    tools: [
      { 
        name: "HubSpot", 
        link: "https://www.hubspot.com",
        description: "Plataforma de CRM con herramientas de marketing automatizado.",
        descriptionEn: "CRM platform with automated marketing tools."
      },
      { 
        name: "Salesforce Einstein", 
        link: "https://www.salesforce.com/products/einstein/overview/",
        description: "IA integrada en Salesforce para predicción de ventas y automatización de procesos.",
        descriptionEn: "AI integrated into Salesforce for sales prediction and process automation."
      },
      { 
        name: "AdCreative.ai", 
        link: "https://www.adcreative.ai",
        description: "IA que genera contenido publicitario automáticamente.",
        descriptionEn: "AI that automatically generates advertising content."
      },
      { 
        name: "Marketo", 
        link: "https://www.marketo.com",
        description: "Plataforma de automatización de marketing para gestionar campañas.",
        descriptionEn: "Marketing automation platform for campaign management."
      },
    ]
  },
  {
    category: "Automatización de Procesos Empresariales",
    categoryEn: "Business Process Automation",
    tools: [
      { 
        name: "Zapier", 
        link: "https://zapier.com",
        description: "Herramienta de automatización que conecta aplicaciones y servicios web para automatizar tareas.",
        descriptionEn: "Automation tool that connects web applications and services to automate tasks."
      },
      { 
        name: "Blue Prism", 
        link: "https://www.blueprism.com",
        description: "Software de automatización de procesos empresariales.",
        descriptionEn: "Business process automation software."
      },
      { 
        name: "Airtable", 
        link: "https://www.airtable.com",
        description: "Plataforma de base de datos colaborativa con automatización de flujos de trabajo.",
        descriptionEn: "Collaborative database platform with workflow automation."
      },
    ]
  },
  {
    category: "Atención al Cliente y Chatbots",
    categoryEn: "Customer Service and Chatbots",
    
    tools: [
      { 
        name: "Ada", 
        link: "https://www.ada.cx",
        description:  "Plataforma de chatbots para automatizar la atención al cliente.",
        descriptionEn: "Chatbot platform to automate customer service."
      },
      { 
        name: "TARS", 
        link: "https://www.hellotars.com",
        description: "Creación de chatbots para interactuar con clientes y automatizar conversaciones.",
        descriptionEn: "Creation of chatbots to interact with customers and automate conversations."
      },
      { 
        name: "ManyChat", 
        link: "https://manychat.com",
        description: "Chatbot para automatizar la comunicación en redes sociales.",
        descriptionEn: "Chatbot to automate communication on social networks."
      },
      { 
        name: "Intercom", 
        link: "https://www.intercom.com",
        description: "Plataforma de mensajería con IA para automatizar la atención al cliente.",
        descriptionEn: "Messaging platform with AI to automate customer service."
      },
    ]
  },
  {
    category: "Productividad y Gestión de Proyectos",
    categoryEn: "Productivity and Project Management",
    tools: [
      { 
        name: "Monday.com", 
        link: "https://monday.com",
        description: "Plataforma de gestión de proyectos con automatización de flujos de trabajo.",
        descriptionEn: "Project management platform with workflow automation."
      },
      { 
        name: "Trello", 
        link: "https://trello.com",
        description: "Herramienta de gestión de proyectos que permite automatización de tareas.",
        descriptionEn: "Project management tool that allows task automation."
      },
      { 
        name: "Notion", 
        link: "https://www.notion.so",
        description: "Plataforma todo-en-uno para gestionar tareas, documentos y automatizar flujos de trabajo.",
        descriptionEn: "All-in-one platform for managing tasks, documents, and automating workflows."
      },
      { 
        name: "Asana", 
        link: "https://asana.com",
        description: "Plataforma de gestión de proyectos y productividad con automatización de tareas.",
        descriptionEn: "Project management and productivity platform with task automation."
      },
    ]
  },
]

const translations = {
  es: {
    title: "Explorador de Herramientas IA",
    educationalTitle: "Herramientas Educativas",
    businessTitle: "Herramientas Empresariales",
    search: "Buscar categorías o herramientas...",
    viewMore: "Ver más",
    backToCategories: "Volver a categorías",
    explore: "Explorar",
    addToFavorites: "Añadir a favoritos",
    removeFromFavorites: "Quitar de favoritos",
    toolsAvailable: "herramientas disponibles",
    exploreTools: "Explora herramientas de IA para",
    favorites: "Favoritos",
    noFavorites: "No tienes favoritos guardados.",
  },
  en: {
    title: "AI Tools Explorer",
    educationalTitle: "Educational Tools",
    businessTitle: "Business Tools",
    search: "Search categories or tools...",
    viewMore: "View more",
    backToCategories: "Back to categories",
    explore: "Explore",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    toolsAvailable: "tools available",
    exploreTools: "Explore AI tools for",
    favorites: "Favorites",
    noFavorites: "You have no saved favorites.",
  }
}

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
//Aqui esta el error en la linea 493, toca solucionarlo 
  const handleExplore = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'es' ? 'en' : 'es')
  }

  const t = translations[language]

  const renderToolCard = (tool, category) => (
    <Card key={tool.name} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-blue-400 flex justify-between items-center">
          <span className="truncate">{tool.name}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 ml-2 flex-shrink-0"
                  onClick={() => updateFavorites(tool)}
                >
                  <Star
                    className={`h-5 w-5 ${
                      favorites.some(fav => fav.name === tool.name) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                    }`}
                  />
                  <span className="sr-only">{favorites.some(fav => fav.name === tool.name) ? t.removeFromFavorites : t.addToFavorites}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{favorites.some(fav => fav.name === tool.name) ? t.removeFromFavorites : t.addToFavorites}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription className="text-gray-400">{language === 'es' ? category : category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{language === 'es' ? tool.description : tool.descriptionEn}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => handleExplore(tool.link)} className="w-full bg-blue-600 hover:bg-blue-700">
          {t.explore} <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )

  const renderCategoryCards = (categories) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category.category} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-400">{language === 'es' ? category.category : category.categoryEn}</CardTitle>
            <CardDescription className="text-gray-400">{category.tools.length} {t.toolsAvailable}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{t.exploreTools} {(language === 'es' ? category.category : category.categoryEn).toLowerCase()}.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSelectedCategory(category)} className="w-full bg-blue-600 hover:bg-blue-700">
              {t.viewMore} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4 text-center flex-grow">{t.title}</h1>
        <Button onClick={toggleLanguage} className="bg-blue-600 hover:bg-blue-700">
          <Globe className="mr-2 h-4 w-4" />
          {language === 'es' ? 'EN' : 'ES'}
        </Button>
      </header>
      
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        <Input 
          type="search" 
          placeholder={t.search}
          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <main className="max-w-7xl mx-auto">
        {!selectedCategory ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="educational">{t.educationalTitle}</TabsTrigger>
              <TabsTrigger value="business">{t.businessTitle}</TabsTrigger>
              <TabsTrigger value="favorites">{t.favorites}</TabsTrigger>
            </TabsList>
            <TabsContent value="educational">
              {renderCategoryCards(filteredEducationalCategories)}
            </TabsContent>
            <TabsContent value="business">
              {renderCategoryCards(filteredBusinessCategories)}
            </TabsContent>
            <TabsContent value="favorites">
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map(tool => renderToolCard(tool, tool.category))}
                </div>
              ) : (
                <p className="text-center text-gray-400">{t.noFavorites}</p>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-blue-400">{t.exploreTools} {language === 'es' ? selectedCategory.category : selectedCategory.categoryEn}</h2>
              <Button variant="outline" onClick={() => setSelectedCategory(null)} className="text-gray-300 border-gray-600 hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToCategories}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => renderToolCard(tool, selectedCategory.category))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
