
export default class Base {
  constructor(args) {
    if (!args.context) throw new Error('CONTEXT_REQUIRED');
    this.context = args.context;
  }

  async run(params) {
    return this.execute(params);
  }
}
