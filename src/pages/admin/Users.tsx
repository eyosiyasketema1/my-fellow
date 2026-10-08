/* Brief
   Reader: System Admin
   Question: How do I manage users and assign roles?
   Action: Search users, edit roles, suspend accounts.
   Register: Analytical (DataTable of users)
*/
import { useState } from "react";
import Input, { Field } from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import FilterBar from "../../formic/components/FilterBar";
import { DataTable, StatusCell, type DataColumn } from "../../formic/components/DataTable";
import Button from "../../formic/components/Button";
import { Avatar } from "../../formic/components/primitives";
import Modal from "../../formic/components/Modal";

import { useToast } from "../../formic/components/Toast";

const USERS = [
  { id: "1", name: "Abebe B.", email: "abebe@example.com", role: "Fellowship Leader", status: "Active" },
  { id: "2", name: "Sara T.", email: "sara@example.com", role: "Team Leader", status: "Active" },
  { id: "3", name: "Daniel G.", email: "daniel@example.com", role: "Student", status: "Active" },
  { id: "4", name: "Abenezer", email: "abenezer@example.com", role: "Ministry", status: "Active" },
  { id: "5", name: "Hana A.", email: "hana@example.com", role: "Student", status: "Suspended" },
  { id: "6", name: "Ephrem K.", email: "ephrem@example.com", role: "Campus Staff", status: "Active" },
  { id: "7", name: "Lydia M.", email: "lydia@example.com", role: "Student", status: "Active" },
  { id: "8", name: "Kaleb M.", email: "kaleb@example.com", role: "Team Leader", status: "Suspended" },
  { id: "9", name: "Bethelhem Y.", email: "betty@example.com", role: "Fellowship Leader", status: "Active" },
  { id: "10", name: "Nahom D.", email: "nahom@example.com", role: "Ministry", status: "Active" },
];

export default function AdminUsers() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [manageUser, setManageUser] = useState<typeof USERS[0] | null>(null);
  const [deleteUser, setDeleteUser] = useState<typeof USERS[0] | null>(null);

  const handleInvite = () => {
    setIsInviteOpen(false);
    toast({ tone: "success", title: "Invitation Sent", description: "The user has been emailed a link to set up their account." });
  };

  const handleManage = () => {
    setManageUser(null);
    toast({ tone: "success", title: "User Updated", description: "The roles and status have been saved." });
  };

  const handleDelete = () => {
    setDeleteUser(null);
    toast({ tone: "success", title: "User Deleted", description: "The account and all associated data have been removed." });
  };

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = USERS.filter(u => {
    const matchSearch = search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter;
    return matchSearch && matchRole;
  });
  
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);


  const columns: DataColumn<typeof USERS[0]>[] = [
    {
      key: "name",
      header: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar name={u.name} kind="photo" size="sm" />
          <div className="flex flex-col">
            <span className="text-body font-medium text-ink">{u.name}</span>
            <span className="text-caption text-ink-3">{u.email}</span>
          </div>
        </div>
      )
    },
    {
      key: "role",
      header: "Role",
      render: (u) => <span className="text-body text-ink-2">{u.role}</span>
    },
    {
      key: "status",
      header: "Status",
      render: (u) => (
        <StatusCell tone={u.status === "Active" ? "green" : "red"}>
          {u.status}
        </StatusCell>
      )
    },
    {
      key: "action",
      header: "",
      align: "end",
      render: (u) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" icon="gear" onClick={() => setManageUser(u)}>Manage</Button>
          <Button variant="ghost" size="sm" icon="trash" className="text-red hover:bg-red/10" onClick={() => setDeleteUser(u)}>Delete</Button>
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
          placeholder="Search users..." 
          leadingIcon="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      active={roleFilter !== "all" ? 1 : 0}
      onClear={() => setRoleFilter("all")}
    >
      <Select 
        value={roleFilter}
        onChange={setRoleFilter}
        options={[
          { label: "All Roles", value: "all" },
          { label: "Student", value: "student" },
          { label: "Fellowship Leader", value: "fellowship leader" },
          { label: "Team Leader", value: "team leader" },
          { label: "Campus Staff", value: "campus staff" },
          { label: "Ministry", value: "ministry" },
        ]}
      />
    </FilterBar>
  );

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">User Management</h1>
          <p className="text-body text-ink-2 mt-1">Manage platform access and roles.</p>
        </div>
        <Button variant="accent" icon="plus" onClick={() => setIsInviteOpen(true)}>Invite Admin/Staff</Button>
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

      {/* Invite Modal */}
      <Modal 
        open={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)}
        title="Invite User"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleInvite}>Send Invite</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5 pt-2">
           <Field label="Email Address" required>
             <Input type="email" placeholder="name@example.com" />
           </Field>
           <Field label="Assign Role" required>
             <Select 
               value="staff"
               options={[
                 { label: "System Admin", value: "admin" },
                 { label: "Campus Staff", value: "staff" },
                 { label: "Ministry Content", value: "ministry" },
               ]}
             />
           </Field>
           <p className="text-small text-ink-3">An email will be sent with a link to set up their account and password.</p>
        </div>
      </Modal>

      {/* Manage Modal */}
      <Modal 
        open={!!manageUser} 
        onClose={() => setManageUser(null)}
        title={manageUser ? `Manage ${manageUser.name}` : "Manage User"}
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setManageUser(null)}>Cancel</Button>
            <Button variant="accent" onClick={handleManage}>Save Changes</Button>
          </>
        }
      >
        {manageUser && (
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex items-center gap-3 p-3 bg-canvas-subtle rounded-md border border-line">
              <Avatar name={manageUser.name} kind="photo" size="md" />
              <div>
                <p className="text-body-strong text-ink">{manageUser.name}</p>
                <p className="text-small text-ink-2">{manageUser.email}</p>
              </div>
            </div>

            <Field label="User Role">
              <Select 
                value={manageUser.role.toLowerCase()}
                options={[
                  { label: "Student", value: "student" },
                  { label: "Fellowship Leader", value: "fellowship leader" },
                  { label: "Team Leader", value: "team leader" },
                  { label: "Campus Staff", value: "campus staff" },
                  { label: "Ministry Content", value: "ministry" },
                  { label: "System Admin", value: "system admin" },
                ]}
              />
            </Field>

            <Field label="Account Status">
              <Select 
                value={manageUser.status.toLowerCase()}
                options={[
                  { label: "Active", value: "active", swatch: "var(--color-green)" },
                  { label: "Suspended", value: "suspended", swatch: "var(--color-red)" },
                ]}
              />
            </Field>

            {manageUser.status === "Suspended" && (
              <p className="text-small text-red">This user currently cannot log into the platform.</p>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal 
        open={!!deleteUser} 
        onClose={() => setDeleteUser(null)}
        title="Delete User"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteUser(null)}>Cancel</Button>
            <Button variant="accent" onClick={handleDelete}>Delete Permanently</Button>
          </>
        }
      >
        <div className="pt-2">
          <p className="text-body text-ink">
            Are you sure you want to delete <strong>{deleteUser?.name}</strong>? This will permanently remove their account from the platform.
          </p>
        </div>
      </Modal>
    </div>
  );
}
