import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"

import { env } from "../../t3-env"

cloudinary.config({
	cloud_name: env.CLOUDINARY_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
	secure: env.NODE_ENV === "production",
})

export async function uploadImage(
	image: string,
	id: string,
	subfolder: string,
): Promise<UploadApiResponse> {
	const res = await cloudinary.uploader.upload(`data:image/webp;base64,${image}`, {
		resource_type: "image",
		public_id: id,
		folder: `${env.CLOUDINARY_FOLDER}/${subfolder}`,
		overwrite: true,
		transformation: [
			{
				width: 100,
				crop: "scale",
			},
			{ radius: "max" },
			{ quality: "auto" },
		],
	})

	return res
}

export async function deleteImage(id: string, subfolder: string) {
	const res = await cloudinary.uploader.destroy(`${env.CLOUDINARY_FOLDER}/${subfolder}/${id}`, {
		resource_type: "image",
	})

	return res
}
