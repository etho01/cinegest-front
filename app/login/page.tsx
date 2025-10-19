import { LoginForm } from "@/src/component/auth/login-form";

export default function page()
{
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 relative">
            <div className="flex flex-col sm:justify-center items-center relative z-2 bg-gray-100 lg:px-10 lg:py-16">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}