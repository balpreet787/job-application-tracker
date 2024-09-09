const express = require('express');
const router = express.Router();
const supabaseClient = require('../utils/supabase');

  


  router.post('/session', async (req, res) => {
    const { token } = req.body;
    supabase = supabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);
  
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    req.session.user = user;
    console.log('Session created', user);
    res.json({ message: 'Session created', user });
  });

module.exports = router; 
