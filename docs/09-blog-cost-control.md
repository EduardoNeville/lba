# 09 — Blog Cost Control (rules & contingencies)

Goal: keep the blog on Blaze at ~$0-0.30/mo, and make a spike *containable*, not just observable.

## Ground truth (verified)

- Google Cloud **spend-cap budgets (hard-stop) only work for** Gemini, Agent Platform,
  Cloud Run, and Cloud Run functions — **NOT Firestore, Firebase Storage, or Hosting**.
- So there is **no automatic dollar-cap** for this blog. Blaze budgets are *alerts*.
- The cap must come from: thresholds (alert), a kill-switch (your rules), and reducing
  the cost surface (small images).

## Cost model (weekly post × ~3 images)

| Line | Math | ~$/mo |
|---|---|---|
| Storage (accumulating) | ~0.6GB after a year | $0.02 |
| Egress (people viewing) | 1k visitors × 5 imgs × ~0.5MB | $0.30 |
| Uploads | 16/mo | $0.00 |

Biggest lever = **egress**. Client-side image compression (in `/admin`) already shrinks
stored+egress ~5-10x vs raw camera/phone output. Keep image count per post low.

## Controls IN PLACE (code)

1. `storage.rules`: authenticated writes only, `<5MB`, `image/*` only, public read.
2. `firestore.rules`: posts are read-only to public (`status=="published"`), writes need auth.
3. `/admin` `compressImage()`: resize long edge ≤1600px + JPEG/PNG at q0.82 before upload,
   so a 12MB phone photo becomes ~0.3-0.8MB.
4. `/admin` client check rejects >5MB originals before wasting bandwidth.

## Contingencies (do these now, ~10 min)

### A. Budget alerts (the only sanctioned "cap")
Cloud console → Billing → Budgets & alerts:
1. **Budget #1 = $2/month**, scope to this project.
2. Enable **Google Cloud budget alerts → Pub/Sub** notification (you may want an email +
   subscribe to a topic so you could auto-react later).
Email sent at 50/80/100%.
> Budgets are alerts, not stops — keep the kill-switch (B) to actually halt.

### B. The kill-switch (real hard-stop, ~30s)
If spend alarms: the fastest full freeze is flipping rules to deny-all. One command:

```bash
# mobile instructions go here — paste into firestore.rules:
#   match /{document=**} { allow read, write: if false; }
# then:
firebase deploy --only firestore:rules,storage
```
Keep a one-line "emergency stop" notes below so you don't have to think while it's on.

- Deploying deny-all freezes **new** posts/uploads instantly (existing content still serves,
  which protects you but still bills reads/egress on hot assets). To fully stop egress too,
  that's a code deploy. For the blog: deny-writes is enough for a cost emergency.

### C. Storage lifecycle — stop unbounded accumulation (optional, recommended)
Set a lifecycle rule on the bucket so orphaned uploads self-delete:
`tmp/` (or `draft/`) objects > 30 days → Delete. Real published posts: keep. This one relies on a bucket via `gcloud`:
```bash
gcloud storage buckets update gs://legal-boutique-advisers-bf25a.appspot.com \
  --lifecycle=delete-older-than-30d,only-prefix=tmp/
```
If settled: run `firebase deploy` goes nothing; this is a bucket-level thing.

## Recovery & ops notes (as time goes on)
- Budget alert at $2 → react within 24h (it's alerts only, smaller reads are the volume, 
  not hard).
- Delete post in /admin doesn't delete its Storage objects yet (v1 + ponytail). 
  Ops: object accumulate ~ this is why lifecycle + compression both matter.
- Firestore is the *cheap* line (every blog view = 1 doc read). Egress+storage dominate.

## Version
- v1 documented at time of switch to Firebase Storage + Blaze (with $1 budget alert).
- Every future decision that adds a moving part (Cloud Function, resize-on-server, CDN)
  should be questioned vs. the $0 laydown — ponytail reflex.