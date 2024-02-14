# Стек технологий
React native, TypeScript, React Navigation, MobX, Axios

## Список выполненных задач

Для получения изображений использовал сервис [SlingAcademy](https://www.slingacademy.com/article/sample-photos-free-fake-rest-api-for-practice/).

1) Лента изображений
2) Детальный просмотр
3) На экране “Лента изображений” предусмотреть отображение в одну или две колонки, с возможностью переключения между режимами отображения
4) Реализовать поиск изображений по тексту. В приложении должно быть поле для ввода текста, по которому будет осуществляться поиск изображений. Найденные изображения должны отображаться в таком же виде как на экране “Лента изображений”

### Примечание:

Поиск реализовал на стороне клиента, т.к сервис не предоставляет API для поиска.
Поиск по тегу похожих изображений, не выполнил по той же причине что и поиск на стороне сервера.

# Запуск проекта

>**Примечание**: Прежде чем продолжить, убедитесь, что вы выполнили инструкции [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) до шага "Creating a new application".

## Шаг 1: Запустите сервер Metro

Сначала вам нужно будет запустить  **Metro**, JavaScript-пакет, который поставляется с React Native.

Чтобы запустить Metro, запустите следующую команду из корневой папки вашего проекта React Native:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Запуск приложения

Запустите Metro Bundler в своем собственном терминале. Откройте новый терминал из корневого каталога вашего проекта React Native.

В случае ошибка запуска на Android Studio, [решение] (https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found)

Выполните следующую команду, чтобы запустить приложение для Android или iOS:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

Если все настроено правильно, вы вскоре увидите, что ваше новое приложение запущено в вашем эмуляторе Android или симуляторе iOS, при условии, что вы правильно настроили свой эмулятор / симулятор.

Это один из способов запуска вашего приложения — вы также можете запустить его непосредственно из Android Studio и Xcode соответственно.
