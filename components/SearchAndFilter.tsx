import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  genre: string;
  setGenre: (genre: string) => void;
  genres: string[];
}

export default function SearchAndFilter({ search, setSearch, genre, setGenre, genres }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
      </div>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
}