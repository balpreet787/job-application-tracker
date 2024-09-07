const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY 
  );
  


  router.post('/session', async (req, res) => {
    const { token } = req.body;
  
    const { data: { user }, error } = await supabase.auth.getUser(token);
  
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    req.session.user = user;
    console.log('Session created', user);
    res.json({ message: 'Session created', user });
  });

module.exports = router; 
