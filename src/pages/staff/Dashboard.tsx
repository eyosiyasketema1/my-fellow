/* Brief
   Reader: Campus Staff / Regional Coordinator
   Question: What is the health of my assigned campuses, and who needs verification?
   Action: Review pending verification requests and monitor overall activity.
   Register: Analytical (Stat Cards + Pending Requests list)
*/
import Panel from "../../formic/components/Panel";
import { Badge } from "../../formic/components/primitives";
import Button from "../../formic/components/Button";
import { CardGroup } from "../../formic/components/cards";
import { StatCard } from "../../formic/components/StatCard";
import { LineChart, DonutChart } from "../../formic/components/charts";

export default function StaffDashboard() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">Staff Dashboard</h1>
        <p className="text-body text-ink-2 mt-1">Overview of your assigned campuses and fellowships.</p>
      </div>

      <CardGroup columns={4}>
        <StatCard label="Assigned Campuses" value={3} icon="building" />
        <StatCard label="Active Fellowships" value={12} icon="users" delta="+1" caption="this quarter" />
        <StatCard label="Pending Verification" value={2} icon="clipboard" iconTone="accent" />
        <StatCard label="Total Students" value={1450} display="1,450" icon="users" delta="+125" caption="this year" />
      </CardGroup>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel title="Student Growth" caption="Active members over the last 6 months across all campuses" className="lg:col-span-3">
          <div className="h-72">
            <LineChart 
              fill 
              labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
              series={[
                { name: "Total Students", values: [1100, 1150, 1180, 1250, 1380, 1450] }
              ]} 
            />
          </div>
        </Panel>
        
        <Panel title="Fellowships by Campus" caption="Distribution of active fellowships" className="lg:col-span-2">
          <div className="h-72 flex items-center justify-center">
            <DonutChart 
              segments={[
                { name: "AAU Main", value: 6, color: 1 },
                { name: "AAU Tech", value: 4, color: 2 },
                { name: "Unity Univ", value: 2, color: 3 },
              ]} 
            />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Pending Verifications" caption="Action required" actions={<a href="/staff/verification" className="text-caption font-medium text-accent hover:underline">View All</a>}>
          <div className="flex flex-col divide-y divide-line p-5 pt-0">
             <div className="py-4 flex justify-between items-center">
               <div className="flex flex-col gap-1">
                 <span className="text-body font-medium text-ink">AAU Technology Campus Fellowship</span>
                 <span className="text-caption text-ink-3">Submitted 2 days ago • Lead by Abebe B.</span>
               </div>
               <Button variant="secondary" size="sm">Review</Button>
             </div>
             <div className="py-4 flex justify-between items-center">
               <div className="flex flex-col gap-1">
                 <span className="text-body font-medium text-ink">Medical Students Prayer Group</span>
                 <span className="text-caption text-ink-3">Submitted 5 days ago • Lead by Sara T.</span>
               </div>
               <Button variant="secondary" size="sm">Review</Button>
             </div>
          </div>
        </Panel>

        <Panel title="Recent Activity" actions={<a href="/staff/activity" className="text-caption font-medium text-accent hover:underline">View All</a>}>
          <div className="flex flex-col divide-y divide-line p-5 pt-0">
             <div className="py-4 flex flex-col gap-1">
               <span className="text-body font-medium text-ink">AAU Main Campus hosted "Welcome Night"</span>
               <span className="text-caption text-ink-3">145 students attended • Yesterday</span>
             </div>
             <div className="py-4 flex flex-col gap-1">
               <span className="text-body font-medium text-ink">New leader assigned to Unity Campus</span>
               <span className="text-caption text-ink-3">Daniel G. is now Team Lead • Oct 1, 2026</span>
             </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
