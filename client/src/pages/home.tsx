import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, GraduationCap, BookOpen, Clock, Mail, CheckCircle, Menu, X } from "lucide-react";
import mathCoinLogo from "@assets/MathCoinSymbol_1750082905685.png";
import profImage from "@assets/prof.jpg";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scrolling function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['parcours', 'services', 'contact'];
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      const offset = 100;
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionHeight = section.offsetHeight;
          
          if (sectionTop <= offset && sectionTop + sectionHeight > offset) {
            current = sectionId;
          }
        }
      });
      
      navLinks.forEach(link => {
        const href = link.getAttribute('data-section');
        if (href === current) {
          link.classList.add('text-primary');
          link.classList.remove('text-muted-foreground');
        } else {
          link.classList.add('text-muted-foreground');
          link.classList.remove('text-primary');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-sm z-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src={mathCoinLogo} alt="MathCoin" className="w-8 h-8" />
              <span className="text-xl font-bold text-primary">MathCoin</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection('parcours')}
                  className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  data-section="parcours"
                >
                  Mon parcours
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="nav-link text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  data-section="services"
                >
                  Ce que je propose
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="nav-link"
                  data-section="contact"
                >
                  Me contacter
                </Button>
              </div>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('parcours')}
                className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium w-full text-left"
              >
                Mon parcours
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-muted-foreground hover:text-primary font-medium w-full text-left"
              >
                Ce que je propose
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-medium w-full text-left"
              >
                Me contacter
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-4 text-primary">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-4xl font-light">π</span>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Cours Particuliers de <span className="text-primary">Mathématiques</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Professeure expérimentée proposant un accompagnement personnalisé en mathématiques, 
              de la 6ème aux études supérieures. Pédagogie adaptée à chaque élève.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('services')}
                size="lg"
              >
                Découvrir mes services
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                Me contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mon Parcours Section */}
      <section id="parcours" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mon Parcours</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-muted rounded-2xl p-8 flex items-center justify-center mb-8 md:mb-0">
                <GraduationCap className="w-32 h-32 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl p-8 flex items-center justify-center mb-8 md:mb-0">
                <img src={profImage} alt="Mon portrait" className="portrait" />
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Formation Académique</h3>
                  </div>
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      <strong>Master des Métiers de l'Enseignement, de l'Éducation et la Formation en Mathématiques</strong> - 
                      Formation complète aux méthodes pédagogiques modernes et à l'enseignement des mathématiques.
                    </p>
                    <p>
                      <strong>CAPES de Mathématiques obtenu</strong> - Certification professionnelle attestant de la maîtrise disciplinaire et pédagogique pour l'enseignement des mathématiques.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Expérience Professionnelle</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Plusieurs années d'expérience aussi bien dans l'éducation nationale que dans l'enseignement particulier avec des élèves de tous niveaux. 
                    Accompagnement personnalisé et suivi régulier des progrès.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Approche Pédagogique</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Passion pour la pédagogie et l'adaptation aux différents profils d'apprentissage. 
                    Méthodes variées pour changer le regard sur les mathématiques en les rendant plus accessibles et motivantes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ce que je propose</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un accompagnement sur mesure adapté à vos besoins et objectifs
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Cours Particuliers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Séances individuelles personnalisées pour un apprentissage optimal et un suivi précis des progrès.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Tous Niveaux</h3>
                <p className="text-muted-foreground leading-relaxed">
                  De la 6ème à la Terminale, plus formations supérieures (Licence maths, BTS, BUT).
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Méthodes Adaptées</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pédagogie personnalisée selon le profil de chaque élève pour maximiser la compréhension.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Services */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Types de Cours</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Remise à niveau</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Soutien scolaire régulier</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Préparation aux examens (Brevet, Bac)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Préparation aux concours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Modalités</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Calculator className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-foreground">Cours en ligne</span>
                    </div>
                    <p className="text-muted-foreground text-sm ml-8">
                      Plateforme vidéo avec tableau interactif, flexibilité horaire maximale.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <BookOpen className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-foreground">Cours en présentiel</span>
                    </div>
                    <p className="text-muted-foreground text-sm ml-8">
                      À domicile ou en lieu convenu, selon vos disponibilités.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Lessons */}
          <div className="max-w-4xl mx-auto mt-12 px-4">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Notions Types par niveaux</h3>
                <div className="space-y-6">
                  {/* Niveau 6ème */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">6<sup>ème</sup></h4>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Nombres et calculs : opérations sur entiers, décimaux, fractions, calcul mental, proportionnalité</li>
                      <li>Grandeurs et mesures : unités, conversions, périmètres, aires, volumes, estimation</li>
                      <li>Géométrie : figures planes et solides, angles, symétrie, repérage dans l’espace</li>
                    </ul>
                  </div>
                  {/* Niveau 5ème */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">5<sup>ème</sup></h4>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Nombres et calculs : fractions, décimaux, puissances, opérations sur les nombres relatifs</li>
                      <li>Grandeurs et mesures : conversions complexes, proportionnalité, pourcentages, vitesses</li>
                      <li>Géométrie : triangles, quadrilatères, cercles, constructions, symétries axiale et centrale</li>
                    </ul>
                  </div>
                  {/* Niveau 4ème */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">4<sup>ème</sup></h4>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Nombres et calculs : puissances, racines carrées, calculs sur les nombres relatifs, fractions</li>
                      <li>Grandeurs et mesures : proportionnalité, pourcentages, échelles, conversions d’unités</li>
                      <li>Géométrie : théorème de Pythagore, triangles semblables, transformations (translations, rotations, symétries)</li>
                      <li>Algèbre : développement, factorisation, équations et inéquations du 1er degré, fonctions linéaires et affines</li>
                    </ul>
                  </div>
                  {/* Niveau 3ème */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">3<sup>ème</sup></h4>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Nombres et calculs : calcul littéral, puissances, notation scientifique, racines carrées</li>
                      <li>Grandeurs et mesures : proportionnalité, pourcentages, échelles, volumes de solides usuels</li>
                      <li>Géométrie : théorème de Thalès, trigonométrie (sinus, cosinus), transformations, sections de solides</li>
                      <li>Algèbre : fonctions, résolution d’équations et d’inéquations, systèmes d’équations du 1er degré</li>
                    </ul>
                  </div>
                  {/* Niveau 2nd */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">2<sup>nd</sup></h4>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Nombres et calculs : ensembles de nombres, calculs algébriques, puissances, racines carrées</li>
                      <li>Géométrie : vecteurs, droites, plans, repérage dans le plan, transformations</li>
                      <li>Fonctions : fonctions numériques, représentation graphique, variations, images et antécédents</li>
                      <li>Statistiques et probabilités : séries statistiques, représentations graphiques, probabilités sur un univers fini</li>
                      <li>Algorithmique et programmation : initiation à la programmation, algorithmes de base</li>
                    </ul>
                  </div>
                  {/* Niveau 1ère */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">1<sup>ère</sup></h4>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Algèbre : fonctions polynômes du 2nd degré, équations et inéquations, factorisation, développement</li>
                      <li>Analyse : dérivation, étude de variations, extremums, tangentes</li>
                      <li>Géométrie : vecteurs, droites et plans dans l’espace, produit scalaire</li>
                      <li>Probabilités et statistiques : variables aléatoires, loi binomiale, espérance, échantillonnage</li>
                      <li>Algorithmique et programmation : approfondissement, boucles, conditions, fonctions</li>
                    </ul>
                  </div>
                  {/* Niveau Terminale */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">Terminale</h4>
                    <h5 className="text-lg font-medium text-primary mb-2">Algèbre et géométrie :</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Dénombrement (combinaisons, permutations)</li>
                      <li>Calcul vectoriel dans l’espace, produit scalaire, produit vectoriel, produit mixte, équations de droites et plans</li>
                      <li>Divisibilité, congruences dans ℤ, décomposition en facteurs premiers, PGCD, algorithme d’Euclide, théorèmes de Bézout et de Gauss, petit théorème de Fermat</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Analyse :</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Suites arithmétiques et géométriques, limites, continuité</li>
                      <li>Dérivation, intégration, primitives, équations différentielles simples</li>
                      <li>Matrices (définitions, addition, multiplication, inversion, calculs de puissances)</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Fonctions :</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Logarithme népérien, exponentielle, fonctions trigonométriques, étude de fonctions</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Probabilités et statistiques :</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Probabilités conditionnelles, lois continues (loi normale), variables aléatoires, intervalles de confiance, estimation</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Algorithmique et programmation :</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Algorithmes avancés, simulations, modélisation</li>
                    </ul>
                  </div>
                  {/* Niveau Post-Bac */}
                  <div className="rounded-x1 shadow-sm border p-6 bg-background">
                    <h4 className="text-lg font-medium text-primary mb-2">Post-Bac</h4>
                    <h5 className="text-lg font-medium text-primary mb-2">Analyse</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Développements limités et asymptotiques</li>
                      <li>Suites et séries de fonctions</li>
                      <li>Intégration de Riemann</li>
                      <li>Théorie de la mesure et intégration de Lebesgue</li>
                      <li>Méthodes numériques (algorithmes de Newton, sécante, dichotomie, etc.)</li>
                      <li>Équations différentielles (ordinaires et partielles)</li>
                      <li>Topologie des espaces métriques (ouverts, fermés, compacité, connexité)</li>
                      <li>Fonctions de plusieurs variables (dérivées partielles, différentiabilité)</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Algèbre</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Algèbre linéaire : espaces vectoriels, applications linéaires, endomorphismes</li>
                      <li>Matrices et opérations matricielles (Trace, Déterminant, Transposée, Inverse, Puissances)</li>
                      <li>Algèbre structurelle : groupes, anneaux, corps</li>
                      <li>Equations diophantiennes</li>
                      <li>Réduction des endomorphismes, trigonalisation, diagonalisation, formes canoniques</li>
                      <li>Polynômes, théorème de Cayley-Hamilton, valeurs propres</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Analyse fonctionnelle</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Espaces vectoriels normés</li>
                      <li>Espaces de Hilbert</li>
                      <li>Espaces de Banach </li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Calcul intégral et transformées</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Intégration de Riemann</li>
                      <li>Intégration de Lebesgue</li>
                      <li>Transformée de Fourier</li>
                      <li>Transformée de Laplace</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Probabilités et statistiques</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Probabilités sur les espaces mesurés</li>
                      <li>Variables aléatoires, lois de probabilité</li>
                      <li>Espérance, variance, convergence en loi, presque sûre</li>
                      <li>Processus stochastiques</li>
                    </ul>
                    <h5 className="text-lg font-medium text-primary mb-2">Informatique et calcul scientifique</h5>
                    <ul className="pl-5 space-y-2 list-disc text-muted-foreground">
                      <li>Algorithmique et méthodes numériques</li>
                      <li>Analyse de la complexité</li>
                      <li>Programmation scientifique (Python, Matlab, etc.)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Me Contacter</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground">
              Prêt à commencer votre parcours mathématique ? Contactez-moi !
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Informations de Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 text-primary mr-4" />
                      <a href="mailto:mathcoin13@gmail.com" className="text-primary hover:underline">mathcoin13@gmail.com</a>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-primary mr-4" />
                      <span className="text-muted-foreground">Réponse sous 24h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-4">Pourquoi me choisir ?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span>Méthodes pédagogiques éprouvées</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span>Suivi personnalisé des progrès</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span>Flexibilité horaires et modalités</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Demande de Cours</h3>
                <div className="space-y-4 mb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Pour toute demande de cours particuliers de mathématiques, contactez-moi par email à{" "}
                    <a href="mailto:mathcoin13@gmail.com" className="text-primary hover:underline font-medium">
                      mathcoin13@gmail.com
                    </a>
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Merci d'inclure les informations suivantes dans votre message :
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Informations sur la demande :</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>Pour qui est la demande ?</strong> (Pour moi-même, Pour mon enfant)</li>
                      <li>• <strong>Niveau actuel de l'élève</strong> (6ème, 5ème, 4ème, 3ème, 2nde, 1ère, Terminale, Licence, BTS, BUT)</li>
                      <li>• <strong>Type de besoin</strong> (Soutien scolaire, Remise à niveau, Préparation aux examens, Préparation aux concours)</li>
                      <li>• <strong>Modalité préférée</strong> (Distanciel en ligne, Présentiel en personne, Les deux flexible)</li>
                      <li>• <strong>Volume horaire souhaité</strong> (1 heure, 1h30, 2 heures, 3 heures, Plus de 3 heures par semaine)</li>
                      <li>• <strong>Objectif</strong> (Court terme quelques mois, Long terme année scolaire complète)</li>
                      <li>• <strong>Disponibilités</strong> (jours et horaires préférés)</li>
                      <li>• <strong>Message complémentaire</strong> (informations supplémentaires, difficultés particulières...)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src={mathCoinLogo} alt="MathCoin" className="w-8 h-8" />
              <span className="text-xl font-bold">MathCoin</span>
            </div>
            <p className="text-gray-400 mb-4">Cours particuliers de mathématiques - Tous niveaux</p>
            <p className="text-gray-500 text-sm">© 2024 MathCoin. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}