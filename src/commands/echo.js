function echo (env, args) {
  let exitCode = 0
  env.output(args.join(" "))
  env.exit(exitCode)
}

module.exports = echo