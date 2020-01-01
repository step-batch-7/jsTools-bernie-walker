const EventEmitter = require('events');
const { assert } = require('chai');
const sinon = require('sinon');
const { sort } = require('../src/sortLib');

describe('sort', function() {
  let contentLoader, streamWriter;

  const initStubbedRead = function(stub) {
    stub.withArgs('file').callsArgWithAsync(2, null, 'sampleContent\n');
    stub.withArgs('file1').callsArgWithAsync(2, null, 'a\nc\nB\n1\n');
    stub.withArgs('file2').callsArgWithAsync(2, null, '1\nab\nx\n\n');
    stub.withArgs('empty').callsArgWithAsync(2, null, '');
    stub.withArgs('badFile').callsArgWithAsync(2, { code: 'ENOENT' });
    stub.withArgs('dir').callsArgWithAsync(2, { code: 'EISDIR' });
    stub.withArgs('perm').callsArgWithAsync(2, { code: 'EACCES' });
  };

  beforeEach(function() {
    const stdin = { setEncoding: sinon.spy(), on: sinon.spy() };
    contentLoader = { readFile: () => {}, stdin };
    const stubbedRead = sinon.stub(contentLoader, 'readFile');
    initStubbedRead(stubbedRead);

    const log = sinon.spy();
    const error = sinon.spy();
    streamWriter = { log, error };
  });

  afterEach(function() {
    sinon.restore();
  });

  context('testing for loading from files', function() {
    it('should callback with lines of the file if exists', function(done) {
      sort('file', { contentLoader, streamWriter });
      setTimeout(() => {
        assert.strictEqual(streamWriter.log.args[0][0], 'sampleContent');
        done();
      });
    }, 0);

    it('should generate error given wrong file name', function(done) {
      const expected = 'sort: No such file or directory';
      sort('badFile', { contentLoader, streamWriter });
      setTimeout(() => {
        sinon.assert.notCalled(streamWriter.log);
        sinon.assert.calledWith(streamWriter.error, expected);
        done();
      }, 0);
    });

    it('should give error when given fileName is a directory', function(done) {
      sort('dir', { contentLoader, streamWriter });
      setTimeout(() => {
        sinon.assert.notCalled(streamWriter.log);
        sinon.assert.calledWith(streamWriter.error, 'sort: Is a directory');
        done();
      }, 0);
    });

    it('should give error when the file has no read permission', function(done) {
      sort('perm', { contentLoader, streamWriter });
      setTimeout(() => {
        sinon.assert.notCalled(streamWriter.log);
        sinon.assert.calledWith(streamWriter.error, 'sort: Permission denied');
        done();
      }, 0);
    });
  });

  context('testing for reading from stdin', function() {
    it('should set encoding for stdin', function() {
      sort(undefined, { contentLoader, streamWriter });
      sinon.assert.calledWith(contentLoader.stdin.setEncoding, 'utf8');
    });

    it('should add handlers for data and close event', function() {
      sort(undefined, { contentLoader, streamWriter });
      assert.strictEqual(contentLoader.stdin.on.firstCall.args[0], 'data');
      assert.strictEqual(contentLoader.stdin.on.secondCall.args[0], 'end');
    });

    it('on should be called only twice and setEncoding only once', function() {
      sort(undefined, { contentLoader, streamWriter });
      sinon.assert.calledOnce(contentLoader.stdin.setEncoding);
      sinon.assert.calledTwice(contentLoader.stdin.on);
    });
  });

  context('testing for sorting behaviour', function() {
    it('should produce sorted result when the path is right', function(done) {
      const expected = '1\nB\na\nc';
      sort('file1', { contentLoader, streamWriter });
      setTimeout(() => {
        sinon.assert.calledWith(streamWriter.log, expected);
        done();
      }, 0);
    });

    it('should ignore only the last newLine of the fileContent', function(done) {
      const expected = '\n1\nab\nx';
      sort('file2', { contentLoader, streamWriter });
      setTimeout(() => {
        sinon.assert.calledWith(streamWriter.log, expected);
        done();
      }, 0);
    });

    it('should produce the empty string for empty file', function(done) {
      const expected = '';
      sort('empty', { contentLoader, streamWriter });
      setTimeout(() => {
        sinon.assert.calledWith(streamWriter.log, expected);
        done();
      }, 0);
    });

    it('should call the callback once with the content', function() {
      const stdin = new EventEmitter();
      stdin.setEncoding = () => {};
      contentLoader = { stdin };
      sort(undefined, { contentLoader, streamWriter });
      stdin.emit('data', 'hello\n');
      stdin.emit('data', 'world\n');
      stdin.emit('end');
      assert.strictEqual(streamWriter.log.args[0][0], 'hello\nworld');
    });
  });
});
