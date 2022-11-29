module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'Generates a page',
    prompts: [
      {
        type: 'input',
        name: 'pasta',
        message:
          'Onde vamos criar a pasta com os arquivos, usando como base a pasta já existente "./src/Pages/"? exemplo -> "Private" : ',
      },
      {
        type: 'input',
        name: 'name',
        message:
          'Qual o nome da pasta a ser criada? exemplo -> "MinhaNovaPagina" : ',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../Pages/{{pasta}}/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../Pages/{{pasta}}/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.ts.hbs',
      },
      {
        type: 'add',
        path: '../Pages/{{pasta}}/{{pascalCase name}}/services.ts',
        templateFile: 'templates/services.ts.hbs',
      },
    ],
  });
};
