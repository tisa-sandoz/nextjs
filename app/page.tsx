import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800 py-4 px-6 sm:px-12 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="text-2xl font-bold gradient-text">Sandoz</div>
        <div className="hidden sm:flex gap-8 font-medium">
          <Link href="#" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-primary transition-colors">About</Link>
        </div>
        <div>
          <Link href="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 sm:px-12 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
            Build something <span className="gradient-text">amazing</span> today.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            A simple, professional, and high-performance base for your next big idea. 
            Styled with Tailwind CSS and designed for clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link href="#" className="px-8 py-3 rounded-lg border border-gray-200 dark:border-gray-800 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 bg-gray-50 dark:bg-gray-950 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-background border border-gray-100 dark:border-gray-900 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary font-bold text-xl">1</div>
              <h3 className="text-xl font-bold mb-3">Fast Setup</h3>
              <p className="text-gray-600 dark:text-gray-400">Get up and running in minutes with our streamlined boilerplate.</p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-gray-100 dark:border-gray-900 shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary font-bold text-xl">2</div>
              <h3 className="text-xl font-bold mb-3">Clean Code</h3>
              <p className="text-gray-600 dark:text-gray-400">Written with best practices and maintainability in mind.</p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-gray-100 dark:border-gray-900 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary font-bold text-xl">3</div>
              <h3 className="text-xl font-bold mb-3">Responsive</h3>
              <p className="text-gray-600 dark:text-gray-400">Looks great on every device, from mobile to ultra-wide screens.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-12 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Sandoz Inc. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
