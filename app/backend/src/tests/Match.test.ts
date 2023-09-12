import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { awayTeam, createInvalidBody, createInvalidTeam, createValidBody, createdMatch, finishedMatches, homeTeam, matches, matchesInProgress } from './mocks/Match.mocks';
import Auth from '../utils/Auth';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', function () {
  beforeEach(sinon.restore);

  it('Returns all matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Returns only matches in progress', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('Returns only finished matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(finishedMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(finishedMatches);
  });

  it('Can successfully finish a match in progress', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'token');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ "message": "Finished" });
  });

  it('Can not finish a match already finished', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(SequelizeMatch, 'update').resolves([undefined] as any)
    const { status, body } = await chai.request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'token');

    expect(status).to.equal(409);
    expect(body).to.be.deep.equal({ message: 'match has not been updated' });
  });

  it('Can successfully update a match in progress', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const { status, body } = await chai.request(app)
      .patch('/matches/41')
      .set('authorization', 'token')
      .send({ "homeTeamGoals": 3, "awayTeamGoals": 1 })

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ "message": "Finished" });
  });

  it('Can not update a match already finished', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(SequelizeMatch, 'update').resolves([undefined] as any);

    const { status, body } = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'token')
      .send({ "homeTeamGoals": 3, "awayTeamGoals": 1 })

    expect(status).to.equal(409);
    expect(body).to.be.deep.equal({ message: 'match has not been updated' });
  });

  it('Can successfully create a match', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(SequelizeMatch, 'findByPk')
      .onFirstCall().resolves(homeTeam as any)
      .onSecondCall().resolves(awayTeam as any);
    sinon.stub(SequelizeMatch, 'create').resolves(createdMatch as any);

    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(createValidBody)

    expect(status).to.equal(201);
    expect(body).to.be.deep.equal(createdMatch);
  });

  it('Can not create a match if there are equal teams', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();

    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(createInvalidBody);

    expect(status).to.equal(422);
    expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Can not create a match with a invalid team', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(SequelizeMatch, 'findByPk')
      .onFirstCall().resolves(homeTeam as any)
      .onSecondCall().resolves(null);

    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(createInvalidTeam)

    expect(status).to.equal(404);
    expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });
});