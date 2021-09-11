export const getAuthCheck = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth-check`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Error("Interner Server Error");
    }

    return await response.json();
  } catch (error) {

  }
};

export const postLogin = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw Error("Interner Server Error");
    }

    return response.json();
  } catch (error) {

  }
};

export const postLogout = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw Error("Interner Server Error");
    }

    return await response.json();
  } catch (error) {

  }
};

export const getQueue = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/queue`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const postMedicine = async (medicine) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/medicine`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(medicine),
  });

  return await response.json();
};

export const postPrescription = async (form) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/prescription`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(form),
  });

  return await response.json();
};

export const getPrescriptions = async (params) => {
  const [key, { page }] = params.queryKey;

  const LIMIT = 5;
  const OFFSET = (page - 1) * LIMIT;

  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/prescriptions?offset=${OFFSET}&limit=${LIMIT}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
};
