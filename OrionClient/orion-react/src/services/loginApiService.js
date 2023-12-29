const loginApiService = {
    fetchData: async (requestData, link, type) => {
      try {
        const apiBaseUrl = "https://localhost:7183/api";
        const apiUrl = `${apiBaseUrl}${link}`;
        const response = await fetch(apiUrl, {
          method: type,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          await handleErrorResponse(response);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
  };
  
  const handleErrorResponse = async (response) => {
    throw new Error(`HTTP error! Status: ${response.status}`);
  };
  
  export default loginApiService;
  