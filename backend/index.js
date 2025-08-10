const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
    const { name, email, service } = req.body;

    console.log("Received from frontend:", { name, email, service });

    try {
        // Send to FormSubmit
        await axios.post('https://formsubmit.co/ajax/devmalhotra3123@gmail.com', {
            name,
            email,
            service,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({ message: 'Offering received and email sent 🕊️' });
    } catch (err) {
        console.error('Error forwarding to FormSubmit:', err.message);
        res.status(500).json({ message: 'Error sending to FormSubmit' });
    }
});

app.listen(5000, () => {
    console.log('Backend running at http://localhost:5000');
});
