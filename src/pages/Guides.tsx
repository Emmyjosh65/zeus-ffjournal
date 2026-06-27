import React from 'react';
import { storage } from '@/services/storage';
import { BookOpen, Sword, Target, Shield, Settings, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Guides = () => {
  const guides = storage.getGuides();
  const categories = [
    { name: 'Beginner', icon: BookOpen },
    { name: 'Character', icon: Target },
    { name: 'Weapon', icon: Sword },
    { name: 'Rank', icon: Shield },
    { name: 'Settings', icon: Settings },
  ];

  const [activeTab, setActiveTab] = React.useState('All');

  const filteredGuides = guides.filter(g => activeTab === 'All' || g.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold neon-text-blue mb-4">KNOWLEDGE BASE</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master the battlefield with our comprehensive guides created by top players and experts.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <button
          onClick={() => setActiveTab('All')}
          className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${
            activeTab === 'All' 
              ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,242,255,0.2)]' 
              : 'bg-card border-border hover:border-primary/50'
          }`}
        >
          <Zap size={24} />
          <span className="font-bold text-sm">All Guides</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(cat.name)}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${
              activeTab === cat.name 
                ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,242,255,0.2)]' 
                : 'bg-card border-border hover:border-primary/50'
            }`}
          >
            <cat.icon size={24} />
            <span className="font-bold text-sm">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="bg-card border-primary/10 hover:border-primary/40 transition-all group cursor-pointer overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <Badge className="absolute bottom-4 left-4 bg-primary text-primary-foreground">
                {guide.category}
              </Badge>
            </div>
            <CardHeader className="p-6">
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {guide.title}
              </h3>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {guide.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Guides;
