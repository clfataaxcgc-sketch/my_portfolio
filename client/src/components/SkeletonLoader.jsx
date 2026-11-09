export const ProjectCardSkeleton = () => (
  <div className="card-surface overflow-hidden">
    <div className="skeleton aspect-video" />
    <div className="space-y-3 p-5">
      <div className="skeleton h-5 w-2/3" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-1/2" />
    </div>
  </div>
);

export const ProjectGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
);

export const TableRowSkeleton = ({ cols = 5 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="skeleton h-4 w-full" />
      </td>
    ))}
  </tr>
);
