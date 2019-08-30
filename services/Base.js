export default class Base {
  constructor(args) {
    this.context = args.context || "";
  }

  async run(params) {
    return this.execute(params);
  }
}
