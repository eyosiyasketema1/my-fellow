/* Brief
   Reader: System Admin
   Question: What content needs approval before being published?
   Action: Review, approve or reject content submissions from Ministry.
   Register: Balanced (CardGroup inline)
*/
import { useState } from "react";
import { CardGroup, CardHeader, CardTitle, CardFooter, CardButton } from "../../formic/components/cards";
import { Badge, Card } from "../../formic/components/primitives";
import Button from "../../formic/components/Button";
import Modal from "../../formic/components/Modal";
import { useToast } from "../../formic/components/Toast";

const PENDING = [
  { id: "1", title: "Understanding Grace", author: "Abenezer (Ministry)", category: "Bible Study", submitted: "2 days ago" },
  { id: "2", title: "Daily Devotional - Week 4", author: "Hana A. (Ministry)", category: "Prayer", submitted: "5 hours ago" },
];

export default function AdminApprovals() {
  const toast = useToast();
  const [previewContent, setPreviewContent] = useState<typeof PENDING[0] | null>(null);

  const handleApprove = () => {
    setPreviewContent(null);
    toast({ tone: "success", title: "Content Approved", description: "The content is now live and visible to students." });
  };

  const handleReject = () => {
    toast({ tone: "success", title: "Content Rejected", description: "The content has been removed from the approval queue." });
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">Content Approvals</h1>
          <p className="text-body text-ink-2 mt-1">Review spiritual growth content submitted by Ministry staff.</p>
        </div>
      </div>

      <CardGroup orientation="inline">
        {PENDING.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge tone="orange">Pending Approval</Badge>
                <span className="text-caption text-ink-3">Submitted {r.submitted}</span>
              </div>
              <CardTitle>{r.title}</CardTitle>
              <p className="text-body text-ink-2 mt-1.5">
                <strong>Author:</strong> {r.author} <br />
                <strong>Category:</strong> {r.category}
              </p>
            </CardHeader>
            <CardFooter>
              <CardButton icon="file" className="hover:text-accent" onClick={() => setPreviewContent(r)}>Preview</CardButton>
              <CardButton icon="check" className="hover:text-green" onClick={handleApprove}>Approve</CardButton>
              <CardButton icon="close" className="hover:text-red" onClick={handleReject}>Reject</CardButton>
            </CardFooter>
          </Card>
        ))}
      </CardGroup>

      <Modal 
        open={!!previewContent} 
        onClose={() => setPreviewContent(null)}
        title={previewContent ? previewContent.title : "Preview Content"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setPreviewContent(null)}>Close Preview</Button>
            <Button variant="accent" onClick={handleApprove}>Approve</Button>
          </>
        }
      >
        {previewContent && (
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-1">
              <p className="text-small text-ink-2">By {previewContent.author} • Category: {previewContent.category}</p>
            </div>
            <div className="prose text-body text-ink space-y-4">
              <p>
                This is a placeholder for the rich text content of <strong>{previewContent.title}</strong>. 
                In the real application, this would render the Markdown or HTML content submitted by the ministry user.
              </p>
              <p>
                Admins can read through this content to ensure it aligns with the platform's guidelines before making it available to all students.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
