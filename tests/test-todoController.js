const mocha = require('mocha'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../server/server')

const {
  expect
} = chai

chai.use(chaiHttp)

describe('create tasks', () => {
  let task = {
    text: 'test task'
  }

  it('should create todo', (done) => {
    chai.request(server)
      .post('/todos')
      .send(task)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body.todo._id).to.be.not.null
        expect(res.body.todo.text).to.be.equal(task.text)
        done()
      })

  })
  let task2 = {
    text: ''
  }

  it('should not create todo', (done) => {
    chai.request(server)
      .post('/todos')
      .send(task2)
      .end((err, res) => {
        expect(err).to.be.not.null
        done()
      })
  })
  after('close the server', () => {
    server.close();
  })
})
