#!/usr/bin/env node
(async () => {
	const sao = require('sao')
	const { resolve } = require('path')
	const {
		outDir,
    parseArguments,
		createDotevn,
    validate,
    getRules,
    getDotenv,
		exit,
	} = require('./utils')

	const generator = resolve(__dirname, './')
	const arguments = parseArguments(process.argv.slice(2))

	console.log(arguments)

  const rules = await getRules(outDir)

	if (arguments) {
		const currentDotenv = await createDotevn(arguments, outDir)
		const isValid = await validate(rules, currentDotenv)

		if (!isValid) {
			exit()
		}
	} else {
    const currentDotenv = await getDotenv(outDir)
    const isValid = await validate(rules, currentDotenv)

		if (!isValid) {
			const app = sao({
				generator,
				outDir,
			})

			try {
				await app.run()
			} catch (error) {
				console.trace(error)

				exit()
			}
		}
	}
})()
