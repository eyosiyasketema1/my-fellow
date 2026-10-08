/* Brief
   Reader: Fellowship Leader during an event
   Question: Who attended the recent event, and how do I check people in?
   Action: Generate QR code, manually mark attendance.
   Register: Balanced (A mix of single-focus QR display and analytical DataTable)
*/
import { useState } from "react";
import Panel from "../../formic/components/Panel";
import Button from "../../formic/components/Button";
import Input from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, PersonCell, StatusCell, type DataColumn } from "../../formic/components/DataTable";
import { Icon } from "../../formic/components/primitives";

const MEMBERS = [
  { id: "1", name: "Sara Tadesse", major: "Computer Science", year: "3rd Year" },
  { id: "2", name: "Daniel Getachew", major: "Biology", year: "2nd Year" },
  { id: "3", name: "Yosef Assefa", major: "Software Eng", year: "4th Year" },
  { id: "4", name: "Bethelhem Tesfaye", major: "Architecture", year: "5th Year" },
  { id: "5", name: "Abel Bekele", major: "Medicine", year: "Alumni" },
  { id: "6", name: "Hanna Alemu", major: "Accounting", year: "2nd Year" },
];

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState<Record<string, boolean>>({
    "1": true, "3": true
  });

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const toggleAttendance = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = MEMBERS.filter(m => search === "" || m.name.toLowerCase().includes(search.toLowerCase()));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof MEMBERS[0]>[] = [
    {
      key: "name",
      header: "Member",
      render: (m) => <PersonCell name={m.name} detail={`${m.major} • ${m.year}`} kind="photo" />
    },
    {
      key: "status",
      header: "Status",
      render: (m) => (
        <StatusCell tone={attendance[m.id] ? "green" : "neutral"}>
          {attendance[m.id] ? "Present" : "Absent"}
        </StatusCell>
      )
    },
    {
      key: "action",
      header: "Action",
      align: "end",
      render: (m) => (
        <Button 
          variant={attendance[m.id] ? "ghost" : "secondary"} 
          size="sm"
          onClick={() => toggleAttendance(m.id)}
        >
          {attendance[m.id] ? "Mark Absent" : "Check In"}
        </Button>
      )
    }
  ];

  const toolbar = (
    <FilterBar 
      search={
        <Input 
          width="w-64" 
          size="sm" 
          placeholder="Search by name..." 
          leadingIcon="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    >
      <span className="text-caption text-ink-3">Quick Search</span>
    </FilterBar>
  );

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Attendance</h1>
          <p className="text-body text-ink-2 mt-1">Track event participation and manage QR check-ins.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-caption text-ink-3">Active Event:</span>
          <Select 
            value="friday-worship"
            onChange={() => {}}
            options={[
              { label: "Friday Night Worship", value: "friday-worship" },
              { label: "Sunday Morning Service", value: "sunday" }
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left: QR Code Panel */}
        <div className="w-full lg:w-80 shrink-0">
          <Panel title="Live Check-in">
            <div className="flex flex-col items-center px-4 py-8 gap-5">
              <div className="size-48 bg-surface border-2 border-dashed border-line rounded-card flex items-center justify-center">
                <Icon name="qr" size={64} className="text-ink-3" />
              </div>
              <p className="text-small text-center text-ink-3">Students can scan this QR code using their MyFellow app to check in automatically.</p>
              <Button variant="outline" className="w-full" icon="print">Print QR Code</Button>
            </div>
          </Panel>
        </div>

        {/* Right: Manual Check-in */}
        <div className="min-w-0 flex-1 w-full">
          <Panel title="Manual Check-in" caption={`${Object.values(attendance).filter(Boolean).length} checked in`}>
            <DataTable
              columns={columns}
              rows={paginated}
              toolbar={toolbar}
              page={page}
              onPageChange={setPage}
              pageSize={pageSize}
              total={filtered.length}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}
