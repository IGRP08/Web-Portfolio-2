const nodemailer = require('nodemailer');
const validator = require('validator');

export default async function handler(req, res) {
    // 1. Security: Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    // 2. Security: Input Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // 3. Security: Sanitize inputs (prevent XSS)
    const cleanName = validator.escape(name);
    const cleanMessage = validator.escape(message);

    // 4. Setup Transporter (Nodemailer)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        // 5. The Email Structure
        await transporter.sendMail({
            from: `"${cleanName}" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email, // This allows you to click "Reply" in your email
            subject: `New Portfolio Inquiry from ${cleanName}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2>New Message Received</h2>
                    <p><strong>Name:</strong> ${cleanName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px;">${cleanMessage}</p>
                </div>
            `,
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: 'Error sending email' });
    }
}