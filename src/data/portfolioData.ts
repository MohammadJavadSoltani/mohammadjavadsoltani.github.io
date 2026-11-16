export interface PaperFigure {
  src: string;
  caption: string;
  label: string;
}

export interface PublicationItem {
  id: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  type: 'Journal' | 'Conference';
  quartileOrSeries: string;
  doi: string;
  url: string;
  pdfUrl: string;
  abstract: string;
  highlights: string[];
  methods: string[];
  figures: PaperFigure[];
  bibtex: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  category: 'Research' | 'Open Source' | 'Web App' | '3D Mapping';
  supervisor?: string;
  summary: string;
  details: string;
  stack: string[];
  deliverable: string;
  featured?: boolean;
  image: string;
  imageCaption: string;
  repoUrl?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  gpa: string;
  rank: string;
  supervisors: string;
  thesis: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  summary: string;
  type: 'Lecturer' | 'Research' | 'Teaching';
}

export interface SkillGroup {
  id: string;
  label: string;
  description: string;
  items: string[];
}

export interface AwardItem {
  title: string;
  detail: string;
  year: string;
}

export interface ReferencePerson {
  name: string;
  role: string;
  affiliation: string;
  email: string;
}

export interface BackdropScene {
  id: string;
  sectionId: string;
  label: string;
  biome: string;
  coordinates: string;
  image: string;
  accent: 'earth' | 'biosphere' | 'sunlit';
  cropStyle?: string;
}

export const BACKDROP_SCENES: BackdropScene[] = [
  {
    id: 'orbital-scan',
    sectionId: 'top',
    label: '01 · ORBITAL DIAGNOSTICS',
    biome: 'Global Spectral Scan',
    coordinates: 'LEO 786 KM · SUN-SYNC',
    image: '/assets/aistudio/7_56e325ba.jpg',
    accent: 'earth',
    cropStyle: '50% 48%',
  },
  {
    id: 'glacial-watershed',
    sectionId: 'trajectory',
    label: '02 · HYDRO-WATERSHED',
    biome: 'Glacial Fjord & Runoff Plume',
    coordinates: '61.12°N · 146.35°W',
    image: '/assets/aistudio/1_274d23a6.jpg',
    accent: 'biosphere',
    cropStyle: '50% 50%',
  },
  {
    id: 'wetland-plume',
    sectionId: 'publications',
    label: '03 · AGRO-WETLAND EO',
    biome: 'Chlorophyll Plume & Polder Mosaic',
    coordinates: '52.78°N · 5.19°E',
    image: '/assets/aistudio/3_e30b2fbd.jpg',
    accent: 'biosphere',
    cropStyle: '52% 50%',
  },
  {
    id: 'coastal-basin',
    sectionId: 'projects',
    label: '04 · BASIN & CROP GRID',
    biome: 'Coastal Reservoir & Parcel Matrix',
    coordinates: '43.89°N · 86.44°W',
    image: '/assets/aistudio/2_f1aa8c8b.jpg',
    accent: 'earth',
    cropStyle: '50% 45%',
  },
  {
    id: 'outreach-horizon',
    sectionId: 'experience',
    label: '05 · EARTH ANSWERS',
    biome: 'Multi-Decadal Planetary Archive',
    coordinates: 'GLOBAL ARCHIVE · 1983–2026',
    image: '/assets/aistudio/2_f1aa8c8b.jpg',
    accent: 'biosphere',
    cropStyle: '50% 60%',
  },
  {
    id: 'cosmic-horizon',
    sectionId: 'contact',
    label: '06 · SIGNAL HORIZON',
    biome: 'Solar Limb & Collaboration Relay',
    coordinates: '35.75°N · 51.41°E',
    image: '/assets/aistudio/5_ba596f11.jpg',
    accent: 'sunlit',
    cropStyle: '60% 35%',
  },
];

export const PROFILE = {
  name: 'Mohammad Javad Soltani',
  shortName: 'M. J. Soltani',
  headline: 'Mapping Earth systems through optimization, time-series & GeoAI.',
  kicker: 'Environmental Remote Sensing & GeoAI · KNTU Tehran',
  summary:
    'Remote Sensing researcher applying Object-Based Image Analysis (OBIA), metaheuristic optimization, and machine learning to agro-wetland, water-basin, and forest ecosystem monitoring. MSc Rank 1st at KNTU, published in Q1 journals, and experienced in Google Earth Engine, Python, and multi-decadal time-series archives.',
  portrait: {
    src: '/assets/aistudio/image_433a593d.jpg',
    alt: 'Mohammad Javad Soltani — Remote Sensing & GeoAI Researcher',
    caption: 'K. N. Toosi University of Technology · Tehran, Iran',
  },
  crest: {
    src: '/assets/aistudio/personal_logo_a30608bb.jpg',
    alt: 'M. Javad S — Remote Sensing Specialist crest featuring satellite swath, wetland hydrology, forest phenology, GEE, and Python',
  },
  outreach: {
    title: 'WHY HERE? — Earth Answers From Space',
    subtitle: 'Science Communication & Environmental Remote Sensing Channel',
    description:
      'Translating satellite Earth observation, Google Earth Engine cloud pipelines, agro-wetland diagnostics, and hydro-climatic shifts into accessible visual stories across nature, cities, and changing landscapes.',
    bannerSrc: '/assets/aistudio/youtube_channel_b4a8c494.jpg',
    bannerAlt: 'Why Here? Earth Answers From Space — Satellites, Data, Real Places, Bigger Questions banner',
    platformLabel: 'Maktabkhooneh & Science Communication',
    channelHandle: '@WhyHereEO',
    channelUrl: 'https://www.youtube.com/@WhyHereEO',
  },
  email: 'mjavadsoltani@email.kntu.ac.ir',
  orcid: '0009-0007-7912-4661',
  orcidUrl: 'https://orcid.org/0009-0007-7912-4661',
  scholarUrl: 'https://scholar.google.com/citations?user=soP8IeoAAAAJ&hl=en',
  githubUrl: 'https://mohammadjavadsoltani.github.io/',
  githubProfileUrl: 'https://github.com/MohammadJavadSoltani',
  linkedinUrl: 'https://www.linkedin.com/in/mohammad-javad-soltani/',
  youtubeUrl: 'https://www.youtube.com/@WhyHereEO',
  cvUrl: '/assets/aistudio/MJ_Soltani_CV_c449613f.pdf',
  location: 'Tehran, Iran',
  birthDate: 'Sep 2000',
  languages: [
    { name: 'Persian', level: 'Native' },
    { name: 'English', level: 'Highly Proficient' },
  ],
};

export const HERO_METRICS = [
  {
    value: 'Rank 1st',
    label: 'MSc Remote Sensing & Photogrammetry (GPA 3.71/4.0)',
  },
  {
    value: '3 Published',
    label: 'Peer-reviewed Q1 journals & ISPRS Annals (2025–2026)',
  },
  {
    value: 'Rank 2nd',
    label: 'BSc Geomatics Engineering & Dean’s List Best Student',
  },
  {
    value: 'GEE & Python',
    label: 'Multi-decadal SAR, MODIS & AVHRR time-series pipelines',
  },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'rsase-2026',
    year: 2026,
    title:
      'Beyond Trial-and-Error: Geometrically balanced, Multi-Objective Optimization for Segmenting Remote Sensing Data Over Complex Environments',
    authors: 'Mohammad Javad Soltani, Hooman Latifi, Hamed Naghavi',
    venue: 'Remote Sensing Applications: Society and Environment',
    type: 'Journal',
    quartileOrSeries: 'Q1 Journal · Vol. 42, 102050',
    doi: '10.1016/j.rsase.2026.102050',
    url: 'https://doi.org/10.1016/j.rsase.2026.102050',
    pdfUrl: '/assets/aistudio/1-s2.0-S2352938526001837-main_Comp_b5479f8f.pdf',
    abstract:
      'Replaces manual trial-and-error parameter tuning in OBIA with a supervised and label-free multi-objective Grey Wolf Optimization (GWO) framework on Sentinel-2 imagery. Introduces a normalized Over-Segmentation Factor (OSF, R² = 0.99 with segment count) alongside Elimination Factor, IoU, weighted IoU, and staged F1-seg to balance thematic accuracy and geometric fidelity across heterogeneous agro-wetland landscapes.',
    highlights: [
      'Labeled optimization: F1 = 0.627, OSF = 0.175',
      'Label-free viability: F1 = 0.625, W-IoU = 0.710, OSF = 0.138',
      'OSF correlates with segment count (R² = 0.99, p < 0.000001)',
    ],
    methods: ['OBIA', 'Grey Wolf Optimizer', 'OSF & W-IoU', 'Hybrid Labeling', 'Sentinel-2'],
    figures: [
      {
        src: '/assets/aistudio/image_50bf71ae.jpg',
        label: 'Fig. 1 · Workflow',
        caption:
          'Five-stage automated segmentation optimization architecture: GEE Sentinel-2 ingestion, VSURF feature selection, field sampling, parallel GWO + RSGISLib search, and statistical evaluation.',
      },
      {
        src: '/assets/aistudio/image_8ae5bc28.jpg',
        label: 'Fig. 2 · Meta-Analysis',
        caption:
          'Systematic literature synthesis across segmentation algorithms, optimization strategies (58 trial-and-error vs. 20 metaheuristic studies), evaluation metrics, and sensor resolutions.',
      },
      {
        src: '/assets/aistudio/image_d1078364.jpg',
        label: 'Fig. 3 · Hybrid Labeling',
        caption:
          'Two-stage hybrid segment labeling protocol resolving seasonal wetland fragmentation and small agricultural field alignment at Sentinel-2 10 m resolution.',
      },
      {
        src: '/assets/aistudio/image_891ebf39.jpg',
        label: 'Fig. 4 · Convergence Trends',
        caption:
          'Block-Bootstrapped Mann-Kendall optimization trajectories without labeled data across Average F1-seg, IoU, Eliminated polygons, OSF, W-IoU, and Objective score.',
      },
    ],
    bibtex: `@article{soltani2026beyond,
  title={Beyond trial-and-error: Geometrically balanced, multi-objective optimization for segmenting remote sensing data over complex environments},
  author={Soltani, Mohammad Javad and Latifi, Hooman and Naghavi, Hamed},
  journal={Remote Sensing Applications: Society and Environment},
  volume={42},
  pages={102050},
  year={2026},
  doi={10.1016/j.rsase.2026.102050}
}`,
  },
  {
    id: 'wetlands-2026',
    year: 2026,
    title:
      'Hybrid Data Augmentation and Object-Based Analysis for LULC Mapping with Imbalanced Training Data in Complex Wetlands',
    authors: 'Mohammad Javad Soltani, Hooman Latifi, Hamed Naghavi',
    venue: 'Wetlands',
    type: 'Journal',
    quartileOrSeries: 'Q1 Journal · Vol. 46:101',
    doi: '10.1007/s13157-026-02121-z',
    url: 'https://doi.org/10.1007/s13157-026-02121-z',
    pdfUrl: '/assets/aistudio/007dbc0e-6e09-4f4a-9195-61ccc6510502_59b8c16a.pdf',
    abstract:
      'Integrates Object-Based Image Analysis (OBIA) over Sentinel-1 SAR and Sentinel-2 optical time series with targeted data augmentation (Borderline-SMOTE, SMOTE-Tomek, ADASYN, bootstrap, Gaussian noise) and SelectKBest feature selection to resolve severe class imbalance across 13 wetland and crop classes in Bisheh-Dalan wetland, capturing pre-drought (2019–2022) and post-drought (2022–2024) trajectories.',
    highlights: [
      'Minority-class F1-scores improved by > 20% with Borderline-SMOTE + Extra Trees',
      'Retained rare indicator classes (Degraded Wetland & Plowed F1 ≥ 0.80 in LOOCV)',
      '6,311 segmented objects mapped across 2019–2024 with mean confidence 0.658',
    ],
    methods: ['OBIA', 'Borderline-SMOTE', 'Extra Trees', 'Sentinel-1 & 2', 'Theil-Sen'],
    figures: [
      {
        src: '/assets/aistudio/image_1f8ac07e.jpg',
        label: 'Fig. 1 · Augmentation Benchmark',
        caption:
          'Comparison of Test Accuracy, F1-Score, and Overfitting Score across Borderline-SMOTE (BS), SMOTE-Tomek (ST), SMOTE (S), Bootstrap (B), Gaussian Noise (GN), and Original (O).',
      },
      {
        src: '/assets/aistudio/image_ace3ee82.jpg',
        label: 'Fig. 2 · Ablation Cases',
        caption:
          'Precision, Recall, F1-Score, failed-class count (F1=0), and overfitted-class count (F1=1) across non-augmented, augmented, and optimal Case 7 (50-50 Aug) models.',
      },
      {
        src: '/assets/aistudio/image_8f1958c1.jpg',
        label: 'Fig. 3 · LULC & Confidence',
        caption:
          '2024 13-class LULC classification of Bishe-Dalan wetland (A) alongside object-level classification confidence across 6,311 segments (B, mean = 0.658).',
      },
      {
        src: '/assets/aistudio/image_6d14542d.jpg',
        label: 'Fig. 4 · Drought Transitions',
        caption:
          'Piecewise Theil-Sen slopes (ha/yr) for pre-drought 2019–2022 (A) and post-drought 2022–2024 (B), with Sankey class transitions from 2019 to 2024 (C).',
      },
    ],
    bibtex: `@article{soltani2026hybrid,
  title={Hybrid Data Augmentation and Object-Based Analysis for LULC Mapping with Imbalanced Training Data in Complex Wetlands},
  author={Soltani, Mohammad Javad and Latifi, Hooman and Naghavi, Hamed},
  journal={Wetlands},
  volume={46},
  number={101},
  year={2026},
  doi={10.1007/s13157-026-02121-z}
}`,
  },
  {
    id: 'isprs-2025',
    year: 2025,
    title:
      'Modeling tree decline trends using hybrid feature engineering and climatic trend analysis',
    authors: 'Mohammad Javad Soltani, Hooman Latifi, Sajad Bahraini Moghadam, Marziye Ghasemi',
    venue: 'ISPRS Annals of the Photogrammetry, Remote Sensing and Spatial Information Sciences',
    type: 'Conference',
    quartileOrSeries: 'ISPRS Geospatial Conference · Vol. X-4/W8-2025',
    doi: '10.5194/isprs-annals-X-4-W8-2025-729-2026',
    url: 'https://doi.org/10.5194/isprs-annals-X-4-W8-2025-729-2026',
    pdfUrl: '/assets/aistudio/isprs-annals-X-4-W8-2025-729-2026_4eb86d80.pdf',
    abstract:
      'Integrates Sentinel-2 spectral indices, UAV-derived Phenological Decline Index (PDI), hybrid feature selection/PLSR extraction, LOESS trend smoothing, and Sequential Mann-Kendall (sMK) analysis of 1983–2025 FLDAS climatic drivers to model Zagros oak forest decline across Fars and Chaharmahal sites.',
    highlights: [
      'Hybrid feature engineering raised Random Forest R² from 0.40 to 0.60 (RMSE 0.13 → 0.10)',
      'Continuous PDI produced smoother, more reliable 9-year trajectories than discrete classes',
      '42-year FLDAS sMK analysis revealed strong soil moisture drying decoupled from short-term recovery',
    ],
    methods: ['Tree Decline', 'Hybrid Feature Engineering', 'LOESS', 'Sequential Mann-Kendall', 'UAV + Sentinel-2'],
    figures: [
      {
        src: '/assets/aistudio/class_trends_X1_X3_LOESS_853df866.jpg',
        label: 'Fig. 1 · Class Decline Trends',
        caption:
          'LOESS-smoothed 2016–2024 trends comparing low-decline (Class X1) and high-decline (Class X3) tree observations across the Zagros study sites.',
      },
      {
        src: '/assets/aistudio/image_4e557ae7.jpg',
        label: 'Fig. 2 · PDI Violin & LOESS',
        caption:
          'Year-by-year violin distributions (A, B) and LOESS-smoothed mean Phenological Decline Index trajectories (C, D) for Chaharmahal and Fars sites (2016–2024).',
      },
      {
        src: '/assets/aistudio/image_af78b3dd.jpg',
        label: 'Fig. 3 · FLDAS Climatic sMK',
        caption:
          'Sequential Mann-Kendall Z-statistic forward/backward curves (1980–2025) for Evapotranspiration (A), Total Precipitation (B), Soil Moisture (C), and Soil Temperature (D).',
      },
    ],
    bibtex: `@inproceedings{soltani2025modeling,
  title={Modeling tree decline trends using hybrid feature engineering and climatic trend analysis},
  author={Soltani, Mohammad Javad and Latifi, Hooman and Moghadam, Sajad Bahraini and Ghasemi, Marziye},
  booktitle={ISPRS Annals of the Photogrammetry, Remote Sensing and Spatial Information Sciences},
  volume={X-4/W8-2025},
  pages={729--736},
  year={2025},
  doi={10.5194/isprs-annals-X-4-W8-2025-729-2026}
}`,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hyrcanian-phenology',
    title: 'Hyrcanian Forest Phenology & Elevation Dynamics',
    period: '2023 – 2024',
    category: 'Research',
    supervisor: 'Prof. H. Latifi',
    summary:
      'MODIS time-series phenological characterization of Hyrcanian mixed forests across elevation and latitude gradients.',
    details:
      'Extracted start-of-season, peak-greenness, and senescence timing metrics from multi-year MODIS NDVI/EVI archives using LOESS smoothing and seasonal decomposition, quantifying how elevation and latitude jointly govern temperate broadleaf forest phenology.',
    stack: ['MODIS', 'LOESS', 'Seasonal Decomposition', 'R / Python'],
    deliverable: 'Scientific poster & MSc research module',
    featured: true,
    image: '/assets/aistudio/image_b56b0b95.jpg',
    imageCaption:
      'Height vs. Latitude distribution across Hyrcanian forest study patches with fitted elevation–latitude regression trend.',
  },
  {
    id: 'mosgwo-obia',
    title: 'MOSGWO Multi-Objective Segmentation Engine',
    period: '2024 – 2026',
    category: 'Open Source',
    summary:
      'Automated parameter optimization for Object-Based Image Analysis using Multi-Objective Grey Wolf Optimization.',
    details:
      'Designed to eliminate subjective scale, shape, and compactness tuning in OBIA segmentation workflows. Evaluates Pareto-optimal segmentation boundaries balancing IoU, Weighted IoU (W-IoU), F1-Seg, and Over-Segmentation Factor (OSF) across complex agro-wetland mosaics.',
    stack: ['Python', 'Grey Wolf Optimizer', 'RSGISLib', 'OBIA'],
    deliverable: 'Open-source optimization toolkit & Q1 publication',
    featured: true,
    image: '/assets/aistudio/image_a0b94328.jpg',
    imageCaption:
      'Grey Wolf Optimization (GWO) metaheuristic workflow balancing IoU, W-IoU, F1-Seg, and Over-Segmentation Factor (OSF).',
    repoUrl: 'https://github.com/MohammadJavadSoltani',
  },
  {
    id: 'sar-surface-water',
    title: 'Long-Term Surface Water Mapping via Sentinel-1 SAR',
    period: '2019 – 2023',
    category: 'Research',
    supervisor: 'Prof. M.J. Valadan Zoej',
    summary:
      'All-weather Sentinel-1 backscatter time-series pipeline in Google Earth Engine for multi-year surface water detection.',
    details:
      'Developed cloud-free VV/VH dual-polarization thresholding and temporal change trajectories inside Google Earth Engine to track seasonal and inter-annual reservoir inundation extent across semi-arid basins.',
    stack: ['Google Earth Engine', 'Sentinel-1 SAR', 'Time-Series Analysis'],
    deliverable: 'BSc Thesis (Rank 2nd Cohort)',
    image: '/assets/aistudio/image_c15ec2ba.jpg',
    imageCaption:
      'Multi-temporal Sentinel-1 SAR backscatter scenes (left) paired with extracted binary surface water masks (right) capturing reservoir contraction.',
  },
  {
    id: 'ekbatan-dam-gee',
    title: 'Ekbatan Dam Surface Change Explorer',
    period: '2022 – 2023',
    category: 'Web App',
    supervisor: 'Prof. M.R. Sahebi',
    summary:
      'Interactive Google Earth Engine web application visualizing before/after reservoir shoreline shifts at Ekbatan Dam, Hamedan.',
    details:
      'Built an interactive GEE web application fusing multitemporal SAR and spectral water occurrence mapping with dynamic water-mask area time-series charts so water resource managers can inspect seasonal reservoir fluctuations directly in-browser.',
    stack: ['Google Earth Engine', 'Landsat & SAR', 'Water Occurrence', 'JavaScript'],
    deliverable: 'Interactive GEE Web Application',
    image: '/assets/aistudio/image_945d0b9e.jpg',
    imageCaption:
      'Interactive Google Earth Engine interface displaying Ekbatan Dam Reservoir water occurrence frequency, SAR tile, and monthly water-mask area series.',
  },
  {
    id: 'kntu-3d-campus',
    title: '3D KNTU Campus Photogrammetric Reconstruction',
    period: '2022',
    category: '3D Mapping',
    supervisor: 'Prof. M. Varshosaz',
    summary:
      'High-density 3D geospatial model of the KNTU campus reconstructed from Close-Range Photogrammetry (CRP).',
    details:
      'Executed multi-view stereo image acquisition, bundle adjustment, dense point cloud filtering, and textured mesh generation to deliver an accurate architectural 3D geospatial reconstruction of the KNTU Geomatics faculty complex.',
    stack: ['Agisoft Metashape', 'CloudCompare', 'CRP', '3D Mesh'],
    deliverable: 'Textured 3D Geospatial Product',
    image: '/assets/aistudio/image_07b30de3.jpg',
    imageCaption:
      'Perspective 3D textured photogrammetric mesh reconstruction of the K. N. Toosi University of Technology campus building.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Master of Science',
    field: 'Remote Sensing & Photogrammetry',
    institution: 'K. N. Toosi University of Technology (KNTU)',
    period: '2023 – 2026',
    gpa: '3.71 / 4.0',
    rank: 'Rank 1st',
    supervisors: 'Prof. H. Latifi & Prof. H. Naghavi',
    thesis:
      'Analysis of Agricultural Crop Pattern Changes on Wetland Degradation via Time Series and OBIA',
  },
  {
    degree: 'Bachelor of Science',
    field: 'Geomatics Engineering',
    institution: 'K. N. Toosi University of Technology (KNTU)',
    period: '2019 – 2023',
    gpa: '3.60 / 4.0',
    rank: 'Rank 2nd',
    supervisors: 'Prof. M.J. Valadan Zoej',
    thesis: 'Long-term water body mapping using Sentinel-1 SAR time series in Google Earth Engine',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Lecturer — Remote Sensing Applications (Google Earth Engine)',
    organization: 'Maktabkhooneh Online Platform',
    period: 'Dec 2024',
    type: 'Lecturer',
    summary:
      'Designed and taught a structured digital curriculum covering remote sensing fundamentals through advanced cloud-scale geospatial analysis in Google Earth Engine.',
  },
  {
    role: 'Research Assistant — Processing Systems & Optimization',
    organization: 'Basir RS Institution',
    period: 'Jun – Oct 2023',
    type: 'Research',
    summary:
      'Optimized automated MODIS data acquisition pipelines, improving large-scale geospatial data handling and computational throughput.',
  },
  {
    role: 'Teaching Assistant — Core Geomatics & Remote Sensing Courses',
    organization: 'K. N. Toosi University of Technology',
    period: '2021 – 2025',
    type: 'Teaching',
    summary:
      'TA for Remote Sensing Basics (Prof. M.R. Sahebi), Image Processing (Prof. T. Managhebi), Programming C++ (Prof. A. Hosseininaveh), and Ecological Applications of RS (Prof. H. Latifi).',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'rs-gis',
    label: 'Remote Sensing & GIS',
    description: 'Cloud-scale Earth observation, SAR interferometry, and spatial databases.',
    items: ['Google Earth Engine (GEE)', 'ENVI', 'SNAP', 'QGIS', 'ArcGIS', 'GMTSAR'],
  },
  {
    id: 'ml-opt',
    label: 'ML & Optimization',
    description: 'Metaheuristic segmentation search, imbalanced learning, and geospatial embeddings.',
    items: [
      'Random Forest & Extra Trees',
      'Support Vector Machines (SVM)',
      'Grey Wolf Optimizer (GWO)',
      'SMOTE & Borderline-SMOTE Variants',
      'Metaheuristic Segmentation Optimization',
      'GAN-Based & Classical Augmentation',
    ],
  },
  {
    id: 'time-series',
    label: 'Time Series & Trend',
    description: 'Multi-decadal ecological trajectory attribution and phenological extraction.',
    items: [
      'Mann-Kendall & Sequential MK Tests',
      'Theil-Sen Slope Estimator',
      'LOESS Smoothing',
      'Seasonal Decomposition',
      'Phenology Analysis',
      'MODIS / AVHRR Long-Term Archives',
    ],
  },
  {
    id: 'photogrammetry',
    label: 'Photogrammetry & 3D',
    description: 'Point-cloud processing, close-range 3D reconstruction, and digital twin tooling.',
    items: ['Agisoft Metashape', 'Pix4D', 'CloudCompare', 'LAStools', 'Bentley iTwin'],
  },
  {
    id: 'programming',
    label: 'Programming & Visualization',
    description: 'Scientific computing, geospatial plotting, and pipeline engineering.',
    items: ['Python', 'R', 'MATLAB', 'C++', 'Cartopy Geospatial Visualization', 'Feature Engineering'],
  },
];

export const AWARDS: AwardItem[] = [
  {
    title: 'Grant Award — CAC Nepal Conference',
    detail: 'International conference travel/participation grant recipient',
    year: '2026',
  },
  {
    title: 'Peer Reviewer — Scientific Reports',
    detail: 'Manuscript peer reviewer for Nature Portfolio journal',
    year: 'Jun 2025',
  },
  {
    title: 'Contributor — Applied Ecology Blog',
    detail: 'Science communication article on ecological remote sensing',
    year: 'May 2025',
  },
  {
    title: 'Ranked 1st — MSc Remote Sensing & Photogrammetry',
    detail: 'Top academic standing in KNTU graduate cohort',
    year: '2024',
  },
  {
    title: 'Event Organizer — 8th & 9th GeoLeague',
    detail: 'National geomatics & remote sensing competition organizing committee',
    year: '2023–2024',
  },
  {
    title: 'INEF MSc Scholarship Recipient',
    detail: 'Iran’s National Elites Foundation graduate scholarship',
    year: '2023',
  },
  {
    title: 'Dean’s List: Best Student of the Year & BSc Rank 2nd',
    detail: 'Recognized for top undergraduate excellence in Geomatics & Geodesy',
    year: '2022',
  },
];

export const REFERENCES: ReferencePerson[] = [
  {
    name: 'Prof. Hooman Latifi',
    role: 'MSc Co-Supervisor',
    affiliation: 'K. N. Toosi University of Technology (KNTU)',
    email: 'hooman.latifi@kntu.ac.ir',
  },
  {
    name: 'Prof. H. Naghavi',
    role: 'MSc Co-Supervisor',
    affiliation: 'Lorestan University',
    email: 'Naghavi.ha@lu.ac',
  },
  {
    name: 'Prof. Mohammad Javad Valadan Zoej',
    role: 'BSc Thesis Supervisor',
    affiliation: 'K. N. Toosi University of Technology (KNTU)',
    email: 'valadanzouj@kntu.ac.ir',
  },
];
