const express = require('express');
const router = express.Router();
const cors = require('cors');

const supabaseClient = require('../utils/supabase');

router.use(cors())

router.post('/create', async (req, res) => {
    console.log('create job application')
    const { title, date, company, status, userID} = req.body;
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('job_applications')
        .insert([{ 
            title: title,
            date: date,
            company: company,
            status: status,
            userID: userID
         }]);
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
    res.json(data);
});

router.get('/read', async (req, res) => {
    const userID = req.query.user
    console.log(`user is trying to fetch data with id ${userID}`)
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('job_applications')
        .select()
        .eq('userID', userID);
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
    res.json(data);
});

router.post('/update', async (req, res) => {
    const { id, title, date, company, status, userID } = req.body;
    console.log(id, title, date, company, status, userID)
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('job_applications')
        .update({
            title: title,
            date: date,
            company: company,
            status: status,
            userID: userID
        })
        .eq('id', id)
        .eq('userID', userID);
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
    res.json(data);
});

router.post('/delete', async (req, res) => {
    const { id, userID } = req.body;
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)
        .eq('userID', userID);
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
    res.json(data);
});

module.exports = router;