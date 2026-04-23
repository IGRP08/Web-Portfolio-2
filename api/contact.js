import nodemailer from 'nodemailer';
import validator from 'validator';

export default async function handler(req, res) {
    // 1. Log that the function was at least reached
    console.log("API Triggered. Method:", req.method);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, message, company, headache } = req.body;

        // 2. Validate existence
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, Email, and Message are required' });
        }

        // 3. Validate Email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // 4. Check Environment Variables before trying to send
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("CRITICAL ERROR: Environment variables are missing!");
            return res.status(500).json({ error: 'Server configuration error (Keys missing)' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `Portfolio Inquiry: ${headache || 'New Message'}`,
            html: `<p>New Message from ${name}</p><p>${message}</p>`,
        });

        console.log("Email sent successfully!");
        return res.status(200).json({ success: true });

    } catch (error) {
        // This catch block prevents the "Invocation Failed" screen and shows the error in the terminal
        console.error("FULL ERROR LOG:", error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};