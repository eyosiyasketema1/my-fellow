/* Brief
   Reader: Student looking to grow spiritually.
   Question: What resources are available, and what am I currently reading?
   Action: Browse content, open a resource, track progress.
   Register: Visual (CardGroup for library) + Balanced (Panel for progress)
*/
import { useState } from "react";
import Button from "../../formic/components/Button";
import Select from "../../formic/components/Select";
import FilterBar from "../../formic/components/FilterBar";
import { CardGroup, CardHeader, CardMedia, CardTitle, CardDescription, CardFooter, CardButton } from "../../formic/components/cards";
import { Badge, Progress, Card, type IconName } from "../../formic/components/primitives";

const CONTENT_LIBRARY = [
  { id: "1", title: "The Cost of Discipleship", author: "Dietrich Bonhoeffer", category: "Discipleship", type: "Book Summary", icon: "rocket" as IconName },
  { id: "2", title: "How to Pray", author: "C.S. Lewis", category: "Prayer", type: "Article", icon: "star" as IconName },
  { id: "3", title: "Evangelism on Campus", author: "Cru", category: "Evangelism", type: "Video", icon: "video" as IconName },
  { id: "4", title: "Servant Leadership", author: "Oswald Sanders", category: "Leadership", type: "Course", icon: "flag" as IconName },
  { id: "5", title: "Gospel of John Study", author: "Bible Project", category: "Bible", type: "Study Guide", icon: "bookmark" as IconName },
  { id: "6", title: "Global Missions Today", author: "Wycliffe", category: "Missions", type: "Podcast", icon: "globe" as IconName },
];

export default function Growth() {
  const [category, setCategory] = useState("all");

  const filtered = CONTENT_LIBRARY.filter(c => category === "all" || c.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="p-6 sm:p-8 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-ink">Spiritual Growth</h1>
          <p className="text-body text-ink-2 mt-1">Resources to help you grow in your faith.</p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lead font-medium text-ink">My Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-body-strong text-ink">Gospel of John Study</span>
                <span className="text-caption text-ink-3">60%</span>
              </div>
              <Progress value={60} max={100} label="Study Progress" tone="accent" className="w-full" />
              <div className="mt-1">
                <Button variant="ghost" size="sm" className="-ml-3">Continue</Button>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-body-strong text-ink">How to Pray</span>
                <Badge tone="green">Completed</Badge>
              </div>
              <Progress value={100} max={100} label="Completed" tone="green" className="w-full" />
              <div className="mt-1">
                <Button variant="ghost" size="sm" className="-ml-3">Review</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <FilterBar
          leading="Browse Library"
          active={category !== "all" ? 1 : 0}
          onClear={() => setCategory("all")}
        >
          <Select 
            value={category}
            onChange={setCategory}
            options={[
              { label: "All Categories", value: "all" },
              { label: "Bible", value: "bible" },
              { label: "Prayer", value: "prayer" },
              { label: "Discipleship", value: "discipleship" },
              { label: "Evangelism", value: "evangelism" },
              { label: "Leadership", value: "leadership" },
              { label: "Missions", value: "missions" },
            ]}
            width="w-48"
          />
        </FilterBar>

        <CardGroup columns={3}>
          {filtered.map(content => (
            <Card key={content.id}>
              <CardHeader>
                <CardMedia icon={content.icon} tone="accent" />
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>By {content.author}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Badge tone="neutral">{content.category}</Badge>
                <div className="ml-auto">
                  <CardButton icon="arrow-right" variant="secondary">Start</CardButton>
                </div>
              </CardFooter>
            </Card>
          ))}
        </CardGroup>
      </section>
    </div>
  );
}
