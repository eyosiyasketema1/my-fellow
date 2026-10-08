/* Brief
   Reader: Team Leader
   Question: Who is on my team and what are their roles?
   Action: View team members, manage team roles.
   Register: Analytical (DataTable of team members)
*/
import { useState } from "react";
import Input from "../../formic/components/Input";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, PersonCell, StatusCell, type DataColumn } from "../../formic/components/DataTable";

const TEAM_MEMBERS = [
  { id: "1", name: "Hana Alemu", role: "Photographer", status: "Active" },
  { id: "2", name: "Caleb Tadesse", role: "Social Media", status: "Active" },
  { id: "3", name: "Daniel Getachew", role: "Copywriter", status: "Inactive" },
];

export default function TeamMembers() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = TEAM_MEMBERS.filter(m => search === "" || m.name.toLowerCase().includes(search.toLowerCase()));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof TEAM_MEMBERS[0]>[] = [
    {
      key: "name",
      header: "Team Member",
      render: (m) => <PersonCell name={m.name} detail={`Role: ${m.role}`} kind="photo" />
    },
    {
      key: "status",
      header: "Status",
      render: (m) => <StatusCell tone={m.status === "Active" ? "green" : "neutral"}>{m.status}</StatusCell>
    },
    {
      key: "action",
      header: "",
      align: "end",
      render: () => <span className="text-accent text-caption cursor-pointer font-medium hover:underline">Manage Role</span>
    }
  ];

  const toolbar = (
    <FilterBar 
      search={
        <Input 
          width="w-64" 
          size="sm" 
          placeholder="Search team members..." 
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
        <h1 className="text-h2 text-ink">Team Members</h1>
        <p className="text-body text-ink-2 mt-1">Manage the students assigned to your team.</p>
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
