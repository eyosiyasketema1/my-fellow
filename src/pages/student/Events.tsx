/* Brief
   Reader: Student user
   Question: What events are coming up in my fellowship and on campus?
   Action: Browse events, RSVP, view details.
   Register: Visual (CardGroup of events)
*/
import { useState } from "react";
import Input from "../../formic/components/Input";
import FilterBar from "../../formic/components/FilterBar";
import { Card, Badge } from "../../formic/components/primitives";
import { CardGroup, CardMedia, CardHeader, CardTitle, CardFooter, CardButton } from "../../formic/components/cards";
import { useToast } from "../../formic/components/Toast";

const EVENTS = [
  { id: "1", title: "Friday Night Worship", date: "Oct 12, 2026", time: "5:00 PM", location: "Main Hall, 4 Kilo", category: "Worship", status: "Upcoming" },
  { id: "2", title: "Sunday Morning Service", date: "Oct 14, 2026", time: "9:00 AM", location: "Room 201", category: "Service", status: "Upcoming" },
  { id: "3", title: "Freshman Welcome Night", date: "Oct 20, 2026", time: "4:00 PM", location: "Student Center", category: "Social", status: "Upcoming" },
  { id: "4", title: "Bible Study: Book of John", date: "Oct 15, 2026", time: "6:00 PM", location: "Library Rm 4", category: "Study", status: "Upcoming" },
  { id: "5", title: "Campus Prayer Walk", date: "Oct 18, 2026", time: "6:00 AM", location: "Main Gate", category: "Prayer", status: "Upcoming" },
];

export default function StudentEvents() {
  const [search, setSearch] = useState("");
  const toast = useToast();

  const handleRSVP = () => {
    toast({
      tone: "success",
      title: "RSVP Confirmed",
      description: "You have successfully registered for this event."
    });
  };

  const filtered = EVENTS.filter(e => search === "" || e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="relative overflow-hidden rounded-card mb-8 shadow-none flex flex-col justify-end min-h-64">
        <div className="absolute inset-0">
          <img src="/events-bg.png" alt="Upcoming Events" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2))' }} />
        </div>
        <div className="relative p-8 z-10">
          {/* formic-ok: text over dark image overlay */}
          <h1 className="text-h1  mb-2" style={{ color: 'white' }}>Upcoming Events</h1>
          {/* formic-ok: text over dark image overlay */}
          <p className="text-body  opacity-90 max-w-lg">Discover and join fellowship activities happening on your campus this month. Worship, study, and grow together.</p>
        </div>
      </div>

      <FilterBar 
        search={
          <Input 
            width="w-72" 
            size="sm" 
            placeholder="Search events by name or location..." 
            leadingIcon="search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      >
        <></>
      </FilterBar>

      <CardGroup orientation="grid" columns={3}>
        {filtered.map(e => (
          <Card key={e.id}>
            <CardMedia src={`https://picsum.photos/seed/${e.id}/400/200`} alt={e.title} />
            <CardHeader>
              <div className="flex items-center justify-between mb-1">
                <span className="text-caption font-medium text-accent uppercase tracking-wide">{e.category}</span>
                <Badge tone="green">{e.status}</Badge>
              </div>
              <CardTitle>{e.title}</CardTitle>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2 text-small text-ink-2">
                  <span className="shrink-0 font-medium text-ink">When:</span>
                  <span>{e.date} • {e.time}</span>
                </div>
                <div className="flex items-center gap-2 text-small text-ink-2">
                  <span className="shrink-0 font-medium text-ink">Where:</span>
                  <span>{e.location}</span>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <CardButton icon="calendar" className="hover:text-accent" onClick={handleRSVP}>RSVP</CardButton>
              <CardButton icon="share" className="hover:text-blue" onClick={() => {
                toast({ tone: "success", title: "Link Copied", description: "Event link copied to clipboard." });
              }}>Share</CardButton>
            </CardFooter>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}
