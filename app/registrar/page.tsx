import { redirect } from "next/navigation";
import { getUserSession } from "../lib/session.server";
import SignUpForm from "../components/signup-form";

export default async function SignUpPage() {
    const session = await getUserSession();
    if (session) redirect("/");

    return (
        <main className="flex flex-col flex-1">
            <SignUpForm />
        </main>
    );
}
