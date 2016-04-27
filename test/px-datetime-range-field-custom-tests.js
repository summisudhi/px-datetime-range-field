
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

  runBasicTests(now,weekAgo);
  runRangeTests();
  runButtonsTests();
  runAutoSubmitTests();
  runUtc();
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
    updateDate(basic,'fromDate','05/04/2013','MM/DD/YYYY','from', 'Test Applying a new datetime');
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
    updateDate(basic,'fromDate','06/04/2013','MM/DD/YYYY','from', 'Test Canceling a new datetime');
    cancelDate(basic,'fromDate','from');

    updateDate(basic,'fromTime','01:00:00 PM','hh:mm:ss A','from');
    cancelDate(basic,'fromTime','from');

    updateDate(basic,'toDate','10/14/2014','MM/DD/YYYY','to');
    cancelDate(basic,'toDate','to');

    updateDate(basic,'toTime','01:00:00 PM','hh:mm:ss A','to');
    cancelDate(basic,'toTime','to');
  });

  suite('Test Canceling a new datetime', function() {
    updateDate(basic,'fromDate','05/04/2016','MM/DD/YYYY','from', 'Test Canceling a new datetime');
    invalidDate(basic,'fromDate','from');

    updateDate(basic,'toDate','10/14/2012','MM/DD/YYYY','to');
    invalidDate(basic,'toDate','to');
  });

  suite('Test keyboard events', function() {
    updateDate(basic,'fromDate','05/04/2016','MM/DD/YYYY','from', 'Test keyboard events');
    invalidDate(basic,'fromDate','from');
    escDate(basic,'fromDate','from');

    updateDate(basic,'fromDate','05/04/2010','MM/DD/YYYY','from', 'Test keyboard events2');
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

  suite('Test onfocus styles',function(){
    var fromFields = Polymer.dom(basic.root).querySelector('#fromFields'),
        toFields = Polymer.dom(basic.root).querySelector('#toFields');

    var fromDate = Polymer.dom(basic.root).querySelector('#fromDate'),
        fromTime = Polymer.dom(basic.root).querySelector('#fromTime'),
        toDate = Polymer.dom(basic.root).querySelector('#toDate'),
        toTime = Polymer.dom(basic.root).querySelector('#toTime');
    var fromDateInput = Polymer.dom(fromDate.root).querySelector('#dtImport'),
        fromTimeInput = Polymer.dom(fromTime.root).querySelector('#dtImport'),
        toDateInput = Polymer.dom(toDate.root).querySelector('#dtImport'),
        toTimeInput = Polymer.dom(toTime.root).querySelector('#dtImport');

    test('state appiled to fromFields',function(){
      fromDateInput.focus();
      assert.isTrue(fromFields.classList.contains('is-focused'));
    });
    test('state not appiled to toFields',function(){
      assert.isFalse(toFields.classList.contains('is-focused'));
    });
    test('focus moves to fromTime; fromFields state remains',function(){
      fromTimeInput.focus();
      assert.isTrue(fromFields.classList.contains('is-focused'));
    });
    test('toFields focus remains',function(){
      assert.isFalse(toFields.classList.contains('is-focused'));
    });
    test('focus moves to toDate; toFields gets state',function(){
      toDateInput.focus();
      assert.isTrue(toFields.classList.contains('is-focused'));
    });
    test('fromFields looses class',function(){
      assert.isFalse(fromFields.classList.contains('is-focused'));
    });
    test('focus moves to toTime; toFields keeps class',function(){
      toDateInput.focus();
      assert.isTrue(toFields.classList.contains('is-focused'));
    });
    test('fromFields doesnt change',function(){
      assert.isFalse(fromFields.classList.contains('is-focused'));
    });
  });
} //runBasicTests

function runRangeTests(){
  var range = document.getElementById('range');

  checkIfElemExists(range,'range');

  suite('Range instantiated correctly',function(){
    test('range.from is correct',function(){
      assert.equal(range.range.from, "2014-10-11T20:00:00Z");
    });
    test('range.to is correct',function(){
      assert.equal(range.range.to, "2014-10-25T22:00:00Z");
    });
    test('fromDate moment is correct',function(){
      var elem = Polymer.dom(range.root).querySelector('#fromDate');
      assert.equal(elem.moment.toISOString(), "2014-10-11T20:00:00.000Z");
    });
    test('fromTime moment is correct',function(){
      var elem = Polymer.dom(range.root).querySelector('#fromTime');
      assert.equal(elem.moment.toISOString(), "2014-10-11T20:00:00.000Z");
    });
    test('toDate moment is correct',function(){
      var elem = Polymer.dom(range.root).querySelector('#toDate');
      assert.equal(elem.moment.toISOString(), "2014-10-25T22:00:00.000Z");
    });
    test('toTime moment is correct',function(){
      var elem = Polymer.dom(range.root).querySelector('#toTime');
      assert.equal(elem.moment.toISOString(), "2014-10-25T22:00:00.000Z");
    });
  });
}

function runButtonsTests(){
  var buttonsDisplayHideSubmit = document.getElementById('buttonsDisplayHideSubmit'),
      buttonsDisplayHideCancel = document.getElementById('buttonsDisplayHideCancel'),
      buttonsDisplayHideAll = document.getElementById('buttonsDisplayHideAll'),
      datetimeButtonsDisplayOptionOnfocus = document.getElementById('datetimeButtonsDisplayOptionOnfocus');

  checkIfElemExists(buttonsDisplayHideSubmit,'buttonsDisplayHideSubmit');
  checkIfElemExists(buttonsDisplayHideCancel,'buttonsDisplayHideCancel');
  checkIfElemExists(buttonsDisplayHideAll,'buttonsDisplayHideAll');
  checkIfElemExists(datetimeButtonsDisplayOptionOnfocus,'datetimeButtonsDisplayOptionOnfocus');


  suite('hide-submit works', function() {
    var buttons = Polymer.dom(buttonsDisplayHideSubmit.root).querySelector('#dtBtns');
    test('buttons visible',function(){
      assert.isFalse(buttons.classList.contains('visuallyhidden'));
    });
    test('not hideSubmit',function(){
      assert.isTrue(buttons.hideSubmit);
    });
  });

  suite('hide-cancel works', function() {
    var buttons = Polymer.dom(buttonsDisplayHideCancel.root).querySelector('#dtBtns');
    test('buttons visible',function(){
      assert.isFalse(buttons.classList.contains('visuallyhidden'));
    });
    test('not hideCancel',function(){
      assert.isTrue(buttons.hideCancel);
    });
  });

  suite('hide-all works', function() {
    var buttons = Polymer.dom(buttonsDisplayHideAll.root).querySelector('#dtBtns');
    test('buttons not created', function() {
      assert.isTrue(buttons === null);
    });
  });

  suite('on-focus works', function() {
    var buttons = Polymer.dom(datetimeButtonsDisplayOptionOnfocus.root).querySelector('#dtBtns');
    suite('buttons are hidden',function(){
      test('buttons hidden',function(){
        assert.isTrue(buttons.classList.contains('visuallyhidden'));
      });
    });

    updateDate(datetimeButtonsDisplayOptionOnfocus,'fromDate','06/04/2013','MM/DD/YYYY','from');

    suite('buttons are shown',function(){
      test('buttons shown',function(){
        assert.isFalse(buttons.classList.contains('visuallyhidden'));
      });
    })

    applyDate(datetimeButtonsDisplayOptionOnfocus,'fromDate','from');

    suite('buttons are hidden again',function(){
      test('buttons hidden',function(){
        assert.isTrue(buttons.classList.contains('visuallyhidden'));
      });
    });
  });
}

function runAutoSubmitTests(){
  var autoSubmit = document.getElementById('autoSubmit');
  checkIfElemExists(autoSubmit,'autoSubmit');

  updateDate(autoSubmit,'fromDate','06/04/2013','MM/DD/YYYY','from');

  suite('it auto submitted',function(){
    test('from updated',function(done){
      var assertions = function(){
        assert.equal(autoSubmit.range.from, "2013-06-04T23:00:00.000Z");
        done();
      };

      setTimeout(assertions, 501);
    });
  });
}

function runUtc(){
  var hasUtc = document.getElementById('hasUtc');
  checkIfElemExists(hasUtc,'hasUtc');

  suite('it is utc',function(){
    test('time input correct',function(){
      var fromTime = hasUtc.$.fromTime
      var dtImport = fromTime.$.dtImport
      assert.equal(dtImport.value, "11:00:00 PM");
    });

    test('moment has _isUTC true',function(){
      var fromTime = hasUtc.$.fromTime
      assert.isTrue(fromTime.moment._isUTC);
    });
  });
}

function checkIfElemExists(elem,str) {
  test(str + 'fixture is created', function() {
    assert.isTrue(elem !== null);

  });
}

function updateDate(parent, elem, date, format, field, log){
  suite('Update ' + elem + ' ' + log, function() {
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
      assert.equal(parent.range[field], d);
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
  var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');
  var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
  var elemInput = Polymer.dom(elemDate.root).querySelector('#dtImport');

  suite('Apply wont work on' + elem, function() {
    test('apply didnt go through',function(done){
      var d = elemDate.moment.toISOString();
      fireKeyboardEnter(elemInput);

      var assertions = function(){
        assert.equal(elemDate.moment.toISOString(), d);
        done();
      }

      setTimeout(function(){
        assertions();
      },50);
    });

    test('added invalid class',function(){
      assert.isTrue(elemDiv.classList.contains('validation-error'));
    });
  });
}

function enterDate(parent, elem, field){
  var elemDiv = Polymer.dom(parent.root).querySelector('#'+field+'Fields');
  var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
  var elemInput = Polymer.dom(elemDate.root).querySelector('#dtImport');

  suite('Apply ' + elem, function() {
    test('apply changes updates range',function(done){
      var d = elemDate.moment.toISOString();
      fireKeyboardEnter(elemInput);

      var assertions = function(){
        assert.equal(basic.range[field], d);
        done();
      }

      setTimeout(function(){
        assertions();
      },50);
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
   var evt = new KeyboardEvent("keydown", {code: "Enter", keyIdentifier:"Enter", key:"Enter" });
   elem.dispatchEvent(evt);
}

function fireKeyboardEsc(elem){
   var evt = new KeyboardEvent('keydown', {code:'Esc',keyIdentifier:'Esc',key:'Esc'});
   elem.dispatchEvent(evt);
}
