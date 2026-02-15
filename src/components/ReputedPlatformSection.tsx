import React from 'react';

// Import all reputed platform images
import platform1 from "@/assets/Reputed_plaform/1.jpeg";
import platform2 from "@/assets/Reputed_plaform/2.jpeg";
import platform3 from "@/assets/Reputed_plaform/3.jpeg";
import platform4 from "@/assets/Reputed_plaform/4.jpeg";
import platform5 from "@/assets/Reputed_plaform/5.jpeg";
import platform6 from "@/assets/Reputed_plaform/6.jpeg";
import platform7 from "@/assets/Reputed_plaform/7.jpeg";
import platform8 from "@/assets/Reputed_plaform/8.jpeg";
import platform9 from "@/assets/Reputed_plaform/9.jpeg";
import platform11 from "@/assets/Reputed_plaform/11.jpeg";
import platform12 from "@/assets/Reputed_plaform/12.jpeg";
import platform13 from "@/assets/Reputed_plaform/13.jpeg";
import platform14 from "@/assets/Reputed_plaform/14.jpeg";
import platform15 from "@/assets/Reputed_plaform/15.jpeg";

const platforms = [
    platform1, platform2, platform3, platform4, platform5, platform6, platform7,
    platform8, platform9, platform11, platform12, platform13, platform14, platform15
];

export const ReputedPlatformSection = () => {
    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="container relative mx-auto px-4 z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6 border-primary/20 bg-primary/5 text-primary">
                        Media Recognition & Global Presence
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                        Featured on <span className="text-primary">Reputed Platforms</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Shell E-Learning Academy has been highlighted by reputed media platforms and global communities for its commitment to delivering industry-relevant training, AI-powered learning solutions, and career-focused internship programs that empower students with practical, job-ready skills.
                    </p>
                </div>

                {/* Two Lines of Infinite Scroll */}
                <div className="relative mt-20 space-y-8">
                    {/* First Line - Left to Right */}
                    <div className="relative">
                        <div className="flex overflow-x-hidden">
                            <div className="flex animate-marquee gap-8 md:gap-12 items-center py-8">
                                {/* Duplicate entries for smoother loop */}
                                {[...platforms, ...platforms].map((platform, index) => (
                                    <div
                                        key={`platform-ltr-${index}`}
                                        className="flex-shrink-0 group"
                                    >
                                        <div className="relative bg-white dark:bg-card rounded-2xl p-4 md:p-6 shadow-sm border border-border/40 hover:shadow-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 w-[120px] h-[120px] md:w-[150px] md:h-[150px] flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <img
                                                src={platform}
                                                alt={`Platform ${index + 1}`}
                                                className="relative z-10 max-w-full max-h-full object-contain opacity-100 transition-all duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Fade Edges */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                    </div>

                    {/* Second Line - Right to Left */}
                    <div className="relative">
                        <div className="flex overflow-x-hidden">
                            <div className="flex animate-marquee-reverse gap-8 md:gap-12 items-center py-8">
                                {/* Duplicate entries for smoother loop */}
                                {[...platforms, ...platforms].map((platform, index) => (
                                    <div
                                        key={`platform-rtl-${index}`}
                                        className="flex-shrink-0 group"
                                    >
                                        <div className="relative bg-white dark:bg-card rounded-2xl p-4 md:p-6 shadow-sm border border-border/40 hover:shadow-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 w-[120px] h-[120px] md:w-[150px] md:h-[150px] flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <img
                                                src={platform}
                                                alt={`Platform ${index + 1}`}
                                                className="relative z-10 max-w-full max-h-full object-contain opacity-100 transition-all duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Fade Edges */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes marquee-reverse {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-marquee {
                    animation: marquee 100s linear infinite;
                }

                .animate-marquee:hover {
                    animation-play-state: paused;
                }

                .animate-marquee-reverse {
                    animation: marquee-reverse 100s linear infinite;
                }

                .animate-marquee-reverse:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};
