/* Brief
   Reader: Fellowship Leader viewing their teams.
   Question: What teams exist, and who is leading them?
   Action: Manage a team or create a new one.
   Register: Visual (CardGroup of Teams)
*/
import Button from "../../formic/components/Button";
import { CardGroup, CardHeader, CardMedia, CardTitle, CardDescription, CardFooter, CardButton } from "../../formic/components/cards";
import { Card, type IconName } from "../../formic/components/primitives";

const TEAMS = [
  { id: "1", name: "Evangelism Team", leader: "Sara Tadesse", members: 12, icon: "sparkles" as IconName },
  { id: "2", name: "Prayer Team", leader: "Daniel Getachew", members: 8, icon: "star" as IconName },
  { id: "3", name: "Worship Team", leader: "Yosef Assefa", members: 15, icon: "play" as IconName },
  { id: "4", name: "Finance & Logistics", leader: "Bethelhem Tesfaye", members: 4, icon: "wallet" as IconName },
];

export default function Teams() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-ink">Teams</h1>
          <p className="text-body text-ink-2 mt-1">Manage fellowship subgroups and assign team leaders.</p>
        </div>
        <Button variant="accent" icon="plus">New Team</Button>
      </div>

      <CardGroup columns={2}>
        {TEAMS.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardMedia icon={team.icon} />
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>Led by {team.leader} • {team.members} members</CardDescription>
            </CardHeader>
            <CardFooter>
              <CardButton>Manage Team</CardButton>
            </CardFooter>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}
