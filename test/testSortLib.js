const { assert } = require('chai');
const { sort } = require('../src/sortLib');

describe('sort', function() {
  let fileSystem, streamWriter, expected;

  beforeEach(function() {
    fileSystem = {
      read: file => {
        if (file === 'empty') {
          return '';
        }
        return 'a\nc\nB\n1\n';
      },
      exists: fileName => fileName !== 'badFile'
    };

    streamWriter = {
      log: stream => {
        assert.strictEqual(stream, expected);
      },
      error: stream => {
        assert.strictEqual(stream, expected);
      }
    };
  });

  it('should generate error and writer pair given wrong file name', function() {
    expected = 'sort: No such file or directory';
    sort(fileSystem, streamWriter, 'badFile');
  });

  it('should produce result and writer when the path is right', function() {
    expected = '1\nB\na\nc';
    sort(fileSystem, streamWriter, 'file1');
  });

  it('should ignore only the last new line of the file content', function() {
    fileSystem.read = () => '1\nab\nx\n\n';
    expected = '\n1\nab\nx';
    sort(fileSystem, streamWriter, 'file1');
  });

  it('should produce the empty string when file content is empty', function() {
    expected = '';
    sort(fileSystem, streamWriter, 'empty');
  });
});
