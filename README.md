# dotenv-generator

> Генератор файла окружения на основе конфига

## Системные требования

- Node >= 12.0.0

## Использование
Добавить в проект файл конфигурации `dotevn-config.json`
```json
[
    {
        "name": "APP_NAME",
        "type": "input",
        "value": "project-name"
    },
    {
        "name": "APP_PORT",
        "type": "number",
        "value": 3000
    },
    {
        "name": "API_PORT",
        "type": "number",
        "value": 443
    },
    {
        "name": "NODE_ENV",
        "type": "input",
        "value": "production"
    },
    {
        "name": "API_HOST",
        "type": "input",
        "value": "test-api-host.ru"
    },
    {
        "name": "API_PREFIX",
        "type": "input",
        "value": "/api"
    }
]
```

> Каждый обхект массива является описанием нужных в проекте переменных

* `name` - имя переменной окружения
* `type` - тип перменной
* `value` - значение переменной

## Проверка существования перменных окружения
Для проверки существования переменных окружения в проекте запустить комманду
```bash
dotenv
```
если все переменные окружения есть исходя из файла конфигурации, то ничего не произойдёт, если какой либо переменной 
в файле `.env` нет, то будет ошибка с указанием отсутствующей переменной.

##### Пример
```bash
$ dotenv
Не указано значение обязательного поля APP_NAME в файле .env
Не указано значение обязательного поля APP_PORT в файле .env
Не указано значение обязательного поля API_PORT в файле .env
Не указано значение обязательного поля NODE_ENV в файле .env
Не указано значение обязательного поля API_HOST в файле .env
Не указано значение обязательного поля API_PREFIX в файле .env
```

## Генерация переменных окружения
Способ 1, через аргументы коммандной строки:
```bash
dotenv APP_NAME=test-name APP_PORT=3000 API_PORT=443 NODE_ENV=production API_HOST=test-api-host.ru API_PREFIX=/api
```

Способ 2, через опросник:
```bash
dotenv
? APP_NAME project-name
? APP_PORT 3000
? API_PORT 443
? NODE_ENV production
? API_HOST test-api-host.ru
? API_PREFIX /api
```

> пропуская ввод значений, то значение берётся из конфигурационного файла
