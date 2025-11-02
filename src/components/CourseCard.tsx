import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, User, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  category: string;
  instructor: string;
  price: string | number;
  level?: string;
}

export const CourseCard = ({
  id,
  title,
  description,
  duration,
  students,
  rating,
  image,
  category,
  instructor,
  price,
  level,
}: CourseCardProps) => {
  return (
    <Card className="group overflow-hidden hover-lift transition-all duration-300 border-0 shadow-lg hover:shadow-xl h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 hidden">
          <span className="text-4xl font-bold text-primary/30">No Image</span>
        </div>
        {/* Category Badge */}
        <div className="absolute left-4 top-4 z-10">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        {/* Level Badge */}
        {level && level !== 'All Levels' && (
          <div className="absolute right-4 top-4 z-10">
            <Badge variant="outline" className="text-xs">
              {level}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="mb-2 font-display text-xl font-semibold line-clamp-1 smooth-transition group-hover:text-primary">
            {title}
          </h3>
          
          {/* Instructor */}
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{instructor}</span>
          </div>

          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Meta Info */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3" />
              <span>{students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span>({rating.toFixed(1)})</span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ₹{price}
            </span>
            {price === "0" || price === "Free" ? (
              <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">
                Free
              </Badge>
            ) : null}
          </div>

          {/* CTA */}
          {/* <Link to={`/course/${id}`} className="block"> */}
          <Link to={`/course-detail/${id}`} className="block">
            <Button className="w-full smooth-transition group-hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground">
              Enroll Now
            
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};