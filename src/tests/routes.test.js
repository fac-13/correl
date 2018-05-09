const request = require('supertest');
const mocha = require('mocha');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const express = require('express');

const app = require('./../app.js');
// test home route
it('tests home returns html file with status code of 200', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(done);
});

// // test login route
it('tests login returns html file with status code of 200', (done) => {
  request(app)
    .get('/logIn')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(done);
});
// // test register route

it('tests register returns html file with status code of 200', (done) => {
  request(app)
    .get('/register')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(done);
});

// test error route

it('tests errors return html file with status code of 404', (done) => {
  request(app)
    .get('/asdf')
    .expect(404)
    .expect('Content-Type', /html/)
    .end(done);
});

// test symptom route
describe('testing the symptom routes', () => {
  it('tests symptoms/home return html file with status code of 200', (done) => {
    request(app)
      .get('/symptoms/home')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('tests symptoms/new return html file with status code of 200', (done) => {
    request(app)
      .get('/symptoms/add')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });
  it('tests symptoms/scaleInfo return html file with status code of 200', (done) => {
    request(app)
      .get('/symptoms/scaleInfo')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });
  it('tests symptoms/scaleSetup return html file with status code of 200', (done) => {
    request(app)
      .get('/symptoms/scaleSetup')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });
});

describe('testing the factor routes', () => {
  it('tests factor/home return html file with status code of 200', (done) => {
    request(app)
      .get('/factors/home')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('tests factor/new return html file with status code of 200', (done) => {
    request(app)
      .get('/factors/add')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });
  it('tests factor/scaleInfo return html file with status code of 200', (done) => {
    request(app)
      .get('/factors/scaleInfo')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });
  it('tests factor/scaleSetup return html file with status code of 200', (done) => {
    request(app)
      .get('/factors/scaleSetup')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });
});
