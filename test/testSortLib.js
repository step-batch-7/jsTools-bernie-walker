const { assert } = require('chai');
const sinon = require('sinon');
const { sort } = require('../src/sortLib');

describe('sort', function() {
  let streamReader, read, on;

  beforeEach(function() {
    read = sinon.stub();
    on = sinon.stub();
    read.returns({ on });
    streamReader = { read };
  });

  context('testing for the initializing behaviour of the function', function() {
    it('should call the read method of stream reader', function() {
      sort('file', streamReader);
      sinon.assert.called(read);
    });

    it('should add the handler for error event of stream emitter', function() {
      sort('file', streamReader);
      assert.strictEqual(on.args[0][0], 'error');
    });

    it('should add the data handler on the second call', function() {
      sort('file', streamReader);
      assert.strictEqual(on.args[1][0], 'data');
    });

    it('should add the end handler on the third call', function() {
      sort('file', streamReader);
      assert.strictEqual(on.args[2][0], 'end');
    });
  });

  context('when invalid file name is given', function() {
    let streamWriter;

    beforeEach(function() {
      const write = sinon.spy();
      streamWriter = { write };
    });

    it('should call the writer with bad fileName error', function() {
      on.onFirstCall().callsArgWith(1, { code: 'ENOENT' });
      sort('fileName', streamReader, streamWriter);
      sinon.assert.calledWith(
        streamWriter.write,
        'sort: No such file or directory'
      );
    });

    it('should call the writer with bad directory error', function() {
      on.onFirstCall().callsArgWith(1, { code: 'EISDIR' });
      sort('fileName', streamReader, streamWriter);
      sinon.assert.calledWith(streamWriter.write, 'sort: Is a directory');
    });

    it('should call the writer with no permission error', function() {
      on.onFirstCall().callsArgWith(1, { code: 'EACCES' });
      sort('fileName', streamReader, streamWriter);
      sinon.assert.calledWith(streamWriter.write, 'sort: Permission denied');
    });
  });

  context('checking for sorting behaviour of sortContent', function() {
    let write, streamWriter;

    beforeEach(function() {
      write = sinon.spy();
      streamWriter = { write };
      on.onSecondCall().callsArgWith(1, 'a\nB\n1\n\n');
      on.onThirdCall().callsArg(1);
    });

    it('should call the writer with sorted content', function() {
      sort('fileName', streamReader, streamWriter);
      sinon.assert.calledWith(streamWriter.write, null, '\n1\nB\na');
    });

    it('should give the result as empty string for an emptyFile', function() {
      on.onSecondCall().callsArgWith(1, '');
      sort('fileName', streamReader, streamWriter);
      sinon.assert.calledWith(streamWriter.write, null, '');
    });
  });
});
