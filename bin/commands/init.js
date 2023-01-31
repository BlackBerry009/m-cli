const chalk = require('chalk');
const downloadRepo = require('download-git-repo');
const inquirer = require('inquirer');
const symbols = require('log-symbols');
const ora = require('ora')
const fse = require('fs-extra');

const REACT_REPO = 'BlackBerry009/boilerplate-project-react#main';

const questions = [
  {
    name: 'type',
    type: 'list',
    choices: ['Vue', 'React'],
  },
  {
    name: 'name',
    type: 'input',
    message: '请输入项目名称',
  },
];

const prompt = inquirer.createPromptModule();
prompt(questions).then((answers) => {
  const { type, name } = answers;
  if (type === 'React') {
    if(fse.pathExistsSync(`./${name}`)) {
      console.log(
        chalk.red(symbols.error),
        chalk.red('The project is already exist.')
      )
      return;
    }
    const spin = ora('downloading pls wait...').start();
    downloadRepo(`${REACT_REPO}`, `./${name}`, { clone: true }, (err) => {
      if (err) {
        console.log(
          chalk.red(symbols.error),
          chalk.red(`Generation failed. ${err}`),
        );
        return;
      }
      spin.stop();
      console.log(
        chalk.green(symbols.success),
        chalk.green('Generation completed!'),
      );
      console.log('\n To get started');
      console.log(`\n    cd ${name} \n`);
      console.log('\n yarn && yarn start')
    });
  } else if (type === 'Vue') {
    console.log(
      chalk.red(symbols.error),
      chalk.red('not have vue boilerplate yet...'),
    );
  }
});
