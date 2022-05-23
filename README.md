# Inspector Client

## Установка всех зависимостей
```
npm install
```

### Локальный сервер в режиме разработки:
Обращается к API на http://localhost:8000
```
npm run serve
```

### Локальный сервер в тестовом режиме (staging): 
Обращается к API на https://inspector-test.bank.srv/api
```
npm run serve-staging
```

### Тестовая сборка (staging): 
Компилирует и минифицирует всё в папку **/dist**. Обращается к API на https://inspector-test.bank.srv/api 
```
npm run build-staging
```

### Боевая сборка:
Компилирует и минифицирует всё в папку **/dist**. Обращается к API на https://inspector.bank.srv/api
```
npm run build
```

#### Режимы описаны в **package.json**: `scripts: {}`.


## Переменные окружения

Переменные окружения берутся из файлов в соответствии с названием режима:
- Режим разработки(локальный) - `development` - **/.env.development.local**
- Тестовый режим - `staging` - **/.env.staging.local**
- Боевая сборка - `production` - **/.env.production.local**

Каждый файл должен иметь одинаковую структуру:
```
VUE_APP_TITLE=
VUE_APP_ICON_URL=
VUE_APP_API_URL=
```

К примеру, переменные окружения для режима разработки:
```
VUE_APP_TITLE=Inspector-Local
VUE_APP_ICON_URL=/Gray.png
VUE_APP_API_URL=http://localhost:8000
```
где `VUE_APP_ICON_URL` содержит относительный путь файла в папке **/public** (после сборки - **/dist**)
