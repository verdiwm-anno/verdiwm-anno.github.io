# DINO-REP Cosmos-Predict2 Repair Skill

## Time

2026-06-16

## Target

Cosmos-Predict2 video-to-world rollout quality under the REP repair campaign.

## Dataset And Evidence

The node uses replay and metric evidence, including qualitative comparison, PSNR, SSIM, LPIPS, FID, and WorldArena-style metrics.

## Failure Diagnosis

The baseline preserves local texture but can drift in object boundaries, scene layout, and semantic relationships. DINO-REP improves depth, flow, and motion smoothness, but exposes a remaining appearance gap: background consistency and subject consistency can degrade.

## Intervention

Use train-test aligned DINO-REP conditioning as an additional representation target while preserving the base video generation objective.

## Next Patch Rule

If geometry and motion improve while appearance weakens, the confirmed claim should be restricted to structure-related coordinates. The next patch should target appearance retention, REP injection position, or data replay focused on complex backgrounds and fast-moving subjects.
