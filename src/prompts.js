const config = require('../dotevn-config.json')

const questions = config.map(item => {
	const { name, value, type } = item

	return {
		name,
		type,
		message: name,
		default: value,
		validate (value) {
			return !!value
		}
	}
})

module.exports = questions
