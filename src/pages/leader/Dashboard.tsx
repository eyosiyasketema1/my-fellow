/* Brief
   Reader: Fellowship Leader on their dashboard.
   Question: What needs my attention right now? How is attendance?
   Action: Approve/reject pending requests, view overall stats.
   Register: Analytical (figures first, then a chart, then list of things to act on)
*/
import { useState } from "react";
import Panel from "../../formic/components/Panel";
import Button from "../../formic/components/Button";
import { Avatar } from "../../formic/components/primitives";
import Modal from "../../formic/components/Modal";
import DatePicker from "../../formic/components/DatePicker";
import Input, { Field, Textarea } from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import { CardGroup } from "../../formic/components/cards";
import { StatCard } from "../../formic/components/StatCard";
import { LineChart, BarList } from "../../formic/components/charts";

export default function LeaderDashboard() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Agape Fellowship</h1>
          <p className="text-body text-ink-2 mt-1">Leader Dashboard</p>
        </div>
        <Button variant="accent" icon="plus" onClick={() => setIsCreateOpen(true)}>
          Create Event
        </Button>
      </div>

      <CardGroup columns={4}>
        <StatCard label="Total Members" value={142} icon="users" delta="+12" caption="this month" />
        <StatCard label="Pending Requests" value={4} icon="mail" iconTone="accent" />
        <StatCard label="Avg Attendance" value={85} icon="circle-check" delta="+5" caption="this month" />
        <StatCard label="Events This Month" value={8} icon="calendar" />
      </CardGroup>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel title="Attendance Trends" caption="Weekly gatherings over the last 6 weeks" className="lg:col-span-3">
          <div className="h-72">
            <LineChart 
              fill 
              labels={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]}
              series={[
                { name: "Friday Worship", values: [75, 80, 82, 90, 85, 95] },
                { name: "Bible Study", values: [45, 48, 50, 47, 52, 55] }
              ]} 
            />
          </div>
        </Panel>
        
        <Panel title="Team Sizes" caption="Active members by team" className="lg:col-span-2">
          <div className="h-72">
            <BarList 
              fill 
              items={[
                { label: "Worship Team", value: 24 },
                { label: "Welcome Team", value: 18 },
                { label: "Media & Tech", value: 12 },
                { label: "Prayer Team", value: 10 },
                { label: "Evangelism", value: 8 },
              ]} 
            />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Panel title="Pending Requests">
          <div className="flex flex-col divide-y divide-line p-4 pt-0">
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar kind="photo" name="Sara" size="md" />
                <div>
                  <p className="text-body-strong text-ink">Sara Tadesse</p>
                  <p className="text-small text-ink-2">4 Kilo • 3rd Year CS</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Reject</Button>
                <Button variant="accent" size="sm">Approve</Button>
              </div>
            </div>
            
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar kind="photo" name="Daniel" size="md" />
                <div>
                  <p className="text-body-strong text-ink">Daniel Getachew</p>
                  <p className="text-small text-ink-2">4 Kilo • 2nd Year Biology</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Reject</Button>
                <Button variant="accent" size="sm">Approve</Button>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Recent Activity">
           <div className="p-4 pt-0 flex flex-col divide-y divide-line">
             <div className="py-4">
               <span className="block text-body text-ink">Event <span className="font-semibold">Friday Worship</span> created.</span>
               <span className="block text-small text-ink-3 mt-1">2 hours ago by Caleb</span>
             </div>
             <div className="py-4">
               <span className="block text-body text-ink">Approved <span className="font-semibold">Yosef's</span> join request.</span>
               <span className="block text-small text-ink-3 mt-1">Yesterday by You</span>
             </div>
             <div className="py-4">
               <span className="block text-body text-ink">Event <span className="font-semibold">Campus Outreach</span> updated.</span>
               <span className="block text-small text-ink-3 mt-1">Oct 5 by Caleb</span>
             </div>
           </div>
        </Panel>
      </div>

      <Modal 
        open={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)}
        title="Create new event"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={() => setIsCreateOpen(false)}>Create Event</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5 pt-1">
           <p className="text-body text-ink-2 -mt-3">Schedule a fellowship gathering, worship night, or outreach.</p>
           
           <Field label="Event Name" required>
             <Input type="text" placeholder="e.g. Friday Worship Night" />
           </Field>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             <Field label="Date" required>
               <DatePicker />
             </Field>
             <Field label="Time" required>
               <Input type="time" />
             </Field>
           </div>
           
           <Field label="Location" required>
             <Input type="text" placeholder="e.g. Main Hall, 4 Kilo" leadingIcon="map-pin" />
           </Field>

           <Field label="Event Type">
             <Select 
               value="worship"
               options={[
                 { label: "Worship & Praise", value: "worship", swatch: "var(--color-accent)" },
                 { label: "Bible Study", value: "study", swatch: "var(--color-green)" },
                 { label: "Outreach & Evangelism", value: "outreach", swatch: "var(--color-orange)" },
                 { label: "Social & Fellowship", value: "social", swatch: "var(--color-blue)" },
               ]}
             />
           </Field>

           <Field label="Description" hint="Optional details about what to expect or bring.">
             <Textarea placeholder="Join us for an evening of..." rows={3} />
           </Field>
        </div>
      </Modal>
    </div>
  );
}
