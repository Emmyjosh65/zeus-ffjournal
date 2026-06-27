import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/services/storage';
import { User, Mail, Settings, Bookmark, History, Shield, LogOut, Edit2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Profile = () => {
  const user = storage.getCurrentUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    storage.setCurrentUser(null);
    navigate('/');
    toast.info('Logged out successfully');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="space-y-8">
          <Card className="bg-card border-primary/20 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/30 to-secondary/30" />
            <CardContent className="p-6 -mt-12 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-card flex items-center justify-center overflow-hidden">
                  <User size={48} className="text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full border-2 border-card">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground text-sm mb-6">{user.email}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Edit2 size={12} className="mr-2" /> EDIT PROFILE
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="flex-1 text-xs text-destructive hover:bg-destructive/10">
                  <LogOut size={12} className="mr-2" /> LOG OUT
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Account</p>
            <div className="bg-accent/10 rounded-xl border border-primary/5 overflow-hidden">
              {[
                { name: 'My Bookmarks', icon: History, count: 12 },
                { name: 'Reading History', icon: History, count: 48 },
                { name: 'Notification Settings', icon: Shield, count: null },
                { name: 'Security & Password', icon: Settings, count: null },
              ].map((item) => (
                <button key={item.name} className="w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors border-b border-primary/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  {item.count && <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.count}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="text-primary" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { action: 'Bookmarked an article', item: 'New OB45 Update: Mega Changes!', time: '2 hours ago' },
                { action: 'Viewed a guide', item: 'Best Sensitivity Settings for Headshots', time: '1 day ago' },
                { action: 'Redeemed a code', item: 'FF9M2GF14CBF', time: '3 days ago' },
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,242,255,0.5)]" />
                  <div>
                    <p className="text-sm">
                      <span className="text-muted-foreground">{act.action}:</span>{' '}
                      <span className="font-bold text-foreground">{act.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="text-secondary" /> Personalization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">Customize your experience on Zeus FF Journal.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/10 rounded-xl border border-primary/5">
                  <h4 className="font-bold text-sm mb-1">Dark Mode</h4>
                  <p className="text-xs text-muted-foreground mb-3">OLED-optimized black theme</p>
                  <Button size="sm" variant="outline" className="w-full text-xs">ALWAYS ON</Button>
                </div>
                <div className="p-4 bg-accent/10 rounded-xl border border-primary/5">
                  <h4 className="font-bold text-sm mb-1">Push Notifications</h4>
                  <p className="text-xs text-muted-foreground mb-3">Get alerts for new redeem codes</p>
                  <Button size="sm" className="w-full text-xs bg-primary text-primary-foreground">ENABLED</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
