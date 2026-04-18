const nodemailer = require('nodemailer');
const validator = require('validator');

// Use module.exports for CommonJS compatibility
module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, company, headache } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, Email, and Message are required' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    const cleanName = validator.escape(name);
    const cleanMessage = validator.escape(message);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"${cleanName}" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `Portfolio Inquiry: ${headache || 'New Message'}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2>New Portfolio Message</h2>
                    <p><strong>Name:</strong> ${cleanName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Company:</strong> ${company || 'N/A'}</p>
                    <p><strong>Primary Headache:</strong> ${headache || 'N/A'}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px;">${cleanMessage}</p>
                </div>
            `,
        });

        return res.status(200).json({ success: true, message: 'Email sent!' });
    } catch (error) {
        console.error("Nodemailer Error:", error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
};