const nodemailer = require('nodemailer');
const validator = require('validator');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, message, company, headache } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, Email, and Message are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // This is the part that structures the email look
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
                <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Portfolio Message</h2>
                
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p><strong>Primary Headache:</strong> ${headache || 'None specified'}</p>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; border-left: 4px solid #ccc;">
                    <p style="margin-top: 0;"><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
                
                <footer style="margin-top: 20px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
                    This inquiry was sent from your portfolio contact form.
                </footer>
            </div>
        `;

        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `Portfolio Inquiry: ${headache || 'New Message'}`,
            html: emailHtml, // We use the new structured HTML here
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("FULL ERROR LOG:", error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};