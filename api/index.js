const restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    request = require('request'),
    server = restify.createServer({
        name: 'savemysales'
    }),
    port = 5001,
    CORS = corsMiddleware({
        origins: ['*'],
        allowHeaders: ['*']
    });

server.pre(CORS.preflight);
server.use(CORS.actual);
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

const getValue = (value) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: 'http://dashboard.savemysales.co/devtest/' + value
        }, (error, response, body) => {
            if (error || !body) {
                return reject('error in retrieving value ' + value);
            }

            const bodyParsed = JSON.parse(body),
                actualValue = bodyParsed[Object.keys(bodyParsed)[0]];

            resolve(actualValue);
        });
    });
};

const findPrimeFactors = (int) => {
    return new Promise((resolve) => {
        let factors = [];
        for (let i = 2; i <= Math.sqrt(int); i++) {
            while (int % i == 0) {
                factors.push(i);
                int /= i;
            }
        }
        if (int > 1) {
            factors.push(int);
        }
        resolve(factors);
    });
};

server.get({
    path: '/calculatePrimeFactors'
}, (req, res) => {
    Promise.all([getValue('1'), getValue('2')]).then(resolutions => {
        const sum = parseInt(resolutions[0]) + parseInt(resolutions[1]);
        findPrimeFactors(sum).then(factors => {
            console.log('Calculating factors for sum: ' + JSON.stringify(sum));
            res.send({
                body: {
                    values: [resolutions[0], resolutions[1]],
                    factors
                }
            });
        });
    }).catch(error => {
        console.log(error);
        res.send({
            status: 500
        });
    });
});

server.listen(port, () => {
    console.log('server started on port ' + port);
});

//what could be done better
//spent too much time setting up a caching solution
//caching large primes for lookup later, frontloading work
//polling when the service will take a while to reduce load, store guid in dictionary, look up later
//might be a faster prime-finding algorithm out there
//add better logging