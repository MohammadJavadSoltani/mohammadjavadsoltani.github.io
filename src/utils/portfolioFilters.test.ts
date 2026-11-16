import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { BACKDROP_SCENES, PROFILE, PUBLICATIONS, PROJECTS, SKILL_GROUPS } from '../data/portfolioData';
import {
  countPublicationsByType,
  filterProjects,
  filterPublications,
  filterSkillGroups,
} from './portfolioFilters';

test('countPublicationsByType counts only published works (2 journals, 1 conference)', () => {
  const counts = countPublicationsByType(PUBLICATIONS);
  assert.equal(counts.All, 3);
  assert.equal(counts.Journal, 2);
  assert.equal(counts.Conference, 1);
});

test('every published paper includes its PDF and expected figure count', () => {
  const rsase = PUBLICATIONS.find((p) => p.id === 'rsase-2026');
  const wetlands = PUBLICATIONS.find((p) => p.id === 'wetlands-2026');
  const decline = PUBLICATIONS.find((p) => p.id === 'isprs-2025');

  assert.ok(rsase && rsase.figures.length === 4 && rsase.pdfUrl.endsWith('.pdf'));
  assert.ok(wetlands && wetlands.figures.length === 4 && wetlands.pdfUrl.endsWith('.pdf'));
  assert.ok(decline && decline.figures.length === 3 && decline.pdfUrl.endsWith('.pdf'));
});

test('filterPublications filters by type and search query case-insensitively', () => {
  const journals = filterPublications(PUBLICATIONS, 'Journal', '');
  assert.equal(journals.length, 2);

  const wetlandSearch = filterPublications(PUBLICATIONS, 'All', 'wetland');
  assert.equal(wetlandSearch.length, 1);
  assert.equal(wetlandsId(wetlandSearch[0].id), 'wetlands-2026');

  const combined = filterPublications(PUBLICATIONS, 'Conference', 'loess');
  assert.equal(combined.length, 1);
  assert.equal(combined[0].id, 'isprs-2025');

  const noMatch = filterPublications(PUBLICATIONS, 'Conference', 'wetland');
  assert.equal(noMatch.length, 0);
});

function wetlandsId(id: string) {
  return id;
}

test('filterProjects narrows down categories cleanly and includes all project images', () => {
  assert.equal(filterProjects(PROJECTS, 'All').length, 5);
  assert.equal(filterProjects(PROJECTS, 'Research').length, 2);
  assert.equal(filterProjects(PROJECTS, 'Web App').length, 1);
  assert.deepEqual(
    PROJECTS.map((p) => p.id),
    [
      'hyrcanian-phenology',
      'mosgwo-obia',
      'sar-surface-water',
      'ekbatan-dam-gee',
      'kntu-3d-campus',
    ]
  );
  assert.ok(PROJECTS.every((p) => p.image.startsWith('/assets/aistudio/') && p.image.endsWith('.jpg')));
});

test('all referenced images are compressed JPGs and all assets exist under public/', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const assetPaths = [
    PROFILE.portrait.src,
    PROFILE.crest.src,
    PROFILE.outreach.bannerSrc,
    PROFILE.cvUrl,
    ...BACKDROP_SCENES.map((scene) => scene.image),
    ...PUBLICATIONS.flatMap((pub) => [pub.pdfUrl, ...pub.figures.map((fig) => fig.src)]),
    ...PROJECTS.map((project) => project.image),
  ];

  for (const relUrl of assetPaths) {
    const filePath = path.join(publicDir, relUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(filePath), `Missing asset on disk: ${relUrl}`);
    if (!relUrl.endsWith('.pdf')) {
      assert.ok(relUrl.endsWith('.jpg'), `Expected compressed .jpg image: ${relUrl}`);
    }
  }
});

test('filterSkillGroups returns all or matching group', () => {
  assert.equal(filterSkillGroups(SKILL_GROUPS, 'all').length, 5);
  const mlOnly = filterSkillGroups(SKILL_GROUPS, 'ml-opt');
  assert.equal(mlOnly.length, 1);
  assert.equal(mlOnly[0].label, 'ML & Optimization');
});
