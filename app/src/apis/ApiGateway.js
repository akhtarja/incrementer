import fetch from 'node-fetch';

const handleStatusCode = response => {
  switch (response.status) {
    case 200:
      return response;
    default:
      throw new Error(response);
  }
};

const PublicApiGateway = {
  put(url, body) {
    return fetch(url, {
      method: 'PUT',
      body: body
    })
      .then(handleStatusCode)
      .then(response => response.json())
      .catch(error => {
        throw new Error(error);
      });
  }
};

export {
  PublicApiGateway
};
