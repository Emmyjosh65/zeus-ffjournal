import React from 'react';
import { storage } from '@/services/storage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, RefreshCw, Search, Globe, ShieldCheck, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

const Redeem = () => {
  const [activeTab, setActiveTab] = React.useState<'Active' | 'Expired'>('Active');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('All');
  const codes = storage.getCodes();

  const regions = ['All', 'Global', 'IND', 'BR', 'NA', 'SA'];

  const filteredCodes = codes.filter((c) => {
    const matchesTab = c.status === activeTab;
    const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === 'All' || c.region === regionFilter;
    return matchesTab && matchesSearch && matchesRegion;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const activeCount = codes.filter(c => c.status === 'Active').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold neon-text-orange mb-4">REDEEM CODE CENTER</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get your free rewards by redeeming these codes on the official Garena website. 
          New codes are added daily by our community managers.
        </p>
      </div>

      <div className="bg-accent/10 rounded-2xl p-6 md:p-8 mb-12 border border-primary/10">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex bg-background p-1 rounded-xl border border-primary/10 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('Active')}
              className={`flex-1 md:w-32 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'Active' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ACTIVE ({activeCount})
            </button>
            <button
              onClick={() => setActiveTab('Expired')}
              className={`flex-1 md:w-32 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'Expired' 
                  ? 'bg-destructive text-destructive-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EXPIRED
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                className="pl-10 bg-background border-primary/20"
                placeholder="Search code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="bg-background border border-primary/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              {regions.map(r => <option key={r} value={r}>{r} Region</option>)}
            </select>
            <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredCodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((c) => (
            <Card key={c.id} className="bg-card border-primary/10 hover:border-primary/40 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="flex items-center gap-1 border-primary/20 text-primary">
                    <Globe size={12} /> {c.region}
                  </Badge>
                  {c.status === 'Active' ? (
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20 border-green-500/30 flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <ShieldAlert size={12} /> Expired
                    </Badge>
                  )}
                </div>
                
                <div className="bg-accent/20 rounded-xl p-4 mb-4 flex items-center justify-between border border-dashed border-primary/30 group-hover:border-primary/60 transition-colors">
                  <span className="text-xl font-mono font-bold tracking-widest">{c.code}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => handleCopy(c.code)}
                  >
                    <Copy size={18} />
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Added: {c.addedAt}</span>
                  <Link to="https://reward.ff.garena.com/" target="_blank">
                    <Button variant="link" className="h-auto p-0 text-xs text-primary">Redeem Page</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-accent/5 rounded-3xl border border-dashed border-primary/20">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="text-muted-foreground" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">No {activeTab.toLowerCase()} redeem codes available.</h3>
          <p className="text-muted-foreground">Check back later for new updates or try a different region.</p>
        </div>
      )}

      <div className="mt-20 p-8 bg-primary/5 rounded-3xl border border-primary/10">
        <h3 className="text-xl font-bold mb-4">How to Redeem?</h3>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li>Visit the official Garena Reward website: <a href="https://reward.ff.garena.com/" className="text-primary hover:underline">reward.ff.garena.com</a></li>
          <li>Log in to your Free Fire account using Facebook, Google, VK, or Twitter.</li>
          <li>Copy the redeem code from ZEUS FF JOURNAL and paste it into the text box.</li>
          <li>Click the "Confirm" button.</li>
          <li>The rewards will be sent to your in-game mail within 24 hours.</li>
        </ol>
      </div>
    </div>
  );
};

export default Redeem;
import { Link } from 'react-router-dom';
