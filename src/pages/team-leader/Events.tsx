/* Brief
   Reader: Team Leader
   Question: What events is my team responsible for?
   Action: Manage team-specific events.
   Register: Analytical (DataTable of events)
*/
import { useState } from "react";
import Input from "../../formic/components/Input";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, StatusCell, type DataColumn } from "../../formic/components/DataTable";
import Button from "../../formic/components/Button";

const TEAM_EVENTS = [
  { id: "1", title: "Main Gate Outreach", date: "Oct 14, 2026", time: "3:00 PM", location: "Campus Gate", status: "Upcoming" },
  { id: "2", title: "Dorm Evangelism", date: "Oct 18, 2026", time: "6:00 PM", location: "Freshman Dorms", status: "Upcoming" },
];

export default function TeamEvents() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = TEAM_EVENTS.filter(e => search === "" || e.title.toLowerCase().includes(search.toLowerCase()));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof TEAM_EVENTS[0]>[] = [
    {
      key: "title",
      header: "Event",
      render: (e) => <span className="text-body font-medium text-ink">{e.title}</span>
    },
    {
      key: "datetime",
      header: "Date & Time",
      render: (e) => (
        <div className="flex flex-col">
          <span className="text-body text-ink-2">{e.date}</span>
          <span className="text-caption text-ink-3">{e.time}</span>
        </div>
      )
    },
    {
      key: "location",
      header: "Location",
      render: (e) => <span className="text-body text-ink-2">{e.location}</span>
    },
    {
      key: "status",
      header: "Status",
      render: (e) => (
        <StatusCell tone={e.status === "Upcoming" ? "green" : "neutral"}>
          {e.status}
        </StatusCell>
      )
    },
    {
      key: "action",
      header: "",
      align: "end",
      render: () => (
        <div className="flex items-center gap-1 justify-end">
          <Button variant="ghost" size="sm" icon="edit">Edit</Button>
        </div>
      )
    }
  ];

  const toolbar = (
    <FilterBar 
      search={
        <Input 
          width="w-64" 
          size="sm" 
          placeholder="Search events..." 
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-ink">Team Events</h1>
          <p className="text-body text-ink-2 mt-1">Manage events assigned to your team.</p>
        </div>
        <Button variant="accent" icon="plus">Create Event</Button>
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
