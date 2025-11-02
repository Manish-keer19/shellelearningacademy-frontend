export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using Shell E-learning Academy, you accept and agree to be bound 
              by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Course Access and Usage</h2>
            <p className="text-muted-foreground mb-4">
              Upon enrollment, you gain access to course materials for personal, non-commercial use. 
              You may not redistribute or share course content without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Refund Policy</h2>
            <p className="text-muted-foreground mb-4">
              We offer a 30-day money-back guarantee for all courses. Refund requests must be 
              submitted within 30 days of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, contact us at legal@shellelearning.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};