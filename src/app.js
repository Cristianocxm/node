
import express from 'express'
import routes from './routes.js'
import path from 'path';


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), './src/views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

//app.use(express.static('views'));

app.use(routes)


export default app