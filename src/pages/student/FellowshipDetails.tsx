/* Brief
   Reader: Student evaluating a specific fellowship.
   Question: What is this fellowship about and how do I join?
   Action: Request to join (or see pending status).
   Register: Balanced
*/
import { useParams, useNavigate } from "react-router-dom";
import Panel from "../../formic/components/Panel";
import { Badge, Avatar, Card } from "../../formic/components/primitives";
import Button from "../../formic/components/Button";

export default function FellowshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Demo data 
  const isPending = id === "3"; // simulate fellowship ID 3 having a pending request

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar size="lg" kind="doodle" name="Agape Fellowship" className="mt-1" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-h2 text-ink">Agape Fellowship</h1>
              <Badge tone="green">Verified</Badge>
            </div>
            <p className="text-body text-ink-2 mt-1">4 Kilo (Science) Campus • Addis Ababa University</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
          {isPending ? (
            <Button variant="secondary" disabled>Request Pending</Button>
          ) : (
            <Button variant="accent">Request to Join</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden flex flex-col">
            <div className="h-48 sm:h-64 shrink-0 relative bg-surface border-b border-line">
              <img 
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80" 
                alt="Fellowship community" 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="p-5 flex flex-col gap-3">
              <h3 className="text-body-strong text-ink uppercase tracking-wide text-micro">About us</h3>
              <p className="text-body text-ink">
                Agape Fellowship is a vibrant community of believers growing together in Christ. We focus on deep biblical teaching, heartfelt worship, and equipping students for campus evangelism.
              </p>
            </div>
          </Card>

          <Panel title="Upcoming Events">
            <div className="flex flex-col divide-y divide-line">
              <div className="flex items-center justify-between p-4">
                <div>
                  <h4 className="text-body-strong text-ink">Friday Worship Night</h4>
                  <p className="text-small text-ink-2 mt-0.5">This Friday • Main Hall</p>
                </div>
                <Button variant="outline">Details</Button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h4 className="text-body-strong text-ink">Campus Outreach Training</h4>
                  <p className="text-small text-ink-2 mt-0.5">Saturday morning • Room 201</p>
                </div>
                <Button variant="outline">Details</Button>
              </div>
            </div>
          </Panel>
        </div>

        {/* Side Column */}
        <div className="space-y-6">
          <Panel title="Meeting Details">
            <div className="p-4 flex flex-col gap-4">
              <div>
                <span className="block text-small font-medium text-ink-3 uppercase tracking-wide">Day & Time</span>
                <span className="block text-body text-ink mt-1">Fridays at 5:00 PM</span>
              </div>
              <div>
                <span className="block text-small font-medium text-ink-3 uppercase tracking-wide">Location</span>
                <span className="block text-body text-ink mt-1">Main Hall, 4 Kilo</span>
              </div>
              <div>
                <span className="block text-small font-medium text-ink-3 uppercase tracking-wide">Contact</span>
                <span className="block text-body text-ink mt-1">0911-23-45-67</span>
              </div>
            </div>
          </Panel>

          <Panel title="Leadership Team">
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Avatar size="sm" kind="doodle" name="Abebe" />
                <span className="text-body text-ink font-medium">Abebe Bikila</span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar size="sm" kind="doodle" name="Hana" />
                <span className="text-body text-ink font-medium">Hana Lemma</span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar size="sm" kind="doodle" name="Caleb" />
                <span className="text-body text-ink font-medium">Caleb Tadesse</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>

    </div>
  );
}
