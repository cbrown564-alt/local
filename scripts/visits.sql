-- Outreach prototype visits on /for/ routes, by day and source, newest first.
SELECT day, path, source, visits
FROM site_visits
WHERE path LIKE '/for/%'
ORDER BY day DESC, visits DESC, path, source;
