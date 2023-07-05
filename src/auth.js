const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('test_aws', 'edoisy', 'eihfhe700', {
    host: 'host_rds.amazonaws.com',
    dialect: 'mysql'
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const [existingUser] = await sequelize.query("SELECT * FROM users WHERE username = :username",
    {
        replacements: { username: username },
        type: Sequelize.QueryTypes.SELECT
    });

    if (existingUser.length > 0) {
        return res.status(400).send('User already exists');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    await sequelize.query("INSERT INTO users (username, password) VALUES (:username, :password)",
    {
        replacements: { username: username, password: hashedPassword },
    });

    res.status(200).send('User created successfully');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const [user] = await sequelize.query("SELECT * FROM users WHERE username = :username",
    {
        replacements: { username: username },
        type: Sequelize.QueryTypes.SELECT
    });

    // Vérification du mot de passe avec bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!user || !validPassword) {
        return res.status(400).send('Invalid username or password');
    }

    res.status(200).send('Logged in successfully');
});