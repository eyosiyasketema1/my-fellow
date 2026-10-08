/* Brief
   Reader: Fellowship Leader
   Question: What announcements have I sent, and how can I send a new one?
   Action: Create an announcement, target it, and view past ones.
   Register: Balanced (Inline CardGroup for the feed)
*/
import { useState } from "react";
import Button from "../../formic/components/Button";
import Input, { Field, Textarea } from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import Modal from "../../formic/components/Modal";
import { CardGroup, CardHeader, CardTitle, CardFooter, CardButton } from "../../formic/components/cards";
import { Badge, Card } from "../../formic/components/primitives";

const ANNOUNCEMENTS = [
  { id: "1", title: "Welcome to the New Semester", body: "We are so excited to see everyone back on campus. Join us this Friday for our welcome event!", date: "Today", target: "All Members" },
  { id: "2", title: "Worship Practice Moved", body: "Just a reminder that worship practice is moved to Thursday evening this week. Please bring your instruments.", date: "Yesterday", target: "Worship Team" },
];

export default function Announcements() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-ink">Announcements</h1>
          <p className="text-body text-ink-2 mt-1">Communicate with your fellowship or specific teams.</p>
        </div>
        <Button variant="accent" icon="plus" onClick={() => setIsCreateOpen(true)}>New Announcement</Button>
      </div>

      <CardGroup orientation="inline">
        {ANNOUNCEMENTS.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge tone={a.target === "All Members" ? "neutral" : "green"}>{a.target}</Badge>
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

      <Modal 
        open={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        title="New Announcement"
        footer={<Button variant="accent" onClick={() => setIsCreateOpen(false)}>Publish</Button>}
      >
        <div className="space-y-5 p-1">
          <Field label="Audience">
            <Select 
              value="all"
              onChange={() => {}}
              options={[
                { label: "All Members", value: "all" },
                { label: "Evangelism Team", value: "t1" },
                { label: "Prayer Team", value: "t2" },
                { label: "Worship Team", value: "t3" },
              ]}
            />
          </Field>
          <Field label="Title">
            <Input placeholder="e.g. Venue Change for Friday" />
          </Field>
          <Field label="Message">
            <Textarea placeholder="Write your announcement..." rows={5} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
