import React from 'react';
import { Trophy, Calendar, Users, Award, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Tournaments = () => {
  const tournaments = [
    {
      id: '1',
      title: 'Zeus FF Pro League Season 4',
      status: 'Ongoing',
      prize: '$5,000',
      date: 'Oct 15 - Nov 10',
      teams: '32 Teams',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa679d92-a63c-468e-bac2-d6799fd14386/esports-section-78811c88-1782578377665.webp',
    },
    {
      id: '2',
      title: 'Global FF Invitational',
      status: 'Upcoming',
      prize: '$25,000',
      date: 'Dec 05 - Dec 20',
      teams: '16 Teams',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-extrabold neon-text-blue mb-4">ESPORTS HUB</h1>
          <p className="text-muted-foreground">The ultimate stage for Free Fire champions. Watch, compete, and win.</p>
        </div>
        <Button className="bg-primary text-primary-foreground font-bold h-12 px-8">REGISTER YOUR TEAM</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {tournaments.map((t) => (
          <Card key={t.id} className="bg-card border-primary/20 overflow-hidden group">
            <div className="aspect-[21/9] relative overflow-hidden">
              <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <Badge className={`absolute top-4 right-4 ${t.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'}`}>
                {t.status}
              </Badge>
            </div>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">{t.title}</h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><Award size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Prize Pool</p>
                    <p className="font-bold">{t.prize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Schedule</p>
                    <p className="font-bold">{t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><Users size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Participants</p>
                    <p className="font-bold">{t.teams}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><MapPin size={20} /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Platform</p>
                    <p className="font-bold">Mobile / PC</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1 bg-primary text-primary-foreground font-bold">VIEW BRACKETS</Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10">MATCH DETAILS</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-accent/10 rounded-3xl p-10 border border-primary/10">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Trophy className="text-primary" /> RECENT MATCH RESULTS
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-background rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <div className="text-center">
                  <p className="text-2xl font-black">ZEUS KINGS</p>
                  <p className="text-xs text-muted-foreground font-bold">REGION: NA</p>
                </div>
                <div className="text-4xl font-black text-primary">VS</div>
                <div className="text-center">
                  <p className="text-2xl font-black">TEAM TITANS</p>
                  <p className="text-xs text-muted-foreground font-bold">REGION: SA</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm font-bold text-green-500">WINNER: ZEUS KINGS</p>
                  <p className="text-xs text-muted-foreground">Score: 2 - 1</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full bg-accent/20"><ChevronRight /></Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tournaments;
