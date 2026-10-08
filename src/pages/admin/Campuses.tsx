/* Brief
   Reader: System Admin
   Question: What is the state of our University & Campus directory?
   Action: Manage the directory structure.
   Register: Analytical (DataTable)
*/
import { useState } from "react";
import Input, { Field } from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, type DataColumn } from "../../formic/components/DataTable";
import Button from "../../formic/components/Button";
import Modal from "../../formic/components/Modal";
import { useToast } from "../../formic/components/Toast";

const CAMPUSES = [
  { id: "1", university: "Addis Ababa University", campus: "Main Campus (6 Kilo)", region: "Addis Ababa", fellowships: 4 },
  { id: "2", university: "Addis Ababa University", campus: "Technology Campus (4 Kilo)", region: "Addis Ababa", fellowships: 2 },
  { id: "3", university: "Unity University", campus: "Main Campus", region: "Addis Ababa", fellowships: 1 },
  { id: "4", university: "Jimma University", campus: "Main Campus", region: "Oromia", fellowships: 3 },
  { id: "5", university: "Hawassa University", campus: "Main Campus", region: "Sidama", fellowships: 5 },
  { id: "6", university: "Mekelle University", campus: "Main Campus", region: "Tigray", fellowships: 2 },
  { id: "7", university: "Bahir Dar University", campus: "Main Campus", region: "Amhara", fellowships: 4 },
  { id: "8", university: "Adama Science and Tech", campus: "Main Campus", region: "Oromia", fellowships: 3 },
];

export default function AdminCampuses() {
  const toast = useToast();
  const [search, setSearch] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editCampus, setEditCampus] = useState<typeof CAMPUSES[0] | null>(null);
  const [deleteCampus, setDeleteCampus] = useState<typeof CAMPUSES[0] | null>(null);

  const handleAdd = () => {
    setIsAddOpen(false);
    toast({ tone: "success", title: "University Added", description: "The new university has been registered in the directory." });
  };

  const handleEdit = () => {
    setEditCampus(null);
    toast({ tone: "success", title: "Directory Updated", description: "The campus details have been saved successfully." });
  };

  const handleDelete = () => {
    setDeleteCampus(null);
    toast({ tone: "success", title: "Campus Removed", description: "The campus has been permanently removed from the directory." });
  };

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = CAMPUSES.filter(c => {
    const term = search.toLowerCase();
    return search === "" || c.university.toLowerCase().includes(term) || c.campus.toLowerCase().includes(term);
  });
  
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof CAMPUSES[0]>[] = [
    {
      key: "university",
      header: "University",
      render: (c) => (
        <div className="flex flex-col">
          <span className="text-body font-medium text-ink">{c.university}</span>
          <span className="text-caption text-ink-3">{c.region}</span>
        </div>
      )
    },
    {
      key: "campus",
      header: "Campus",
      render: (c) => <span className="text-body text-ink-2">{c.campus}</span>
    },
    {
      key: "fellowships",
      header: "Active Fellowships",
      align: "end",
      render: (c) => <span className="text-body text-ink-2 tabular-nums">{c.fellowships}</span>
    },
    {
      key: "action",
      header: "",
      align: "end",
      render: (c) => (
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" icon="edit" onClick={() => setEditCampus(c)}>Edit</Button>
          <Button variant="ghost" size="sm" icon="trash" className="text-red hover:bg-red/10" onClick={() => setDeleteCampus(c)}>Delete</Button>
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
          placeholder="Search universities..." 
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Universities & Campuses</h1>
          <p className="text-body text-ink-2 mt-1">Manage the master directory for fellowship mapping.</p>
        </div>
        <Button variant="accent" icon="plus" onClick={() => setIsAddOpen(true)}>Add University</Button>
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

      {/* Add University Modal */}
      <Modal 
        open={isAddOpen} 
        onClose={() => setIsAddOpen(false)}
        title="Add University"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleAdd}>Save Directory</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5 pt-2">
           <Field label="University Name" required>
             <Input type="text" placeholder="e.g. Addis Ababa University" />
           </Field>
           <Field label="Campus Name (Optional)" hint="Leave blank if the university has only one main campus.">
             <Input type="text" placeholder="e.g. 6 Kilo Main Campus" />
           </Field>
           <Field label="Region" required>
             <Select 
               value="addis"
               options={[
                 { label: "Addis Ababa", value: "addis" },
                 { label: "Oromia", value: "oromia" },
                 { label: "Amhara", value: "amhara" },
                 { label: "SNNPR", value: "snnpr" },
                 { label: "Tigray", value: "tigray" },
                 { label: "Dire Dawa", value: "dire_dawa" },
               ]}
             />
           </Field>
        </div>
      </Modal>

      {/* Edit Campus Modal */}
      <Modal 
        open={!!editCampus} 
        onClose={() => setEditCampus(null)}
        title="Edit Directory Entry"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditCampus(null)}>Cancel</Button>
            <Button variant="accent" onClick={handleEdit}>Save Changes</Button>
          </>
        }
      >
        {editCampus && (
          <div className="flex flex-col gap-5 pt-2">
             <Field label="University Name" required>
               <Input type="text" defaultValue={editCampus.university} />
             </Field>
             <Field label="Campus Name">
               <Input type="text" defaultValue={editCampus.campus} />
             </Field>
             <Field label="Region" required>
               <Select 
                 value={editCampus.region.toLowerCase().replace(" ", "_")}
                 options={[
                   { label: "Addis Ababa", value: "addis_ababa" },
                   { label: "Oromia", value: "oromia" },
                   { label: "Amhara", value: "amhara" },
                 ]}
               />
             </Field>
          </div>
        )}
      </Modal>

      {/* Delete Campus Modal */}
      <Modal 
        open={!!deleteCampus} 
        onClose={() => setDeleteCampus(null)}
        title="Delete Campus"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteCampus(null)}>Cancel</Button>
            <Button variant="accent" onClick={handleDelete}>Delete Permanently</Button>
          </>
        }
      >
        <div className="pt-2">
          <p className="text-body text-ink">
            Are you sure you want to delete <strong>{deleteCampus?.campus}</strong> from {deleteCampus?.university}? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
}
