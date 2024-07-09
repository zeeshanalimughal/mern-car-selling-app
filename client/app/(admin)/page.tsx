import AddCarForm from "@/components/add-car-form";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="pb-10 px-5 min-h-screen overflow-y-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-4xl font-bold text-white">Welcome to Car Sale App</h1>
        <p className="text-white">Buy and sell cars online.</p>
      </div>

      <div className="flex justify-center w-full mt-5">

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Car</h2>
          <AddCarForm />
        </div>
      </div>
    </div>
  );
}
