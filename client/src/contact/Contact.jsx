import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser'; // Run: npm install @emailjs/browser
import './Contact.css';

const Contact = () => {
    const form = useRef();
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState(""); // For "Sent" confirmation

    // --- Logic for Copying Email ---
    const handleCopyEmail = () => {
        const email = "ivangabrielromano8@gmail.com"; // Change to your actual email
        navigator.clipboard.writeText(email);
        setCopied(true);
    };

    // Hide the "Copied" message after 3 seconds
    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    // --- Logic for Sending Email ---
    const sendEmail = (e) => {
        e.preventDefault();

        // Replace these IDs with yours from EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
            .then(() => {
                setStatus("Success! Your solution is on the way.");
                e.target.reset(); // Clear fields
                setTimeout(() => setStatus(""), 5000); // Clear message
            }, (error) => {
                setStatus("Failed to send. Please try again.");
            });
    };

    return (
        <section id="contact" className="relative w-full py-24 px-6 lg:px-20">

            {/* Toast Notification (Copy Confirmation) */}
            {copied && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-[#b88a44] text-white px-6 py-3 rounded-full shadow-2xl animate-bounce font-bold">
                    Email copied to clipboard! ✅
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Contact Us</h2>

                <div className="contact-outer-card p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">

                    {/* Left Side: Info */}
                    <div className="flex flex-col h-full justify-between py-4">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
                                Ready to <span className="text-[#b88a44]">Own</span> your <br /> digital future?
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-12 max-w-sm">
                                Let's identify your bottlenecks and architect a permanent solution.
                                No rent, no headaches—just results.
                            </p>
                        </div>

                        {/* Icons Section */}
                        <div className="flex  mb-12">
                            <a href="https://github.com/IGRP08?tab=overview&from=2026-04-01&to=2026-04-17" target="_blank" rel="noreferrer">
                                <img src="/assets/github-icon.png" alt="GitHub" className="w-30 h-30 social-icon" />
                            </a>
                            <div onClick={handleCopyEmail}>
                                <img src="/assets/email-icon.png" alt="Email" className="w-30 h-30 social-icon" />
                            </div>
                            <a href="https://www.linkedin.com/in/ivan-romano-puente-870a78316/" target="_blank" rel="noreferrer">
                                <img src="/assets/linkedin-icon.png" alt="LinkedIn" className="w-30 h-30 social-icon" />
                            </a>
                        </div>

                        <p className="text-white font-bold text-xl leading-tight">
                            Infrastructure, Security, <br /> and Ownership <br /> guaranteed.
                        </p>
                    </div>

                    {/* Right Side: Form */}
                    <div className="contact-form-container p-8 md:p-10">
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div>
                                <label className="block text-white font-bold mb-2">Name</label>
                                <input type="text" name="user_name" placeholder="ex: Jacob Smith" className="contact-input" required />
                            </div>

                            <div>
                                <label className="block text-white font-bold mb-2">Email</label>
                                <input type="email" name="user_email" placeholder="ex: info@example.com" className="contact-input" required />
                            </div>

                            <div>
                                <label className="block text-white font-bold mb-2">Company Name</label>
                                <input type="text" name="company_name" placeholder="ex: Best Friend" className="contact-input" />
                            </div>

                            <div>
                                <label className="block text-white font-bold mb-2">Select Your Primary Headache</label>
                                <select name="headache" className="contact-input appearance-none bg-no-repeat bg-[right_1rem_center]" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }}>
                                    <option value="Technical Debt">Technical Debt</option>
                                    <option value="Poor SEO">Poor SEO</option>
                                    <option value="Slow Website">Slow Website</option>
                                    <option value="Legacy Systems">Legacy Systems</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-white font-bold mb-2">Describe your project</label>
                                <textarea name="message" rows="4" className="contact-input resize-none" required></textarea>
                            </div>

                            <div className="flex flex-col items-end gap-4">
                                <button type="submit" className="btn-gold">Built Your Solution</button>
                                {status && <p className="text-[#b88a44] font-bold italic">{status}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;