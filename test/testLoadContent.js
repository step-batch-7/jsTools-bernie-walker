const { assert } = require('chai');
const sinon = require('sinon');
const { loadFromFile, readStdin } = require('../src/loadContent');

describe('loadContent', function() {
  describe('loadFromFile', function() {
    let readFile, fakeCallback, streamWriter, error;

    beforeEach(function() {
      error = sinon.spy();
      streamWriter = { error, log: () => {} };

      fakeCallback = sinon.spy();
      readFile = sinon.stub();
      readFile.withArgs('file').callsArgWithAsync(2, null, 'sampleContent\n');
      readFile.withArgs('badFile').callsArgWithAsync(2, { code: 'ENOENT' });
      readFile.withArgs('dir').callsArgWithAsync(2, { code: 'EISDIR' });
      readFile.withArgs('perm').callsArgWithAsync(2, { code: 'EACCES' });
    });

    afterEach(function() {
      sinon.restore();
    });

    it('should callback with lines of the file if exists', function(done) {
      loadFromFile('file', { readFile, streamWriter }, fakeCallback);
      setTimeout(() => {
        sinon.assert.called(fakeCallback);
        sinon.assert.calledWith(
          fakeCallback,
          'sampleContent\n',
          streamWriter.log
        );
        done();
      });
    }, 0);

    it('should not call the callBack for a badFileName', function(done) {
      loadFromFile('badFile', { readFile, streamWriter }, fakeCallback);
      setTimeout(() => {
        sinon.assert.notCalled(fakeCallback);
        done();
      }, 0);
    });

    it('should throw an error for a bad fileName', function(done) {
      loadFromFile('badFile', { readFile, streamWriter }, fakeCallback);
      setTimeout(() => {
        sinon.assert.calledWith(error, 'sort: No such file or directory');
        done();
      }, 0);
    });

    it('should give error when given fileName isa directory', function(done) {
      loadFromFile('dir', { readFile, streamWriter }, fakeCallback);
      setTimeout(() => {
        sinon.assert.calledWith(error, 'sort: Is a directory');
        done();
      }, 0);
    });

    it('should give error when the file has no read permission', function(done) {
      loadFromFile('perm', { readFile, streamWriter }, fakeCallback);
      setTimeout(() => {
        sinon.assert.calledWith(error, 'sort: Permission denied');
        done();
      }, 0);
    });
  });

  describe('readStdin', function() {
    let stdin, fakeCallback, log;

    beforeEach(function() {
      fakeCallback = sinon.spy();
      stdin = { setEncoding: sinon.spy(), on: sinon.spy() };
    });

    it('should set encoding for stdin', function() {
      readStdin(stdin, log, fakeCallback);
      sinon.assert.calledWith(stdin.setEncoding, 'utf8');
    });

    it('should add handlers for data and close event', function() {
      readStdin(stdin, log, fakeCallback);
      assert.strictEqual(stdin.on.firstCall.args[0], 'data');
      assert.strictEqual(stdin.on.secondCall.args[0], 'end');
    });

    it('on should be called only twice and setEncoding only once', function() {
      readStdin(stdin, log, fakeCallback);
      sinon.assert.calledOnce(stdin.setEncoding);
      sinon.assert.calledTwice(stdin.on);
    });
  });
});
