const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.end(`
<html>
<head>
<script type="text/javascript" src="slow.js"></script>
<script type="text/javascript">
alert(getSlowText());
</script>
</head>
<body>
The browser won't even render the body until the head scripts are done loading.
</body>
</html>
`));

app.get('/slow.js', (req, res) => {
    console.log('slow.js requested, waiting 10 seconds...');
    setTimeout(() => {
        console.log('returning slow.js');
        res.end(`
function getSlowText() {
    return "I am finally loaded!";
}
`);
    }, 10000);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

