
function runBaseTests() {
  suite('Polymer exists', function() {

    test('Polymer exists', function() {
      assert.isTrue(Polymer !== null);
    });
  });
}

function runCustomTests() {
  var basic = document.getElementById('basic'),
      range = document.getElementById('range'),
      clearInvalid = document.getElementById('clearInvalid'),
      noClearInvalid = document.getElementById('noClearInvalid'),
      buttonsDisplayHideSubmit = document.getElementById('buttonsDisplayHideSubmit'),
      buttonsDisplayHideCancel = document.getElementById('buttonsDisplayHideCancel'),
      buttonsDisplayHideAll = document.getElementById('buttonsDisplayHideAll'),
      datetimeButtonsDisplayOptionOnfocus = document.getElementById('datetimeButtonsDisplayOptionOnfocus'),
      autoSubmit = document.getElementById('autoSubmit');

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Test basic instantiation', function() {
    checkIfElemExists(basic,'basic');

    test('basic attributes',function(){
      basic.clearInvalid
    });
  });
};



function checkIfElemExists(elem,str) {
  test(str + 'fixture is created', function() {
    assert.isTrue(elem !== null);
  });
}
