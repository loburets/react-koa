let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let expect = chai.expect;
chai.use(chaiHttp);
let describe = require('mocha').describe;
let it = require('mocha').it;

describe('get user', function() {
    describe('main case', function() {
        it('user should be returned with user fields', async () => {
            const response = await chai.request(server)
                .get('/users/32')
                .send();
            expect(response).to.have.status(200);
            expect(response.body.name).to.equal('Vasya');
        });
    });
});