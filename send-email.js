// pages/api/send-email.js
import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        const SENDGRID_API_KEY = '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'

        // Initialize SendGrid with your API key
        sgMail.setApiKey(SENDGRID_API_KEY);

        // Create the email message
        const msg = {
            to: 'recipient@example.com', // Replace with your recipient's email
            from: 'sender@example.com', // Replace with your sender's email
            subject: 'Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        try {
            await sgMail.send(msg);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'An error occurred while sending the email.' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
