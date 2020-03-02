const { writeFile, readFile } = require('fs')
const { resolve, join } = require('path')
const { promisify } = require('util')
const { parse } = require('dotenv')

const createFile = promisify(writeFile)
const getFile = promisify(readFile)

/**
 * Путь до директории проекта
 */
const outDir = resolve(process.cwd() || '.')

/**
 * Создать .env файла в указанной директории
 *
 * @param { object } data - Объект с перечислением свойств .env файла
 * @param { string } outDir - Путь к директории
 * @returns { object } - Вернёт объект с свойствами .env файла
 */
async function createDotevn (data, outDir) {
	const filePath = join(outDir, '.env')

	let dotenvValue = ''

	for (let prop in data) {
		if (data.hasOwnProperty(prop)) {
			const value = data[prop]

			dotenvValue += `${ prop }="${ value }"\n`
		}
	}

	try {
		await createFile(filePath, dotenvValue)
		const result = await getFile(filePath, 'utf8')

    return parse(result)
	} catch (error) {
		console.trace(error)
		exit()
	}
}

/**
 * Получить .env файл из корня проекта
 *
 * @param { string } outDir - Путь к директории из которой нужно получить .env файл
 * @returns { object } Вернёт объект с свойствами .env файла
 */
async function getDotenv (outDir) {
	try {
		const dotenvPath = join(outDir, '.env')
		const result = await getFile(dotenvPath, 'utf8')

		return parse(result)
	} catch (error) {
		console.error('Файл .env не найден в проекте')
		return null
	}
}

/**
 * Получение файла конфигурации для .env файла
 *
 * @param { string } outDir - Путь к директории из которой нужно получить файл конфигурации для .env файла
 * @param { string } filename - Имя файла конфигурации .env файла
 * @returns { object }
 */
async function getRules (outDir, filename = 'dotevn-config.json') {
	try {
		return await require(join(outDir, filename))
	} catch (e) {
		console.error(`Файл ${ filename } не найден в директории ${ outDir }`)
		return null
	}
}

/**
 * Валидация опций .env файла на основе правил
 *
 * @param { object } rules - Объект с правилами
 * @param { object } currentDotenv - Объект с текущими правилами .env файла
 * @example
 * rules - { APP_NAME: 'name' }
 * currentDotenv - { APP_NAME: 'name' }
 * @returns { boolean }
 */
async function validate (rules, currentDotenv) {
	const validation = rules.map(item => {
		const { name } = item

		if (!currentDotenv[name]) {
			return {
				status: false,
				message: `Не указано значение обязательного поля ${ name } в файле .env`,
			}
		}

		return {
			status: true,
			message: `Поле ${ name } заполнено`
		}
	})

	const validationHasErrors = validation.filter(item => item.status === false)

	if (!validationHasErrors.length) {
		return true
	} else {
		validationHasErrors.forEach(error => {
			console.error(error.message)
		})
    return false
	}
}

/**
 * Парсер аргументов CLI в объект
 *
 * @param { array } data - Массив с аргументами CLI
 * @example ['APP_NAME=name', 'APP_PORT=3000']
 * @returns { object } - Объект с аргументами
 */
function parseArguments (data) {
  if (
  	!data &&
	  !Array.isArray(data) &&
  	!data.length
  ) {
    return null
  }

	return Object.fromEntries(data.map(item => {
		return item.split('=')
	}))
}

function exit (code) {
	process.exit(code || 1)
}

module.exports = {
	createDotevn,
	validate,
  getRules,
	getDotenv,
	outDir,
	exit,
  parseArguments,
}




