// import React, { useState } from 'react';

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const navLinks = [
//         { name: 'About', href: '#about' },
//         { name: 'Projects', href: '#projects' },
//         { name: 'Services', href: '#services' },
//         { name: 'Contact', href: '#contact' },
//     ];

//     const handleNavClick = (e, href) => {
//         e.preventDefault();
//         const targetElement = document.querySelector(href);
//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//         }
//         setIsOpen(false); // Close mobile menu after clicking
//     };

//     return (
//         <nav className="bg-[#0F172A] text-white fixed w-full top-0 z-50">
//             <div className="max-w-7xl mx-auto px-6 lg:px-12">
//                 <div className="flex justify-between items-center h-24">

//                     {/* Logo Section */}
//                     <div className="flex flex-col">
//                         <h1 className="text-[#B08D57] text-xl md:text-2xl font-serif font-medium tracking-wide leading-tight">
//                             Roma Digital Solutions
//                         </h1>
//                         <p className="text-[10px] md:text-xs text-[#FFFFFF] font-light tracking-widest uppercase text-center md:text-right">
//                             by Ivan Romano
//                         </p>
//                     </div>

//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex gap-[2.5rem] space-x-10">
//                         {navLinks.map((link) => (
//                             <a
//                                 key={link.name}
//                                 href={link.href}
//                                 onClick={(e) => handleNavClick(e, link.href)}
//                                 className="hover:text-[#B08D57] transition-colors duration-300 text-xl lg:text-[1.3rem] font-normal"
//                             >
//                                 {link.name}
//                             </a>
//                         ))}
//                     </div>

//                     {/* Hamburger Menu Button */}
//                     <div className="md:hidden">
//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="text-[#B08D57] focus:outline-none"
//                         >
//                             <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 {isOpen ? (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 ) : (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                                 )}
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Decorative Gold Line */}
//             <div className="h-[1.1px] w-full bg-gradient-to-r from-transparent via-[#B08D57]/100 to-transparent"></div>

//             {/* Mobile Menu Dropdown */}
//             <div
//                 className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0c1221] ${isOpen ? 'max-h-64 border-b border-[#B08D57]/20' : 'max-h-0'
//                     }`}
//             >
//                 <div className="px-6 pt-2 pb-6 space-y-4">
//                     {navLinks.map((link) => (
//                         <a
//                             key={link.name}
//                             href={link.href}
//                             onClick={(e) => handleNavClick(e, link.href)}
//                             className="block text-lg hover:text-[#B08D57] transition-colors"
//                         >
//                             {link.name}
//                         </a>
//                     ))}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Header;

import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];

    // Scroll handling logic
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // If scrolling down, hide the navbar. If scrolling up, show it.
                // We also check if window.scrollY > 100 to avoid hiding it at the very top
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }

                // Remember current scroll position
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`bg-[#0F172A] text-white fixed w-full top-0 z-50 transition-transform duration-500 ease-in-out ${isVisible || isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center h-24">

                    {/* Logo Section */}
                    <div className="flex flex-col">
                        <h1 className="text-[#B08D57] text-xl md:text-2xl font-serif font-medium tracking-wide leading-tight">
                            Roma Digital Solutions
                        </h1>
                        <p className="text-[10px] md:text-xs text-[#FFFFFF] font-light tracking-widest uppercase text-center md:text-right">
                            by Ivan Romano
                        </p>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-[2.5rem] space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="hover:text-[#B08D57] transition-colors duration-300 text-xl lg:text-[1.3rem] font-normal"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Hamburger Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#B08D57] focus:outline-none"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Gold Line */}
            <div className="h-[1.1px] w-full bg-gradient-to-r from-transparent via-[#B08D57]/100 to-transparent"></div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0F172A] ${isOpen ? 'max-h-64 border-b border-[#B08D57]/20' : 'max-h-0'
                    }`}
            >
                <div className="px-6 pt-2 pb-6 space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="block text-lg hover:text-[#B08D57] transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Header;