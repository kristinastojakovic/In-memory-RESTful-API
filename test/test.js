let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);
///jjjjjj


/*
* Test the /GET route
*/
describe('/GET events', () => {
  it('it should list all the events', (done) => {
	chai.request(server)
		.get('/events')
		.end((err, res) => {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.should.have.length(3);
		  done();
		});
  });

});


describe('/POST events', () => {
	it('it should POST an event ', (done) => {
		let my_event = {
			"id" : '1',
			"title" : "Marathon_Boston",
			"description" : "This was a run",
			"date" : "12.06.2017"
		}
		chai.request(server)
			.post('/events')
			.send(my_event)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.should.have.length(4);
				res.body[3].should.have.property('id');
				res.body[3].should.have.property('title');
				res.body[3].should.have.property('description');
				res.body[3].should.have.property('date');
			  done();
			});
	});
});
