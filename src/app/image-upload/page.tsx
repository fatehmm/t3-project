"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const updateUserImage = api.user.updateUserImage.useMutation({
    onSuccess: (data) => {
      if (data?.type === "error") {
        toast.error(data.message);
      } else {
        router.push("/"); // or wherever you want to redirect after success
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <div className="p-4">Please login to upload an image</div>;
  }

  return (
    <div className="mx-auto max-w-md p-6">
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

        {selectedImage && (
          <div className="mt-4">
            <p className="mb-2 text-sm">Preview:</p>
            <img
              src={selectedImage}
              alt="Preview"
              className="h-auto max-w-full rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedImage || isLoading}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}
