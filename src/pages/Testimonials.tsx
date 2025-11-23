import React from "react";
import { Star, Quote } from "lucide-react";

// Images
import img1 from "../assets/new_student/1.jpg"
import img2 from "../assets/new_student/2.jpg"
import img3 from "../assets/new_student/3.jpg"
import img4 from "../assets/new_student/4.jpg"
import img5 from "../assets/new_student/5.jpg"
import dummy from "../assets/students/dummy.png"
import img6 from "../assets/new_student/6.jpg"

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Aarav Sharma",
            role: "Full Stack Developer",
            quote: "The Full Stack Development bootcamp was intense but incredibly rewarding. The project-based learning approach helped me build a portfolio that got me hired at a top tech startup within a month of graduating.",
            rating: 4,
            avatar: img1,
        },
        {
            id: 2,
            name: "Vishal Rajput",
            role: "Digital Marketing Specialist",
            quote: "I was struggling to understand the nuances of SEO and SEM until I took this course. The mentors are industry experts who break down complex concepts into easy-to-understand lessons. Highly recommended!",
            rating: 5,
            avatar: img2,
        },
        {
            id: 3,
            name: "Rohan Gupta",
            role: "Data Science Intern",
            quote: "Shell E-Learning's Data Science track is top-notch. The curriculum covers everything from Python basics to advanced machine learning algorithms. The career support team was also very helpful.",
            rating: 4,
            avatar: img3,
        },
        {
            id: 4,
            name: "Sargam Dhangar",
            role: "UI/UX Designer",
            quote: "As a beginner in design, I found the UI/UX course very structured and beginner-friendly. The feedback on my assignments was detailed and helped me improve my design eye significantly.",
            rating: 5,
            avatar: img6,
        },
      {
    id: 6,
    name: "Neha Verma",
    role: "Software Engineer",
    quote: "Joining Shell E-Learning was the best career decision I made. The mentors explained complex backend concepts in a simple, practical way. The real-world projects helped me crack multiple interviews with confidence.",
    rating: 5,
    avatar: img5,
},

        {
            id: 5,
            name: "Vikram Singh",
            role: "Cloud Architect",
            quote: "The Cloud Computing course gave me the hands-on experience I needed with AWS and Azure. The labs were challenging and mirrored real-world scenarios, which gave me the confidence to clear my exams.",
            rating: 5,
            avatar: img4,
        }
    ];

    return (
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                        <Star className="w-4 h-4 fill-primary" /> Student Success Stories
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        Don't just take our word for it
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Join thousands of students who have transformed their careers with Shell E-Learning. Here's what they have to say about their journey.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="group bg-card hover:bg-card/50 border border-border/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Quote className="w-6 h-6 text-primary fill-primary/20" />
                                </div>
                            </div>

                            {/* Quote Text */}
                            <p className="text-muted-foreground italic mb-8 flex-grow leading-relaxed">
                                "{testimonial.quote}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                                <div className="relative">
                                    <img
                                        src={testimonial.avatar || dummy}
                                        alt={testimonial.name}
                                        loading="lazy"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-background ring-2 ring-primary/20"
                                        onError={(e) => e.currentTarget.src = dummy}
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                                        <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-background"></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                                    <p className="text-xs text-primary font-medium">{testimonial.role}</p>
                                </div>
                                <div className="ml-auto flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;