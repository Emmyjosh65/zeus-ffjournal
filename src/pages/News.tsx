import React from 'react';
import { storage } from '@/services/storage';
import { NewsCard } from '@/components/NewsCard';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const News = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const news = storage.getNews();

  const categories = ['All', 'Update', 'Esports', 'Event', 'Character', 'Weapon'];

  const filteredNews = news.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold neon-text-blue mb-2">LATEST NEWS</h1>
          <p className="text-muted-foreground">Stay updated with the Free Fire universe.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            className="pl-10 bg-accent/20 border-primary/20 focus:border-primary"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            className={`cursor-pointer px-4 py-1 text-sm transition-all ${
              activeCategory === cat 
                ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,242,255,0.3)]' 
                : 'border-primary/20 text-muted-foreground hover:border-primary/50'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-accent/10 rounded-2xl border border-dashed border-primary/20">
          <p className="text-muted-foreground">No news articles found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default News;
