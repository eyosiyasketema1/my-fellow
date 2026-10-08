/* Brief
   Reader: System Admin
   Question: How is the overall platform doing? What requires administrative intervention?
   Action: Monitor global stats and flagged items.
   Register: Analytical (StatCards + Charts)
*/
import Panel from "../../formic/components/Panel";
import { CardGroup } from "../../formic/components/cards";
import { StatCard } from "../../formic/components/StatCard";
import { LineChart, BarList } from "../../formic/components/charts";

export default function AdminDashboard() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">System Administration</h1>
        <p className="text-body text-ink-2 mt-1">Global platform overview.</p>
      </div>

      <CardGroup columns={4}>
        <StatCard label="Total Users" value={15420} display="15.4k" icon="users" delta="+5%" caption="vs last month" />
        <StatCard label="Active Fellowships" value={145} icon="building" delta="+12" caption="this year" />
        <StatCard label="Universities" value={42} icon="map-pin" />
        <StatCard label="Pending Content" value={8} icon="clipboard" iconTone="accent" />
      </CardGroup>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel title="Platform Growth" caption="User registrations over the last 6 months" className="lg:col-span-3">
          <div className="h-72">
            <LineChart 
              fill 
              labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
              series={[
                { name: "Registrations", values: [450, 600, 800, 1100, 1500, 1900] }
              ]} 
            />
          </div>
        </Panel>
        
        <Panel title="Active Fellowships by Region" caption="Top 5 regional distributions" className="lg:col-span-2">
          <div className="h-72">
            <BarList 
              fill 
              items={[
                { label: "Addis Ababa", value: 45 },
                { label: "Oromia", value: 32 },
                { label: "Amhara", value: 28 },
                { label: "SNNPR", value: 18 },
                { label: "Tigray", value: 10 },
              ]} 
            />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Panel title="System Alerts & Flagged Activity" actions={<span className="text-caption font-medium text-accent hover:underline cursor-pointer">View All</span>}>
          <div className="flex flex-col divide-y divide-line p-5 pt-0">
             <div className="py-3 flex flex-col gap-1">
               <span className="text-body font-medium text-ink">Flagged Fellowship: Unity Univ Main</span>
               <span className="text-caption text-ink-3">Inactivity for 4 months.</span>
             </div>
             <div className="py-3 flex flex-col gap-1">
               <span className="text-body font-medium text-ink">High Traffic Alert</span>
               <span className="text-caption text-ink-3">Server load reached 80% during peak evening hours yesterday.</span>
             </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
