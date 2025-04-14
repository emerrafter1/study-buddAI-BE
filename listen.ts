import app from './app';

app.listen(8080, (err?: Error) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Listening on 8080");
    }
});
