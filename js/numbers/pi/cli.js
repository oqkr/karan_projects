#!/usr/bin/env node

/**
 * Karan Project #1: Find PI to the Nth Digit.
 *
 * Enter a number and have the program generate PI up to that many decimal
 * places. Keep a limit to how far the program will go.
 */

'use strict';

const chalk = require('chalk');
const meow = require('meow');
const pi = require('./src/pi.js');

const n = chalk`{underline num}`
const usage = chalk`
  Generate PI up to {italic n} digits.

  {bold Usage}
    $ pi [options]

  {bold Options}
    -d ${n}, --display ${n}  Show this many digits of PI (default: 100)
    -v, --verbose          Print details of calculation

  {bold Example}
    $ pi --display 20
    {hex('#989898') 3.1415926535897932385}
`;

const cli = meow(usage, {
  autoHelp: false,
  description: false,
  flags: {
    display: {
      type: 'integer',
      alias: 'd',
      default: 100
    },
    help: {
      type: 'boolean',
      alias: 'h',
      default: false
    },
    verbose: {
      type: 'boolean',
      alias: 'v',
      default: false
    }
  }
});

if (cli.flags.help) cli.showHelp();

const { display, verbose } = cli.flags;
const precision = display + 1;

const die = msg => {
  console.log(chalk`\n  {red Error:} ${msg}\n`);
  process.exit(1);
};

if (!Number.isInteger(display)) {
  die('--display option requires an integer argument');
} else if (display > 10000 || display < 1) {
  die(`--display argument outside range 1 to 10,000`);
}

pi({ display, precision, verbose });
