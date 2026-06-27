import React from 'react';
import { storage } from '@/services/storage';
import { Player } from '@/services/mockData';
import { Search as SearchIcon, History, User, Trophy, Zap, Globe, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

const Search = () => {
  const [uid, setUid] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<Player | null>(null);
  const [searched, setSearched] = React.useState(false);
  const [history, setHistory] = React.useState<string[]>([]);

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('ff_search_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleSearch = (searchUid: string = uid) => {
    if (!searchUid.trim()) {
      toast.error('Please enter a valid UID');
      return;
    }

    setLoading(true);
    setSearched(true);
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      const players = storage.getPlayers();
      const found = players.find(p => p.uid === searchUid);
      
      if (found) {
        setResult(found);
        // Add to history
        const newHistory = [searchUid, ...history.filter(h => h !== searchUid)].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem('ff_search_history', JSON.stringify(newHistory));
      } else {
        toast.error('Player not found');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold neon-text-blue mb-4">PLAYER SEARCH</h1>
        <p className="text-muted-foreground">Enter a Free Fire UID to view player stats and rankings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            className="pl-12 h-14 text-lg bg-accent/10 border-primary/20 focus:border-primary shadow-[0_0_15px_rgba(0,242,255,0.05)]"
            placeholder="Enter Player UID (e.g. 123456789)"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          className="h-14 px-8 bg-primary text-primary-foreground font-bold text-lg"
          onClick={() => handleSearch()}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : <SearchIcon className="mr-2" />}
          SEARCH
        </Button>
      </div>

      {history.length > 0 && !loading && !result && (
        <div className="mb-12">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <History size={16} /> RECENT SEARCHES
          </h3>
          <div className="flex flex-wrap gap-2">
            {history.map((h) => (
              <Button 
                key={h} 
                variant="outline" 
                size="sm" 
                className="rounded-full border-primary/10 hover:border-primary/40"
                onClick={() => {
                  setUid(h);
                  handleSearch(h);
                }}
              >
                {h}
              </Button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="py-20 text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse">Fetching player information from server...</p>
        </div>
      )}

      {!loading && searched && result && (
        <Card className="bg-card border-primary/20 overflow-hidden neon-border animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-gradient-to-r from-primary/20 to-transparent p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/40">
                <User size={48} className="text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">{result.name}</h2>
                <p className="text-muted-foreground font-mono">UID: {result.uid}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded">LVL {result.level}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe size={12} /> {result.region}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="p-6 bg-accent/10 rounded-2xl border border-primary/5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-bold">Current Rank</p>
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="text-yellow-500" />
                  <span className="text-xl font-bold">{result.rank}</span>
                </div>
              </div>
              <div className="p-6 bg-accent/10 rounded-2xl border border-primary/5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-bold">K/D Ratio</p>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="text-primary" />
                  <span className="text-xl font-bold">{result.kdRatio}</span>
                </div>
              </div>
              <div className="p-6 bg-accent/10 rounded-2xl border border-primary/5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-bold">Win Rate</p>
                <div className="flex items-center justify-center gap-2">
                  <Globe className="text-secondary" />
                  <span className="text-xl font-bold">{result.winRate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && searched && !result && (
        <div className="py-20 text-center bg-destructive/5 rounded-3xl border border-dashed border-destructive/20">
          <AlertCircle className="w-16 h-16 text-destructive/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No player information found.</h2>
          <p className="text-muted-foreground">Make sure you entered the correct UID. We only track verified players from major regions.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
