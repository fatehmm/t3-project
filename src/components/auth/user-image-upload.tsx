"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";

export default function UserImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [crop, setCrop] = useState<Crop>();
  const [isLoading, setIsLoading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const updateUserImage = api.user.updateUserImage.useMutation({
    onSuccess: (data) => {
      if (data?.type === "error") {
        toast.error(data.message);
      } else {
        router.push("/");
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIsCropping(true);
        // Set initial crop area (you can adjust these values)
        setCrop({
          unit: "%",
          width: 90,
          height: 90,
          x: 5,
          y: 5,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImage = (sourceImage: HTMLImageElement, cropConfig: Crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    canvas.width = cropConfig.width!;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    canvas.height = cropConfig.height!;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      sourceImage,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      cropConfig.x * scaleX,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      cropConfig.y * scaleY,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      cropConfig.width * scaleX,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      cropConfig.height * scaleY,
      0,
      0,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      cropConfig.width,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      cropConfig.height,
    );

    return canvas.toDataURL("image/jpeg");
  };

  const handleCropComplete = () => {
    if (!imageRef.current || !crop) return;

    const croppedImageUrl = getCroppedImage(imageRef.current, crop);
    setSelectedImage(croppedImageUrl);
    setIsCropping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage || !session) return;

    setIsLoading(true);
    try {
      await updateUserImage.mutateAsync({
        imageBase64: selectedImage,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <div className="p-4">Please login to upload an image</div>;
  }

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Upload Profile Image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
            />
          </label>
        </div>

        {selectedImage && isCropping ? (
          <div className="mt-4">
            <p className="mb-2 text-sm">Crop your image:</p>
            <ReactCrop
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={1}
              circularCrop
            >
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Crop me"
                className="max-h-[400px] w-auto"
              />
            </ReactCrop>
            <button
              type="button"
              onClick={handleCropComplete}
              className="mt-4 w-full rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
            >
              Confirm Crop
            </button>
          </div>
        ) : (
          selectedImage && (
            <div className="mt-4">
              <p className="mb-2 text-sm">Preview:</p>
              <img
                src={selectedImage}
                alt="Preview"
                className="h-auto max-w-full rounded-lg"
              />
            </div>
          )
        )}

        <button
          type="submit"
          disabled={!selectedImage || isLoading || isCropping}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}
