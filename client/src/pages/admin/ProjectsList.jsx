import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Pencil, Trash2, Search, Star, PlusCircle } from "lucide-react";
import { getProjects, deleteProject, CATEGORIES } from "../../services/projectService.js";
import { TableRowSkeleton } from "../../components/SkeletonLoader.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toDelete, setToDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { all: "true" };
      if (category !== "All") params.category = category;
      if (search) params.search = search;
      const data = await getProjects(params);
      setProjects(data.projects);
    } catch {
      toast.error("Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const handleDelete = async () => {
    try {
      await deleteProject(toDelete._id);
      toast.success("Project deleted.");
      setProjects((p) => p.filter((x) => x._id !== toDelete._id));
    } catch {
      toast.error("Could not delete project.");
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-ink-600 dark:text-paper-100/70">
            Create, edit, and manage portfolio projects.
          </p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary">
          <PlusCircle size={16} /> Add Project
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-ink-900/10 bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none focus:border-signal dark:border-white/10"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-ink-900/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal dark:border-white/10 dark:bg-ink-900"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-900/10 text-ink-500 dark:border-white/10">
            <tr>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/5 dark:divide-white/5">
            {loading &&
              Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)}
            {!loading &&
              projects.map((p) => (
                <tr key={p._id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                    <span className="font-medium">{p.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.status}</td>
                  <td className="px-4 py-3">
                    {p.featured && <Star size={16} className="fill-signal text-signal" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/projects/${p._id}/edit`}
                        className="rounded-lg p-2 text-ink-500 hover:bg-ink-900/5 hover:text-signal dark:hover:bg-white/5"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => setToDelete(p)}
                        className="rounded-lg p-2 text-ink-500 hover:bg-red-500/10 hover:text-red-500"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && projects.length === 0 && (
          <div className="p-6">
            <EmptyState
              title="No projects found"
              description="Try a different search or category, or add your first project."
            />
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!toDelete}
        title={`Delete "${toDelete?.title}"?`}
        description="This will permanently remove the project from your portfolio. This can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
};

export default ProjectsList;
