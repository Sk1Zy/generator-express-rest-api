var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializingStep: function() {
    this.questions = [];
    this.applicationName = path.basename(process.cwd());
    this.version = '1.0.0';
    this.applicationDescription = '';
    this.author = '';
    this.gitRepository = '';
    this.license = '';
  },

  promptingStep: function() {
    this.questions.push({ type    : 'input',
                          name    : 'applicationName',
                          message : 'Application Name',
                          default : this.applicationName });

    this.questions.push({ type    : 'input',
                          name    : 'version',
                          message : 'Version',
                          default :  this.version });

    this.questions.push({ type    : 'input',
                          name    : 'applicationDescription',
                          message : 'Application Description',
                          default : this.applicationDescription });

    this.questions.push({ type    : 'input',
                          name    : 'author',
                          message : 'Author',
                          default : this.author });

    this.questions.push({ type    : 'input',
                          name    : 'gitRepository',
                          message : 'Git Repository',
                          default : this.gitRepository });

    this.questions.push({ type    : 'input',
                          name    : 'license',
                          message : 'License',
                          default : this.license });

    var done = this.async();

    var generator = this;

    var handleAnswers = function(answers) {
      generator.applicationName = answers.applicationName;
      generator.version = answers.version;
      generator.applicationDescription = answers.applicationDescription;
      generator.author = answers.author;
      generator.gitRepository = answers.gitRepository;
      generator.license = answers.license;

      done();
    };

    this.prompt(this.questions, handleAnswers.bind(this));
  },

  configuringStep: function() {
    copyTemplate(this, '_package.json', 'package.json');
  },

  defaultStep: function() {
  },

  writingStep: function() {
    copyTemplate(this, 'server.js', 'server.js');

    copyTemplate(this, 'app/config/route.config.json', 'app/config/route.config.json');
    copyTemplate(this, 'app/config/routeconfig.js', 'app/config/routeconfig.js');
    copyTemplate(this, 'app/config/workerconfig.js', 'app/config/workerconfig.js');

    copyTemplate(this, 'app/config/settings/settingsconfig.js', 'app/config/settings/settingsconfig.js');
    copyTemplate(this, 'app/config/settings/settings.config.dev.json', 'app/config/settings/settings.config.dev.json');
    copyTemplate(this, 'app/config/settings/settings.config.test.json', 'app/config/settings/settings.config.test.json');
    copyTemplate(this, 'app/config/settings/settings.config.prod.json', 'app/config/settings/settings.config.prod.json');

    copyTemplate(this, 'app/controllers/v1/homecontroller.js', 'app/controllers/v1/homecontroller.js');

    copyTemplate(this, 'test/mocha.opts', 'test/mocha.opts');
    copyTemplate(this, 'test/tests.initialize.js', 'test/tests.initialize.js');
    copyTemplate(this, 'test/spec/controllers/v1/homecontroller.tests.js', 'test/spec/controllers/v1/homecontroller.tests.js');
  },

  conflictsStep: function() {
  },

  installStep: function() {
  },

  endStep: function() {
    this.npmInstall(['express', 'cluster-service', 'body-parser'], { 'save': true });
    this.npmInstall(['mocha', 'chai', 'sinon'], { 'saveDev': true });
  }
});

var copyTemplate = function(generator, template, path) {
  if(fs.existsSync(path)) {
    console.log('The file "' + path + '" already exists!');
  }
  else {
    generator.template(template, path);
  }
};
