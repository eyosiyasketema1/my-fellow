/* Brief
   Reader: Student user on their main home page.
   Question: What is happening in my fellowship and what's next?
   Action: View next event, check announcements.
   Register: Balanced
*/
import { useNavigate } from "react-router-dom";
import Panel from "../../formic/components/Panel";
import Button from "../../formic/components/Button";
import { useToast } from "../../formic/components/Toast";
import { Card, Badge, Avatar } from "../../formic/components/primitives";

export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-h2 text-ink">Welcome back, Abebe!</h1>
        <p className="text-body text-ink-2 mt-1">Here is what's happening in Agape Fellowship.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          {/* My Fellowship - Wide Card */}
          <Card className="group relative overflow-hidden flex flex-col border-0 shadow-none transition-all" style={{ minHeight: 420 }}>
            <div className="absolute inset-0">
              <img src="/agape-bg.jpg" alt="Agape Fellowship" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.1))' }} />
            </div>
            
            <div className="relative flex flex-col h-full p-6 justify-between flex-1">
              <div>
                <Badge tone="green">Member</Badge>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-col gap-2">
                  {/* formic-ok: text over dark image overlay */}
                  <h3 className="text-body-strong uppercase tracking-wide text-micro opacity-90" style={{ color: 'white' }}>My Fellowship</h3>
                  {/* formic-ok: user specifically requested 48px size */}
                  {/* formic-ok: text over dark image overlay */}
                  <h4 className="tracking-tight font-semibold" style={{ color: 'white', fontSize: '48px', lineHeight: '1.1' }}>Agape Fellowship</h4>
                </div>
                <Button variant="accent" onClick={() => navigate("/student/fellowship")}>View Fellowship</Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions - Horizontal Row */}
          <div>
            <h3 className="text-body-strong text-ink uppercase tracking-wide text-micro mb-3 px-2">Quick Action</h3>
            <div className="flex flex-row flex-wrap gap-2">
               <Button variant="ghost" style={{ color: 'var(--accent)' }} icon="bookmark" onClick={() => navigate("/student/growth")}>Daily Devotionals</Button>
               <Button variant="ghost" style={{ color: 'var(--accent)' }} icon="star" onClick={() => navigate("/student/events")}>Prayer Requests</Button>
               <Button variant="ghost" style={{ color: 'var(--accent)' }} icon="mail">Contact Leaders</Button>
            </div>
          </div>

          <Panel title="Recent Announcements" className="flex-1">
             <div className="p-4 space-y-4">
               <div className="flex items-start gap-3">
                 <Avatar size="sm" kind="doodle" name="Hana" />
                 <div>
                   <div className="flex items-center gap-2">
                     <span className="text-body-strong text-ink">Hana Lemma</span>
                     <span className="text-small text-ink-3">2 hours ago</span>
                   </div>
                   <p className="text-body text-ink mt-1">Don't forget to bring your study materials for the evangelism training tomorrow morning!</p>
                 </div>
               </div>
               <div className="border-t border-line" />
               <div className="flex items-start gap-3">
                 <Avatar size="sm" kind="doodle" name="Abebe" />
                 <div>
                   <div className="flex items-center gap-2">
                     <span className="text-body-strong text-ink">Abebe Bikila</span>
                     <span className="text-small text-ink-3">Yesterday</span>
                   </div>
                   <p className="text-body text-ink mt-1">The worship team will be meeting at 4:00 PM on Friday before the main service.</p>
                 </div>
               </div>
             </div>
          </Panel>
        </div>

        {/* Side Column */}
        <div className="space-y-6">
          {/* Upcoming Events - Tall Vertical */}
          <div className="flex flex-col bg-surface rounded-card shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-line bg-accent">
              <h3 className="text-body-strong font-medium text-canvas">Upcoming Events</h3>
              <Button variant="secondary" size="sm" onClick={() => navigate("/student/events")}>View all</Button>
            </div>
            <div className="flex flex-col divide-y divide-line p-2">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center shrink-0 w-11 h-11 bg-surface rounded-md border border-line shadow-card text-ink">
                    <span className="text-micro font-semibold text-accent uppercase">Oct</span>
                    <span className="text-h4 leading-none mt-0.5">12</span>
                  </div>
                  <div>
                    <h4 className="text-body-strong text-ink">Friday Worship Night</h4>
                    <p className="text-small text-ink-2 mt-0.5">5:00 PM • Main Hall, 4 Kilo</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => toast({ tone: "success", title: "RSVP Confirmed", description: "You have successfully registered for this event." })}>RSVP</Button>
              </div>
              
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center shrink-0 w-11 h-11 bg-surface rounded-md border border-line shadow-card text-ink">
                    <span className="text-micro font-semibold text-accent uppercase">Oct</span>
                    <span className="text-h4 leading-none mt-0.5">14</span>
                  </div>
                  <div>
                    <h4 className="text-body-strong text-ink">Sunday Morning Service</h4>
                    <p className="text-small text-ink-2 mt-0.5">9:00 AM • Room 201</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => toast({ tone: "success", title: "RSVP Confirmed", description: "You have successfully registered for this event." })}>RSVP</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
