const { RESTDataSource } = require("@apollo/datasource-rest");

class BlogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:6600/";
  }

  async getHello() {
    return this.get(`hello`);
  }
}

module.exports = BlogAPI;
