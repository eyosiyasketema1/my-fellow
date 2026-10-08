/* Brief
   Reader: Fellowship Leader viewing the member directory.
   Question: Who is in the fellowship and what is their status?
   Action: Search, filter, approve, and manage members.
   Register: Analytical (DataTable)
*/
import { useState } from "react";
import Panel from "../../formic/components/Panel";
import Button from "../../formic/components/Button";
import Input from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, PersonCell, StatusCell, RowActions, type DataColumn } from "../../formic/components/DataTable";

type Member = {
  id: string;
  name: string;
  major: string;
  year: string;
  status: "Active" | "Pending" | "Alumni";
  joinedDate: string;
};

const MEMBERS: Member[] = [
  { id: "1", name: "Sara Tadesse", major: "Computer Science", year: "3rd Year", status: "Pending", joinedDate: "2026-10-01" },
  { id: "2", name: "Daniel Getachew", major: "Biology", year: "2nd Year", status: "Pending", joinedDate: "2026-10-02" },
  { id: "3", name: "Yosef Assefa", major: "Software Engineering", year: "4th Year", status: "Active", joinedDate: "2024-09-15" },
  { id: "4", name: "Bethelhem Tesfaye", major: "Architecture", year: "5th Year", status: "Active", joinedDate: "2023-11-20" },
  { id: "5", name: "Abel Bekele", major: "Medicine", year: "Alumni", status: "Alumni", joinedDate: "2019-09-01" },
  { id: "6", name: "Hanna Alemu", major: "Accounting", year: "2nd Year", status: "Active", joinedDate: "2025-01-10" },
  { id: "7", name: "Kaleb Mulugeta", major: "Mechanical Engineering", year: "1st Year", status: "Active", joinedDate: "2026-09-05" },
];

export default function Members() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = MEMBERS.filter(m => {
    if (statusFilter && m.status.toLowerCase() !== statusFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<Member>[] = [
    {
      key: "name",
      header: "Member",
      render: (m) => <PersonCell name={m.name} detail={`${m.major} • ${m.year}`} kind="photo" />
    },
    {
      key: "joined",
      header: "Joined",
      muted: true,
      render: (m) => m.joinedDate
    },
    {
      key: "status",
      header: "Status",
      render: (m) => (
        <StatusCell tone={m.status === "Active" ? "green" : m.status === "Pending" ? "orange" : "neutral"}>
          {m.status}
        </StatusCell>
      )
    }
  ];

  const toolbar = (
    <FilterBar 
      leading="Filter"
      active={statusFilter ? 1 : 0}
      onClear={() => setStatusFilter("")}
      search={
        <Input 
          width="w-64" 
          size="sm" 
          placeholder="Search members..." 
          leadingIcon="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    >
      <Select 
        size="sm" 
        width="w-40" 
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          { label: "All Statuses", value: "" },
          { label: "Active", value: "active" },
          { label: "Pending", value: "pending" },
          { label: "Alumni", value: "alumni" }
        ]} 
      />
    </FilterBar>
  );

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-ink">Member Directory</h1>
          <p className="text-body text-ink-2 mt-1">Manage and view everyone in the fellowship.</p>
        </div>
        <Button variant="accent" icon="user-add">Invite Member</Button>
      </div>

      <DataTable
        columns={columns}
        rows={paginated}
        selectable
        toolbar={toolbar}
        actions={(m) => (
          <RowActions 
            onView={() => {}} 
            onMore={() => {}} 
          />
        )}
        page={page}
        onPageChange={setPage}
        pageSize={pageSize}
        total={filtered.length}
      />
    </div>
  );
}
