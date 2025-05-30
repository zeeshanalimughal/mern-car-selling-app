import { auth } from "@/config/authConfig";
import { redirect } from "next/navigation";

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (session) return redirect("/")
    return (
        <div>{children}</div>
    );
}
