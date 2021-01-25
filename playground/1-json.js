const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
let data = JSON.parse(dataJSON)

data = {
    name: 'Medusa',
    planet: 'Underworld',
    age: '1000'
}

fs.writeFileSync('1-json.json', JSON.stringify(data))
// console.log(data)