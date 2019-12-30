const { assert } = require('chai');
const sinon = require('sinon');
const { sort } = require('../src/sortLib');

describe('sort', function() {
  let fileSystem, streamWriter;

  beforeEach(function() {
    fileSystem = {
      read: () => {},
      exists: () => {}
    };

    const stubbedRead = sinon.stub(fileSystem, 'read');
    stubbedRead.withArgs('file1').returns('a\nc\nB\n1\n');
    stubbedRead.withArgs('empty').returns('');
    const stubbedExists = sinon.stub(fileSystem, 'exists');
    stubbedExists.returns(true);
    stubbedExists.withArgs('badFile').returns(false);

    const log = sinon.spy();
    const error = sinon.spy();

    streamWriter = { log, error };
  });

  afterEach(function() {
    sinon.restore();
  });

  it('should generate error and writer pair given wrong file name', function() {
    const expected = 'sort: No such file or directory';
    sort(fileSystem, streamWriter, 'badFile');
    sinon.assert.calledWith(streamWriter.error, expected);
  });

  it('should produce result and writer when the path is right', function() {
    const expected = '1\nB\na\nc';
    sort(fileSystem, streamWriter, 'file1');
    sinon.assert.calledWith(streamWriter.log, expected);
  });

  it('should ignore only the last new line of the file content', function() {
    sinon.replace(fileSystem, 'read', () => '1\nab\nx\n\n');
    const expected = '\n1\nab\nx';
    sort(fileSystem, streamWriter, 'file2');
    sinon.assert.calledWith(streamWriter.log, expected);
  });

  it('should produce the empty string when file content is empty', function() {
    const expected = '';
    sort(fileSystem, streamWriter, 'empty');
    sinon.assert.calledWith(streamWriter.log, expected);
  });
});
