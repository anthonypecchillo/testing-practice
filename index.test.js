const axios = require('axios');
const { expect } = require('chai');
const moxios = require('moxios');
const request = require('request');
const sinon = require('sinon');
const { multiplyByTwo, getDataFromWebhookEndpoint } = require('./index');

describe('multiplyByTwo', function() {
  it('Should multiply the input by 2', function() {
    expect(multiplyByTwo(10)).to.equal(20);
  });
});

describe('Webhooks', function() {
  it('Should be an example of mocking for Andrew', async function() {
    let requestMock = sinon.mock(request);
    const someDataToRespondWith = [
      { id: 1, name: 'Anthony' },
      { id: 2, name: 'Andrew' }
    ];

    requestMock.expects('get')
      .once()
      .withArgs('/webhooks/DispactTrackB2C/Finished?skOrderNum=D2089886')
      .yields(null, { status: 200, message: 'OK' }, JSON.stringify(someDataToRespondWith));

    const { status, message, body } = await getDataFromWebhookEndpoint();

    expect(status).to.equal(200);
    expect(message).to.equal('OK');

    expect(body.length).to.equal(2);
    body.forEach((item) => {
      expect(item).to.have.property('id');
      expect(item).to.have.property('name');
    });

    requestMock.verify();
    requestMock.restore();
  });
});

// BELOW: The last state of AP's attempt to use at using moxios
//        to mock axios requests

// describe('Webhooks', function() {
//   beforeEach(function() {
//     moxios.install(axios);
//   });
//
//   afterEach(function() {
//     moxios.uninstall(axios);
//   });
//
//   it('Should be an example of mocking for Andrew', function() {
//     moxios.withMock(function() {
//       let onFulfilled = sinon.spy();
//       axios.get('/webhooks/DispactTrackB2C/Finished?skOrderNum=D2089886').then(onFulfilled);
//
//       const someDataToRespondWith = [
//         { id: 1, name: 'Anthony' },
//         { id: 2, name: 'Andrew' }
//       ];
//
//       // try {
//       //   await axios.get('/webhooks/DispactTrackB2C/Finished?skOrderNum=D2089886');
//       //   onFulfilled();
//       // } catch (e) {
//       //   console.log(e);
//       // }
//
//       moxios.wait(function() {
//         let request = moxios.requests.mostRecent();
//         request.respondWith({
//           status: 200,
//           response: someDataToRespondWith
//         }).then(function() {
//           console.log('hi');
//           expect(onFulfilled.called).to.equal(true);
//         });
//         // expect(response.status).to.equal(200);
//       });
//       // expect(onFulfilled.called).to.equal(true);
//     });
//     console.log('hello');
//     // console.log(data);
//
//     // const { data } = await getDataFromWebhookEndpoint();
//
//     // expect(status).to.equal('200');
//     // expect(message).to.equal('ok');
//
//     // expect(data.length).to.equal(2);
//     // data.forEach((datum) => {
//     //   expect(datum).to.have.property('id');
//     //   expect(datum).to.have.property('name');
//     // });
//   });
// });
