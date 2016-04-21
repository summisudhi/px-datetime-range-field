
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

  var basic = document.getElementById('basic'),
      range = document.getElementById('range'),
      clearInvalid = document.getElementById('clearInvalid'),
      noClearInvalid = document.getElementById('noClearInvalid'),
      buttonsDisplayHideSubmit = document.getElementById('buttonsDisplayHideSubmit'),
      buttonsDisplayHideCancel = document.getElementById('buttonsDisplayHideCancel'),
      buttonsDisplayHideAll = document.getElementById('buttonsDisplayHideAll'),
      datetimeButtonsDisplayOptionOnfocus = document.getElementById('datetimeButtonsDisplayOptionOnfocus'),
      autoSubmit = document.getElementById('autoSubmit');

  suite('Test basic instantiation', function() {
    var fromDate = Polymer.dom(basic.root).querySelector('#fromDate'),
        fromTime = Polymer.dom(basic.root).querySelector('#fromTime'),
        toDate = Polymer.dom(basic.root).querySelector('#toDate'),
        toTime = Polymer.dom(basic.root).querySelector('#toTime');

    checkIfElemExists(basic,'basic');

    test('check that entries were created',function(){
      assert.isTrue( fromDate !== null);
      assert.isTrue( fromTime !== null);
      assert.isTrue( toDate !== null);
      assert.isTrue( toTime !== null);
    });

    test('check basic attributes',function(){
      assert.equal(basic.clearInvalid, 'yes');
      assert.equal(basic.datetimeButtonsDisplay, 'show-all');
      assert.equal(basic.datetimeButtonsDisplayOption, 'show');
      assert.isFalse(basic.autoSubmit);
    });

    test('check that buttons appeared',function(){
      var buttons = Polymer.dom(basic.root).querySelector('#dtBtns');
      assert.isTrue( buttons !== null);
      assert.isFalse(buttons.hideSubmit);
      assert.isFalse(buttons.hideCancel);
      assert.isFalse(buttons.classList.contains('visuallyhidden'));
    });

    test('check time instantiated to default',function(){
      var fromRange = moment(basic.range.from),
          toRange = moment(basic.range.to);

      var toDiff = now.diff(toRange),
          fromDiff = weekAgo.diff(fromRange);

      // since some time has passed since the field was instantiated, we give ourselves a 10 sec buffer
      assert.isTrue(toDiff < 1000);
      assert.isTrue(fromDiff < 1000);
    });

    test('check that entries were instantiated',function(){
      var fromRange = moment(basic.range.from),
          toRange = moment(basic.range.to);

      assert.equal(fromDate.moment._i,fromRange._i);
      assert.equal(fromTime.moment._i,fromRange._i);
      assert.equal(toDate.moment._i,toRange._i);
      assert.equal(toTime.moment._i,toRange._i);
    });
  });

  updateDate(basic,'fromDate','05/04/2013','MM/DD/YYYY');
  updateDate(basic,'toDate','09/14/2014','MM/DD/YYYY');
  updateDate(basic,'fromTime','12:00:00 PM','hh:mm:ss A');
  updateDate(basic,'toTime','12:00:00 PM','hh:mm:ss A');

  // TODO update invalid range.

};



function checkIfElemExists(elem,str) {
  test(str + 'fixture is created', function() {
    assert.isTrue(elem !== null);
  });
}

function updateDate(parent, elem, date, format){
  suite('Update ' + elem, function() {
    var elemDate = Polymer.dom(parent.root).querySelector('#'+elem);
    setup(function(){
      elemDate.dateTimeWorkingCopy = date;
      elemDate._validateInput();
    });

    // TODO
    // check for update class
    // run submit or do that in another?

    test('update toDate',function(){
      assert.equal(elemDate.moment.format(format),date);
    });
  });

}
