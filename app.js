import express from "express";
import bodyParser from "body-parser";
import path from "path";

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Accept, Authorization'
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

function login(req, res) {
    res.set(CORS);
    res.send("itmo286434");
}

function render(req, res) {
    const tempPath1 = path.resolve();
    res.sendFile(path.join(tempPath1, "index.html"));
}

async function wordpress(req, res) {
    const content = req.query.content;     
    
    try {
        const getToken = await fetch("https://wordpress.kodaktor.ru/wp-json/jwt-auth/v1/token", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: "gossjsstudent2017", password: "|||123|||456" }),
        });

    
        const { token } = await getToken.json();

        const createPost = await fetch("https://wordpress.kodaktor.ru/wp-json/wp/v2/posts", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'status': 'publish',
                'title': login,
                'content': content
            })
        })
    } catch (e) {
        console.error(e);
    }
}

app.all('/login/', login)
app.all('/', render)
app.get('/wordpress/', wordpress)
app.all('*', login)


app.listen(process.env.PORT);