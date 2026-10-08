/* Brief
   Reader: Student user
   Question: What is happening inside my fellowship right now?
   Action: Read announcements, view leaders, find team information.
   Register: Balanced (Headers + Panels)
*/
import Panel from "../../formic/components/Panel";
import Button from "../../formic/components/Button";
import { Avatar, Badge, IconTile, IconButton, Icon } from "../../formic/components/primitives";
import { CardGroup } from "../../formic/components/cards";
import { useToast } from "../../formic/components/Toast";

export default function MyFellowship() {
  const toast = useToast();
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar size="xl" kind="doodle" name="Agape Fellowship" />
          <div>
            <h1 className="text-h2 text-ink">Agape Fellowship</h1>
            <p className="text-body text-ink-2 mt-1">Addis Ababa University • Main Campus</p>
          </div>
        </div>
        <Badge tone="green" >Active Member</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Panel title="Recent Announcements">
             <div className="p-4 space-y-4">
               <div className="flex items-start gap-3">
                 <Avatar size="sm" kind="photo" name="Lydia" />
                 <div>
                   <div className="flex items-center gap-2">
                     <span className="text-body-strong text-ink">Lydia Tadesse (Leader)</span>
                     <span className="text-small text-ink-3">Yesterday</span>
                   </div>
                   <p className="text-body text-ink mt-1">Hello everyone! We are launching a new Evangelism outreach program this weekend. Please check the events page to RSVP.</p>
                 </div>
               </div>
               <div className="border-t border-line" />
               <div className="flex items-start gap-3">
                 <Avatar size="sm" kind="photo" name="Ephrem" />
                 <div>
                   <div className="flex items-center gap-2">
                     <span className="text-body-strong text-ink">Ephrem K. (Admin)</span>
                     <span className="text-small text-ink-3">Oct 2, 2026</span>
                   </div>
                   <p className="text-body text-ink mt-1">The library room for Friday Bible Study has been moved to Room 4 for the remainder of the semester.</p>
                 </div>
               </div>
             </div>
          </Panel>

          <Panel title="My Teams">
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-canvas-subtle border border-line rounded-card">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                    <IconTile icon="users" />
                  </div>
                  <div>
                    <h4 className="text-body-strong text-ink">Worship Team</h4>
                    <p className="text-small text-ink-2">Member • Meetings on Thursdays</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => toast({ title: "Opening Team Space", description: "Team workspace feature coming soon." })}>View Team</Button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Leadership">
            <div className="flex flex-col p-4 gap-4">
              <div className="flex items-center gap-3">
                <Avatar size="md" kind="photo" name="Lydia" />
                <div className="min-w-0 flex-1">
                  <p className="text-body-strong text-ink truncate">Lydia Tadesse</p>
                  <p className="text-caption text-ink-2 truncate">Fellowship Leader</p>
                </div>
                <IconButton label="Message" onClick={() => toast({ title: "Opening Messages", description: "Direct messaging feature coming soon." })}><Icon name="mail" size={16} /></IconButton>
              </div>
              <div className="flex items-center gap-3">
                <Avatar size="md" kind="photo" name="Dawit" />
                <div className="min-w-0 flex-1">
                  <p className="text-body-strong text-ink truncate">Dawit Mekonnen</p>
                  <p className="text-caption text-ink-2 truncate">Vice Leader</p>
                </div>
                <IconButton label="Message" onClick={() => toast({ title: "Opening Messages", description: "Direct messaging feature coming soon." })}><Icon name="mail" size={16} /></IconButton>
              </div>
            </div>
          </Panel>

          <Panel title="About Us">
            <div className="p-4 space-y-3 text-small text-ink-2">
              <p>We are a community of believers dedicated to growing in faith, serving our campus, and spreading the Gospel.</p>
              <div className="flex flex-col gap-2 pt-2 border-t border-line">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink w-20">Founded</span>
                  <span>2015</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink w-20">Members</span>
                  <span>450+</span>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
