import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
}

export const NewsCard = ({ id, title, category, image, date }: NewsCardProps) => (
  <Card className="overflow-hidden bg-card border-primary/10 hover:border-primary/40 transition-all hover:translate-y-[-4px]">
    <div className="aspect-video relative overflow-hidden">
      <img src={image} alt={title} className="object-cover w-full h-full transition-transform hover:scale-105 duration-500" />
      <Badge className="absolute top-2 left-2 bg-primary/80 backdrop-blur-sm text-primary-foreground">
        {category}
      </Badge>
    </div>
    <CardHeader className="p-4">
      <div className="flex items-center text-xs text-muted-foreground mb-2">
        <Clock className="w-3 h-3 mr-1" />
        {date}
      </div>
      <h3 className="font-bold line-clamp-2 hover:text-primary transition-colors cursor-pointer">
        {title}
      </h3>
    </CardHeader>
    <CardFooter className="p-4 pt-0">
      <Link to={`/news`} className="text-primary text-sm font-medium flex items-center hover:gap-1 transition-all">
        Read More <ChevronRight className="w-4 h-4" />
      </Link>
    </CardFooter>
  </Card>
);
