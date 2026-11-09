import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Save, X } from "lucide-react";
import { getProject, createProject, updateProject, CATEGORIES } from "../../services/projectService.js";

const empty = {
  title: "",
  shortDescription: "",
  description: "",
  category: "React",
  technologies: "",
  features: "",
  image: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  status: "published",
};

const AddEditProject = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getProject(id)
      .then(({ project }) =>
        setForm({
          ...project,
          technologies: project.technologies?.join(", ") || "",
          features: project.features?.join(", ") || "",
        })
      )
      .catch(() => toast.error("Could not load project."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      features: form.features.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (isEdit) {
        await updateProject(id, payload);
        toast.success("Project updated.");
      } else {
        await createProject(payload);
        toast.success("Project created.");
      }
      navigate("/admin/projects");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not save project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="skeleton h-96 w-full max-w-2xl" />;
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-ink-900/10 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal dark:border-white/10 dark:bg-ink-900";

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold">{isEdit ? "Edit Project" : "Add Project"}</h1>
      <p className="mt-1 text-sm text-ink-600 dark:text-paper-100/70">
        {isEdit ? "Update the project details below." : "Fill in the details to publish a new project."}
      </p>

      <form onSubmit={handleSubmit} className="card-surface mt-6 flex flex-col gap-4 p-6">
        <div>
          <label className="text-sm font-medium">Title</label>
          <input required name="title" value={form.title} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="text-sm font-medium">Short Description</label>
          <input
            required
            name="shortDescription"
            maxLength={200}
            value={form.shortDescription}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Full Description</label>
          <textarea
            required
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Technologies (comma separated)</label>
          <input name="technologies" value={form.technologies} onChange={handleChange} className={inputClass} placeholder="React, Node.js, MongoDB" />
        </div>

        <div>
          <label className="text-sm font-medium">Features (comma separated)</label>
          <input name="features" value={form.features} onChange={handleChange} className={inputClass} placeholder="Auth, Cart, Admin panel" />
        </div>

        <div>
          <label className="text-sm font-medium">Project Image URL</label>
          <input required name="image" value={form.image} onChange={handleChange} className={inputClass} placeholder="https://..." />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">GitHub URL</label>
            <input name="githubUrl" value={form.githubUrl} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium">Live Demo URL</label>
            <input name="liveUrl" value={form.liveUrl} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <label className="mt-1 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 accent-signal" />
          Mark as Featured
        </label>

        <div className="mt-2 flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
          </button>
          <button type="button" onClick={() => navigate("/admin/projects")} className="btn-secondary">
            <X size={16} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProject;
