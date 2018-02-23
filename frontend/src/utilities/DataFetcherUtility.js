const apiPort = 5001;

export function calculatePrimeFactors() {
    return fetch('http://0.0.0.0:' + apiPort + '/calculatePrimeFactors/', {
        method: 'get'
    }).then(response => response.json());
}