const express = require('express');
const session = require('express-session');
const app = express();
const router = express.Router();

const nocache = require('nocache');

// Giving email and password
const credentials = {
    email: "admin123@gmail.com",
    password: "123456" // Store passwords securely; avoid plain text
};

// Use session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secure random key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true in a production environment with HTTPS
}));

router.use(nocache());

router.post('/login', (req, res) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    if (enteredEmail !== credentials.email || enteredPassword !== credentials.password) {
        res.render('base', {
            alert: "Invalid email & password"
        });
    } else {
        req.session.user = enteredEmail;
        res.redirect('/loginpage');
    }
});

router.get('/', (req, res) => {
    if (!req.session.user) {
        res.render('base');
    } else {
        res.redirect('/loginpage');
    }
});

router.get('/loginpage', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        res.render('loginpage', { user: user });
    } else {
        res.redirect('/');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.render("base", { title: "Login Page", logout: "Logout Success!" });
        }
    });
});


// Home section
router.get('/service', (req, res) => {
    if (req.session.user) {
        res.send("<h1><u>Service</u></h1>");
    } else {
        res.redirect('/dashboard');
    }
});

router.get('/about', (req, res) => {
    if (req.session.user) {
        res.send('<h1><u>About</u></h1>');
    } else {
        res.redirect('/dashboard');
    }
});

router.get('/help', (req, res) => {
    if (req.session.user) {
        res.send("<h1><u>Help</u></h1>");
    } else {
        res.redirect('/dashboard');
    }
});

router.get('*', (req, res) => {
    if (req.session.user || !req.session.user) {
        res.status(404).send("<h1><u>404 ERROR</u></h1>");
    } else {
        res.redirect('/dashboard');
    }
});

module.exports = router;
