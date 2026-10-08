/* Brief
   Reader: Newly registered student logging in for the first time.
   Question: What do I need to provide to start finding my fellowship?
   Action: Upload a photo, set academic details, and select a university/campus.
   Register: Text
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../formic/components/AppShell";
import Button from "../../formic/components/Button";
import Input from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import Panel from "../../formic/components/Panel";
import { Avatar } from "../../formic/components/primitives";

export default function Onboarding() {
  const navigate = useNavigate();
  const [university, setUniversity] = useState("");

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finishing onboarding and go to student shell
    navigate("/student/discover");
  };

  return (
    <AppShell rail="none" padding={false}>
      <div className="flex min-h-dvh items-start justify-center bg-canvas-subtle p-6 pt-12 sm:pt-24">
        <div className="w-full max-w-xl">
        <div className="mb-6">
          <h1 className="text-h2 text-ink">Complete your profile</h1>
          <p className="text-body text-ink-2 mt-2">Just a few more details to help you connect.</p>
        </div>

        <Panel>
          <form className="flex flex-col p-6 gap-6" onSubmit={handleComplete}>
            
            {/* Section 1: Identity */}
            <div className="flex flex-col gap-4">
              <h2 className="text-h4 text-ink mb-2">Identity</h2>
              <div className="flex items-center gap-4">
                <Avatar size="lg" kind="doodle" name="abebe" />
                <Button variant="secondary" icon="upload">Upload photo</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-small font-medium text-ink">Department / Field of Study</label>
                  <Input placeholder="e.g. Computer Science" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-small font-medium text-ink">Graduation Year</label>
                  <Select 
                    value=""
                    options={[
                      { label: "Select year", value: "" },
                      { label: "2024", value: "2024" },
                      { label: "2025", value: "2025" },
                      { label: "2026", value: "2026" },
                      { label: "2027", value: "2027" }
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-line my-2" />

            {/* Section 2: Campus Location */}
            <div className="flex flex-col gap-4">
              <h2 className="text-h4 text-ink mb-2">Academic Location</h2>
              <p className="text-body text-ink-2 -mt-4 mb-2">This determines which fellowships you see.</p>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-small font-medium text-ink">University</label>
                <Select 
                  value={university}
                  onChange={setUniversity}
                  options={[
                    { label: "Select university", value: "" },
                    { label: "Addis Ababa University", value: "aau" },
                    { label: "Hawassa University", value: "hu" },
                    { label: "Jimma University", value: "ju" }
                  ]}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-small font-medium text-ink">Campus</label>
                <Select 
                  value=""
                  disabled={!university}
                  options={[
                    { label: "Select campus", value: "" },
                    ...(university === "aau" ? [
                      { label: "4 Kilo (Science)", value: "4kilo" },
                      { label: "5 Kilo (Technology)", value: "5kilo" },
                      { label: "6 Kilo (Main)", value: "6kilo" }
                    ] : []),
                    ...(university === "hu" ? [{ label: "Main Campus", value: "main" }] : []),
                    ...(university === "ju" ? [{ label: "JiT Campus", value: "jit" }] : [])
                  ]}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="accent" type="submit" iconEnd="arrow-right">
                Save and continue
              </Button>
            </div>
          </form>
        </Panel>
        </div>
      </div>
    </AppShell>
  );
}
