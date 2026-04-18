import React from 'react';
import './Services.css';

const servicesData = [
    {
        id: 1,
        title: "Web Application",
        icon: "/assets/code-service-icon.png",
        cssImg: "w-34 h-34 lg:w-44 lg:h-44",
        description: "At Roma Digital Solutions, we bridge the gap between <span class='gold'>engineering and strategic</span> growth. We don't just deliver websites; we architect custom full-stack applications designed to be permanent <span class='gold'>business assets</span>. By eliminating the 'software rent' trap, we provide high-performance tools with <span class='gold'>100% ownership</span>. One investment. Total control. Forever yours."
    },
    {
        id: 2,
        title: "Domain Name",
        icon: "/assets/domain-icon.png",
        cssImg: "w-40 h-40 lg:w-50 lg:h-50",
        description: "Managing domain assets shouldn't be a <span class='gold'>business bottleneck</span>. Whether you are struggling with DNS records, selecting a provider, or navigating a complex transfer, we handle the entire technical migration for you. We ensure a secure, <span class='gold'>zero-downtime</span> transition, moving your digital identity to the optimal environment while you focus on <span class='gold'>scaling your business</span>."
    },
    {
        id: 3,
        title: "Business Email",
        icon: "/assets/email-service-icon.png",
        cssImg: "w-34 h-34 lg:w-44 lg:h-44",
        description: "Business communication is non-negotiable. An email delay or a lost archive isn't just a glitch—it's a threat to your reputation. We architect secure, <span class='gold'>high-deliverability</span> email environments. We handle the full technical orchestration of your migrations with <span class='gold'>zero-downtime and 100% data integrity</span>, ensuring your business stays connected and protected."
    },
    {
        id: 4,
        title: "SEO",
        icon: "/assets/seo-service-icon.png",
        cssImg: "w-50 h-50",
        description: "Visibility is the foundation of <span class='gold'>organic growth</span>. We don't chase vanity metrics; we optimize for <span class='gold'>search intent and conversion</span>. From technical SEO audits to high-performance content strategies, we ensure your platform becomes a self-sustaining traffic engine. Turn your search presence into a <span class='gold'>competitive advantage</span> that drives long-term value."
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 px-6 lg:px-20 scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                {/* Title Centered on Mobile, Left on Desktop */}
                <h2 className="text-[2.5rem] lg:text-[3rem] font-bold text-white mb-20 text-center lg:text-left lg:pl-4 section-title">
                    Services
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-26 gap-x-8 justify-items-center">
                    {servicesData.map((service) => (
                        <div
                            key={service.id}
                            className="service-card w-full max-w-[85%] lg:max-w-[450px] lg:min-h-[600px] p-10 flex flex-col items-start group border border-white/10 rounded-xl bg-[#111]"
                        >
                            {/* Icon Container */}
                            <div className="icon-wrapper mb-8">
                                <img src={service.icon} alt={service.title} className={`object-contain ${service.cssImg}`} />
                            </div>

                            <h3 className="w-full text-[#b88a44] text-[1.8rem] lg:text-[2.4rem] text-center font-bold mb-14">
                                {service.title}
                            </h3>

                            <p
                                className="text-gray-300 text-[0.9rem] lg:text-[1.3rem] text-base leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: service.description }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Separator */}
            <div className="mt-24 pb-1 flex justify-center">
                <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-[#b88a44] to-transparent opacity-40" />
            </div>
        </section>
    );
};

export default Services;