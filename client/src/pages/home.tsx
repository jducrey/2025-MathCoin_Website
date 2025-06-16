import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactRequestSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calculator, GraduationCap, BookOpen, Clock, Mail, CheckCircle, Menu, X } from "lucide-react";
import mathCoinLogo from "@assets/MathCoinSymbol_1750082905685.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertContactRequestSchema),
    defaultValues: {
      demandeur: "",
      niveau: "",
      besoin: [],
      modalite: "",
      volume: "",
      objectif: "",
      disponibilites: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message envoyé !",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    contactMutation.mutate(data);
  };

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
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Formation Académique</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Master des Métiers de l'Enseignement, de l'Éducation et la Formation en Mathématiques</strong> - 
                    Formation complète aux méthodes pédagogiques modernes et à l'enseignement des mathématiques.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Expérience Professionnelle</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Plusieurs années d'expérience dans l'enseignement particulier avec des élèves de tous niveaux. 
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
                    Méthodes variées pour rendre les mathématiques accessibles et motivantes.
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
                    <p className="text-muted-foreground text-sm ml-8">Via plateforme de visioconférence avec tableau interactif</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-foreground">Cours en présentiel</span>
                    </div>
                    <p className="text-muted-foreground text-sm ml-8">Selon disponibilités et zone géographique</p>
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
                      <a href="mailto:contact@mathcoin.fr" className="text-primary hover:underline">contact@mathcoin.fr</a>
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

            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="demandeur"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pour qui est la demande ?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choisissez une option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="moi-meme">Pour moi-même</SelectItem>
                              <SelectItem value="mon-enfant">Pour mon enfant</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="niveau"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Niveau actuel de l'élève</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez le niveau" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="6eme">6ème</SelectItem>
                              <SelectItem value="5eme">5ème</SelectItem>
                              <SelectItem value="4eme">4ème</SelectItem>
                              <SelectItem value="3eme">3ème</SelectItem>
                              <SelectItem value="2nde">2nde</SelectItem>
                              <SelectItem value="1ere">1ère</SelectItem>
                              <SelectItem value="terminale">Terminale</SelectItem>
                              <SelectItem value="licence">Licence</SelectItem>
                              <SelectItem value="bts">BTS</SelectItem>
                              <SelectItem value="but">BUT</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="besoin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de besoin</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez le type de besoin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="soutien">Soutien scolaire</SelectItem>
                              <SelectItem value="remise-niveau">Remise à niveau</SelectItem>
                              <SelectItem value="preparation-examens">Préparation aux examens</SelectItem>
                              <SelectItem value="preparation-concours">Préparation aux concours</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="volume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Volume horaire souhaité (heures par semaine)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choisissez le volume" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1h">1 heure</SelectItem>
                              <SelectItem value="1h30">1h30</SelectItem>
                              <SelectItem value="2h">2 heures</SelectItem>
                              <SelectItem value="3h">3 heures</SelectItem>
                              <SelectItem value="plus">Plus de 3 heures</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="objectif"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Objectif</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez l'objectif" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="court-terme">Court terme (quelques mois)</SelectItem>
                              <SelectItem value="long-terme">Long terme (année scolaire complète)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="disponibilites"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disponibilités (jours/horaires)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Exemple: Lundi 17h-19h, Mercredi 14h-16h, Samedi matin..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message complémentaire (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Informations supplémentaires, difficultés particulières..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Envoi en cours..." : "Envoyer ma demande"}
                    </Button>
                  </form>
                </Form>
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
              <Calculator className="w-8 h-8 text-primary" />
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
