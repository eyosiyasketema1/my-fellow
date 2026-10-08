/* Brief
   Reader: Fellowship Leader configuring their space.
   Question: How do I manage my fellowship's details and preferences?
   Action: Update profile, tweak notifications, or archive.
   Register: Text (Fields, Switches, single column form)
*/
import { useState } from "react";
import Panel from "../../formic/components/Panel";
import Button from "../../formic/components/Button";
import Input, { Field, Textarea } from "../../formic/components/Input";
import { Switch, Avatar } from "../../formic/components/primitives";

export default function Settings() {
  const [notifyRequests, setNotifyRequests] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(false);

  return (
    <div className="p-6 sm:p-8 max-w-3xl space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">Settings</h1>
        <p className="text-body text-ink-2 mt-1">Manage your fellowship's profile and preferences.</p>
      </div>

      <Panel title="Fellowship Profile" caption="Public information visible to students.">
        <div className="flex flex-col gap-6 pt-1">
          <div className="flex items-center gap-4">
            <Avatar kind="photo" name="Agape" size="lg" />
            <Button variant="outline" size="sm">Change photo</Button>
          </div>
          
          <div className="flex flex-col gap-5">
            <Field label="Fellowship Name">
              <Input defaultValue="Agape Fellowship" />
            </Field>
            <Field label="Campus / Location">
              <Input defaultValue="4 Kilo Campus" />
            </Field>
            <Field label="Description">
              <Textarea defaultValue="A community of believers at 4 Kilo." rows={4} />
            </Field>
          </div>
          
          <div className="flex justify-end border-t border-line pt-4 mt-2">
            <Button variant="accent">Save Changes</Button>
          </div>
        </div>
      </Panel>

      <Panel title="Notifications" caption="How you prefer to be updated.">
        <div className="flex flex-col gap-5 pt-1">
          <div className="flex items-center justify-between">
            <div className="pr-4">
              <p className="text-body-strong text-ink">New Member Requests</p>
              <p className="text-small text-ink-3 mt-0.5">Get notified when a student asks to join.</p>
            </div>
            <Switch on={notifyRequests} onToggle={() => setNotifyRequests(!notifyRequests)} />
          </div>
          <div className="flex items-center justify-between">
            <div className="pr-4">
              <p className="text-body-strong text-ink">Event Reminders</p>
              <p className="text-small text-ink-3 mt-0.5">Receive an alert 24 hours before an event.</p>
            </div>
            <Switch on={notifyEvents} onToggle={() => setNotifyEvents(!notifyEvents)} />
          </div>
        </div>
      </Panel>

      <Panel title="Danger Zone">
        <div className="flex items-center justify-between pt-1">
           <div className="pr-4">
             <p className="text-body-strong text-ink">Archive Fellowship</p>
             <p className="text-small text-ink-3 mt-0.5">Hide this fellowship from the discover page. This cannot be undone easily.</p>
           </div>
           <Button variant="outline" className="text-red hover:bg-red-tint hover:text-red">Archive</Button>
        </div>
      </Panel>
    </div>
  );
}
