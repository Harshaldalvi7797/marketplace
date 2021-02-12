'use strict';

var config = {
    develop: {
        jwtSecret: 'market'
    },

    Prod: {
        jwtSecret: 'market'
    }
}

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'develop';
console.log('***************************************');
console.log(`******** Environment - ${env} *********`);
console.log('***************************************');

module.exports = config[env];