import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Gift, Trophy, BookOpen, Target, Sword, Settings, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storage } from '@/services/storage';
import { NewsCard } from '@/components/NewsCard';
import { EventCard } from '@/components/EventCard';

const Home = () => {
  const news = storage.getNews();
  const events = storage.getEvents();
  const trendingNews = news.filter(item => item.isTrending);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Banner */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa679d92-a63c-468e-bac2-d6799fd14386/hero-banner-85634f98-1782578379067.webp" 
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4">
              <span className="block text-foreground">ZEUS</span>
              <span className="block neon-text-blue">FF JOURNAL</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your Ultimate Free Fire Companion. Get the latest news, redeem codes, and pro guides.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground font-bold px-8 shadow-[0_0_15px_rgba(0,242,255,0.4)]">
                GET STARTED
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                LATEST UPDATES
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Latest News & Trending */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="text-primary" /> LATEST NEWS
            </h2>
            <Link to="/news" className="text-primary hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Player Tools & Redeem Codes */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-accent/20 rounded-2xl p-8 neon-border">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="text-primary" /> PLAYER UTILITIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/search" className="p-6 bg-background rounded-xl border border-primary/20 hover:border-primary transition-all group">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-primary">
                  <TrendingUp size={20} /> Player Search
                </h3>
                <p className="text-sm text-muted-foreground">Search by UID to check player stats and information.</p>
              </Link>
              <Link to="/redeem" className="p-6 bg-background rounded-xl border border-primary/20 hover:border-primary transition-all group">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-primary">
                  <Gift size={20} /> Redeem Codes
                </h3>
                <p className="text-sm text-muted-foreground">Find the latest active redeem codes for your region.</p>
              </Link>
              <Link to="/guides" className="p-6 bg-background rounded-xl border border-primary/20 hover:border-primary transition-all group">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-primary">
                  <BookOpen size={20} /> Pro Guides
                </h3>
                <p className="text-sm text-muted-foreground">Level up your gameplay with character and weapon guides.</p>
              </Link>
              <div className="p-6 bg-background rounded-xl border border-primary/20 hover:border-primary transition-all group">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-primary">
                  <Trophy size={20} /> Esports Hub
                </h3>
                <p className="text-sm text-muted-foreground">Stay updated with match schedules and tournament results.</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/10 rounded-2xl p-8 border border-secondary/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 neon-text-orange">
              <Gift /> DAILY MISSIONS
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-secondary/10">
                  <span className="text-sm font-medium">Daily Login Reward</span>
                  <Button size="sm" variant="outline" className="h-8 text-xs border-secondary text-secondary">CLAIM</Button>
                </div>
              ))}
              <div className="pt-4 border-t border-secondary/10 text-center">
                <p className="text-xs text-muted-foreground mb-4">Complete all missions to win special prizes!</p>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">VIEW ALL</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="text-secondary" /> FEATURED EVENTS
            </h2>
            <Link to="/events" className="text-secondary hover:underline">See All Events</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>

        {/* Guides Categories */}
        <section className="bg-accent/10 rounded-3xl p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Master Every Aspect</h2>
            <p className="text-muted-foreground">Comprehensive guides to help you dominate the battlefield.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Sword className="text-primary" size={32} />
              </div>
              <span className="font-bold">Weapon Guides</span>
            </div>
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Target className="text-primary" size={32} />
              </div>
              <span className="font-bold">Characters</span>
            </div>
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Zap className="text-primary" size={32} />
              </div>
              <span className="font-bold">Rank Push</span>
            </div>
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <Settings className="text-primary" size={32} />
              </div>
              <span className="font-bold">Pro Settings</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
