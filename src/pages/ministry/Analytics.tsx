/* Brief
   Reader: Ministry Staff
   Question: How is content performing over time and by user demographic?
   Action: Review deep analytics to inform future content strategy.
   Register: Analytical (Charts)
*/
import Panel from "../../formic/components/Panel";
import { LineChart, BarList, DonutChart } from "../../formic/components/charts";

export default function MinistryAnalytics() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">Analytics & Reporting</h1>
        <p className="text-body text-ink-2 mt-1">Deep dive into content engagement metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Total Content Views" caption="Last 30 days">
          <div className="h-72">
            <LineChart 
              fill 
              labels={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]}
              series={[
                { name: "Views", values: [800, 1100, 1050, 1300, 1450] }
              ]} 
            />
          </div>
        </Panel>

        <Panel title="Completion Rate" caption="Percentage of students who finish the material">
          <div className="h-72">
            <LineChart 
              fill 
              labels={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]}
              series={[
                { name: "Completion %", values: [65, 68, 72, 75, 78] }
              ]} 
            />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Top Engaging Universities" className="lg:col-span-2">
          <div className="h-64">
            <BarList 
              fill 
              items={[
                { label: "Addis Ababa University", value: 4500 },
                { label: "Jimma University", value: 3100 },
                { label: "Hawassa University", value: 2800 },
                { label: "Unity University", value: 1200 },
              ]} 
            />
          </div>
        </Panel>
        
        <Panel title="Engagement by Device">
          <div className="h-64 flex items-center justify-center">
            <DonutChart 
              segments={[
                { name: "Mobile", value: 82, color: 1 },
                { name: "Desktop", value: 15, color: 2 },
                { name: "Tablet", value: 3, color: 3 },
              ]} 
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
