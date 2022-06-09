let chai = require('chai')
let chaiHttp = require('chai-http')
const app = require('../server')
const {faker} = require('@faker-js/faker')
const { send } = require('express/lib/response')

const staffSchema = require('../models/staffModel')
// console.log('staffSchema: ', staffSchema);

chai.should()

var expect  = require('chai').expect;


chai.use(chaiHttp)


const fakeStaff = {
// _id : faker.database.mongodbObjectId(),
FirstName : faker.name.firstName(),
LastName :faker.name.lastName(),
Phone  :faker.phone.phoneNumber(),
Email : faker.internet.email(),
Password : faker.internet.password()
}

// console.log('fakeStaff: ', fakeStaff);


describe('Tasks API', () => {
   /**
   * Test the Post staff Route Api
   */

  describe('POST /api/staff', () => {
    it("It should POST staff data",  (done) => {
      chai.request(app)
        .post(`/api/staff/signup`)
        .send(fakeStaff)
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
       done()   
        })
    })
  })

  /**
   * Test the Get  Staff Route Api
   */
  describe('Get /api/staff', () => {
    it("It should GET staff data", (done) => {
      // const data = {
      //   Email : fakeStaff.Email
      //  }
      chai.request(app)
        .get(`/api/staff/profile/${fakeStaff.Email}`)
        .end((err, response) => {
          // console.log('data: ', data);
          response.should.have.status(201)
          response.should.be.a('object')
        done()   
        })
    })

  })

    /**
   * Test the Login Staff  Route api
   */

     describe('Get /api/staff', () => {
      it("It should login Staff", (done) => {
        const data = {
          Email : fakeStaff.Email,
          Password : fakeStaff.Password
  
        }
        chai.request(app)
          .post(`/api/staff/login`)
          .send(data)
          .end((err, response) => {
            response.should.have.status(201)
            response.should.be.a('object')
          done()   
          })
      })
    })
  

  /**
   * Test the delete staff Route api
   */
   describe('Delete /api/staff', () => {
    it("It should delete staff data", (done) => {
      chai.request(app)
        .delete(`/api/staff/delete/${fakeStaff.Email}`)
        // .send(fakeStaff)
        .end((err, response) => {
          console.log('fakeStaff.Email: ', fakeStaff.Email);
          response.should.have.status(201)
          // console.log('data: ', data);
          response.should.be.a('object')
        done()   
        })
    })
  })

})