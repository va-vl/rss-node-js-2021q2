const uuid = require('uuid');

class User {
  /**
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.name
   * @param {Sting} params.login
   * @param {String} params.password 
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * @param {User} user 
   * @returns 
   */
  static toResponse(user) {
    const { 
      id, name, login 
    } = user;

    return { id, name, login };
  }
}

module.exports = User;
