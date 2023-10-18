import client from "./client";

export const uploadTrailer = async (formData, setUploadProgress) => {
  console.log("form", formData);
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: ({loaded, total}) => {
         console.log("Loaded:", loaded, "Total:", total);
        if(setUploadProgress) {
          setUploadProgress(Math.floor(loaded / total) * 100);
        }
      }
    });

    return data;
  } catch (error) {
    const { response } = error;
    console.log(response);
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
