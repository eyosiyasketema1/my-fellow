/* Brief
   Reader: Campus Staff
   Question: Which fellowships need verification?
   Action: Review and approve/reject verification requests.
   Register: Balanced (Inline CardGroup)
*/
import { CardGroup, CardHeader, CardTitle, CardFooter, CardButton } from "../../formic/components/cards";
import { Badge, Card } from "../../formic/components/primitives";
import Button from "../../formic/components/Button";

const REQUESTS = [
  { id: "1", name: "AAU Technology Campus Fellowship", leader: "Abebe B.", students: 120, submitted: "2 days ago", campus: "Addis Ababa Univ - Tech" },
  { id: "2", name: "Medical Students Prayer Group", leader: "Sara T.", students: 45, submitted: "5 days ago", campus: "Addis Ababa Univ - Medical" },
];

export default function StaffVerification() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-h2 text-ink">Verification Requests</h1>
          <p className="text-body text-ink-2 mt-1">Review and approve new fellowships on your campuses.</p>
        </div>
      </div>

      <CardGroup orientation="inline">
        {REQUESTS.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge tone="orange">Pending Review</Badge>
                <span className="text-caption text-ink-3">Submitted {r.submitted}</span>
              </div>
              <CardTitle>{r.name}</CardTitle>
              <p className="text-body text-ink-2 mt-1.5">
                <strong>Campus:</strong> {r.campus} <br />
                <strong>Leader:</strong> {r.leader} <br />
                <strong>Expected Students:</strong> {r.students}
              </p>
            </CardHeader>
            <CardFooter>
              <CardButton icon="check" className="hover:text-green">Approve</CardButton>
              <CardButton icon="close" className="hover:text-red">Reject</CardButton>
            </CardFooter>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}
