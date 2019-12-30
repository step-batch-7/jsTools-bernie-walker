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
    stubbedRead
      .withArgs('badFile')
      .callsArgWith(2, 'sort: No such file or directory');
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
});
