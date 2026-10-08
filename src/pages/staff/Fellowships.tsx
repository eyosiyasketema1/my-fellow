/* Brief
   Reader: Campus Staff
   Question: What fellowships exist across my campuses, and what is their status?
   Action: Filter fellowships, view details.
   Register: Analytical (DataTable of fellowships)
*/
import { useState } from "react";
import Input from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, StatusCell, type DataColumn } from "../../formic/components/DataTable";
import Button from "../../formic/components/Button";

const FELLOWSHIPS = [
  { id: "1", name: "AAU Main Campus Fellowship", campus: "Addis Ababa Univ - Main", students: 450, status: "Verified" },
  { id: "2", name: "AAU Technology Campus Fellowship", campus: "Addis Ababa Univ - Tech", students: 120, status: "Pending" },
  { id: "3", name: "Unity Med Fellowship", campus: "Unity University", students: 85, status: "Verified" },
  { id: "4", name: "Bole Evening Prayer Group", campus: "Unity University", students: 24, status: "Flagged" },
];

export default function StaffFellowships() {
  const [search, setSearch] = useState("");
  const [campusFilter, setCampusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = FELLOWSHIPS.filter(f => {
    const matchSearch = search === "" || f.name.toLowerCase().includes(search.toLowerCase());
    const matchCampus = campusFilter === "all" || f.campus === campusFilter;
    return matchSearch && matchCampus;
  });
  
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof FELLOWSHIPS[0]>[] = [
    {
      key: "name",
      header: "Fellowship Name",
      render: (f) => <span className="text-body font-medium text-ink">{f.name}</span>
    },
    {
      key: "campus",
      header: "Campus",
      render: (f) => <span className="text-body text-ink-2">{f.campus}</span>
    },
    {
      key: "students",
      header: "Active Students",
      align: "end",
      render: (f) => <span className="text-body text-ink-2 tabular-nums">{f.students}</span>
    },
    {
      key: "status",
      header: "Status",
      render: (f) => (
        <StatusCell tone={f.status === "Verified" ? "green" : f.status === "Flagged" ? "red" : "orange"}>
          {f.status}
        </StatusCell>
      )
    },
    {
      key: "action",
      header: "",
      align: "end",
      render: () => <Button variant="ghost" size="sm">View Details</Button>
    }
  ];

  const toolbar = (
    <FilterBar 
      search={
        <Input 
          width="w-64" 
          size="sm" 
          placeholder="Search fellowships..." 
          leadingIcon="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      active={campusFilter !== "all" ? 1 : 0}
      onClear={() => setCampusFilter("all")}
    >
      <Select 
        value={campusFilter}
        onChange={setCampusFilter}
        options={[
          { label: "All Campuses", value: "all" },
          { label: "Addis Ababa Univ - Main", value: "Addis Ababa Univ - Main" },
          { label: "Addis Ababa Univ - Tech", value: "Addis Ababa Univ - Tech" },
          { label: "Unity University", value: "Unity University" },
        ]}
      />
    </FilterBar>
  );

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">Fellowships</h1>
        <p className="text-body text-ink-2 mt-1">Directory of all fellowships across your assigned campuses.</p>
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
