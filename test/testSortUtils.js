const { assert } = require('chai');
const sinon = require('sinon');
const { StreamReader, StreamWriter } = require('../src/sortUtils');

describe('StreamReader', function() {
  let streamReader, createReadStream, stdin;

  beforeEach(function() {
    createReadStream = sinon.stub();
    createReadStream.withArgs('file1').returns({ on: 'listener' });
    stdin = { setEncoding: sinon.spy() };
    streamReader = new StreamReader(createReadStream, stdin);
  });

  describe('read', function() {
    context('when file name is  given', function() {
      it('should return the created readStream', function() {
        const actual = streamReader.read('file1');
        assert.deepStrictEqual(actual, { on: 'listener' });
      });

      it('must invoke createReadStream with fileName and encoding', function() {
        streamReader.read('fileName');
        sinon.assert.calledWithExactly(createReadStream, 'fileName', {
          encoding: 'utf8'
        });
      });
    });

    context('when file name is not given', function() {
      it('should return stdin stream', function() {
        const actual = streamReader.read();
        assert.strictEqual(actual, stdin);
      });

      it('should set the encoding for stdin', function() {
        streamReader.read();
        sinon.assert.calledWithExactly(stdin.setEncoding, 'utf8');
      });
    });
  });
});

describe('StreamWriter', function() {
  let streamWriter, stderrWrite, stdoutWrite;

  beforeEach(function() {
    const stdout = { write: () => {} };
    const stderr = { write: () => {} };
    stderrWrite = sinon.stub(stderr, 'write');
    stdoutWrite = sinon.stub(stdout, 'write');

    streamWriter = new StreamWriter(stderr, stdout);
  });

  describe('write', function() {
    it('should write to error stream when error is given', function() {
      streamWriter.write('error');
      sinon.assert.calledWith(stderrWrite, 'error\n');
      sinon.assert.notCalled(stdoutWrite);
    });

    it('should write to stdout stream when result is given', function() {
      streamWriter.write(null, 'result');
      sinon.assert.calledWith(stdoutWrite, 'result\n');
      sinon.assert.notCalled(stderrWrite);
    });
  });
});
