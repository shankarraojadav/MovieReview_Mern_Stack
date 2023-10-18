import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyOtp = async (userData) => {
  try {
    const { data } = await client.post("/verifyemail", userData);
    return data;
  } catch (error) {
    // console.log(error.response?.data)
    const { response } = error;
    if (!response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInUser = async (userData) => {
  try {
    const { data } = await client.post("/login", userData);
    return data;
  } catch (error) {
    // console.log(error.response?.data);
    const { response } = error;
    if (!response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signinAuth = async (token) => {
  try {
    const { data } = await client.get("/isAuthVerify", {
      headers: {
        Authorization: "Bearer" + token,
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/forget-pass", email);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyResetPassToken = async (token, userId) => {
  try {
    const { data } = await client.post("/verify-pass-reset-token", {
      token,
      userId,
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resetPassword = async (userInfo) => {
  try {
    const { data } = await client.post("/reset-password", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resendEmailVerifiactionToken = async (userId) => {
  try {
    const { data } = await client.post("/resendemailtoken", { userId });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
