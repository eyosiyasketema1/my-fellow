/* Brief
   Reader: Returning user (any role)
   Question: How do I get into my account?
   Action: Enter credentials and log in.
   Register: Text
*/
import { Link } from "react-router-dom";
import AppShell from "../../formic/components/AppShell";
import Button from "../../formic/components/Button";
import Input from "../../formic/components/Input";
import { Card, Checkbox } from "../../formic/components/primitives";

export default function Login() {
  return (
    <AppShell rail="none" padding={false}>
      <div className="flex min-h-dvh items-center justify-center bg-canvas-subtle p-6">
      <Card className="w-full max-w-sm p-8">
        <div className="mb-6 text-center">
          <h1 className="text-h3 text-ink">Welcome back</h1>
          <p className="text-body text-ink-2 mt-1">Sign in to your MyFellow account</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-ink">Email address</label>
            <Input type="email" placeholder="student@university.edu" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-ink">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          
          <div className="flex items-center justify-between">
            <Checkbox checked={false} onChange={() => {}} label={<span className="text-body text-ink">Remember me</span>} />
            <Link to="/forgot-password" className="text-body text-accent hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button variant="accent" className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-body text-ink-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Register
          </Link>
        </p>
      </Card>
      </div>
    </AppShell>
  );
}
