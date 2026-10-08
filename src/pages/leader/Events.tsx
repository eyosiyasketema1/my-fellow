/* Brief
   Reader: Fellowship Leader
   Question: What events are scheduled, and what is their status?
   Action: Create a new event, edit an event, cancel an event.
   Register: Analytical (DataTable of events)
*/
import { useState } from "react";
import Button from "../../formic/components/Button";
import Input, { Field, Textarea } from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import DatePicker from "../../formic/components/DatePicker";
import Modal from "../../formic/components/Modal";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, StatusCell, type DataColumn } from "../../formic/components/DataTable";
import { Badge } from "../../formic/components/primitives";

const EVENTS = [
  { id: "1", title: "Friday Night Worship", date: "Oct 12, 2026", time: "6:00 PM", location: "Main Hall A", organizer: "Worship Team", status: "Upcoming" },
  { id: "2", title: "Freshman Welcome", date: "Oct 15, 2026", time: "4:00 PM", location: "Student Center", organizer: "Welcome Team", status: "Upcoming" },
  { id: "3", title: "Bible Study", date: "Oct 5, 2026", time: "5:00 PM", location: "Room 302", organizer: "Discipleship Team", status: "Past" },
  { id: "4", title: "Prayer Walk", date: "Oct 8, 2026", time: "6:00 AM", location: "Campus Square", organizer: "Prayer Team", status: "Cancelled" },
];

export default function Events() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = EVENTS.filter(e => {
    const matchesSearch = search === "" || e.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || e.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof EVENTS[0]>[] = [
    {
      key: "title",
      header: "Event Title",
      render: (e) => (
        <div className="flex flex-col">
          <span className="text-body font-medium text-ink">{e.title}</span>
          <span className="text-caption text-ink-3">{e.organizer}</span>
        </div>
      )
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
        <StatusCell tone={e.status === "Upcoming" ? "green" : e.status === "Cancelled" ? "red" : "neutral"}>
          {e.status}
        </StatusCell>
      )
    },
    {
      key: "action",
      header: "Actions",
      align: "end",
      render: (e) => (
        <div className="flex items-center gap-1 justify-end">
          <Button variant="ghost" size="sm" icon="edit">Edit</Button>
          {e.status === "Upcoming" && (
            <Button variant="ghost" size="sm" icon="close" className="hover:text-red">Cancel</Button>
          )}
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
      active={statusFilter !== "all" ? 1 : 0}
      onClear={() => setStatusFilter("all")}
    >
      <Select 
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          { label: "All Statuses", value: "all" },
          { label: "Upcoming", value: "upcoming" },
          { label: "Past", value: "past" },
          { label: "Cancelled", value: "cancelled" },
        ]}
      />
    </FilterBar>
  );

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Events</h1>
          <p className="text-body text-ink-2 mt-1">Manage fellowship gatherings, meetings, and activities.</p>
        </div>
        <Button variant="accent" icon="plus" onClick={() => setIsCreateOpen(true)}>Create Event</Button>
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

      <Modal 
        open={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        title="Create Event"
        footer={<Button variant="accent" onClick={() => setIsCreateOpen(false)}>Save Event</Button>}
      >
        <div className="space-y-5 p-1">
          <Field label="Event Title">
            <Input placeholder="e.g. Worship Night" />
          </Field>
          
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <DatePicker />
            </Field>
            <Field label="Start Time">
              <Input type="time" defaultValue="18:00" />
            </Field>
          </div>
          
          <Field label="Location">
            <Input placeholder="e.g. Room 302 or Main Hall" />
          </Field>

          <Field label="Organizer / Team">
            <Select 
              value="worship"
              onChange={() => {}}
              options={[
                { label: "Worship Team", value: "worship" },
                { label: "Prayer Team", value: "prayer" },
                { label: "Evangelism Team", value: "evangelism" },
                { label: "General Fellowship", value: "general" }
              ]}
            />
          </Field>
          
          <Field label="Description">
            <Textarea placeholder="Details about this event..." rows={3} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
