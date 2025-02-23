"use client";

import { Fragment, useEffect, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Upload } from "lucide-react";
import { Book } from "@/types";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

interface Props {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (book: Book) => void;
}

export default function EditBookModal({ book, isOpen, onClose, onEdit }: Props) {
  const [bookData, setBookData] = useState<Book | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Book, string>>>({});

  useEffect(() => {
    if (book) {
      setBookData(book);
      setErrors({});
    }
  }, [book]);

  const validateForm = () => {
    if (!bookData) return false;
    const newErrors: Partial<Record<keyof Book, string>> = {};

    if (!bookData.title.trim()) newErrors.title = "Title is required";
    if (!bookData.author.trim()) newErrors.author = "Author is required";
    if (!bookData.genre.trim()) newErrors.genre = "Genre is required";
    if (!bookData.description.trim()) newErrors.description = "Description is required";
    if (!bookData.publishedYear) newErrors.publishedYear = "Published year is required";
    if (!bookData.coverUrl) newErrors.coverUrl = "Book cover is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setBookData(prev => prev ? {
        ...prev,
        coverUrl: reader.result as string
      } : null);
      setErrors(prev => ({ ...prev, coverUrl: "" }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !bookData) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onEdit(bookData);
      toast.success("Book updated successfully!");
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update book. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  if (!bookData) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                    Edit Book
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Book Cover <span className="text-red-500">*</span>
                    </label>
                    <div 
                      className={`relative h-48 rounded-lg border-2 border-dashed 
                        ${errors.coverUrl ? 'border-red-500' : dragging ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'} 
                        hover:border-primary transition-colors`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        id="cover-upload-edit"
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="cover-upload-edit"
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                      >
                        {bookData.coverUrl ? (
                          <div className="relative w-full h-full">
                            <img
                              src={bookData.coverUrl}
                              alt="Book cover preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                              <p className="text-white text-sm">Click or drag to change</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              Drop an image here or click to upload
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                    {errors.coverUrl && (
                      <p className="mt-1 text-sm text-red-500">{errors.coverUrl}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bookData.title}
                      onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white`}
                      disabled={isSubmitting}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Author <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bookData.author}
                      onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.author ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white`}
                      disabled={isSubmitting}
                    />
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-500">{errors.author}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ISBN
                      </label>
                      <input
                        type="text"
                        value={bookData.isbn}
                        onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Published Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={bookData.publishedYear}
                        onChange={(e) => setBookData({ ...bookData, publishedYear: parseInt(e.target.value) })}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          errors.publishedYear ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white`}
                        disabled={isSubmitting}
                      />
                      {errors.publishedYear && (
                        <p className="mt-1 text-sm text-red-500">{errors.publishedYear}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Genre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bookData.genre}
                      onChange={(e) => setBookData({ ...bookData, genre: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.genre ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white`}
                      disabled={isSubmitting}
                    />
                    {errors.genre && (
                      <p className="mt-1 text-sm text-red-500">{errors.genre}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={bookData.description}
                      onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white resize-none`}
                      disabled={isSubmitting}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 min-w-[100px]"
                    >
                      {isSubmitting ? (
                        <Loader size="sm" text="Updating..." />
                      ) : (
                        <span>Update Book</span>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}