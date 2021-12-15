import express from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Accept, Authorization'
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

function login(req, res) {
    res.set(CORS);
    res.send("mpower17");
}

function render(req, res) {
    const tempPath1 = path.resolve();
    res.sendFile(path.join(tempPath1, "index.html"));
}

app.all('/login/', login)
app.all('/', render)

app.get('/wordpress/', async (req, res, next) => {
    const content = req.query.content;
    const response = await axios.post('https://wordpress.kodaktor.ru/wp-json/jwt-auth/v1/token', { username: 'gossjsstudent2017', password: '|||123|||456' });
    const token = response.data.token;
    
    const wordpressResponse = await axios.post('https://wordpress.kodaktor.ru/wp-json/wp/v2/posts', { content, title: 'mpower17', status: 'publish' },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    res.send(wordpressResponse.data.id + '');
});

app.all('*', login)


app.listen(process.env.PORT);