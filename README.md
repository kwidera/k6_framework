# k6_framework
Framework for k6 tool

Before first run build with:
xk6 build v0.45.1 --with github.com/grafana/xk6-exec@v0.3.0

To run example:
./k6 run main.js -e CONFIG_FILES='./configs/exampleConfig.json' -e URL='https://test-api.k6.io'

To run your own test:
1. create script in scripts folder
2. export it in scripts/index.js file
3. pick or create a scenario from options/scenarios.js
4. pick or create thresholds from options/thresholds.js
5. create config file in configs folder

Config file description:
1. Config may contain more than 1 test:
[
  {
    TEST_1
  },
  {
    TEST_2
  }
]
2. Each test schould contain:
- scriptName (name of the script from scripts/index.js file)
- scenarioName (name of the sceanrio from options/scenarios.js file)
- thresholds (name of the thresholds from options/thresholds.js file)
- data (data you need to prepare for the test - see getData() method from objects/data.js file)

You can run several config files with:
CONFIG_FILES='./configs/exampleConfig.json,./configs/anotherExample.json'
(relative path to the files, comma delimited)

If you provide no value for CONFIG_FILES all configs from configs folder will be executed.

For more information what this framework has to offer and what is the approach explore it on your own. First, by running the example with ./k6 run main.js -e CONFIG_FILES='./configs/exampleConfig.json' -e URL='https://test-api.k6.io'. Enjoy! :D
