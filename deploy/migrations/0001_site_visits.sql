-- Aggregate cookieless visit counts, per day, page and source (deploy/site-visits.ts).
-- Nothing identifies a visitor: no cookie, IP or user agent is stored.
CREATE TABLE IF NOT EXISTS site_visits (
  day TEXT NOT NULL,
  path TEXT NOT NULL,
  source TEXT NOT NULL,
  visits INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, path, source)
);
