module.exports = {
  verbose: false,
  plugins: {
    local: {
        browsers: ['chrome', 'firefox']
    },
    sauce: {
      disabled: true,
      "browsers": [{
          "browserName": "microsoftedge",
          "platform": "Windows 10",
          "version": ""
        }, {
          "browserName": "internet explorer",
          "platform": "Windows 8.1",
          "version": "11"
        },
        {
          "browserName": "safari",
          "platform": "OS X 10.11",
          "version": "9"
        }, {
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


module.exports = {
    verbose: false,
    plugins: {
        local: {
            browsers: ['chrome', 'firefox']
        },
        sauce: {
             "disabled" : false,
             "browsers": [
             
        
        {
          "browserName": "chrome",
          "platform": "Windows 10",
          "version": "44"
        },
         {
          "browserName": "firefox",
          "platform": "Windows 8.1",
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
