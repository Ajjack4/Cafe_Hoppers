import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

interface PlaceCardProps {
  imageSrc: string;
  name: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  address: string;
}

export default function PlaceCard({ 
  imageSrc, 
  name, 
  rating, 
  reviewCount, 
  isOpen, 
 
}: PlaceCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <div className="relative h-32 w-full">
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-2">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="ml-1 text-sm text-gray-500">({reviewCount} reviews)</span>
          </div>
          <span className={`text-sm font-medium ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        {/* <div className="flex items-start text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
          <span>{address}</span>
        </div> */}
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full hover:bg-black hover:text-white">View Reviews</Button>
      </CardFooter>
    </Card>
  );
}
