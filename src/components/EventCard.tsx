import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: string;
  title: string;
  type: string;
  image: string;
  endDate: string;
  region: string;
}

export const EventCard = ({ id, title, type, image, endDate, region }: EventCardProps) => (
  <Card className="overflow-hidden bg-card border-secondary/10 hover:border-secondary/40 transition-all">
    <div className="aspect-[4/5] relative overflow-hidden">
      <img src={image} alt={title} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <Badge className="mb-2 bg-secondary/80 text-secondary-foreground">
          {type}
        </Badge>
        <h3 className="font-bold text-lg leading-tight mb-2">{title}</h3>
        <div className="flex items-center text-xs text-muted-foreground space-x-3">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" /> Ends: {endDate}
          </span>
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" /> {region}
          </span>
        </div>
      </div>
    </div>
  </Card>
);
