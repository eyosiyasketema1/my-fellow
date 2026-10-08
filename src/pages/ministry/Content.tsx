/* Brief
   Reader: Ministry Staff
   Question: What content do we have and what is its status?
   Action: Manage content library.
   Register: Analytical (DataTable of content)
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, StatusCell, type DataColumn } from "../../formic/components/DataTable";
import Button from "../../formic/components/Button";
import Modal from "../../formic/components/Modal";
import { useToast } from "../../formic/components/Toast";

const CONTENT_LIST = [
  { id: "1", title: "Introduction to Prayer", category: "Prayer", views: 3420, completions: 1200, status: "Published" },
  { id: "2", title: "Sharing Your Faith", category: "Evangelism", views: 2150, completions: 890, status: "Published" },
  { id: "3", title: "The Servant Leader", category: "Leadership", views: 0, completions: 0, status: "Draft" },
  { id: "4", title: "Understanding Grace", category: "Bible Study", views: 0, completions: 0, status: "Pending" },
  { id: "5", title: "Fasting & Prayer Guide", category: "Prayer", views: 5600, completions: 2100, status: "Published" },
  { id: "6", title: "Attributes of God", category: "Bible Study", views: 1800, completions: 750, status: "Published" },
  { id: "7", title: "Apologetics 101", category: "Evangelism", views: 900, completions: 420, status: "Published" },
  { id: "8", title: "Worship as a Lifestyle", category: "Discipleship", views: 4200, completions: 1800, status: "Published" },
  { id: "9", title: "Leading Small Groups", category: "Leadership", views: 0, completions: 0, status: "Draft" },
  { id: "10", title: "Cross-Cultural Missions", category: "Missions", views: 0, completions: 0, status: "Pending" },
  { id: "11", title: "The Holy Spirit", category: "Bible Study", views: 2300, completions: 1050, status: "Published" },
];

export default function MinistryContent() {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteContent, setDeleteContent] = useState<typeof CONTENT_LIST[0] | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = CONTENT_LIST.filter(c => {
    const matchSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: DataColumn<typeof CONTENT_LIST[0]>[] = [
    {
      key: "title",
      header: "Title",
      render: (c) => (
        <div className="flex flex-col">
          <span className="text-body font-medium text-ink">{c.title}</span>
          <span className="text-caption text-ink-3">{c.category}</span>
        </div>
      )
    },
    {
      key: "views",
      header: "Views",
      align: "end",
      render: (c) => <span className="text-body text-ink-2 tabular-nums">{c.views.toLocaleString()}</span>
    },
    {
      key: "completions",
      header: "Completions",
      align: "end",
      render: (c) => <span className="text-body text-ink-2 tabular-nums">{c.completions.toLocaleString()}</span>
    },
    {
      key: "status",
      header: "Status",
      render: (c) => (
        <StatusCell tone={c.status === "Published" ? "green" : c.status === "Draft" ? "neutral" : "orange"}>
          {c.status}
        </StatusCell>
      )
    },
    {
      key: "action",
      header: "",
      align: "end",
      render: (c) => (
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" icon="edit" onClick={() => navigate(`/ministry/content/edit/${c.id}`)}>Edit</Button>
          <Button variant="ghost" size="sm" icon="trash" className="text-red hover:bg-red/10" onClick={() => setDeleteContent(c)}>Delete</Button>
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
          placeholder="Search content..." 
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
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
          { label: "Pending", value: "pending" },
        ]}
      />
    </FilterBar>
  );

  const handleDelete = () => {
    if (deleteContent) {
      toast({
        tone: "success",
        title: "Content Deleted",
        description: `"${deleteContent.title}" has been permanently removed.`
      });
      setDeleteContent(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Content Library</h1>
          <p className="text-body text-ink-2 mt-1">Manage spiritual growth resources.</p>
        </div>
        <Button variant="accent" icon="plus" onClick={() => navigate("/ministry/content/create")}>New Content</Button>
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
        open={!!deleteContent} 
        onClose={() => setDeleteContent(null)}
        title="Delete Content"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteContent(null)}>Cancel</Button>
            <Button variant="accent" onClick={handleDelete}>Delete Permanently</Button>
          </>
        }
      >
        <div className="pt-2">
          <p className="text-body text-ink">
            Are you sure you want to delete <strong>{deleteContent?.title}</strong>? This action cannot be undone and will remove it from all student libraries.
          </p>
        </div>
      </Modal>
    </div>
  );
}
