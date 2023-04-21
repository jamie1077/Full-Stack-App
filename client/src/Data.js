import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**GET request to get all courses */
  async getCourses() {
    const response = await this.api('/courses', 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  /**GET request for specific course */
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      return response.status;
    }
  }

  /** POST request to create new course */
  async createCourse(body, username, password) {
    const response = await this.api("/courses", 'POST', body, true, {
      username,
      password,
    });
    if (response.status === 201) {
      console.log(response);
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /** PUT request to api to update a course */
  async updateCourse(id, body, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', body, true, {
      username, password
    });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /** DELETE request to api to delete a course */
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return response.status;
    } else if (response.status === 401) {
      return response.status;
    } else {
      throw new Error();
    }
  }
}
