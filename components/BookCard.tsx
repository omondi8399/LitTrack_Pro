import { Book } from "@/types";
import { Pencil, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BookCard({ book, onEdit, onDelete }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={book.coverUrl || '/placeholder-book.jpg'}
            alt={book.title}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                by {book.author}
              </p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              {book.publishedYear}
            </span>
          </div>

          <div className="mb-4">
            <span className="inline-block px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              {book.genre}
            </span>
          </div>

          <button 
            onClick={() => setShowDescription(true)}
            className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 text-left hover:text-black dark:hover:text-white w-full"
          >
            {book.description}
          </button>

          <div className="flex justify-end gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Pencil className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        actionLabel="Delete"
      />

      <Transition show={showDescription} as={Fragment}>
        <Dialog onClose={() => setShowDescription(false)} className="relative z-50">
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
                  <div className="flex justify-between items-start mb-4">
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                      {book.title}
                    </Dialog.Title>
                    <button
                      onClick={() => setShowDescription(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {book.description}
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}