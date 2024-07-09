import { CarsTable } from "@/components/cars-table";
import Navbar from "@/components/navbar";
import CarService from "@/services/car";

export default async function Home() {
    const cars = await CarService.getAll()
    return (
        <div className="pb-10 px-5 min-h-screen overflow-y-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-8">
                <h1 className="text-4xl font-bold text-white">My Cars List</h1>
            </div>

            <div className="flex justify-center w-full mt-5">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl w-full">
                    <CarsTable cars={cars || []} />
                </div>
            </div>
        </div>
    );
}
