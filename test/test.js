process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();
const mongoose = require("mongoose");
const Events = require('../models/event.js');
let mockEventId;

chai.use(chaiHttp);


describe('Events', () => {
  before((done) => {
    Events.removeAllEvents({}, (err) => {
    });
    done();
  });

    describe('/GET events', () => {
      it('it should list all the events', (done) => {
    	chai.request(server)
    		.get('/events')
    		.end((err, res) => {
    			res.should.have.status(200);
    			res.should.be.json;
    			res.body.should.be.a('array');
    			res.body.should.have.length(0);
    		  done();
    		});
      });
    });

    describe('/POST events', () => {
    	it('it should POST an event ', (done) => {
    		let my_event = {
    			"title" : "Marathon_Boston",
    			"description" : "This was a run",
    			"date" : "12.06.2017"
    		}
    		chai.request(server)
    			.post('/events')
    			.send(my_event)
    			.end((err, res) => {
    				res.should.have.status(201);
    				res.should.be.json;
            res.body.should.be.a('object');
    				res.body.should.have.property('title');
    				res.body.should.have.property('description');
    				res.body.should.have.property('date');
    			  done();
    			});
    	});
    });

    describe('/GET event by title', () => {
      it('it should list event with title Marathon_Boston', (done) => {
    	chai.request(server)
    		.get('/events/Title/Marathon_Boston')
    		.end((err, res) => {
    			res.should.have.status(201);
    			//res.should.be.json;
    			res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('date');
          mockEventId = res.body._id;
    		  done();
    		});
      });
    });

    describe('/PUT event', () => {
      it('it should change the title of event 1', (done) => {
        let my_event = {
          "title" : "Marathon_of_the_century",
          "description" : "This was a run",
          "date" : "12.06.2017"
        }
        chai.request(server)
          .put('/events/' + mockEventId)
          .send(my_event)
          .end((err, res) => {
            res.should.have.status(202);
            res.body.should.be.a('object');
            done();
          });
      });
    });

    describe('/GET/:id events', () => {
        it('it should GET event by the given id and title should have changed', (done) => {
  		chai.request(server)
      		.get('/events/' + mockEventId)
      		.end((err, res) => {
      			res.should.have.status(201);
      			res.should.be.json;
  				res.body.should.be.a('object');
  				res.body.should.have.property('title');
  				res.body.should.have.property('description');
  				res.body.should.have.property('date');
          res.body.title.should.equal('Marathon_of_the_century');
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
          .put('/events/' + mockEventId)
          .send(my_event)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });


    describe('/DELETE/:id event', () => {
      it('it should delete event by the given id', (done) => {
        chai.request(server)
          .delete('/events/' + mockEventId)
          .end((err, res) => {
				res.should.have.status(202);
            done();
          });
      });
    });

    describe('/GET/:id events', () => {
        it('it should GET event by the given id and title should have changed', (done) => {
      chai.request(server)
          .get('/events/' + mockEventId)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
        });
      });
});
