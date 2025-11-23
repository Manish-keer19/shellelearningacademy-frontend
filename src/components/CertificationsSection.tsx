import React from "react";
import { Award, CheckCircle, ShieldCheck } from "lucide-react";

export const CertificationsSection = () => {
    return (
        <section className="py-12 bg-primary/5 border-y border-border/50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="md:w-1/2">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                            Recognized & Accredited
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Our courses are recognized by top industry bodies. Earn certificates that add real value to your professional profile and are verifiable worldwide.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border/50 shadow-sm">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="font-semibold text-sm">ISO 9001:2015 Certified</span>
                            </div>
                            <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border/50 shadow-sm">
                                <Award className="w-5 h-5 text-primary" />
                                <span className="font-semibold text-sm">Skill India Partner</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center md:justify-end gap-6">
                        {/* Placeholder for Certification Logos */}
                        <div className="w-24 h-24 bg-white rounded-xl shadow-md flex items-center justify-center p-2 border border-border/50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/ISO_9001-2015.svg/1200px-ISO_9001-2015.svg.png" alt="ISO" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-24 h-24 bg-white rounded-xl shadow-md flex items-center justify-center p-2 border border-border/50">
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Skill_India.svg/1200px-Skill_India.svg.png" alt="Skill India" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-24 h-24 bg-white rounded-xl shadow-md flex items-center justify-center p-2 border border-border/50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google Certified" className="w-full h-full object-contain" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
