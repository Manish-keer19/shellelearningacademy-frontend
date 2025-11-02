import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  category: string;
}

export const CourseCard = ({
  title,
  description,
  duration,
  students,
  rating,
  image,
  category,
}: CourseCardProps) => {
  return (
    <Card className="group overflow-hidden hover-lift">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary/20">{category.slice(0, 2)}</div>
        </div>
        {/* Category Badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-medium backdrop-blur">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 font-display text-xl font-semibold smooth-transition group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{rating}</span>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full smooth-transition group-hover:scale-105">
          Enroll Now
        </Button>
      </div>
    </Card>
  );
};
