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
it('tests symptom return html file with status code of 404', (done) => {
  request(app)
    .get('/symptoms/home')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(done);
});
