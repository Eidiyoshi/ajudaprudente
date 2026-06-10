import { redirect } from "next/navigation";
import LoginForm from "../components/login-form";
import { getUserSession } from "../lib/session.server";

export default async function LoginPage() {
    const session = await getUserSession();
    if (session) redirect("/");

    return (
        <main className="flex flex-col flex-1">
            <LoginForm />
        </main>
    );
}
