
import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/'); // зайти на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверить цвет кнопки восстановить пароль
          });
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // есть крестик и он виден пользователю
       });

    it('Верный логин и пароль', function () {
         cy.get(main_page.email).type(data.login); // ввести верный логин
         cy.get(main_page.password).type(data.password); // ввести верный пароль
         cy.get(main_page.login_button).click(); // нажать войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // появляется текст об успешной авторизации
         cy.get(result_page.title).should('be.visible'); // текст виден пользователю
        });

     it('Проверка восстановления пароля', function () {
        cy.get('#forgotEmailButton').click(); // нажать кнопку забыли пароль
        cy.get(recovery_password_page.title).contains('Восстановите пароль'); // Появляется текст "Восстановите пароль"
        cy.get(recovery_password_page.title).should('be.visible'); // текст виден пользователю
        cy.get(recovery_password_page.email).type(data.login); // ввести почту
        cy.get(recovery_password_page.send_button).click(); // нажать отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // появляется текст "Успешно отправили пароль на e-mail"
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })
 it('Верный логин и НЕверный пароль', function () {

    cy.get(main_page.email).type(data.login); // ввести верный логин
    cy.get(main_page.password).type('iLoveqastudio'); // ввести неверный пароль
    cy.get(main_page.login_button).click(); // нажать войти
    cy.get(result_page.title).contains('Такого логина или пароля нет'); // появляется текст об ошибке авторизации
    cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    
})
it('НЕверный логин и верный пароль', function () {

    cy.get(main_page.email).type('gean@dolnikov.ru'); // ввести неверный логин
    cy.get(main_page.password).type(data.password); // ввести верный пароль
    cy.get(main_page.login_button).click(); // нажать войти
    cy.get(result_page.title).contains('Такого логина или пароля нет'); // появляется текст об ошибке авторизации
    cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    
})
it('Проверка валидации', function () {
   
    cy.get(main_page.email).type('germandolnikov.ru'); // ввести логин без @
    cy.get(main_page.password).type(data.password); // ввести верный пароль
    cy.get(main_page.login_button).click(); // нажать войти
    cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // появляется текст об ошибке авторизации
    cy.get(result_page.title).should('be.visible'); // текст виден пользователю
   
})
it('Проверка валидации строчных и заглавных букв', function () {
    
    cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввести верный логин с использованием разных регистров
    cy.get(main_page.password).type('iLoveqastudio1'); // ввести верный пароль
    cy.get(main_page.login_button).click(); // нажать войти
    cy.get(result_page.title).contains('Авторизация прошла успешно'); // появляется текст об ошибке авторизации
    cy.get(result_page.title).should('be.visible'); // текст виден пользователю
})
})