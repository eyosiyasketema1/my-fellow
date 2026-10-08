/* Brief
   Reader: Student looking for a fellowship to join on their campus.
   Question: What Christian fellowships are active here, and when do they meet?
   Action: Browse, filter, and select a fellowship.
   Register: Visual
*/
import { useNavigate } from "react-router-dom";
import { CardGroup } from "../../formic/components/cards";
import FilterBar from "../../formic/components/FilterBar";
import Select from "../../formic/components/Select";
import Input from "../../formic/components/Input";
import { Badge, Avatar, AvatarGroup, Card } from "../../formic/components/primitives";
import Button from "../../formic/components/Button";

// Demo data as instructed by AGENTS.md (Demo data is not an empty state)
const DEFAULT_FELLOWSHIPS = [
  {
    id: 1,
    name: "Agape Fellowship",
    status: "Verified",
    description: "A community of believers growing together in Christ.",
    meeting: "Fridays at 5:00 PM • Main Hall",
    leaders: ["abebe", "hana", "caleb"],
  },
  {
    id: 2,
    name: "Evangelical Students Union",
    status: "Verified",
    description: "Reaching the campus for Christ through bold evangelism.",
    meeting: "Sundays at 9:00 AM • Room 402",
    leaders: ["daniel", "sara"],
  },
  {
    id: 3,
    name: "Medical Campus Fellowship",
    status: "Pending",
    description: "Connecting medical students for prayer and support.",
    meeting: "Wednesdays at 6:30 PM • Student Center",
    leaders: ["yosef"],
  }
];

export default function Discover() {
  const navigate = useNavigate();
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <h1 className="text-h2 text-ink">Discover Fellowships</h1>
      
      <FilterBar 
        leading="Filters"
        search={<Input placeholder="Search by name..." width="w-56" />}
      >
        <Select 
          width="w-40" 
          value="4kilo"
          options={[
            { label: "All Campuses", value: "all" },
            { label: "4 Kilo (Science)", value: "4kilo" },
            { label: "5 Kilo (Technology)", value: "5kilo" }
          ]}
        />
        <Select 
          width="w-40" 
          value="all"
          options={[
            { label: "Any day", value: "all" },
            { label: "Fridays", value: "friday" },
            { label: "Sundays", value: "sunday" }
          ]}
        />
      </FilterBar>

      <CardGroup columns={3}>
        {DEFAULT_FELLOWSHIPS.map((f) => (
          <Card 
            key={f.id} 
            className="p-5 flex flex-col gap-4 hover:border-accent hover:shadow-card transition-all cursor-pointer"
            onClick={() => navigate(`/student/fellowship/${f.id}`)}
          >
            <div className="flex items-start justify-between gap-2">
              <Avatar kind="doodle" name={f.name} size="md" />
              <Badge tone={f.status === "Verified" ? "green" : "neutral"}>
                {f.status}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-h4 text-ink">{f.name}</h3>
              <p className="text-body text-ink-2 line-clamp-2 mt-1">{f.description}</p>
            </div>
            
            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-line">
              <AvatarGroup people={f.leaders.map(name => ({ kind: 'doodle', name }))} max={3} />
              <div className="text-small text-ink-2 ml-2 flex flex-col">
                <span>{f.meeting.split('•')[0].trim()}</span>
                <span className="text-ink-3">{f.meeting.split('•')[1]?.trim()}</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-2">View Details</Button>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}
