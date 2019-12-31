const EventEmitter = require('events');
const { assert } = require('chai');
const sinon = require('sinon');
const { loadContent } = require('../src/loadContent');

describe('loadContent', function() {
  describe('loadFromFile', function() {
    let contentLoader, fakeCallback, streamWriter, error;

    beforeEach(function() {
      error = sinon.spy();
      streamWriter = { error, log: () => {} };

      fakeCallback = sinon.spy();
      contentLoader = { readFile: () => {} };
      const stubbedRead = sinon.stub(contentLoader, 'readFile');
      stubbedRead
        .withArgs('file')
        .callsArgWithAsync(2, null, 'sampleContent\n');
      stubbedRead.withArgs('badFile').callsArgWithAsync(2, { code: 'ENOENT' });
      stubbedRead.withArgs('dir').callsArgWithAsync(2, { code: 'EISDIR' });
      stubbedRead.withArgs('perm').callsArgWithAsync(2, { code: 'EACCES' });
    });

    afterEach(function() {
      sinon.restore();
    });

    it('should callback with lines of the file if exists', function(done) {
      loadContent({ contentLoader, streamWriter }, 'file', fakeCallback);
      setTimeout(() => {
        sinon.assert.called(fakeCallback);
        sinon.assert.calledWith(
          fakeCallback,
          ['sampleContent'],
          streamWriter.log
        );
        done();
      });
    }, 0);

    it('should not call the callBack for a badFileName', function(done) {
      loadContent({ contentLoader, streamWriter }, 'badFile', fakeCallback);
      setTimeout(() => {
        sinon.assert.notCalled(fakeCallback);
        done();
      }, 0);
    });

    it('should throw an error for a bad fileName', function(done) {
      loadContent({ contentLoader, streamWriter }, 'badFile', fakeCallback);
      setTimeout(() => {
        sinon.assert.calledWith(error, 'sort: No such file or directory');
        done();
      }, 0);
    });

    it('should give error when given fileName isa directory', function(done) {
      loadContent({ contentLoader, streamWriter }, 'dir', fakeCallback);
      setTimeout(() => {
        sinon.assert.calledWith(error, 'sort: Is a directory');
        done();
      }, 0);
    });

    it('should give error when the file has no read permission', function(done) {
      loadContent({ contentLoader, streamWriter }, 'perm', fakeCallback);
      setTimeout(() => {
        sinon.assert.calledWith(error, 'sort: Permission denied');
        done();
      }, 0);
    });
  });

  describe('readStdin', function() {
    let contentLoader, fakeCallback, streamWriter, error;

    beforeEach(function() {
      error = sinon.spy();
      streamWriter = { error, log: () => {} };

      fakeCallback = sinon.spy();
      const stdin = { setEncoding: sinon.spy(), on: sinon.spy() };
      contentLoader = { stdin };
    });

    it('should set encoding for stdin', function() {
      loadContent({ contentLoader, streamWriter }, undefined, fakeCallback);
      sinon.assert.calledWith(contentLoader.stdin.setEncoding, 'utf8');
    });

    it('should add handlers for data and close event', function() {
      loadContent({ contentLoader, streamWriter }, undefined, fakeCallback);
      assert.strictEqual(contentLoader.stdin.on.firstCall.args[0], 'data');
      assert.strictEqual(contentLoader.stdin.on.secondCall.args[0], 'end');
    });

    it('on should be called only twice and setEncoding only once', function() {
      loadContent({ contentLoader, streamWriter }, undefined, fakeCallback);
      sinon.assert.calledOnce(contentLoader.stdin.setEncoding);
      sinon.assert.calledTwice(contentLoader.stdin.on);
    });

    it('should call the callback once with the content', function() {
      const stdin = new EventEmitter();
      stdin.setEncoding = () => {};
      contentLoader = { stdin };
      loadContent({ contentLoader, streamWriter }, undefined, fakeCallback);
      stdin.emit('data', 'hello\n');
      stdin.emit('data', 'world\n');
      stdin.emit('end');
      sinon.assert.calledOnce(fakeCallback);
      assert.deepStrictEqual(fakeCallback.args[0][0], ['hello', 'world']);
    });
  });
});
