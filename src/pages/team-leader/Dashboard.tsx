/* Brief
   Reader: Team Leader (e.g., Evangelism Team Lead)
   Question: What is the state of my team, our upcoming events, and announcements?
   Action: Review stats, jump to events or members.
   Register: Analytical (StatCards + Charts)
*/
import Panel from "../../formic/components/Panel";
import { Badge } from "../../formic/components/primitives";
import { CardGroup } from "../../formic/components/cards";
import { StatCard } from "../../formic/components/StatCard";
import { BarList } from "../../formic/components/charts";

export default function TeamDashboard() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">Evangelism Team</h1>
        <p className="text-body text-ink-2 mt-1">Manage your team members and activities.</p>
      </div>

      <CardGroup columns={3}>
        <StatCard label="Team Members" value={12} icon="users" delta="+2" caption="this semester" />
        <StatCard label="Upcoming Events" value={2} icon="calendar" iconTone="accent" />
        <StatCard label="Tasks Pending" value={4} icon="check" />
      </CardGroup>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Recent Announcements" actions={<a href="/team-leader/announcements" className="text-caption font-medium text-accent hover:underline">View All</a>}>
          <div className="flex flex-col divide-y divide-line p-5 pt-0">
             <div className="py-3 flex flex-col gap-1">
               <span className="text-body font-medium text-ink">Campus Outreach Briefing</span>
               <span className="text-caption text-ink-3">Yesterday</span>
             </div>
             <div className="py-3 flex flex-col gap-1">
               <span className="text-body font-medium text-ink">Sign up for Friday's shift</span>
               <span className="text-caption text-ink-3">Oct 2, 2026</span>
             </div>
          </div>
        </Panel>

        <Panel title="Upcoming Team Events" actions={<a href="/team-leader/events" className="text-caption font-medium text-accent hover:underline">View All</a>}>
          <div className="flex flex-col divide-y divide-line p-5 pt-0">
             <div className="py-3 flex justify-between items-center">
               <div className="flex flex-col gap-1">
                 <span className="text-body font-medium text-ink">Main Gate Outreach</span>
                 <span className="text-caption text-ink-3">Oct 14 • 3:00 PM</span>
               </div>
               <Badge tone="green">Upcoming</Badge>
             </div>
             <div className="py-3 flex justify-between items-center">
               <div className="flex flex-col gap-1">
                 <span className="text-body font-medium text-ink">Dorm Evangelism</span>
                 <span className="text-caption text-ink-3">Oct 18 • 6:00 PM</span>
               </div>
               <Badge tone="green">Upcoming</Badge>
             </div>
          </div>
        </Panel>
        
        <Panel title="Member Engagement" caption="Tasks completed this month" className="lg:col-span-2">
          <div className="h-64">
            <BarList 
              fill 
              items={[
                { label: "Hana Alemu", value: 8 },
                { label: "Caleb Tadesse", value: 6 },
                { label: "Sara Tadesse", value: 5 },
                { label: "Daniel Getachew", value: 3 },
              ]} 
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
