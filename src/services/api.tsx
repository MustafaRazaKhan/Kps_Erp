const apiPOST = async (endpoint: string, body: unknown) => {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default apiPOST;

// API GET SERVICES
const apiGET = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export { apiPOST, apiGET };
