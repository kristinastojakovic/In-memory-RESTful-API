let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);



describe('Events', () => {
/*  beforeEach((done) => {

    done();
  }) */

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


	describe('/GET/:id events', () => {
      it('it should GET event by the given id', (done) => {
		chai.request(server)
    		.get('/events/1')
    		.end((err, res) => {
    			res.should.have.status(200);
    			res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('id');
				res.body.should.have.property('title');
				res.body.should.have.property('description');
				res.body.should.have.property('date');
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

    describe('/PUT event', () => {
      it('it should change the title of event 1', (done) => {
        let my_event = {
          "title" : "Marthon_of_the_century",
          "description" : "This was a run",
          "date" : "12.06.2017"
        }
        chai.request(server)
          .put('/events/1')
          .send(my_event)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('date');
            done();
          });
      });
    });

    describe('/PUT event', () => {
      it('it should give a error, because there is no description', (done) => {
        let my_event = {
          "title" : "Mathon",
          "date" : "12.06.2017"
        }
        chai.request(server)
          .put('/events/1')
          .send(my_event)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });


});
