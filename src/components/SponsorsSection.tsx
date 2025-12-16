// Import all sponsor images
import sponsor11 from "@/assets/sponsers/11.jpeg";
import sponsor12 from "@/assets/sponsers/12.jpeg";
import sponsor13 from "@/assets/sponsers/13.jpeg";
import sponsor14 from "@/assets/sponsers/14.jpeg";
import sponsor15 from "@/assets/sponsers/15.jpeg";
import sponsor16 from "@/assets/sponsers/16.jpeg";
import sponsor17 from "@/assets/sponsers/17.jpeg";
import sponsor18 from "@/assets/sponsers/18.jpeg";
import sponsor19 from "@/assets/sponsers/19.jpeg";
import sponsor20 from "@/assets/sponsers/20.jpeg";
import sponsor21 from "@/assets/sponsers/21.jpeg";
import sponsor22 from "@/assets/sponsers/22.jpeg";
import sponsor23 from "@/assets/sponsers/23.jpeg";
import sponsor24 from "@/assets/sponsers/24.jpeg";
import sponsor25 from "@/assets/sponsers/25.jpeg";
import sponsor26 from "@/assets/sponsers/26.jpeg";
import sponsor27 from "@/assets/sponsers/27.jpeg";
import sponsor28 from "@/assets/sponsers/28.jpeg";

const sponsors = [
    sponsor11, sponsor12, sponsor13, sponsor14, sponsor15,
    sponsor16, sponsor17, sponsor18, sponsor19, sponsor20,
    sponsor21, sponsor22, sponsor23, sponsor24, sponsor25,
    sponsor26, sponsor27, sponsor28
];

export const SponsorsSection = () => {
    return (
        <section className="py-12 md:py-16 bg-muted/30 border-y border-border/50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Our Trusted Partners
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                        Collaborating with Industry Leaders
                    </h2>
                </div>

                {/* Infinite Scroll Animation Container */}
                <div className="relative flex overflow-x-hidden">
                    <div className="flex animate-marquee whitespace-nowrap gap-8 md:gap-12 lg:gap-16 items-center py-4">
                        {/* First set of sponsors */}
                        {sponsors.map((sponsor, index) => (
                            <div
                                key={`sponsor-1-${index}`}
                                className="flex items-center justify-center min-w-[120px] md:min-w-[160px] lg:min-w-[180px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-110"
                            >
                                <div className="bg-background rounded-xl p-4 md:p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                                    <img
                                        src={sponsor}
                                        alt={`Sponsor ${index + 1}`}
                                        className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {sponsors.map((sponsor, index) => (
                            <div
                                key={`sponsor-2-${index}`}
                                className="flex items-center justify-center min-w-[120px] md:min-w-[160px] lg:min-w-[180px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-110"
                            >
                                <div className="bg-background rounded-xl p-4 md:p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                                    <img
                                        src={sponsor}
                                        alt={`Sponsor ${index + 1}`}
                                        className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="text-center mt-10 pt-6 border-t border-border/30">
                    <p className="text-sm md:text-base text-muted-foreground font-medium">
                        Trusted by <span className="text-primary font-bold text-lg">100+</span> organizations worldwide
                    </p>
                </div>
            </div>

            {/* Custom CSS for infinite scroll animation */}
            <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 60s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};
