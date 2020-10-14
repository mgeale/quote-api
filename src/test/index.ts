import Jasmine from 'jasmine';
const jasmine = new Jasmine({});

jasmine.loadConfig({
  spec_dir: 'built',
  spec_files: ['**/*.spec.js'],
  helpers: [],
  stopSpecOnExpectationFailure: false,
  random: true,
});
jasmine.configureDefaultReporter({});
jasmine.execute();
