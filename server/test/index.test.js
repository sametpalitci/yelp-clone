const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');

chai.use(chaiHttp);

describe('POST REQUEST CHECK', () => {
    it('(POST /) Restaurants Check', (done) => {
        chai.request(server).post('/graphql').send({
            query: `{
                getRestaurant {
                  name
                  location
                  price
                }
              }`
        }).end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        })
    })
    it('(POST /) Comments Check', (done) => {
        chai.request(server).post('/graphql').send({
            query: `{
                getComment(restaurantId:1){
                    comment
                }
              }
              `
        }).end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        })
    })
})