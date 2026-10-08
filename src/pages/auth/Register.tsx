/* Brief
   Reader: New user joining the platform.
   Question: How do I create an account?
   Action: Provide essential details and select primary role.
   Register: Text
*/
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../../formic/components/AppShell";
import Button from "../../formic/components/Button";
import Input from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import { Card } from "../../formic/components/primitives";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success and go to onboarding
    navigate("/student");
  };

  return (
    <AppShell rail="none" padding={false}>
      <div className="flex min-h-dvh items-center justify-center bg-canvas-subtle p-6">
      <Card className="w-full max-w-sm p-8">
        <div className="mb-6 text-center">
          <h1 className="text-h3 text-ink">Create an account</h1>
          <p className="text-body text-ink-2 mt-1">Join MyFellow.et today</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-ink">Full Name</label>
            <Input type="text" placeholder="Abebe Bikila" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-ink">Email address</label>
            <Input type="email" placeholder="abebe@university.edu" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-ink">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-ink">I am joining as...</label>
            <Select 
              value="student" 
              options={[
                { label: "Student", value: "student" },
                { label: "Fellowship Leader", value: "leader" },
                { label: "Ministry / Content Creator", value: "ministry" }
              ]} 
            />
          </div>

          <Button variant="accent" className="w-full mt-2" type="submit">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-body text-ink-2">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
      </div>
    </AppShell>
  );
}
