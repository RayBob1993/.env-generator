const prompts = require('./prompts')
const {
  createDotevn,
  validate,
  getRules,
  exit,
} = require('./utils')

module.exports = {
	prompts,
	async completed () {
    const rules = await getRules(this.outDir)
    const currentDotenv = await createDotevn(this.answers, this.outDir)
    const isValid = await validate(rules, currentDotenv)

    if (!isValid) {
      exit()
    }
	},
}
