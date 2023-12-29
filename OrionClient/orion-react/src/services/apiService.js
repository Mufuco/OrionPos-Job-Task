const apiService = {
  async fetchData(requestData, link, type) {
    const apiUrl = `https://localhost:7183/api${link}`;
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    if (!token) {
      redirectToLogin();
    }
    const response = await fetch(apiUrl, {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      handleErrorResponse(response);
    }

    return await response.json();
  },

  async createOrUpdate(requestData, link, type) {
    const apiUrl = `https://localhost:7183/api${link}`;
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    if (!token) {
      redirectToLogin();
    }

    const response = await fetch(apiUrl, {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    return response.ok;
  },
};

function redirectToLogin() {
  window.location.href = '/';
}

function handleErrorResponse(response) {
  if (response.status === 401) {
    redirectToLogin();
  }
  throw new Error(`HTTP error! Status: ${response.status}`);
}

export default apiService;
