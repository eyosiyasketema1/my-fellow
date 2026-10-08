// formic-ok: custom routing shell
import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import AppShell from "./formic/components/AppShell";
import Select from "./formic/components/Select";
import { iconFor } from "./formic/components/primitives";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Onboarding from "./pages/auth/Onboarding";
import Discover from "./pages/student/Discover";
import FellowshipDetails from "./pages/student/FellowshipDetails";
import Growth from "./pages/student/Growth";
import Dashboard from "./pages/student/Dashboard";
import StudentEvents from "./pages/student/Events";
import MyFellowship from "./pages/student/MyFellowship";
import LeaderDashboard from "./pages/leader/Dashboard";
import Members from "./pages/leader/Members";
import Teams from "./pages/leader/Teams";
import Announcements from "./pages/leader/Announcements";
import Events from "./pages/leader/Events";
import Attendance from "./pages/leader/Attendance";
import Settings from "./pages/leader/Settings";
import TeamDashboard from "./pages/team-leader/Dashboard";
import TeamMembers from "./pages/team-leader/Members";
import TeamEvents from "./pages/team-leader/Events";
import TeamAnnouncements from "./pages/team-leader/Announcements";
import StaffDashboard from "./pages/staff/Dashboard";
import StaffFellowships from "./pages/staff/Fellowships";
import StaffVerification from "./pages/staff/Verification";
import StaffActivity from "./pages/staff/Activity";
import MinistryDashboard from "./pages/ministry/Dashboard";
import MinistryContent from "./pages/ministry/Content";
import MinistryCreateContent from "./pages/ministry/CreateContent";
import MinistryAnalytics from "./pages/ministry/Analytics";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminCampuses from "./pages/admin/Campuses";
import AdminApprovals from "./pages/admin/Approvals";
import ToastProvider from "./formic/components/Toast";

function RoleSwitcher({ currentRole }: { currentRole: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <span className="text-small font-medium text-ink-3 hidden sm:block">View as:</span>
      <Select
        value={currentRole}
        width="w-36"
        size="sm"
        onChange={(val) => {
          if (val === "student") navigate("/student");
          if (val === "leader") navigate("/leader");
          if (val === "team-leader") navigate("/team-leader");
          if (val === "staff") navigate("/staff");
          if (val === "ministry") navigate("/ministry");
          if (val === "admin") navigate("/admin");
        }}
        options={[
          { label: "Student", value: "student" },
          { label: "Leader", value: "leader" },
          { label: "Team Leader", value: "team-leader" },
          { label: "Campus Staff", value: "staff" },
          { label: "Ministry", value: "ministry" },
          { label: "System Admin", value: "admin" }
        ]}
      />
    </div>
  );
}

function StudentShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/student") return "Dashboard";
    if (location.pathname.startsWith("/student/discover")) return "Discover Fellowships";
    if (location.pathname.startsWith("/student/fellowship/")) return "Fellowship Details";
    if (location.pathname.startsWith("/student/fellowship")) return "My Fellowship";
    if (location.pathname.startsWith("/student/events")) return "Upcoming Events";
    if (location.pathname.startsWith("/student/growth")) return "Growth Content";
    return "MyFellow";
  };

  const getActive = () => {
    if (location.pathname === "/student") return "home";
    if (location.pathname.startsWith("/student/discover")) return "discover";
    if (location.pathname.startsWith("/student/fellowship")) return "fellowship";
    if (location.pathname.startsWith("/student/events")) return "events";
    if (location.pathname.startsWith("/student/growth")) return "growth";
    return "home";
  };

  return (
    <AppShell
      title={getTitle()}
      active={getActive()}
      actions={<RoleSwitcher currentRole="student" />}
      sections={[
        {
          items: [
            { key: "home", label: "Home", icon: (iconFor("Home") || "home") as any },
            { key: "discover", label: "Discover", icon: (iconFor("Search") || "search") as any },
            { key: "fellowship", label: "My Fellowship", icon: (iconFor("Fellowship") || "users") as any },
            { key: "events", label: "Events", icon: (iconFor("Calendar") || "calendar") as any },
            { key: "growth", label: "Growth", icon: (iconFor("Content") || "file") as any },
          ]
        }
      ]}
      user={{
        name: "Abebe Bikila",
        detail: "Student",
        kind: "photo"
      }}
      onSelect={(key) => navigate(key === "home" ? "/student" : `/student/${key}`)}
      padding={false}
    >
      <Outlet />
    </AppShell>
  );
}

function LeaderShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/leader") return "Leader Dashboard";
    if (location.pathname.startsWith("/leader/members")) return "Members";
    if (location.pathname.startsWith("/leader/teams")) return "Teams";
    if (location.pathname.startsWith("/leader/announcements")) return "Announcements";
    if (location.pathname.startsWith("/leader/attendance")) return "Attendance";
    if (location.pathname.startsWith("/leader/events/new")) return "Create Event";
    if (location.pathname.startsWith("/leader/events")) return "Events";
    if (location.pathname.startsWith("/leader/settings")) return "Settings";
    return "MyFellow Leader";
  };

  const getActive = () => {
    if (location.pathname === "/leader") return "home";
    if (location.pathname.startsWith("/leader/members")) return "members";
    if (location.pathname.startsWith("/leader/teams")) return "teams";
    if (location.pathname.startsWith("/leader/announcements")) return "announcements";
    if (location.pathname.startsWith("/leader/events")) return "events";
    if (location.pathname.startsWith("/leader/attendance")) return "attendance";
    if (location.pathname.startsWith("/leader/settings")) return "settings";
    return "home";
  };

  return (
    <AppShell
      title={getTitle()}
      active={getActive()}
      actions={<RoleSwitcher currentRole="leader" />}
      sections={[
        {
          items: [
            { key: "home", label: "Dashboard", icon: (iconFor("Home") || "home") as any },
            { key: "members", label: "Members", icon: (iconFor("Fellowship") || "users") as any },
            { key: "teams", label: "Teams", icon: (iconFor("Teams") || "users") as any },
            { key: "announcements", label: "Announcements", icon: (iconFor("Announcements") || "bell") as any },
            { key: "events", label: "Events", icon: (iconFor("Calendar") || "calendar") as any },
            { key: "attendance", label: "Attendance", icon: (iconFor("Attendance") || "check-all") as any },
            { key: "settings", label: "Settings", icon: (iconFor("Settings") || "gear") as any },
          ]
        }
      ]}
      user={{
        name: "Abebe Bikila",
        detail: "Leader",
        kind: "photo"
      }}
      onSelect={(key) => navigate(key === "home" ? "/leader" : `/leader/${key}`)}
      padding={false}
    >
      <Outlet />
    </AppShell>
  );
}

function TeamShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname === "/team-leader") return "Team Dashboard";
    if (location.pathname.startsWith("/team-leader/members")) return "Team Members";
    if (location.pathname.startsWith("/team-leader/events")) return "Team Events";
    if (location.pathname.startsWith("/team-leader/announcements")) return "Team Announcements";
    return "Team Dashboard";
  };

  const getActive = () => {
    if (location.pathname === "/team-leader") return "home";
    if (location.pathname.startsWith("/team-leader/members")) return "members";
    if (location.pathname.startsWith("/team-leader/events")) return "events";
    if (location.pathname.startsWith("/team-leader/announcements")) return "announcements";
    return "home";
  };

  return (
    <AppShell
      title={getTitle()}
      active={getActive()}
      actions={<RoleSwitcher currentRole="team-leader" />}
      user={{
        name: "Hana Alemu",
        detail: "Team Lead",
        kind: "photo"
      }}
      onSelect={(key) => navigate(key === "home" ? "/team-leader" : `/team-leader/${key}`)}
      padding={false}
      sections={[
        {
          items: [
            { key: "home", label: "Dashboard", icon: (iconFor("Home") || "home") as any },
            { key: "members", label: "Team Members", icon: (iconFor("Fellowship") || "users") as any },
            { key: "events", label: "Team Events", icon: (iconFor("Calendar") || "calendar") as any },
            { key: "announcements", label: "Announcements", icon: (iconFor("Announcements") || "bell") as any },
          ]
        }
      ]}
    >
      <Outlet />
    </AppShell>
  );
}

function StaffShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname === "/staff") return "Staff Dashboard";
    if (location.pathname.startsWith("/staff/fellowships")) return "Fellowships";
    if (location.pathname.startsWith("/staff/verification")) return "Verification";
    if (location.pathname.startsWith("/staff/activity")) return "Activity";
    return "Staff Dashboard";
  };

  const getActive = () => {
    if (location.pathname === "/staff") return "home";
    if (location.pathname.startsWith("/staff/fellowships")) return "fellowships";
    if (location.pathname.startsWith("/staff/verification")) return "verification";
    if (location.pathname.startsWith("/staff/activity")) return "activity";
    return "home";
  };

  return (
    <AppShell
      title={getTitle()}
      active={getActive()}
      actions={<RoleSwitcher currentRole="staff" />}
      user={{
        name: "Samuel T.",
        detail: "Regional Staff",
        kind: "photo"
      }}
      onSelect={(key) => navigate(key === "home" ? "/staff" : `/staff/${key}`)}
      padding={false}
      sections={[
        {
          items: [
            { key: "home", label: "Dashboard", icon: (iconFor("Home") || "home") as any },
            { key: "fellowships", label: "Fellowships", icon: (iconFor("Fellowship") || "users") as any },
            { key: "verification", label: "Verification", icon: (iconFor("Settings") || "check-all") as any },
            { key: "activity", label: "Activity Logs", icon: (iconFor("Events") || "calendar") as any },
          ]
        }
      ]}
    >
      <Outlet />
    </AppShell>
  );
}

function MinistryShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname === "/ministry") return "Ministry Dashboard";
    if (location.pathname.startsWith("/ministry/content")) return "Content Library";
    if (location.pathname.startsWith("/ministry/analytics")) return "Analytics";
    return "Ministry Dashboard";
  };

  const getActive = () => {
    if (location.pathname === "/ministry") return "home";
    if (location.pathname.startsWith("/ministry/content")) return "content";
    if (location.pathname.startsWith("/ministry/analytics")) return "analytics";
    return "home";
  };

  return (
    <AppShell
      title={getTitle()}
      active={getActive()}
      actions={<RoleSwitcher currentRole="ministry" />}
      user={{
        name: "Abenezer",
        detail: "Ministry Staff",
        kind: "photo"
      }}
      onSelect={(key) => navigate(key === "home" ? "/ministry" : `/ministry/${key}`)}
      padding={false}
      sections={[
        {
          items: [
            { key: "home", label: "Dashboard", icon: (iconFor("Home") || "home") as any },
            { key: "content", label: "Content", icon: (iconFor("Content") || "file") as any },
            { key: "analytics", label: "Analytics", icon: (iconFor("Analytics") || "chart-line") as any },
          ]
        }
      ]}
    >
      <Outlet />
    </AppShell>
  );
}

function AdminShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname === "/admin") return "Admin Dashboard";
    if (location.pathname.startsWith("/admin/users")) return "User Management";
    if (location.pathname.startsWith("/admin/campuses")) return "Universities & Campuses";
    if (location.pathname.startsWith("/admin/approvals")) return "Content Approvals";
    return "Admin Dashboard";
  };

  const getActive = () => {
    if (location.pathname === "/admin") return "home";
    if (location.pathname.startsWith("/admin/users")) return "users";
    if (location.pathname.startsWith("/admin/campuses")) return "campuses";
    if (location.pathname.startsWith("/admin/approvals")) return "approvals";
    return "home";
  };

  return (
    <AppShell
      title={getTitle()}
      active={getActive()}
      actions={<RoleSwitcher currentRole="admin" />}
      user={{
        name: "Admin",
        detail: "System Administrator",
        kind: "photo"
      }}
      onSelect={(key) => navigate(key === "home" ? "/admin" : `/admin/${key}`)}
      padding={false}
      sections={[
        {
          items: [
            { key: "home", label: "Dashboard", icon: (iconFor("Home") || "home") as any },
            { key: "users", label: "Users & Roles", icon: (iconFor("Users") || "users") as any },
            { key: "campuses", label: "Universities", icon: (iconFor("University") || "building") as any },
            { key: "approvals", label: "Approvals", icon: (iconFor("Approvals") || "clipboard") as any },
          ]
        }
      ]}
    >
      <Outlet />
    </AppShell>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/student" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentShell />}>
            <Route index element={<Dashboard />} />
            <Route path="discover" element={<Discover />} />
            <Route path="fellowship/:id" element={<FellowshipDetails />} />
            <Route path="fellowship" element={<MyFellowship />} />
            <Route path="events" element={<StudentEvents />} />
            <Route path="growth" element={<Growth />} />
          </Route>

          {/* Leader Routes */}
          <Route path="/leader" element={<LeaderShell />}>
            <Route index element={<LeaderDashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="teams" element={<Teams />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="events" element={<Events />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Team Leader Routes */}
          <Route path="/team-leader" element={<TeamShell />}>
            <Route index element={<TeamDashboard />} />
            <Route path="members" element={<TeamMembers />} />
            <Route path="events" element={<TeamEvents />} />
            <Route path="announcements" element={<TeamAnnouncements />} />
          </Route>

          {/* Campus Staff Routes */}
          <Route path="/staff" element={<StaffShell />}>
            <Route index element={<StaffDashboard />} />
            <Route path="fellowships" element={<StaffFellowships />} />
            <Route path="verification" element={<StaffVerification />} />
            <Route path="activity" element={<StaffActivity />} />
          </Route>

          {/* Ministry Routes */}
          <Route path="/ministry" element={<MinistryShell />}>
            <Route index element={<MinistryDashboard />} />
            <Route path="content" element={<MinistryContent />} />
            <Route path="content/create" element={<MinistryCreateContent />} />
            <Route path="content/edit/:id" element={<MinistryCreateContent />} />
            <Route path="analytics" element={<MinistryAnalytics />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="campuses" element={<AdminCampuses />} />
            <Route path="approvals" element={<AdminApprovals />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
