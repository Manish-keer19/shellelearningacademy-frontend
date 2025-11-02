import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tag, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAppSelector } from '@/hooks/redux';
import { adminService } from '@/service/admin.service';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Handler for basic text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch all categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      setIsLoadingCategories(true);
      const res = await adminService.getAllCatagory(token);
      setCategories(res.data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryData.name.trim()) {
      toast.error("Please fill required fields.");
      return;
    }
    if (!token) {
      toast.error("Authentication Error. Please login again.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await adminService.createCatagory(categoryData, token);
      
      toast.success(res.message || "Category created successfully!");
      setCategoryData({ name: '', description: '' });
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Back Button Header */}
          <div className="mb-6">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gradient">
            Create Course Category
          </h1>

          <Card className="p-8 bg-card/80 backdrop-blur-lg border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Information Section */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold">
                  <Tag className="w-4 h-4 text-primary" />
                  Category Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={categoryData.name}
                  onChange={handleInputChange}
                  placeholder="Enter category name (e.g., Web Development)"
                  required
                  disabled={isLoading}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={categoryData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the category..."
                  required
                  disabled={isLoading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create Category
                  </>
                )}
              </Button>
            </form>

            {/* Existing Categories Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                Existing Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {isLoadingCategories ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading categories...
                  </div>
                ) : categories.length > 0 ? (
                  categories.map((category: any) => (
                    <Badge key={category._id} variant="secondary" className="text-xs">
                      {category.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No categories created yet.</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateCategory;