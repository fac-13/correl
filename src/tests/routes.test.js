const request = require('supertest');
const test = require('tape');
const app = require('./../app.js');

// test home route
test('tests home returns html file with status code of 200', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

// test login route
test('tests login returns html file with status code of 200', (t) => {
  request(app)
    .get('/logIn')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});
// test register route

test('tests register returns html file with status code of 200', (t) => {
  request(app)
    .get('/register')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

// test error route

test('tests errors return html file with status code of 404', (t) => {
  request(app)
    .get('/asdf')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

// test symptom route
test('tests symptoms/home return html file with status code of 200', (t) => {
  request(app)
    .get('/symptoms/home')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

test('tests symptoms/new return html file with status code of 200', (t) => {
  request(app)
    .get('/symptoms/add')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

test('tests symptoms/scaleInfo return html file with status code of 200', (t) => {
  request(app)
    .get('/symptoms/scaleInfo')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

test('tests symptoms/scaleSetup return html file with status code of 200', (t) => {
  request(app)
    .get('/symptoms/scaleSetup')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

// testing factor routes
test('tests factor/home return html file with status code of 200', (t) => {
  request(app)
    .get('/factors/home')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

test('tests factor/new return html file with status code of 200', (t) => {
  request(app)
    .get('/factors/add')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

test('tests factor/scaleInfo return html file with status code of 200', (t) => {
  request(app)
    .get('/factors/scaleInfo')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

test('tests factor/scaleSetup return html file with status code of 200', (t) => {
  request(app)
    .get('/factors/scaleSetup')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

// testing add data route
test('tests adddata return html file with status code of 200', (t) => {
  request(app)
    .get('/adddata')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});

// testing see data route
test('tests seedata return html file with status code of 200', (t) => {
  request(app)
    .get('/seedata')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res);
      t.end();
    });
});
