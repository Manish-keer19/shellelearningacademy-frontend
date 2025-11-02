import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Settings } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <p className="text-muted-foreground mb-4">john.doe@example.com</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary">
                    <BookOpen className="w-3 h-3 mr-1" />
                    5 Courses
                  </Badge>
                  <Badge variant="secondary">
                    <Award className="w-3 h-3 mr-1" />
                    2 Certificates
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <Card className="p-6">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md"
                      defaultValue="Passionate learner and tech enthusiast"
                    />
                  </div>

                  <Button type="submit">Save Changes</Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <Card className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Your enrolled courses will appear here
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <Card className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Your earned certificates will appear here
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;