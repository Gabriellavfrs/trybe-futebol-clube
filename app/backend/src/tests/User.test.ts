import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { validAdmin } from './mocks/User.mocks';
import Validations from '../middlewares/Validations';
import Auth from '../utils/Auth';


chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', function () {
  beforeEach(sinon.restore);

  it('Returns user role', async function () {
    sinon.stub(Auth, 'JwtVerify').resolves();
    sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(SequelizeUser, 'findOne').resolves(validAdmin as any);

    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'token')
      .send({ email: validAdmin.email, password: validAdmin.password });

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ "role": "admin" });
  });
});