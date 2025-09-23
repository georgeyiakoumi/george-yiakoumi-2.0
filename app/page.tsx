export default function Home() {
  return (
    <div className="w-full">
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Section 1</h1>
          <p className="text-xl text-gray-600">Welcome - Scroll to see the fade effect</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Section 2</h2>
          <p className="text-xl text-gray-600">Notice how the content fades at the edges</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Section 3</h2>
          <p className="text-xl text-gray-600">The mask creates a smooth transition</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Section 4</h2>
          <p className="text-xl text-gray-600">Content appears and disappears smoothly</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Section 5</h2>
          <p className="text-xl text-gray-600">Last section - The fade effect works throughout</p>
        </div>
      </section>
    </div>
  );
}