import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const projectsData = [
    {
        id: 1,
        title: "Makarios Postres",
        description: "A streamlined, <span class='highlight'>high-performance</span> landing page designed to turn artisanal dessert lovers into loyal customers. By prioritizing instant WhatsApp integration and social media synergy, I removed the friction between discovery and purchase. Built with a 'Speed-First' philosophy, this solution ensures that local <span class='highlight'>SEO</span> and lightning-fast load times keep the business at the top of the search results.",
        laptopImg: "/assets/makarios-laptop.png",
        phoneImg: "/assets/makarios-mobile.png",
        badges: [{ icon: "/assets/performance-icon.png", text: "98/100" }, { icon: "/assets/responsive-icon.png", text: "Mobile-First" }, { icon: "/assets/tools-icon.png", text: "Vite + Tailwind" }]
    }

];

// Animation Settings
const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 200 : -200,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 200 : -200,
        opacity: 0,
    }),
};

const Projects = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const currentIndex = Math.abs(page % projectsData.length);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    // Handle Touch Swipe for Mobile
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

    const current = projectsData[currentIndex];

    return (
        <section id="projects" className="w-full py-20 overflow-hidden">
            <div className="max-w-[90%] mx-auto px-6">
                <h2 className="text-4xl text-white text-[2.5rem] lg:text-[3rem] text-center lg:text-start font-bold mb-22 lg:pl-10">Projects</h2>
                <p className="text-center text-gray-400 mb-6 text-sm tracking-widest">{currentIndex + 1} / {projectsData.length}</p>

                {/* STATIC CONTAINER */}
                <div className="projects-container mx-auto w-full lg:w-[90%] rounded-[40px] p-8 md:p-16 relative overflow-hidden h-[850px] md:h-[500px]">

                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center absolute inset-0 py-12 px-4 md:p-8 cursor-grab active:cursor-grabbing"
                        >
                            {/* CONTENT LEFT */}
                            <div className="flex flex-col items-center lg:items-start justify-center select-none px-2 lg:pl-12">
                                <h3 className="text-[#b88a44] text-[1.5rem] lg:text-[2.2rem] py-6 font-bold mb-6">{current.title}</h3>
                                <p className="text-gray-300 text-[0.9rem] lg:text-[1.1rem] leading-relaxed mb-8 max-w-md" dangerouslySetInnerHTML={{ __html: current.description }} />
                                <div className="flex flex-wrap gap-3">
                                    {current.badges.map((b, i) => (
                                        <div key={i} className="project-badge">
                                            <img src={b.icon} alt="" className="w-4 h-4 lg:w-8 lg:h-8" />
                                            <span className="text-[#B08D57] font-[610] lg:font-[600] text-[0.7rem] lg:text-[0.9rem]">
                                                : {b.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* MOCKUPS RIGHT */}
                            <div className="relative flex justify-center items-center h-[250px] md:h-[350px] select-none pointer-events-none">
                                <img src={current.laptopImg} className="w-[130%] lg:w-[130%] h-auto z-10 drop-shadow-2xl" alt="" />
                                <img src={current.phoneImg} className="absolute right-[-15px] bottom-[25px] lg:right-[-26px] lg:bottom-[-15px] w-[130px] md:w-[270px] z-20 drop-shadow-2xl" alt="" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CONTROLS */}
                <div className="flex justify-between items-center w-full lg:w-[90%] mx-auto mt-10 px-4">
                    <button onClick={() => paginate(-1)} className="text-[#b88a44] hover:scale-125 transition-all">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button onClick={() => paginate(1)} className="text-[#b88a44] hover:scale-125 transition-all">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>


            </div>
        </section>
    );
};

export default Projects;