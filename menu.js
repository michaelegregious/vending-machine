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
    Cola .............. $1.00 (Type "Cola")       Amount Inserted
    Chips ............. $0.50 (Type "Chips")           $0.00
    Candy ............. $0.65 (Type "Candy")
    Type "Nickel", "Dime", or "Quarter"
  `);
};


