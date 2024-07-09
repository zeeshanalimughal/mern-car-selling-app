import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CarListing } from "@/types";
import Image from "next/image";

export function CarsTable({ cars }: { cars: CarListing[] }) {
    return (
        <Table className="w-full">
            <TableCaption>Your car listings.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Car Model</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Pictures</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cars?.map((car) => (
                    <TableRow key={car._id}>
                        <TableCell className="font-medium">{car.carModel}</TableCell>
                        <TableCell>{car.price}</TableCell>
                        <TableCell>{car.phone}</TableCell>
                        <TableCell>{car.city}</TableCell>
                        <TableCell>{car.copies}</TableCell>
                        <TableCell>
                            <div className="flex gap-2 flex-wrap">
                                {car.pictures.map((pic, index) => (
                                    <Image width={40} height={40} key={index} src={process.env.NEXT_PUBLIC_UPLOADS_URL + "/" + pic} alt="Car" className="w-20 h-20 rounded-md shadow-lg" />
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={6}>Total Listings: {cars.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
