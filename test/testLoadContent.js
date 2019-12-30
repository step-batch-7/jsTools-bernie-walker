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
    stubbedRead.withArgs('file').callsArgWith(2, null, 'sampleContent\n');
    stubbedRead.withArgs('badFile').callsArgWith(2, { code: 'ENOENT' });
    stubbedRead.withArgs('dir').callsArgWith(2, { code: 'EISDIR' });
    stubbedRead.withArgs('perm').callsArgWith(2, { code: 'EACCES' });
  });

  afterEach(function() {
    sinon.restore();
  });

  it('should callback with lines of the file if exists', function() {
    loadContent({ contentLoader, streamWriter }, 'file', fakeCallback);
    sinon.assert.called(fakeCallback);
    sinon.assert.calledWith(fakeCallback, streamWriter.log, ['sampleContent']);
  });

  it('should not call the callBack for a badFileName', function() {
    loadContent({ contentLoader, streamWriter }, 'badFile', fakeCallback);
    sinon.assert.notCalled(fakeCallback);
  });

  it('should throw an error for a bad fileName', function() {
    loadContent({ contentLoader, streamWriter }, 'badFile', fakeCallback);
    sinon.assert.calledWith(error, 'sort: No such file or directory');
  });

  it('should give error when given fileName isa directory', function() {
    loadContent({ contentLoader, streamWriter }, 'dir', fakeCallback);
    sinon.assert.calledWith(error, 'sort: Is a directory');
  });

  it('should give error when the file has no read permission', function() {
    loadContent({ contentLoader, streamWriter }, 'perm', fakeCallback);
    sinon.assert.calledWith(error, 'sort: Permission denied');
  });
});
