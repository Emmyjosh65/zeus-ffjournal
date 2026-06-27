import React from 'react';
import { Search as SearchIcon, X, FileText, Gift, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/services/storage';
import { Link } from 'react-router-dom';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = React.useState('');
  
  if (!isOpen) return null;

  const news = storage.getNews();
  const codes = storage.getCodes();
  const events = storage.getEvents();
  const guides = storage.getGuides();

  const results = {
    news: news.filter(i => i.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    codes: codes.filter(i => i.code.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    events: events.filter(i => i.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    guides: guides.filter(i => i.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
  };

  const hasResults = query && (results.news.length > 0 || results.codes.length > 0 || results.events.length > 0 || results.guides.length > 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-card border border-primary/20 rounded-3xl shadow-[0_0_50px_rgba(0,242,255,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-primary/10 flex items-center gap-4">
          <SearchIcon className="text-primary w-6 h-6" />
          <Input 
            autoFocus
            className="flex-grow bg-transparent border-none text-xl focus-visible:ring-0 placeholder:text-muted-foreground"
            placeholder="Search news, codes, guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon" onClick={onClose}><X /></Button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!query ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Type something to search across the platform...</p>
            </div>
          ) : hasResults ? (
            <div className="space-y-8">
              {results.news.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText size={14} /> News & Articles
                  </h3>
                  <div className="space-y-2">
                    {results.news.map(item => (
                      <Link key={item.id} to="/news" onClick={onClose} className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 group transition-colors">
                        <span className="font-medium group-hover:text-primary transition-colors">{item.title}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.codes.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Gift size={14} /> Redeem Codes
                  </h3>
                  <div className="space-y-2">
                    {results.codes.map(item => (
                      <Link key={item.id} to="/redeem" onClick={onClose} className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 group transition-colors">
                        <span className="font-mono font-bold group-hover:text-primary transition-colors">{item.code}</span>
                        <Badge variant="outline" className="text-[10px]">{item.region}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.guides.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen size={14} /> Gaming Guides
                  </h3>
                  <div className="space-y-2">
                    {results.guides.map(item => (
                      <Link key={item.id} to="/guides" onClick={onClose} className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 group transition-colors">
                        <span className="font-medium group-hover:text-primary transition-colors">{item.title}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-accent/5 border-t border-primary/10 flex justify-between items-center text-[10px] text-muted-foreground">
          <span>Search tip: Try searching for "OB45" or "Sensitivity"</span>
          <div className="flex gap-2">
            <span className="px-1.5 py-0.5 bg-background border rounded">ESC</span> to close
          </div>
        </div>
      </div>
    </div>
  );
};
