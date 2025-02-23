import { Book } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BookCard({ book, onEdit, onDelete }: Props) {
  return (
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

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
          {book.description}
        </p>

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
            onClick={onDelete}
            className="p-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}