const { assert } = require('chai');
const sinon = require('sinon');
const { StreamReader } = require('../src/sortUtils');

describe('StreamReader', function() {
  let streamReader, createReadStream, stdin;

  beforeEach(function() {
    createReadStream = sinon.stub();
    createReadStream.withArgs('fileName').returns({ on: 'listener' });
    stdin = sinon.spy();
    streamReader = new StreamReader(createReadStream, stdin);
  });

  describe('read', function() {
    context('when file name is  given', function() {
      it('should return the created readStream', function() {
        const actual = streamReader.read('fileName');
        assert.deepStrictEqual(actual, { on: 'listener' });
      });

      it('should call the createReadStream with file name and encoding', function() {
        streamReader.read('fileName');
        sinon.assert.calledWithExactly(createReadStream, 'fileName', {
          encoding: 'utf8'
        });
      });
    });
  });
});
