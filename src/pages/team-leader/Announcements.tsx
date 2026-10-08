/* Brief
   Reader: Team Leader
   Question: What announcements have I sent to my team?
   Action: Send new announcements.
   Register: Balanced (Inline CardGroup)
*/
import { CardGroup, CardHeader, CardTitle, CardFooter, CardButton } from "../../formic/components/cards";
import { Badge, Card } from "../../formic/components/primitives";
import Button from "../../formic/components/Button";

const TEAM_ANNOUNCEMENTS = [
  { id: "1", title: "Campus Outreach Briefing", body: "Please attend the briefing before we head out.", date: "Yesterday" },
  { id: "2", title: "Sign up for Friday's shift", body: "We still need 3 more people for the Friday outreach shift.", date: "Oct 2, 2026" },
];

export default function TeamAnnouncements() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-ink">Team Announcements</h1>
          <p className="text-body text-ink-2 mt-1">Communicate directly with your team members.</p>
        </div>
        <Button variant="accent" icon="plus">New Announcement</Button>
      </div>

      <CardGroup orientation="inline">
        {TEAM_ANNOUNCEMENTS.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge tone="green">Team Only</Badge>
                <span className="text-caption text-ink-3">{a.date}</span>
              </div>
              <CardTitle>{a.title}</CardTitle>
              <p className="text-body text-ink-2 mt-1.5 line-clamp-2">{a.body}</p>
            </CardHeader>
            <CardFooter>
              <CardButton icon="edit">Edit</CardButton>
              <CardButton icon="trash" className="hover:text-red">Delete</CardButton>
            </CardFooter>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}
