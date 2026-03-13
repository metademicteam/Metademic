-- ============================================================
-- MDPI-like Academic Publishing Platform
-- Supabase SQL Schema with Row Level Security
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for full-text search on titles

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role as enum ('author', 'reviewer', 'editor', 'admin');
create type article_status as enum (
  'draft', 'submitted', 'under_review', 'revision_required',
  'accepted', 'rejected', 'published', 'retracted'
);
create type review_status as enum ('pending', 'accepted', 'declined', 'completed');
create type review_recommendation as enum (
  'accept', 'minor_revision', 'major_revision', 'reject'
);
create type access_type as enum ('open_access', 'subscription');
create type submission_type as enum (
  'article', 'review', 'communication', 'letter',
  'editorial', 'case_report', 'conference_paper', 'book_review'
);

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text not null,
  email           text not null unique,
  role            user_role not null default 'author',
  bio             text,
  avatar_url      text,
  orcid           text unique,                 -- ORCID identifier
  affiliation     text,                        -- University / Institution
  country         text,
  website         text,
  h_index         integer default 0,
  is_verified     boolean default false,
  -- Professional Profile Fields
  workplace       text,
  job_type        text,
  title           text,
  first_name      text,
  middle_name     text,
  last_name       text,
  facebook        text,
  twitter         text,
  address1        text,
  address2        text,
  zip_code        text,
  city            text,
  time_zone       text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- INSTITUTIONS
-- ============================================================
create table public.institutions (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null unique,
  short_name      text,
  country         text,
  website         text,
  logo_url        text,
  created_at      timestamptz default now()
);

-- ============================================================
-- SUBJECTS / DISCIPLINES
-- ============================================================
create table public.subjects (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null unique,
  slug            text not null unique,
  description     text,
  parent_id       uuid references public.subjects(id),
  icon_url        text,
  created_at      timestamptz default now()
);

-- ============================================================
-- JOURNALS
-- ============================================================
create table public.journals (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null unique,
  short_title     text not null unique,
  slug            text not null unique,
  issn_print      text unique,
  issn_online     text unique,
  description     text,
  aims_scope      text,
  cover_image_url text,
  impact_factor   numeric(5,3),
  h_index         integer default 0,
  cite_score      numeric(5,3),
  access_type     access_type default 'open_access',
  is_active       boolean default true,
  subject_id      uuid references public.subjects(id),
  editor_in_chief uuid references public.profiles(id),
  founded_year    integer,
  website         text,
  submission_fee  numeric(10,2) default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- JOURNAL EDITORS (many-to-many)
-- ============================================================
create table public.journal_editors (
  id              uuid primary key default uuid_generate_v4(),
  journal_id      uuid not null references public.journals(id) on delete cascade,
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  role            text not null default 'associate_editor', -- 'editor_in_chief', 'associate_editor', 'guest_editor'
  assigned_at     timestamptz default now(),
  unique(journal_id, profile_id)
);

-- ============================================================
-- VOLUMES & ISSUES
-- ============================================================
create table public.volumes (
  id              uuid primary key default uuid_generate_v4(),
  journal_id      uuid not null references public.journals(id) on delete cascade,
  number          integer not null,
  year            integer not null,
  created_at      timestamptz default now(),
  unique(journal_id, number)
);

create table public.issues (
  id              uuid primary key default uuid_generate_v4(),
  volume_id       uuid not null references public.volumes(id) on delete cascade,
  number          integer not null,
  title           text,                        -- special issue title (optional)
  description     text,
  cover_image_url text,
  published_at    date,
  created_at      timestamptz default now(),
  unique(volume_id, number)
);

-- ============================================================
-- SPECIAL ISSUES
-- ============================================================
create table public.special_issues (
  id              uuid primary key default uuid_generate_v4(),
  journal_id      uuid not null references public.journals(id) on delete cascade,
  title           text not null,
  slug            text not null unique,
  description     text,
  deadline        date,
  is_open         boolean default true,
  editor_id       uuid references public.profiles(id),
  created_at      timestamptz default now()
);

-- ============================================================
-- ARTICLES
-- ============================================================
create table public.articles (
  id                  uuid primary key default uuid_generate_v4(),
  journal_id          uuid not null references public.journals(id),
  issue_id            uuid references public.issues(id),
  special_issue_id    uuid references public.special_issues(id),
  title               text not null,
  abstract            text,
  submission_type     submission_type default 'article',
  status              article_status default 'draft',
  access_type         access_type default 'open_access',
  doi                 text unique,
  manuscript_number   text unique,             -- e.g., "jXXXX-XXXXXX"
  pdf_url             text,
  html_url            text,
  xml_url             text,
  supplementary_url   text,
  page_start          integer,
  page_end            integer,
  article_number      integer,
  received_at         date,
  revised_at          date,
  accepted_at         date,
  published_at        date,
  views_count         integer default 0,
  downloads_count     integer default 0,
  citations_count     integer default 0,
  altmetric_score     numeric(8,2),
  handling_editor_id  uuid references public.profiles(id),
  submitted_by        uuid references public.profiles(id),
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Full-text search index on title + abstract
create index articles_fts_idx on public.articles
  using gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(abstract,'')));

-- ============================================================
-- AUTHORS (article <-> profile many-to-many, supports external authors)
-- ============================================================
create table public.article_authors (
  id              uuid primary key default uuid_generate_v4(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  profile_id      uuid references public.profiles(id),    -- null if external author
  -- For external / non-registered authors:
  full_name       text not null,
  email           text,
  affiliation     text,
  orcid           text,
  is_corresponding boolean default false,
  author_order    integer not null,
  created_at      timestamptz default now(),
  unique(article_id, author_order)
);

-- ============================================================
-- KEYWORDS
-- ============================================================
create table public.keywords (
  id              uuid primary key default uuid_generate_v4(),
  term            text not null unique,
  created_at      timestamptz default now()
);

create table public.article_keywords (
  article_id      uuid not null references public.articles(id) on delete cascade,
  keyword_id      uuid not null references public.keywords(id) on delete cascade,
  primary key(article_id, keyword_id)
);

-- ============================================================
-- REFERENCES / CITATIONS
-- ============================================================
create table public.article_references (
  id              uuid primary key default uuid_generate_v4(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  ref_number      integer not null,
  raw_text        text not null,               -- Full citation text
  doi             text,
  pmid            text,
  cited_article_id uuid references public.articles(id), -- internal link if available
  created_at      timestamptz default now(),
  unique(article_id, ref_number)
);

-- ============================================================
-- PEER REVIEW
-- ============================================================
create table public.review_assignments (
  id              uuid primary key default uuid_generate_v4(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  reviewer_id     uuid not null references public.profiles(id),
  assigned_by     uuid references public.profiles(id),
  status          review_status default 'pending',
  round           integer default 1,          -- review round number
  due_date        date,
  declined_reason text,
  assigned_at     timestamptz default now(),
  responded_at    timestamptz,
  unique(article_id, reviewer_id, round)
);

create table public.reviews (
  id                  uuid primary key default uuid_generate_v4(),
  assignment_id       uuid not null references public.review_assignments(id) on delete cascade,
  recommendation      review_recommendation,
  comments_to_author  text,
  comments_to_editor  text,
  is_confidential     boolean default false,
  submitted_at        timestamptz default now()
);

-- ============================================================
-- ARTICLE REVISIONS (track manuscript history)
-- ============================================================
create table public.article_revisions (
  id              uuid primary key default uuid_generate_v4(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  version         integer not null,
  file_url        text,
  cover_letter    text,
  response_to_reviewers text,
  submitted_at    timestamptz default now(),
  submitted_by    uuid references public.profiles(id)
);

-- ============================================================
-- EDITORIAL DECISIONS
-- ============================================================
create table public.editorial_decisions (
  id              uuid primary key default uuid_generate_v4(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  editor_id       uuid not null references public.profiles(id),
  decision        article_status not null,
  comments        text,
  decided_at      timestamptz default now()
);

-- ============================================================
-- ANNOUNCEMENTS / NEWS
-- ============================================================
create table public.announcements (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  content         text not null,
  journal_id      uuid references public.journals(id),   -- null = site-wide
  is_published    boolean default false,
  published_at    timestamptz,
  created_by      uuid references public.profiles(id),
  created_at      timestamptz default now()
);

-- ============================================================
-- COMMENTS (reader comments on articles)
-- ============================================================
create table public.article_comments (
  id              uuid primary key default uuid_generate_v4(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  profile_id      uuid not null references public.profiles(id),
  parent_id       uuid references public.article_comments(id),
  content         text not null,
  is_approved     boolean default false,
  created_at      timestamptz default now()
);

-- ============================================================
-- BOOKMARKS / SAVED ARTICLES
-- ============================================================
create table public.bookmarks (
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  article_id      uuid not null references public.articles(id) on delete cascade,
  created_at      timestamptz default now(),
  primary key(profile_id, article_id)
);

-- ============================================================
-- SUBSCRIPTIONS (email alerts for journals)
-- ============================================================
create table public.journal_subscriptions (
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  journal_id      uuid not null references public.journals(id) on delete cascade,
  created_at      timestamptz default now(),
  primary key(profile_id, journal_id)
);

-- ============================================================
-- ARTICLE METRICS (daily stats for trending)
-- ============================================================
create table public.article_metrics (
  id              uuid primary key default uuid_generate_v4(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  date            date not null,
  views           integer default 0,
  downloads       integer default 0,
  unique(article_id, date)
);

-- ============================================================
-- HELPER FUNCTION: get current user role
-- ============================================================
create or replace function public.get_user_role()
returns user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer stable;

-- ============================================================
-- HELPER FUNCTION: is editor or admin
-- ============================================================
create or replace function public.is_editor_or_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('editor', 'admin')
  );
$$ language sql security definer stable;

-- ============================================================
-- HELPER FUNCTION: is article author
-- ============================================================
create or replace function public.is_article_author(p_article_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.article_authors
    where article_id = p_article_id
    and profile_id = auth.uid()
  );
$$ language sql security definer stable;

-- ============================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles            enable row level security;
alter table public.institutions        enable row level security;
alter table public.subjects            enable row level security;
alter table public.journals            enable row level security;
alter table public.journal_editors     enable row level security;
alter table public.volumes             enable row level security;
alter table public.issues              enable row level security;
alter table public.special_issues      enable row level security;
alter table public.articles            enable row level security;
alter table public.article_authors     enable row level security;
alter table public.keywords            enable row level security;
alter table public.article_keywords    enable row level security;
alter table public.article_references  enable row level security;
alter table public.review_assignments  enable row level security;
alter table public.reviews             enable row level security;
alter table public.article_revisions   enable row level security;
alter table public.editorial_decisions enable row level security;
alter table public.announcements       enable row level security;
alter table public.article_comments    enable row level security;
alter table public.bookmarks           enable row level security;
alter table public.journal_subscriptions enable row level security;
alter table public.article_metrics     enable row level security;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- ── PROFILES ──────────────────────────────────────────────
-- Anyone can view profiles
create policy "profiles: public read"
  on public.profiles for select using (true);

-- Users can update only their own profile
create policy "profiles: self update"
  on public.profiles for update using (auth.uid() = id);

-- Profile is created via trigger on auth.users insert
create policy "profiles: self insert"
  on public.profiles for insert with check (auth.uid() = id);

-- Admins can do anything
create policy "profiles: admin full access"
  on public.profiles for all using (public.get_user_role() = 'admin');

-- ── INSTITUTIONS ──────────────────────────────────────────
create policy "institutions: public read"
  on public.institutions for select using (true);

create policy "institutions: admin write"
  on public.institutions for all using (public.get_user_role() = 'admin');

-- ── SUBJECTS ──────────────────────────────────────────────
create policy "subjects: public read"
  on public.subjects for select using (true);

create policy "subjects: admin write"
  on public.subjects for all using (public.get_user_role() = 'admin');

-- ── JOURNALS ──────────────────────────────────────────────
create policy "journals: public read active"
  on public.journals for select using (is_active = true);

create policy "journals: admin full access"
  on public.journals for all using (public.get_user_role() = 'admin');

create policy "journals: editor read own"
  on public.journals for select
  using (
    exists (
      select 1 from public.journal_editors
      where journal_id = journals.id and profile_id = auth.uid()
    )
  );

-- ── JOURNAL_EDITORS ───────────────────────────────────────
create policy "journal_editors: editor can view own"
  on public.journal_editors for select
  using (profile_id = auth.uid() or public.get_user_role() = 'admin');

create policy "journal_editors: admin write"
  on public.journal_editors for all using (public.get_user_role() = 'admin');

-- ── VOLUMES & ISSUES ──────────────────────────────────────
create policy "volumes: public read"
  on public.volumes for select using (true);

create policy "volumes: admin write"
  on public.volumes for all using (public.is_editor_or_admin());

create policy "issues: public read"
  on public.issues for select using (true);

create policy "issues: editor write"
  on public.issues for all using (public.is_editor_or_admin());

-- ── SPECIAL_ISSUES ────────────────────────────────────────
create policy "special_issues: public read open"
  on public.special_issues for select using (is_open = true);

create policy "special_issues: editor full access"
  on public.special_issues for all using (public.is_editor_or_admin());

-- ── ARTICLES ──────────────────────────────────────────────
-- Published articles are publicly visible
create policy "articles: public read published"
  on public.articles for select
  using (status = 'published');

-- Authors can view their own articles (any status)
create policy "articles: author read own"
  on public.articles for select
  using (public.is_article_author(id) or submitted_by = auth.uid());

-- Editors can view all articles
create policy "articles: editor read all"
  on public.articles for select
  using (public.is_editor_or_admin());

-- Authors can create (submit) articles
create policy "articles: author insert"
  on public.articles for insert
  with check (auth.uid() is not null and submitted_by = auth.uid());

-- Authors can update their own draft articles
create policy "articles: author update own draft"
  on public.articles for update
  using (
    submitted_by = auth.uid()
    and status in ('draft', 'revision_required')
  );

-- Editors/admins can update any article
create policy "articles: editor update any"
  on public.articles for update
  using (public.is_editor_or_admin());

-- Only admins can delete articles
create policy "articles: admin delete"
  on public.articles for delete
  using (public.get_user_role() = 'admin');

-- ── ARTICLE_AUTHORS ───────────────────────────────────────
create policy "article_authors: public read published articles"
  on public.article_authors for select
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_authors.article_id
      and (a.status = 'published' or a.submitted_by = auth.uid()
           or public.is_editor_or_admin()
           or a.id in (
             select article_id from public.article_authors
             where profile_id = auth.uid()
           ))
    )
  );

create policy "article_authors: author manage own"
  on public.article_authors for all
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id
      and a.submitted_by = auth.uid()
      and a.status in ('draft', 'revision_required')
    )
  );

create policy "article_authors: editor manage"
  on public.article_authors for all using (public.is_editor_or_admin());

-- ── KEYWORDS ──────────────────────────────────────────────
create policy "keywords: public read"
  on public.keywords for select using (true);

create policy "keywords: authenticated insert"
  on public.keywords for insert with check (auth.uid() is not null);

-- ── ARTICLE_KEYWORDS ──────────────────────────────────────
create policy "article_keywords: public read published"
  on public.article_keywords for select
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and a.status = 'published'
    )
  );

create policy "article_keywords: author manage"
  on public.article_keywords for all
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and a.submitted_by = auth.uid()
    )
  );

create policy "article_keywords: editor manage"
  on public.article_keywords for all using (public.is_editor_or_admin());

-- ── ARTICLE_REFERENCES ────────────────────────────────────
create policy "article_references: public read published"
  on public.article_references for select
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and a.status = 'published'
    )
  );

create policy "article_references: author manage own"
  on public.article_references for all
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and a.submitted_by = auth.uid()
    )
  );

create policy "article_references: editor manage"
  on public.article_references for all using (public.is_editor_or_admin());

-- ── REVIEW_ASSIGNMENTS ────────────────────────────────────
-- Reviewers only see their own assignments
create policy "review_assignments: reviewer read own"
  on public.review_assignments for select
  using (reviewer_id = auth.uid());

-- Editors see all assignments
create policy "review_assignments: editor full access"
  on public.review_assignments for all using (public.is_editor_or_admin());

-- Reviewer can update their own assignment (accept/decline)
create policy "review_assignments: reviewer update own"
  on public.review_assignments for update
  using (reviewer_id = auth.uid());

-- ── REVIEWS ───────────────────────────────────────────────
-- Reviewer can manage their own review
create policy "reviews: reviewer full access own"
  on public.reviews for all
  using (
    exists (
      select 1 from public.review_assignments ra
      where ra.id = assignment_id and ra.reviewer_id = auth.uid()
    )
  );

-- Editors can read all reviews
create policy "reviews: editor read all"
  on public.reviews for select using (public.is_editor_or_admin());

-- Authors can read non-confidential reviews of their articles AFTER decision
create policy "reviews: author read non-confidential"
  on public.reviews for select
  using (
    is_confidential = false
    and exists (
      select 1
      from public.review_assignments ra
      join public.articles a on a.id = ra.article_id
      where ra.id = assignment_id
      and a.submitted_by = auth.uid()
      and a.status in ('revision_required', 'accepted', 'rejected', 'published')
    )
  );

-- ── ARTICLE_REVISIONS ────────────────────────────────────
create policy "article_revisions: author read own"
  on public.article_revisions for select
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id
      and (a.submitted_by = auth.uid() or public.is_article_author(a.id))
    )
  );

create policy "article_revisions: author insert own"
  on public.article_revisions for insert
  with check (
    submitted_by = auth.uid()
    and exists (
      select 1 from public.articles a
      where a.id = article_id and a.submitted_by = auth.uid()
    )
  );

create policy "article_revisions: editor full access"
  on public.article_revisions for all using (public.is_editor_or_admin());

-- ── EDITORIAL_DECISIONS ──────────────────────────────────
create policy "editorial_decisions: editor manage"
  on public.editorial_decisions for all using (public.is_editor_or_admin());

-- Authors see decisions on their articles
create policy "editorial_decisions: author read own"
  on public.editorial_decisions for select
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and a.submitted_by = auth.uid()
    )
  );

-- ── ANNOUNCEMENTS ────────────────────────────────────────
create policy "announcements: public read published"
  on public.announcements for select using (is_published = true);

create policy "announcements: editor full access"
  on public.announcements for all using (public.is_editor_or_admin());

-- ── ARTICLE_COMMENTS ─────────────────────────────────────
create policy "article_comments: public read approved"
  on public.article_comments for select using (is_approved = true);

create policy "article_comments: authenticated insert"
  on public.article_comments for insert
  with check (auth.uid() is not null and profile_id = auth.uid());

create policy "article_comments: own delete"
  on public.article_comments for delete using (profile_id = auth.uid());

create policy "article_comments: editor manage"
  on public.article_comments for all using (public.is_editor_or_admin());

-- ── BOOKMARKS ────────────────────────────────────────────
create policy "bookmarks: user manage own"
  on public.bookmarks for all using (profile_id = auth.uid());

-- ── JOURNAL_SUBSCRIPTIONS ────────────────────────────────
create policy "journal_subscriptions: user manage own"
  on public.journal_subscriptions for all using (profile_id = auth.uid());

-- ── ARTICLE_METRICS ──────────────────────────────────────
create policy "article_metrics: public read"
  on public.article_metrics for select using (true);

create policy "article_metrics: service role write"
  on public.article_metrics for all
  using (public.is_editor_or_admin());

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  is_orcid boolean;
  extracted_name text;
  extracted_orcid text;
begin
  -- Check if this user signed up via ORCID
  is_orcid := (new.raw_app_meta_data->>'provider' = 'orcid');

  if is_orcid then
    -- ORCID stores specific claims in custom_claims
    extracted_name := coalesce(new.raw_user_meta_data->>'custom_claims'->>'given_name', '') || ' ' || coalesce(new.raw_user_meta_data->>'custom_claims'->>'family_name', '');
    extracted_orcid := new.raw_user_meta_data->>'sub'; -- The ORCID iD is often in the 'sub' claim
  else
    extracted_name := coalesce(new.raw_user_meta_data->>'full_name', 'New User');
    extracted_orcid := null;
  end if;

  insert into public.profiles (id, full_name, email, orcid)
  values (
    new.id,
    trim(extracted_name),
    new.email,
    extracted_orcid
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

create trigger journals_updated_at
  before update on public.journals
  for each row execute procedure public.update_updated_at();

create trigger articles_updated_at
  before update on public.articles
  for each row execute procedure public.update_updated_at();

-- Auto-generate manuscript number on article insert
create or replace function public.generate_manuscript_number()
returns trigger as $$
declare
  journal_code text;
begin
  select short_title into journal_code
  from public.journals where id = new.journal_id;

  new.manuscript_number := upper(journal_code)
    || '-' || to_char(now(), 'YYYY')
    || '-' || lpad(floor(random() * 999999)::text, 6, '0');
  return new;
end;
$$ language plpgsql security definer;

create trigger articles_manuscript_number
  before insert on public.articles
  for each row when (new.manuscript_number is null)
  execute procedure public.generate_manuscript_number();

-- ============================================================
-- INDEXES (performance)
-- ============================================================
create index idx_articles_journal       on public.articles(journal_id);
create index idx_articles_issue         on public.articles(issue_id);
create index idx_articles_status        on public.articles(status);
create index idx_articles_published_at  on public.articles(published_at desc);
create index idx_articles_submitted_by  on public.articles(submitted_by);
create index idx_article_authors_pid    on public.article_authors(profile_id);
create index idx_review_assignments_rev on public.review_assignments(reviewer_id);
create index idx_review_assignments_art on public.review_assignments(article_id);
create index idx_journals_subject       on public.journals(subject_id);
create index idx_volumes_journal        on public.volumes(journal_id);
create index idx_issues_volume          on public.issues(volume_id);
create index idx_article_keywords_kw    on public.article_keywords(keyword_id);
create index idx_metrics_date           on public.article_metrics(date desc);

-- ============================================================
-- VIEWS (convenient queries)
-- ============================================================

-- Published articles with author names and journal info
create or replace view public.published_articles_view as
select
  a.id,
  a.title,
  a.abstract,
  a.doi,
  a.manuscript_number,
  a.submission_type,
  a.published_at,
  a.views_count,
  a.downloads_count,
  a.citations_count,
  j.title            as journal_title,
  j.short_title      as journal_short,
  j.slug             as journal_slug,
  i.number           as issue_number,
  v.number           as volume_number,
  v.year             as volume_year,
  array_agg(
    aa.full_name order by aa.author_order
  ) filter (where aa.id is not null) as authors
from public.articles a
join public.journals j on j.id = a.journal_id
left join public.issues i on i.id = a.issue_id
left join public.volumes v on v.id = i.volume_id
left join public.article_authors aa on aa.article_id = a.id
where a.status = 'published'
group by a.id, j.title, j.short_title, j.slug,
         i.number, v.number, v.year;

-- Journal stats summary
create or replace view public.journal_stats_view as
select
  j.id,
  j.title,
  j.short_title,
  j.slug,
  j.impact_factor,
  j.access_type,
  count(distinct a.id)  filter (where a.status = 'published') as total_articles,
  count(distinct vol.id)                                       as total_volumes,
  count(distinct iss.id)                                       as total_issues
from public.journals j
left join public.articles a   on a.journal_id = j.id
left join public.volumes vol  on vol.journal_id = j.id
left join public.issues iss   on iss.volume_id = vol.id
where j.is_active = true
group by j.id;

-- ============================================================
-- SAMPLE SEED DATA
-- ============================================================

insert into public.subjects (name, slug, description) values
  ('Medicine & Pharmacology',   'medicine',      'Clinical and pharmaceutical sciences'),
  ('Biology & Life Sciences',   'biology',       'Molecular, cellular, and organismal biology'),
  ('Chemistry',                 'chemistry',     'Organic, inorganic, and physical chemistry'),
  ('Physics & Mathematics',     'physics-math',  'Theoretical and applied physics and mathematics'),
  ('Computer Science & IT',     'computer-science', 'Software, AI, networking, and data science'),
  ('Environmental Science',     'environment',   'Ecology, climate, and sustainability'),
  ('Engineering',               'engineering',   'Civil, mechanical, electrical engineering'),
  ('Social Sciences',           'social-sciences','Economics, psychology, and sociology');

-- ============================================================
-- END OF SCHEMA
-- ============================================================