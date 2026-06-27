import { Mail, Phone, MessageSquare, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/20 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold neon-text-blue">ZEUS FF JOURNAL</h3>
            <p className="text-muted-foreground text-sm">
              Your Ultimate Free Fire Companion. Stay updated with the latest news, events, and guides.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/news" className="hover:text-primary">Latest News</a></li>
              <li><a href="/redeem" className="hover:text-primary">Redeem Codes</a></li>
              <li><a href="/events" className="hover:text-primary">Active Events</a></li>
              <li><a href="/guides" className="hover:text-primary">Gaming Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://whatsapp.com/channel/0029VbCsw0SGE56rCTPaXd06" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center gap-2"
                >
                  <MessageSquare size={16} /> WhatsApp Channel
                </a>
              </li>
              <li>
                <a 
                  href="https://chat.whatsapp.com/KGhZqQujg0Z2ljAmnU4jh5?mode=gi_t" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center gap-2"
                >
                  <Globe size={16} /> WhatsApp Group
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact Owner</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="font-medium text-foreground">Owner:</span> Zeus
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:ge5853987@gmail.com" className="hover:text-primary">
                  ge5853987@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <a href="https://wa.me/2349066760078" className="hover:text-primary">
                  09066760078
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ZEUS FF JOURNAL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
