/* Brief
   Reader: Ministry Staff (Content Creators)
   Question: How is our spiritual growth content performing? What needs publishing?
   Action: View analytics, create new content.
   Register: Analytical (StatCards + Charts)
*/
import Panel from "../../formic/components/Panel";
import { CardGroup } from "../../formic/components/cards";
import { StatCard } from "../../formic/components/StatCard";
import { LineChart, BarList } from "../../formic/components/charts";
import Button from "../../formic/components/Button";
import { useNavigate } from "react-router-dom";

export default function MinistryDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Ministry Dashboard</h1>
          <p className="text-body text-ink-2 mt-1">Manage and track your spiritual growth content.</p>
        </div>
        <Button variant="accent" icon="plus" onClick={() => navigate("/ministry/content/create")}>
          Create Content
        </Button>
      </div>

      <CardGroup columns={4}>
        <StatCard label="Published Articles" value={42} icon="file" delta="+3" caption="this month" />
        <StatCard label="Total Views" value={12500} display="12.5k" icon="eye" delta="+15%" caption="vs last month" />
        <StatCard label="Completions" value={8400} display="8.4k" icon="circle-check" delta="+8%" caption="vs last month" />
        <StatCard label="Pending Approval" value={5} icon="clipboard" iconTone="accent" />
      </CardGroup>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel title="Content Engagement" caption="Views and Completions over the last 6 months" className="lg:col-span-3">
          <div className="h-72">
            <LineChart 
              fill 
              labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
              series={[
                { name: "Views", values: [1200, 1500, 1800, 2100, 2400, 2800] },
                { name: "Completions", values: [800, 950, 1100, 1400, 1600, 1900] }
              ]} 
            />
          </div>
        </Panel>
        
        <Panel title="Top Categories" caption="By total completions" className="lg:col-span-2">
          <div className="h-72">
            <BarList 
              fill 
              items={[
                { label: "Bible Study", value: 3450 },
                { label: "Prayer", value: 2100 },
                { label: "Discipleship", value: 1850 },
                { label: "Evangelism", value: 1200 },
                { label: "Leadership", value: 950 },
              ]} 
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
