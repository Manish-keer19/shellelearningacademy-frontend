import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Download, Share2 } from "lucide-react";
import certificate1 from "@/assets/certificate12.png";
import certificate2 from "@/assets/certificate13.png";

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
          <div className="mb-8">
            <img 
              src={certificate1} 
              alt="Certificate of Completion" 
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Certificate Gallery */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-4">
              <img 
                src={certificate1} 
                alt="Certificate Template 1" 
                className="w-full rounded-lg"
              />
              <p className="text-center mt-2 text-sm text-muted-foreground">Professional Certificate</p>
            </Card>
            <Card className="p-4">
              <img 
                src={certificate2} 
                alt="Certificate Template 2" 
                className="w-full rounded-lg"
              />
              <p className="text-center mt-2 text-sm text-muted-foreground">Achievement Certificate</p>
            </Card>
          </div>

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