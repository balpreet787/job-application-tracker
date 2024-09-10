const express = require('express');
const router = express.Router();
const cors = require('cors');

const supabaseClient = require('../utils/supabase');

router.use(cors())

router.post('/create', async (req, res) => {
    const { title, deadline, company, status} = req.body;
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('job_applications')
        .insert([{ 
            job_title: title,
            deadline: deadline,
            company: company,
            status: status,
            user_id: userId
         }]);
    if (error) {
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
        .eq('user_id', userID);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.json(data);
});

router.post('/update', async (req, res) => {
    const { id, title, deadline, company, status } = req.body;
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('job_applications')
        .update({ 
            job_title: title,
            deadline: deadline,
            company: company,
            status: status
        })
        .eq('id', id)
        .eq('user_id', req.session.user.id);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.json(data);
});

router.post('/delete', async (req, res) => {
    const { id } = req.body;
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)
        .eq('user_id', req.session.user.id);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.json(data);
});

module.exports = router;