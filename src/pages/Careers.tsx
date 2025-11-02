import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Briefcase } from "lucide-react";

export const Careers = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our team to build amazing learning experiences with React and TypeScript.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "UI/UX design skills"]
    },
    {
      id: 2,
      title: "Content Creator",
      department: "Education",
      location: "New York, NY",
      type: "Full-time",
      description: "Create engaging educational content for our online courses and programs.",
      requirements: ["Teaching experience", "Subject matter expertise", "Video production skills"]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Help us scale our platform infrastructure and improve deployment processes.",
      requirements: ["AWS/Cloud experience", "Docker/Kubernetes", "CI/CD pipelines"]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Join Our Team</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Help us build the future of online education and make learning accessible to everyone
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="mt-2">{job.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{job.department}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Requirements:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">Don't see a perfect fit?</h2>
          <p className="mb-6 text-muted-foreground">
            We're always looking for talented individuals to join our team. Send us your resume!
          </p>
          <Button variant="outline">
            Send Resume
          </Button>
        </div>
      </div>
    </div>
  );
};