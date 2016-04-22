
function runBaseTests() {
  suite('Polymer exists', function() {

    test('Polymer exists', function() {
      assert.isTrue(Polymer !== null);
    });
  });
}

function runCustomTests() {
  var now = moment.utc(),
      weekAgo = now.subtract(7,'days');

  var
      range = document.getElementById('range'),
      clearInvalid = document.getElementById('clearInvalid'),
      noClearInvalid = document.getElementById('noClearInvalid'),
      buttonsDisplayHideSubmit = document.getElementById('buttonsDisplayHideSubmit'),
      buttonsDisplayHideCancel = document.getElementById('buttonsDisplayHideCancel'),
      buttonsDisplayHideAll = document.getElementById('buttonsDisplayHideAll'),
      datetimeButtonsDisplayOptionOnfocus = document.getElementById('datetimeButtonsDisplayOptionOnfocus'),
      autoSubmit = document.getElementById('autoSubmit');

  runBasicTests(now,weekAgo);


};

function runBasicTests(now, weekAgo){
  var basic = document.getElementById('basic');

  suite('Test basic instantiation', function() {
    var fromDate = Polymer.dom(basic.root).querySelector('#fromDate'),
        fromTime = Polymer.dom(basic.root).querySelector('#fromTime'),
        toDate = Polymer.dom(basic.root).querySelector('#toDate'),
        toTime = Polymer.dom(basic.root).querySelector('#toTime');

    checkIfElemExists(basic,'basic');

    suite('check that entries were created', function() {
      test('fromDate',function(){
        assert.isTrue( fromDate !== null);
      });
      test('check that entries were created',function(){
        assert.isTrue( fromTime !== null);
      });
      test('check that entries were created',function(){
        assert.isTrue( toDate !== null);
      });
      test('check that entries were created',function(){
        assert.isTrue( toTime !== null);
      });
    });

    suite('check basic attributes', function() {
      test('clearInvalid',function(){
        assert.equal(basic.clearInvalid, 'yes');
      });
      test('datetimeButtonsDisplay',function(){
        assert.equal(basic.datetimeButtonsDisplay, 'show-all');
      });
      test('datetimeButtonsDisplayOption',function(){
        assert.equal(basic.datetimeButtonsDisplayOption, 'show');
      });
      test('autoSubmit',function(){
        assert.isFalse(basic.autoSubmit);
      });
    });

    suite('check the buttons', function() {
      var buttons = Polymer.dom(basic.root).querySelector('#dtBtns');

      test('appeared',function(){
        assert.isTrue( buttons !== null);
      });
      test('not hideSubmit',function(){
        assert.isFalse(buttons.hideSubmit);
      });
      test('not hideCancel',function(){
        assert.isFalse(buttons.hideCancel);
      });
      test('buttons visible',function(){
        assert.isFalse(buttons.classList.contains('visuallyhidden'));
      });
    });

    suite('check time instantiated to default', function() {
      var fromRange = moment(basic.range.from),
          toRange = moment(basic.range.to);

      var toDiff = now.diff(toRange),
          fromDiff = weekAgo.diff(fromRange);

      test('toField',function(){
        // since some time has passed since the field was instantiated, we give ourselves a 10 sec buffer
        assert.isTrue(toDiff < 1000);
      });
      test('fromField',function(){
        // since some time has passed since the field was instantiated, we give ourselves a 10 sec buffer
        assert.isTrue(fromDiff < 1000);
      });
    });

    suite('check that entries were instantiated', function() {
      var fromRange = moment(basic.range.from),
          toRange = moment(basic.range.to);

      test('fromDate',function(){
        assert.equal(fromDate.moment._i,fromRange._i);
      });
      test('fromTime',function(){
        assert.equal(fromTime.moment._i,fromRange._i);
      });
      test('toDate',function(){
        assert.equal(toDate.moment._i,toRange._i);
      });
      test('toTime',function(){
        assert.equal(toTime.moment._i,toRange._i);
      });
    });
  });

  suite('Test Applying a new datetime', function() {
    updateDate(basic,'fromDate','05/04/2013','MM/DD/YYYY','from');
    applyDate(basic,'fromDate','from');

    updateDate(basic,'fromTime','12:00:00 PM','hh:mm:ss A','from');
    applyDate(basic,'fromTime','from');

    updateDate(basic,'toDate','09/14/2014','MM/DD/YYYY','to');
    applyDate(basic,'toDate','to');

    updateDate(basic,'toTime','12:00:00 PM','hh:mm:ss A','to');
    applyDate(basic,'toTime','to');

    suite('Wait until success class clears', function() {
      test('cleared',function(done){
        var assertions = function(){
          done();
        }
        setTimeout(function(){
          assertions();
        },1000);
      });
    });
  });

  suite('Test Canceling a new datetime', function() {
    updateDate(basic,'fromDate','06/04/2013','MM/DD/YYYY','from');
    cancelDate(basic,'fromDate','from');

    updateDate(basic,'fromTime','01:00:00 PM','hh:mm:ss A','from');
    cancelDate(basic,'fromTime','from');

    updateDate(basic,'toDate','10/14/2014','MM/DD/YYYY','to');
    cancelDate(basic,'toDate','to');

    updateDate(basic,'toTime','01:00:00 PM','hh:mm:ss A','to');
    cancelDate(basic,'toTime','to');
  });

  suite('Test Canceling a new datetime', function() {
    updateDate(basic,'fromDate','05/04/2016','MM/DD/YYYY','from');
    invalidDate(basic,'fromDate','from');

    updateDate(basic,'toDate','10/14/2012','MM/DD/YYYY','to');
    invalidDate(basic,'toDate','to');
  });

  suite('Test keyboard events', function() {
    updateDate(basic,'fromDate','05/04/2016','MM/DD/YYYY','from');
    // try enter with invalid date
    escDate(basic,'fromDate','from');

    updateDate(basic,'fromDate','05/04/2010','MM/DD/YYYY','from');
    enterDate(basic,'fromDate','from');

    suite('Wait until success class clears', function() {
      test('cleared',function(done){
        var assertions = function(){
          done();
        }
        setTimeout(function(){
          assertions();
        },1000);
      });
    });
  });
}

function checkIfElemExists(elem,str) {
  test(str + 'fixture is created', function() {
    assert.isTrue(elem !== null);
  });
}

function updateDate(parent, elem, date, format, field){
  suite('Update ' + elem, function() {
    var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
    var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');

    setup(function(){
      elemDate.dateTimeWorkingCopy = date;
      elemDate._validateInput();
    });

    test('update '+elem,function(){
      assert.equal(elemDate.moment.format(format),date);
    });

    test('added changed class',function(){
      assert.isTrue(elemDiv.classList.contains('validation-changed'));
    });
  });
}

function applyDate(parent, elem, field){
  var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');
  var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);

  suite('Apply ' + elem, function() {
    test('apply changes updates range',function(){
      var d = elemDate.moment.toISOString();
      fireButtonClickApply(elemDate);
      assert.equal(basic.range[field], d);
    });

    test('added applied class',function(){
      assert.isTrue(elemDiv.classList.contains('validation-success'));
    });
  });
}

function cancelDate(parent, elem, field){
  var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');
  var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
  var range;

  suite('Cancel ' + elem, function() {
    test('cancel changes range remains the same',function(){
      range = parent.range[field];
      fireButtonClickCancel(elemDate);
      assert.equal(parent.range[field], range);
    });

    test('cancel changes resets entry',function(){
      assert.equal(elemDate.moment.toISOString(), range);
    });

    test('didnt add success class',function(){
      assert.isFalse(elemDiv.classList.contains('validation-success'));
    });

    test('removed changed class',function(){
      assert.isFalse(elemDiv.classList.contains('validation-changed'));
    });
  });
}

function invalidDate(parent, elem, field){
  suite('Update ' + elem, function() {
    var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
    var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');

    test('added error class',function(){
      assert.isTrue(elemDiv.classList.contains('validation-error'));
    });

    test('Button state is invalid',function(){
      assert.isFalse(parent.isSubmitButtonValid);
    });

    test('Reset input',function(done){
      fireButtonClickCancel(elemDate);
      done()
    });
  });
}

function enterDate(parent, elem, field){
  var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');
  var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
  var elemInput = Polymer.dom(elemDate.root).querySelector('#dtImport');

  suite('Apply ' + elem, function() {
    test('apply changes updates range',function(){
      var d = elemDate.moment.toISOString();
      fireKeyboardEnter(elemInput);
      assert.equal(basic.range[field], d);
    });

    test('added applied class',function(){
      assert.isTrue(elemDiv.classList.contains('validation-success'));
    });
  });
}

function escDate(parent, elem, field){
  var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');
  var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
  var elemInput = Polymer.dom(elemDate.root).querySelector('#dtImport');

  var range;

  suite('ESC ' + elem, function() {
    test('ESC changes range remains the same',function(){
      range = parent.range[field];
      fireKeyboardEsc(elemInput);
      assert.equal(parent.range[field], range);
    });

    test('ESC changes resets entry',function(){
      assert.equal(elemDate.moment.toISOString(), range);
    });

    test('didnt add success class',function(){
      assert.isFalse(elemDiv.classList.contains('validation-success'));
    });

    test('removed changed class',function(){
      assert.isFalse(elemDiv.classList.contains('validation-changed'));
    });
  });
}

function fireButtonClickApply(elem){
  elem.fire('datetime-button-clicked', {'action':true});
}

function fireButtonClickCancel(elem){
  elem.fire('datetime-button-clicked', {'action':false});
}

function fireKeyboardEnter(elem){
   var evt = new KeyboardEvent('enterclick', {'key':'Enter'});
   elem.dispatchEvent(evt);
}

function fireKeyboardEsc(elem){
   var evt = new KeyboardEvent('escclick', {'code':'Escape'});
   elem.dispatchEvent(evt);
}
