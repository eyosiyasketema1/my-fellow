/* Brief
   Reader: Campus Staff
   Question: What is happening across my campuses recently?
   Action: Monitor events, leaders, and announcements.
   Register: Analytical (DataTable of activities)
*/
import { useState } from "react";
import Input from "../../formic/components/Input";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, type DataColumn } from "../../formic/components/DataTable";

const ACTIVITIES = [
  { id: "1", campus: "AAU Main", title: "Welcome Night hosted", detail: "145 students attended", date: "Yesterday", type: "Event" },
  { id: "2", campus: "Unity University", title: "New Team Lead Assigned", detail: "Daniel G. was assigned to Media Team", date: "Oct 1, 2026", type: "Admin" },
  { id: "3", campus: "AAU Tech", title: "Fellowship Flagged", detail: "Inactivity for 3 months", date: "Sep 28, 2026", type: "System" },
];

export default function StaffActivity() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = ACTIVITIES.filter(a => search === "" || a.title.toLowerCase().includes(search.toLowerCase()));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof ACTIVITIES[0]>[] = [
    {
      key: "campus",
      header: "Campus",
      render: (a) => <span className="text-body font-medium text-ink">{a.campus}</span>
    },
    {
      key: "title",
      header: "Activity",
      render: (a) => (
        <div className="flex flex-col">
          <span className="text-body text-ink-2">{a.title}</span>
          <span className="text-caption text-ink-3">{a.detail}</span>
        </div>
      )
    },
    {
      key: "date",
      header: "Date",
      align: "end",
      render: (a) => <span className="text-body text-ink-2">{a.date}</span>
    }
  ];

  const toolbar = (
    <FilterBar 
      search={
        <Input 
          width="w-64" 
          size="sm" 
          placeholder="Search logs..." 
          leadingIcon="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    >
      <></>
    </FilterBar>
  );

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">Activity Logs</h1>
        <p className="text-body text-ink-2 mt-1">Audit trail and recent events across your assigned campuses.</p>
      </div>

      <DataTable
        columns={columns}
        rows={paginated}
        toolbar={toolbar}
        page={page}
        onPageChange={setPage}
        pageSize={pageSize}
        total={filtered.length}
      />
    </div>
  );
}
