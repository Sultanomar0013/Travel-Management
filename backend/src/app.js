const express = require("express");
const path = require("path");
const app = express();


const hbs = require("hbs");
const bcrypt = require("bcrypt");
require("./db/conn");
require ('dotenv').config();
const User = require("./models/signup");
const { json } = require("express");
const session = require('express-session');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");





const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// ... Other imports and setup ...
const secretKey = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    const isAuthenticated = req.session.isAuthenticated || false; /* Logic to determine if the user is authenticated */
    res.render("home", { isAuthenticated });
});

app.get("/home", (req, res) => {
    res.render("home");
});
app.get("/guide", (req, res) => {
    res.render("guide");
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/barishal", (req, res) => {
    res.render("barishal");
})
app.get("/beguide", (req, res) => {
    res.render("beguide");
})
app.get("/chattogram", (req, res) => {
    res.render("chattogram");
})
app.get("/dhaka", (req, res) => {
    res.render("dhaka");
})
app.get("/khulna", (req, res) => {
    res.render("khulna");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/mymensihgn", (req, res) => {
    res.render("mymensingh");
})
app.get("/rajshahi", (req, res) => {
    res.render("rajshahi");
})
app.get("/rangpur", (req, res) => {
    res.render("rangpur");
})
app.get("/signup", (req, res) => {
    res.render("signup");
})
app.get("/sylhet", (req, res) => {
    res.render("sylhet");
})
app.get("/ticket", (req, res) => {
    res.render("ticket");
})
app.get("/travel", (req, res) => {
    res.render("travel");
})

//signup post method operation

app.post("/signup", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.reenter_password;

        if (password === cpassword) {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10); // Use 10 rounds of salt

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            const newUser = await user.save();
            const token = jwt.sign({ userId: newUser._id }, secretKey);
            //req.session.isAuthenticated = true;
            res.status(201).render("login", { token });
        } else {
            res.status(400).send("Passwords do not match");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


//login operation

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("Invalid email or password");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id }, secretKey);
            res.send({ token });
        } else {
            res.send("Email or password are not matching");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        } else {
            res.redirect("/");
        }
    });
});






app.listen(port, () => {
    console.log(`server s running at port ${port}`);
})