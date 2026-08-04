# DEPLOY CHECKLIST

Working notes. Not a client document.

**Current plan:** push to GitHub, let Vercel deploy, share the `.vercel.app` URL with Liz and Henry for review. The apex domain stays pointed at the coming soon project and is not touched.

---

## 1. Before pushing

```
npm run build
```

Must pass clean. Dev mode does not type check every route, so this is the real test.

---

## 2. Repo

New repository, separate from the coming soon project.

```
git init
git add .
git commit -m "Design By TWM website, client review build"
git branch -M main
git remote add origin https://github.com/DesignByTWM/dbtwm-website.git
git push -u origin main
```

---

## 3. Vercel project

Import the new repo as a **new project**. Do not attach any domain.

### Environment variables

**Set nothing.** That is not an oversight, it is the configuration.

With no variables set, the app reads `NEXT_PUBLIC_VERCEL_URL`, which Vercel injects automatically, and uses that as its origin. Canonical URLs and schema then correctly reference the `.vercel.app` address instead of the live domain.

The indexing gate is a strict equality check against `https://designbytwm.com`. Every `.vercel.app` URL fails that check, so the review build serves:

- `noindex, nofollow` in the meta robots tag on every page
- `Disallow: /` in `robots.txt`

Nothing to remember, nothing to misconfigure.

### Deployment protection

**Leave it off** for this review.

Vercel Authentication requires the viewer to have a Vercel account with access to the team. Liz and Henry do not, and adding them creates friction on a review that should take one click. Password Protection is a paid plan feature.

The build is safe to leave open because it is noindexed and disallowed, no real leads can be lost since forms are inactive, and the URL is only shared with them. If Henry wants it locked down, the cleanest option is adding Password Protection on a Pro plan rather than Vercel Authentication.

---

## 4. Verify before sending the review email

- [ ] Deployment succeeded, `.vercel.app` URL loads
- [ ] `<vercel-url>/robots.txt` returns `Disallow: /`
- [ ] View source on the homepage, confirm `noindex` in the meta robots tag
- [ ] View source, confirm the canonical URL points at the `.vercel.app` origin and **not** at `designbytwm.com`
- [ ] `designbytwm.com` still shows the coming soon page, untouched
- [ ] All 33 routes load without error
- [ ] All 22 city pages load and show the city name
- [ ] Footer city links all resolve, none 404
- [ ] Forms show the inactive state with the review notice
- [ ] Logos render, teal appears only on CTAs and the monogram
- [ ] Card unveil fires on scroll
- [ ] Mobile: drawer opens, SMS button bottom right, footer monogram not covered
- [ ] Lighthouse on the homepage and one service page

---

## 5. Launch day, later

1. Every LAUNCH BLOCKER in `CLIENT_REVIEW_NOTES.md` cleared
2. Lead pipeline built and wired, `FormPending` removed
3. **Set `NEXT_PUBLIC_SITE_URL=https://designbytwm.com`** in Vercel production only. Nothing indexes until this is set
4. Move the apex domain from the coming soon project to this one, inside Vercel
5. Coming soon project stays intact as instant rollback
6. Redeploy so the new environment variable takes effect
7. Confirm `robots.txt` now allows crawling and meta robots reads `index`
8. Submit the sitemap in Google Search Console and Bing Webmaster Tools
9. Turn indexing on for city pages individually as real content is written

**Step 3 is the one that gets forgotten.** If the domain is moved but the variable is not set, the live site serves noindex and is invisible in search. Check `robots.txt` immediately after launch.

---

## Known state at handoff

- Forms inactive by design, `components/forms/FormPending.tsx`
- 22 city pages noindexed placeholders, review notes section 20
- Placeholder content flagged `placeholder: true` in `content/house.ts` and `content/builds.ts`
- Sanity and Airtable accounts pending client confirmation
- Outstanding photography in review notes section 7
- **Never touch the MX or Proofpoint DNS records.** They carry the client's Microsoft 365 email
