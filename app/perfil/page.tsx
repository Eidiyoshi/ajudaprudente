import { redirect } from "next/navigation";
import ProfileForm from "../components/profile-form";
import { getUserSession } from "../lib/session.server";

export default async function PerfilPage() {
    const session = await getUserSession();
    if (!session) redirect("/login");

    return (
        <main className="flex flex-col flex-1">
            <ProfileForm />
        </main>
    );
}
