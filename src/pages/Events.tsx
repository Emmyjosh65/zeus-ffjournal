import React from 'react';
import { storage } from '@/services/storage';
import { EventCard } from '@/components/EventCard';
import { Calendar, Clock, MapPin, Award } from 'lucide-react';

const Events = () => {
  const events = storage.getEvents();
  const currentEvents = events.filter(e => e.type === 'Current');
  const upcomingEvents = events.filter(e => e.type === 'Upcoming');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-extrabold neon-text-blue mb-4">GAMING EVENTS</h1>
        <p className="text-muted-foreground">Don't miss out on the latest Free Fire events and rewards.</p>
      </div>

      <div className="space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <Clock size={24} />
            </div>
            <h2 className="text-2xl font-bold">Active Now</h2>
          </div>
          {currentEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-accent/5 rounded-2xl border border-dashed border-primary/20">
              <p className="text-muted-foreground">No active events at the moment.</p>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Calendar size={24} />
            </div>
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-accent/5 rounded-2xl border border-dashed border-primary/20">
              <p className="text-muted-foreground">Check back later for upcoming events.</p>
            </div>
          )}
        </section>

        <section className="bg-secondary/5 rounded-3xl p-10 border border-secondary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 neon-text-orange">Login Rewards</h2>
              <p className="text-muted-foreground mb-6">
                Log in daily to claim exclusive rewards including weapon skins, character fragments, and gold coins.
              </p>
              <div className="space-y-4">
                {[
                  { day: 'Day 1', reward: 'Gold Royale Voucher' },
                  { day: 'Day 3', reward: 'Pet Food x5' },
                  { day: 'Day 7', reward: 'Permanent Parachute Skin' },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between p-4 bg-background rounded-xl border border-secondary/10">
                    <span className="font-bold">{item.day}</span>
                    <span className="text-primary font-medium">{item.reward}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,140,0,0.1)]">
              <img 
                src="https://images.unsplash.com/photo-1614027126733-ee58f5471b59?auto=format&fit=crop&q=80&w=800" 
                alt="Rewards" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
