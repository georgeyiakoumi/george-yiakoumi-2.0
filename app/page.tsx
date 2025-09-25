export default function Home() {
  return (
    <div className="w-full">
      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">Section 1</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Welcome - Scroll to see the fade effect</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Section 2</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Notice how the content fades at the edges</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Section 3</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">The mask creates a smooth transition</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Section 4</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Content appears and disappears smoothly</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Section 5</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Last section - The fade effect works throughout</p>
        </div>
      </section>
    </div>
  );
}