![Type Script](https://img.shields.io/badge/-TypeScript-000?logo=typescript&logoColor=3178C6&style=flat)![React](https://img.shields.io/badge/-React-000?&logo=React)![Redux Toolkit](https://img.shields.io/badge/-ReduxToolkit-000?logo=Redux&logoColor=764ABC&style=flat)![React Router](https://img.shields.io/badge/-ReactRouter-000?logo=reactrouter&logoColor=CA4245&style=flat)![HTML5](https://img.shields.io/badge/-HTML5-000?&logo=HTML5)![CSS3](https://img.shields.io/badge/-CSS3-000?&logo=CSS3)![GIT](https://img.shields.io/badge/-GIT-000?&logo=GIT)![NPM](https://img.shields.io/badge/-NPM-000?logo=npm&logoColor=CC3534&style=flat)



# Проект: Nayzak (E-store)
## [Ссылка на сайт](https://kaililya.github.io/react-e-store/)

#### О проекте

---

##### Многостраничный интернет магазин специализирующийся на продаже обуви Nike.

На данном сайте пользователь может найти интересующий его обувь, выбрать цвет и размер и добавить в корзину. Менять кол-во каждого товара, удалить выбранный товар или очистить всю корзину. Так же на странице присуствет реальная JWT-авторизация, защищенный роутинг и навигация.

##### Бизне-логика:
+ Если не авторизированный пользователь попытается перейти на страницу профиля, то его автоматически перенаправит на страницу авторизациию.
+ Если пользователь авторизировался, то ему нее нужно повторно авторизироваться
+ Авторизированный пользователь не может попасть на страницы "забыл пароль", "восстановить пароль" и регистрации
+ Нельзя вернутся со страницы  "восстановить пароль" на страницу "забыл пароль".
+ Нельзя добавить товар в корзину не выбрав цвет и размер

---

### Технологии:
 + Язык программирования ![Type Script](https://img.shields.io/badge/-TypeScript-000?logo=typescript&logoColor=3178C6&style=flat)


 + В качестве фраймоврка используется ![React](https://img.shields.io/badge/-React-000?&logo=React)
    
 + Хранилище данных в браузере разработано при помощи ![Redux Toolkit](https://img.shields.io/badge/-ReduxToolkit-000?logo=Redux&logoColor=764ABC&style=flat)
 + Клиентский роутинг и навигация на сайте разработаны и описаны при помощи ![React Router](https://img.shields.io/badge/-ReactRouter-000?logo=reactrouter&logoColor=CA4245&style=flat)

 + Для верстки использовался flex, grid, медизапросы и даже формула линейной функции ![CSS3](https://img.shields.io/badge/-CSS3-000?&logo=CSS3)



---

#### Особенности

+ Клиентский роунтинг, который ограничивает функционал для не авторизованных пользователей.
+ Автоматическая JWT-авторизация (если пользователь авторизовался, то при повторном посещения сайта ему не нужно заново вводить идентификационные данные).
+ Фильтрация товара происходит на стороне сервера при помощи HTTP-запроса.
+ Адаптивная вертска (для дисплеев шириной от 320px).
+ Отсуствие хардкор данных, все приходит с backend.


#### Стопперы

+ Сервер, на котором хранятся товары не может фильтровать товары сразу по 2 параметрам, но каждый параметр + сортировка работает хорошо.  



---



#### Начало работы с Create React App

Этот проект был запущен с [Create React App](https://github.com/facebook/create-react-app).

#### Доступные скрипты

В каталоге проекта вы можете запустить:

- ##### `npm start` - запустить проект,


- ##### `npm run build` - собрать проект.

Создает приложение для производства в папке "build".\
Он правильно связывает React в рабочем режиме и оптимизирует сборку для достижения наилучшей производительности.

