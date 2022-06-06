let chai = require('chai')
let chaiHttp = require('chai-http')
// const { response } = require('../server')
const app = require('../server')

chai.should()



chai.use(chaiHttp)



describe('Tasks API', () => {


   /**
   * Test the Post staff Route Api
   */

  describe('POST /api/staff', () => {
    it("It should POST staff data", (done) => {
      chai.request(app)
        .post(`/api/staff/signup`)
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.a('object')
        done()   
        })
    })
  })

  /**
   * Test the Get  Staff Route Api
   */
  describe('Get /api/staff', () => {
    it("It should GET staff data", (done) => {
      chai.request(app)
        .get(`/api/staff/profile/:id`)
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.a('object')
        done()   
        })
    })

    // it("It should not GET staff data", (done) => {
    //   chai.request(app)
    //     .get(`/api/staff/profile/:id`)
    //     .end((err, response) => {
    //       response.should.have.status(404)
    //     done()   
    //     })
    // })
  })

  /**
   * Test the delete staff Route api
   */
   describe('Delete /api/staff', () => {
    it("It should GET staff data", (done) => {
      // const id = '1'
      chai.request(app)
        .delete(`/api/staff/delete/:id`)
        .end((err, response) => {
          response.should.have.status(200)
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
      // const id = '1'
      chai.request(app)
        .post(`/api/staff/login`)
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.a('object')
        done()   
        })
    })
  })

})