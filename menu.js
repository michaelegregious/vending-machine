const figlet = require('figlet');
const chalk = require('chalk');

module.exports = () => {
  process.stdout.write(
    chalk.yellow(
      figlet.textSync('Snacks', {
        font: 'isometric1',
        horizontalLayout: 'default'
      })
    )
  );
  process.stdout.write(`\n
    Cola .............. $1.00 (Type "Cola")
    Chips ............. $0.50 (Type "Chips")
    Candy ............. $0.65 (Type "Candy")
    Type "Nickel", "Dime", or "Quarter"
  `);
};


