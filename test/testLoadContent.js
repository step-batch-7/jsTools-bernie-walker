const sinon = require('sinon');
const { loadContent } = require('../src/loadContent');

describe('loadContent', function() {
  let contentLoader, fakeCallback, streamWriter, error;

  beforeEach(function() {
    error = sinon.spy();
    streamWriter = { error, log: () => {} };

    fakeCallback = sinon.spy();
    contentLoader = { readFile: () => {} };
    const stubbedRead = sinon.stub(contentLoader, 'readFile');
    stubbedRead.withArgs('file').callsArgWithAsync(2, null, 'sampleContent\n');
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
      sinon.assert.calledWith(fakeCallback, streamWriter.log, [
        'sampleContent'
      ]);
      done();
    });
  }, 0);

  it('should not call the callBack for a badFileName', function(done) {
    setTimeout(() => {
      loadContent({ contentLoader, streamWriter }, 'badFile', fakeCallback);
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
