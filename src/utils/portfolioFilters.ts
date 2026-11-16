import type { PublicationItem, ProjectItem, SkillGroup } from '../data/portfolioData';

export type PublicationFilter = 'All' | 'Journal' | 'Conference';
export type ProjectFilter = 'All' | 'Research' | 'Open Source' | 'Web App' | '3D Mapping';

export function filterPublications(
  publications: PublicationItem[],
  typeFilter: PublicationFilter,
  query: string
): PublicationItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return publications.filter((pub) => {
    const matchesType = typeFilter === 'All' || pub.type === typeFilter;
    if (!matchesType) return false;

    if (!normalizedQuery) return true;

    const haystack = [
      pub.title,
      pub.authors,
      pub.venue,
      pub.doi,
      String(pub.year),
      ...pub.methods,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function filterProjects(
  projects: ProjectItem[],
  categoryFilter: ProjectFilter
): ProjectItem[] {
  if (categoryFilter === 'All') return projects;
  return projects.filter((project) => project.category === categoryFilter);
}

export function filterSkillGroups(
  groups: SkillGroup[],
  selectedGroupId: string
): SkillGroup[] {
  if (selectedGroupId === 'all') return groups;
  return groups.filter((group) => group.id === selectedGroupId);
}

export function countPublicationsByType(
  publications: PublicationItem[]
): Record<PublicationFilter, number> {
  return publications.reduce<Record<PublicationFilter, number>>(
    (acc, pub) => {
      acc.All += 1;
      acc[pub.type] += 1;
      return acc;
    },
    { All: 0, Journal: 0, Conference: 0 }
  );
}
