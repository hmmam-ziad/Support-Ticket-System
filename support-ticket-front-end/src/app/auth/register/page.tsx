import { RegisterForm } from "@/components/signupForm";

interface Iprops {}

const Page = ({}: Iprops) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;