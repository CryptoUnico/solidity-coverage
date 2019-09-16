const UI = require('./../../lib/ui').UI;

/**
 * Truffle Plugin logging
 */
class PluginUI extends UI {
  constructor(log){
    super(log);
  }

  /**
   * Writes a formatted message via log
   * @param  {String}   kind  message selector
   * @param  {String[]} args  info to inject into template
   */
  report(kind, args=[]){
    const c = this.chalk;
    const ct = c.bold.green('>');
    const ds = c.bold.yellow('>');
    const w = ":warning:";

    const kinds = {

      'sol-tests': `${w}  ${c.red("This plugin cannot run Truffle's native solidity tests: ")}`+
                         `${args[0]} test(s) will be skipped.\n`,

      'id-clash': `${w}  ${c.red("The 'network_id' values in your truffle network ")}` +
                        `${c.red("and .solcover.js are different. Using truffle's: ")} ${c.bold(args[0])}.\n`,

      'port-clash': `${w}  ${c.red("The 'port' values in your truffle network ")}` +
                          `${c.red("and .solcover.js are different. Using truffle's: ")} ${c.bold(args[0])}.\n`,

      'no-port': `${w}  ${c.red("No 'port' was declared in your truffle network. ")}` +
                       `${c.red("Using solidity-coverage's: ")} ${c.bold(args[0])}.\n`,

      'lib-local':  `\n${ct} ${c.grey('Using Truffle library from local node_modules.')}\n`,
      'lib-global': `\n${ct} ${c.grey('Using Truffle library from global node_modules.')}\n`,

      'lib-warn':   `${w}  ${c.red('Unable to require Truffle library locally or globally.\n')}`+
                    `${w}  ${c.red('Using fallback Truffle library module instead (v5.0.31)')}\n` +
                    `${w}  ${c.red('Truffle V5 must be a local dependency for fallback to work.')}\n`,


      'help': `Usage: truffle run coverage [options]\n\n` +
              `Options:\n` +
              `  --file:       path (or glob) to subset of JS test files. (Quote your globs)\n` +
              `  --solcoverjs: relative path to .solcover.js (ex: ./../.solcover.js)\n` +
              `  --version:    version info\n`,


      'truffle-version':  `${ct} ${c.bold('truffle')}:           v${args[0]}`,
      'ganache-version':  `${ct} ${c.bold('ganache-core')}:      ${args[0]}`,
      'coverage-version': `${ct} ${c.bold('solidity-coverage')}: v${args[0]}`,

      'network': `\n${c.bold('Network Info')}` +
                 `\n${c.bold('============')}\n` +
                 `${ct} ${c.bold('id')}:      ${args[1]}\n` +
                 `${ct} ${c.bold('port')}:    ${args[2]}\n` +
                 `${ct} ${c.bold('network')}: ${args[0]}\n`,



    }

    this._write(kinds[kind]);
  }

  /**
   * Returns a formatted message. Useful for error message.
   * @param  {String}   kind  message selector
   * @param  {String[]} args  info to inject into template
   * @return {String}         message
   */
  generate(kind, args=[]){
    const c = this.chalk;

    const kinds = {
      'lib-fail':  `${c.red('Unable to load plugin copy of Truffle library module. ')}` +
                   `${c.red('Try installing Truffle >= v5.0.31 locally or globally.\n')}` +
                   `Caught error message: ${args[0]}\n`,

      'solcoverjs-fail': `${c.red('Could not load .solcover.js config file. ')}` +
                         `${c.red('This can happen if it has a syntax error or ')}` +
                         `${c.red('the path you specified for it is wrong.')}`,

      'no-network': `${c.red('Network: ')} ${args[0]} ` +
                    `${c.red(' is not defined in your truffle-config networks. ')}`,

    }


    return this._format(kinds[kind])
  }
}

module.exports = PluginUI;