import Jasmine from 'jasmine';
import JasmineConsoleReporter from 'jasmine-console-reporter';

const jasmine = new Jasmine({});

jasmine.loadConfig({
  spec_dir: 'built',
  spec_files: ['**/*.spec.js'],
  helpers: ['**/helper.js'],
  stopSpecOnExpectationFailure: false,
  random: true,
});

const reporter = new JasmineConsoleReporter({
  colors: 1,
  cleanStack: 1,
  verbosity: 4,
  listStyle: 'indent',
  timeUnit: 'ms',
  timeThreshold: { ok: 500, warn: 1000, ouch: 3000 },
  activity: true,
  emoji: true,
  beep: true,
});

jasmine.env.clearReporters();
jasmine.addReporter(reporter);
jasmine.execute();
