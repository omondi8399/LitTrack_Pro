# LitTrack Pro - Book Management System

A modern book inventory management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📚 CRUD operations for book management
- 🖼️ Image upload with drag & drop support
- 🌓 Dark/Light mode
- 🔍 Search and filter functionality
- 📱 Responsive design
- 💾 Local storage persistence
- ✨ Modern UI with animations
- ✅ Form validation
- 🔔 Toast notifications

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Headless UI
- Framer Motion
- React Hot Toast
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/littrack-pro.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

No environment variables required as the app uses local storage for data persistence.

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main page component
│   └── layout.tsx         # Root layout
├── components/
│   ├── AddBookModal.tsx   # New book form
│   ├── EditBookModal.tsx  # Edit book form
│   ├── BookList.tsx       # Book grid display
│   ├── BookCard.tsx       # Individual book card
│   ├── SearchAndFilter.tsx # Search functionality
│   └── ui/
│       └── Loader.tsx     # Loading spinner
├── hooks/
│   └── useBooks.ts        # Books state management
└── types/
    └── index.ts           # TypeScript definitions
```

## Core Features

### Book Management

- Create new books with cover images
- Edit existing book details
- Delete books
- View book details in a card layout

### Image Handling

- Drag and drop image upload
- File picker support
- Image preview
- 5MB size limit
- Base64 storage

### Validation

- Required fields validation
- Year validation
- Image size validation
- Form submission blocking when invalid

### Search & Filter

- Real-time search across title/author/description
- Genre-based filtering
- Combined search and filter functionality

## Component Usage

### AddBookModal

```typescript
<AddBookModal
  isOpen={boolean}
  onClose={() => void}
  onAdd={(book: Book) => void}
/>
```

### EditBookModal

```typescript
<EditBookModal
  book={Book}
  isOpen={boolean}
  onClose={() => void}
  onEdit={(book: Book) => void}
/>
```

### BookList

```typescript
<BookList
  books={Book[]}
  setBooks={(books: Book[]) => void}
  onDelete={(id: string) => void}
/>
```

### SearchAndFilter

```typescript
<SearchAndFilter
  search={string}
  setSearch={(search: string) => void}
  genre={string}
  setGenre={(genre: string) => void}
  genres={string[]}
/>
```

## Data Structure

```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  description: string;
  coverUrl: string;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License

## Acknowledgments

- UI inspiration from modern web applications
- Icons from Lucide Icons
- Animation library from Framer Motion