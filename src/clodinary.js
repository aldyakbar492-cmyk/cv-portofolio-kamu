const CLOUDINARY_CLOUD_NAME = "tde30el4";
const CLOUDINARY_UPLOAD_PRESET = "imvash-submission";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload file gagal");
  }

  const data = await response.json();

  return data;
};