describe('Покупка аватара', function () {                               
    it('e2e тест на покупку нового аватара для тренера', function () {   
         cy.visit('https://pokemonbattle.me/');                          

         cy.get('input[type="email"]').type('USER_LOGIN');      // ввести логин
         cy.get('input[type="password"]').type('USER_PASSWORD');    // ввести пароль
         cy.get('.auth__button').trigger('mouseover') // работает ховер-эффект на кнопке "Войти"
         cy.get('.auth__button').click();  // нажать кнопку "Войти"
         cy.get('.header__btns > [href="/shop"]').contains('Магазин'); //появляется иконка магазина
         cy.get('.header__btns > [href="/shop"]').contains('Магазин'); // иконка магазина видна пользователю
         cy.get('.header__btns > [href="/shop"]').click(); //переходим на страницу магазина
         cy.get('.available > button').first().click(); // нажать кнопку купить у первого доступного для покупки покемона
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('5555 5555 5555 5599'); //ввести номер карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('1234'); //ввести срок действия карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // ввсети cvv код
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('kat'); // ввести имя
         cy.get('.pay-btn').click(); //нажать кнопку оплатить
         cy.get('#cardnumber').type('56456'); //ввести код из смс
         cy.get('.payment__submit-button').click(); //нажать кнопку "Оплатить"
         cy.get('.payment__field-defolt-for-success').contains('Покупка прошла успешно');//проверить что появляется текст об успешной покупке
         cy.get('.payment__field-defolt-for-success').should('be.visible');//проверить что  текст об успешной покупке виден пользователю
         cy.get('.payment__adv').should('have.css', 'color', 'rgb(85, 137, 241)'); //проверить цвет кнопки "Вернуться в битву покемонов"
        })
    })
         
         