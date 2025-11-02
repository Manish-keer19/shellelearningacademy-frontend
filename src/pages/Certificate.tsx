import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Download, Share2 } from "lucide-react";

const Certificate = () => {
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Congratulations!
            </h1>
            <p className="text-xl text-muted-foreground">
              You've successfully completed the course
            </p>
          </div>

          {/* Certificate */}
          <Card className="p-12 mb-8 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
            <div className="text-center space-y-6">
              <div className="text-sm uppercase tracking-wider text-muted-foreground">
                Certificate of Completion
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Web Development Bootcamp
              </h2>
              
              <div className="py-8">
                <p className="text-lg mb-2">This certifies that</p>
                <p className="text-4xl font-bold text-primary mb-2">John Doe</p>
                <p className="text-lg">has successfully completed</p>
              </div>

              <div className="flex justify-center gap-12 text-sm text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground mb-1">Instructor</p>
                  <p>Jane Smith</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Date</p>
                  <p>October 31, 2025</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Certificate ID</p>
                  <p>SE-{courseId || "12345"}</p>
                </div>
              </div>

              <div className="pt-8 flex justify-center">
                <Award className="w-20 h-20 text-primary opacity-20" />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download Certificate
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Share2 className="w-5 h-5" />
              Share on LinkedIn
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Certificate;