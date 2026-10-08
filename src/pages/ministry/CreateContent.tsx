/* Brief
   Reader: Ministry Staff
   Question: How do I create or edit spiritual growth content?
   Action: Fill out form, write content, and publish or save as draft.
   Register: Text/Form (Full page editor)
*/
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Panel from "../../formic/components/Panel";
import Input, { Field, Textarea } from "../../formic/components/Input";
import Select from "../../formic/components/Select";
import Button from "../../formic/components/Button";
import { useToast } from "../../formic/components/Toast";

import { IconButton, Icon } from "../../formic/components/primitives";

export default function MinistryCreateContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const isEditing = !!id;

  const [title, setTitle] = useState(isEditing ? "Understanding Grace" : "");
  const [category, setCategory] = useState(isEditing ? "bible_study" : "");
  
  const handleSave = (status: "draft" | "pending") => {
    toast({
      tone: "success",
      title: status === "draft" ? "Draft Saved" : "Submitted for Approval",
      description: status === "pending" ? "Your content will be reviewed by an admin." : "You can continue editing later."
    });
    navigate("/ministry/content");
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h2 text-ink">{isEditing ? "Edit Content" : "Create New Content"}</h1>
          <p className="text-body text-ink-2 mt-1">Draft spiritual growth resources for students.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/ministry/content")}>Cancel</Button>
          <Button variant="secondary" icon="bookmark" onClick={() => handleSave("draft")}>Save Draft</Button>
          <Button variant="accent" icon="check" onClick={() => handleSave("pending")}>Submit for Review</Button>
        </div>
      </div>

      <Panel title="Content Details">
        <div className="p-5 flex flex-col gap-6">
          <Field label="Title" required>
            <Input 
              type="text" 
              placeholder="e.g. 5 Days of Prayer" 
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Category" required>
              <Select 
                value={category}
                onChange={setCategory}
                options={[
                  { label: "Bible Study", value: "bible_study" },
                  { label: "Prayer", value: "prayer" },
                  { label: "Discipleship", value: "discipleship" },
                  { label: "Evangelism", value: "evangelism" },
                  { label: "Leadership", value: "leadership" },
                  { label: "Missions", value: "missions" },
                ]}
              />
            </Field>

            <Field label="Content Type" required>
              <Select 
                value="article"
                options={[
                  { label: "Article / Reading", value: "article" },
                  { label: "Devotional Plan", value: "devotional" },
                  { label: "Video Link", value: "video" },
                ]}
              />
            </Field>
          </div>

          <Field label="Description / Summary">
            <Textarea placeholder="A brief summary of what students will learn..." rows={3} />
          </Field>
        </div>
      </Panel>

      <Panel title="Main Content" caption="Use Markdown formatting">
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-1 p-1 bg-canvas-subtle border border-line rounded-md">
            <IconButton label="Heading" className="text-ink-2 hover:bg-hover hover:text-ink">
              <Icon name="typography" size={16} />
            </IconButton>
            <IconButton label="Link" className="text-ink-2 hover:bg-hover hover:text-ink">
              <Icon name="link" size={16} />
            </IconButton>
            <IconButton label="List" className="text-ink-2 hover:bg-hover hover:text-ink">
              <Icon name="list" size={16} />
            </IconButton>
            <IconButton label="Image" className="text-ink-2 hover:bg-hover hover:text-ink">
              <Icon name="image" size={16} />
            </IconButton>
          </div>
          <Textarea 
            placeholder="Write your content here..." 
            rows={15} 
            className="font-mono text-small"
            defaultValue={isEditing ? "Grace is the unmerited favor of God..." : ""}
          />
        </div>
      </Panel>
    </div>
  );
}
