
module.exports = {
    verbose: false,
    plugins: {
        local: {
            browsers: ['chrome', 'firefox']
        },
        sauce: {
             "disabled" : true,
             "browsers": [
             
        
        {
          "browserName": "chrome",
          "platform": "OS X 10.10",
          "version": "49"
        },
         {
          "browserName": "firefox",
          "platform": "OS X 10.10",
          "version": "44"
        },
         {
          "browserName": "safari",
          "platform": "OS X 10.10",
          "version": "8"
        }

        
        
      ]
        }
    },
    suites: [
    'test/px-datetime-range-field-test-fixture.html'
  ]
    
};
