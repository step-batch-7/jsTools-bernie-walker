const sinon = require('sinon');
const { sort } = require('../src/sortLib');

describe('sort', function() {
  let contentLoader, streamWriter;

  beforeEach(function() {
    contentLoader = {
      readFile: () => {}
    };

    const stubbedRead = sinon.stub(contentLoader, 'readFile');
    stubbedRead.withArgs('file1').callsArgWithAsync(2, null, 'a\nc\nB\n1\n');
    stubbedRead.withArgs('file2').callsArgWithAsync(2, null, '1\nab\nx\n\n');
    stubbedRead.withArgs('empty').callsArgWithAsync(2, null, '');
    stubbedRead.withArgs('badFile').callsArgWithAsync(2, { code: 'ENOENT' });

    const log = sinon.spy();
    const error = sinon.spy();

    streamWriter = { log, error };
  });

  afterEach(function() {
    sinon.restore();
  });

  it('should generate error given wrong file name', function(done) {
    const expected = 'sort: No such file or directory';
    sort({ contentLoader, streamWriter }, 'badFile');
    setTimeout(() => {
      sinon.assert.calledWith(streamWriter.error, expected);
      done();
    }, 0);
  });

  it('should produce sorted result when the path is right', function(done) {
    const expected = '1\nB\na\nc';
    sort({ contentLoader, streamWriter }, 'file1');
    setTimeout(() => {
      sinon.assert.calledWith(streamWriter.log, expected);
      done();
    }, 0);
  });

  it('should ignore only the last newLine of the fileContent', function(done) {
    const expected = '\n1\nab\nx';
    sort({ contentLoader, streamWriter }, 'file2');
    setTimeout(() => {
      sinon.assert.calledWith(streamWriter.log, expected);
      done();
    }, 0);
  });

  it('should produce the empty string for empty file', function(done) {
    const expected = '';
    sort({ contentLoader, streamWriter }, 'empty');
    setTimeout(() => {
      sinon.assert.calledWith(streamWriter.log, expected);
      done();
    }, 0);
  });
});
