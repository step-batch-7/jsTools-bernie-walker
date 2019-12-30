const sinon = require('sinon');
const { sort } = require('../src/sortLib');

describe('sort', function() {
  let contentLoader, streamWriter;

  beforeEach(function() {
    contentLoader = {
      readFile: () => {}
    };

    const stubbedRead = sinon.stub(contentLoader, 'readFile');
    const callBackPosition = 2;
    stubbedRead
      .withArgs('file1')
      .callsArgWith(callBackPosition, null, 'a\nc\nB\n1\n');
    stubbedRead
      .withArgs('file2')
      .callsArgWith(callBackPosition, null, '1\nab\nx\n\n');
    stubbedRead.withArgs('empty').callsArgWith(callBackPosition, null, '');
    stubbedRead
      .withArgs('badFile')
      .callsArgWith(callBackPosition, { code: 'ENOENT' });

    const log = sinon.spy();
    const error = sinon.spy();

    streamWriter = { log, error };
  });

  afterEach(function() {
    sinon.restore();
  });

  it('should generate error given wrong file name', function() {
    const expected = 'sort: No such file or directory';
    sort({ contentLoader, streamWriter }, 'badFile');
    sinon.assert.calledWith(streamWriter.error, expected);
  });

  it('should produce sorted result when the path is right', function() {
    const expected = '1\nB\na\nc';
    sort({ contentLoader, streamWriter }, 'file1');
    sinon.assert.calledWith(streamWriter.log, expected);
  });

  it('should ignore only the last new line of the file content', function() {
    const expected = '\n1\nab\nx';
    sort({ contentLoader, streamWriter }, 'file2');
    sinon.assert.calledWith(streamWriter.log, expected);
  });

  it('should produce the empty string when file content is empty', function() {
    const expected = '';
    sort({ contentLoader, streamWriter }, 'empty');
    sinon.assert.calledWith(streamWriter.log, expected);
  });
});
