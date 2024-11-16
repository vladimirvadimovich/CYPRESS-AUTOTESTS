describe('Позитивный кейс авторизации', function () {

    it('Верный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio');// + зайти на сайт
        cy.get ('#mail').type('german@dolnikov.ru');// + Найти поле логин и ввести правильный логин
        cy.get('#pass').type('iLoveqastudio1');// + Найти поле пароль и ввести правильный пароль
        cy.get('#loginButton').click();// + Найти кнопку войти и нажать на неё
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// + Проверить в всплыающем окошке текст "Авторизация прошла успешно" 
        cy.get('#messageHeader').should('be.visible');// + Проверить наличие текст "Авторизация прошла успешно" 
        cy.get('#exitMessageButton').should('be.visible');// + Проверить наличие кнопки "крестик"
    })
})

describe('Проверка логики восстановления пароля', function () {
    
    it('Заполняет форму со случайным email', () => {
          const generateRandomEmail = () => {
          const randomString = Math.random().toString(36).substring(2, 11);
          return `${randomString}@mail.ru`;
        };
    
        const randomEmail = generateRandomEmail();
    
        cy.visit('https://login.qa.studio'); // + зайти на сайт
        cy.get('#forgotEmailButton').click(); // + Найти кнопку "Забыли пароль"
        cy.get('#mailForgot').type(randomEmail);// + Вставить рандомный email адрес
        cy.get('#restoreEmailButton').click(); // +Найти кнопку "отправить код" и нажать на неё
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');// + Проверить в всплыающем окошке текст "Успешно отправили пароль на e-mail"
        cy.get('#messageHeader').should('be.visible');// + Проверить наличие текст "Успешно отправили пароль на e-mail" 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');// + Проверить наличие кнопки "крестик"
    })
})

describe('Проверка на негативный кейс авторизации(НЕПРАВИЛЬНЫЙ ПАРОЛЬ):', function () {


    it('Заполняет форму со случайнм паролем', () => {
        const generateRandomPassword = () => {
        const randomString = Math.random().toString(36).substring(2, 11);
        return `${randomString}`;
        };

        const randomPassword = generateRandomPassword();

        cy.visit('https://login.qa.studio'); // + зайти на сайт
        cy.get ('#mail').type('german@dolnikov.ru');// + Найти поле логин и ввести правильный логин
        cy.get('#pass').type('randomPassword');// + Найти поле пароль и ввести "НЕПРАВИЛЬНЫЙ" пароль
        cy.get('#loginButton').click();// + Найти кнопку войти и нажать на неё
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// + Проверить в всплыающем окошке текст "Такого логина или пароля нет" 
        cy.get('#messageHeader').should('be.visible');// + Проверить наличие текст "Такого логина и пароля нет" 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');// + Проверить наличие кнопки "крестик"
    })
})  

describe('Проверка на негативный кейс авторизации(НЕПРАВИЛЬНЫЙ ЛОГИН):', function () {

    it('Заполняет форму со случайным email', () => {
        const generateRandomEmail = () => {
        const randomString = Math.random().toString(36).substring(2, 11);
        return `${randomString}@yandex.ru`;
      };
  
      const randomEmail = generateRandomEmail();

        cy.visit('https://login.qa.studio'); // + зайти на сайт
        cy.get ('#mail').type(randomEmail);// + Найти поле логин и ввести "НЕПРАВИЛЬНЫЙ" логин
        cy.get('#pass').type('iLoveqastudio1');// + Найти поле пароль и ввести правильный пароль
        cy.get('#loginButton').click();// + Найти кнопку войти и нажать на неё
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// + Проверить в всплыающем окошке текст "Такого логина или пароля нет" 
        cy.get('#messageHeader').should('be.visible');// + Проверить наличие текст "Такого логина и пароля нет" 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');// + Проверить наличие кнопки "крестик"
    })
})  

describe('Проверка на негативный кейс (НЕ ВАЛИДИРОВАН ЛОГИН):', function () {


    it('Заполняет форму с невалидным логином', () => {
        const generateRandommail = () => {
        const randomString = Math.random().toString(36).substring(2, 11);
        return `${randomString}mail.com`;
      };
  
     const randommail = generateRandommail();

       cy.visit('https://login.qa.studio'); // + зайти на сайт
       cy.get ('#mail').type(randommail);// + Найти поле логин и ввести невалидный логин без @
       cy.get('#pass').type('iLoveqastudio1');// + Найти поле пароль и ввести правильный пароль
       cy.get('#loginButton').click();// + Найти кнопку войти и нажать на неё
       cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// + Проверить в всплыающем окошке текст "Нужно исправить проблему валидации" 
       cy.get('#messageHeader').should('be.visible');// + Проверить наличие текст "Нужно исправить проблему валидации" 
       cy.get('#exitMessageButton > .exitIcon').should('be.visible');// + Проверить наличие кнопки "крестик"
   })
})  

describe('Проверка на приведение к строчным буквам в логине:', function () {

    it('Верный пароль и логин GerMan@Dolnikov.ru', function () {
        cy.visit('https://login.qa.studio');// + зайти на сайт
        cy.get ('#mail').type('GerMan@Dolnikov.ru');// + Найти поле логин и ввести правильный логин
        cy.get('#pass').type('iLoveqastudio1');// + Найти поле пароль и ввести правильный пароль
        cy.get('#loginButton').click();// + Найти кнопку войти и нажать на неё
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// + Проверить в всплыающем окошке текст "Авторизация прошла успешно" 
        cy.get('#messageHeader').should('be.visible');// + Проверить наличие текст "Авторизация прошла успешно" 
        cy.get('#exitMessageButton').should('be.visible');// + Проверить наличие кнопки "крестик"
    })
})