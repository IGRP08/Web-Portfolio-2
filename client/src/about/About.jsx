import React from 'react';
import './About.css';


const HeroSection = () => {

    const aboutIcons = [

        {
            title: "Full Ownership",
            img: "/assets/ownership-icon.png",
            imgcss: "w-[105px] h-[100px] lg:w-[180px] lg:h-[160px] object-contain"
        },
        {
            title: "Infrastructure",
            img: "/assets/infrastructure-icon.png",
            imgcss: "w-[105px] h-[100px] lg:w-[180px] lg:h-[160px] object-contain"
        },
        {
            title: "Security",
            img: "/assets/security-icon.png",
            imgcss: "w-[105px] h-[100px] lg:w-[180px] lg:h-[160px] object-contain"
        }
    ]

    return (
        <section id='about' className="relative w-full min-h-[400px] about-container text-white overflow-hidden px-6 py-4 mt-24 mb-24 lg:px-20 lg:py-2">
            {/* Background Radial Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 pt-22 items-center">

                {/* Left Content */}
                <div className="z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-[2.5rem] font-bold leading-tight mb-8">
                        You don't Rent it. You <span className="text-[#B08D57]">OWN</span> it.
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mb-12 opacity-90">
                        Most agencies rent you a tool; we build you an asset. From custom architecture to infrastructure setup (DNS, Professional Email, and Deployment), we handle the technical headaches from end-to-end. One investment for a scalable solution that belongs entirely to you. Forever.
                    </p>
                    <div className="flex flex-wrap items-center ">
                        {aboutIcons.map((aboutIcon, index) => (
                            <div key={index}>
                                <img
                                    src={aboutIcon.img} // Replace with your image
                                    alt={aboutIcon.title}
                                    className={` ${aboutIcon.imgcss}`} // Add any additional CSS classes if needed
                                />
                            </div>

                        ))}
                    </div>

                </div>

                {/* Right Image with Gradient Fade */}
                <div className="relative flex justify-center lg:justify-end">
                    <div
                        className="relative w-full max-w-[500px]"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
                        }}
                    >

                        <img
                            src="/assets/image-bg.png" // Replace with your image
                            alt="Profile"
                            className="w-[400px] h-[425px] lg:w-[550px] lg:h-[575px] object-cover opacity-80"
                        />

                    </div>
                </div>
            </div>


        </section>
    );
};

export default HeroSection;