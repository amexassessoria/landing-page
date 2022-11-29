module.exports = function (plop) {
  plop.setGenerator('hook', {
    description: 'Generates a hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Qual o nome do hook? exemplo -> "Novo" : ',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../hooks/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/hook.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hooks/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.ts.hbs',
      },
      {
        type: 'add',
        path: '../hooks/{{pascalCase name}}/services.ts',
        templateFile: 'templates/services.ts.hbs',
      },
    ],
  });
};
