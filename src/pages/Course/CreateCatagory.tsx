import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateCatagory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create category:", categoryData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gradient">
            Create Course Category
          </h1>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={categoryData.name}
                  onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={categoryData.description}
                  onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">Create Category</Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateCatagory;