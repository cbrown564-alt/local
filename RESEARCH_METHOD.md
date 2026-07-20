# Local business research method

## Scope

The initial census covers named public listings within a 2.2 km radius of Dundrum village centre and a 3.5 km radius of Newcastle town centre. Where those circles overlap, an OpenStreetMap feature is assigned to the nearer centre.

This is a source-bounded public-listing census. It cannot prove that every trading business has registered online, remains active, or publishes contact details. Missing fields are retained as missing; they are never inferred.

## Discovery sources

1. OpenStreetMap Overpass: named `shop`, `amenity`, `office`, `craft`, `tourism`, `leisure`, and `healthcare` features within the two radii.
2. Google Maps: the complete visible result list returned by one broad “businesses in [town], County Down” search per town on 17 July 2026.
3. Newcastle County Down local directory: visible Food, Pubs/Clubs, Accommodation, Shops, and Services category listings.

Each record stores its source URLs and the research date. A generated Google Maps search URL is labelled separately from a verified direct Maps listing.

## Contact and digital records

Public website, email, phone, address, social profile, and location fields are taken from the named source. Website state is classified as no site found, social-only, HTTP, HTTPS, or needs review.

Google ratings and review counts are blank unless directly observed on the Maps listing. A blank metric means “not collected”, not zero.

## Priority model

The initial ranking is a prospecting aid, not a claim about revenue or ownership.

- Digital need: missing website, social-only presence, HTTP-only website, missing public email/phone, and an unverified Maps record.
- Payment likelihood: organisation type, category fit for visual digital work, and evidence of established public contact channels.
- Priority score: 55% digital need and 45% payment likelihood.
- Community opportunity: charities, clubs, public services, public attractions, and organisations with high need but lower estimated payment likelihood.

Ownership is marked “unverified” unless a source explicitly identifies it. No owner names, personal emails, revenue, or affordability assumptions are invented.

## Refresh protocol

Re-run the research script for current OpenStreetMap data, refresh Google Maps/direct search metrics for the highest-ranked prospects, verify trading status against the official website or a recent source, and keep the research date visible. Outreach should use only current published business contact channels and comply with applicable UK privacy and direct-marketing rules.
