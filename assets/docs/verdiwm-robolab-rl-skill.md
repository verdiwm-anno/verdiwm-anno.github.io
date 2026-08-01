# Action-Quality Rollout Reward Skill

## Time

2026-07-22

## Target

Evaluate whether a repaired Cosmos3-DROID policy improves action-quality rollouts in RoboLab120 block-stacking tasks.

## Reward Contract

```text
R = 10 * terminal_success
  + 2 * verified_progress
  - bounded invalid_action_penalty
  - bounded trusted_safety_penalty
```

## Constraints

- Terminal success comes from RoboLab, not a VLM or video score.
- Progress comes from verified subtask/progress fields.
- Failed trajectories are capped below successful trajectories.
- Safety and audit events enter the final quality gate.
- Video and VLM checks are audit-only and do not enter the training reward.

## Evidence Use

The published block-stacking videos are qualitative audit artifacts. The reward and claim boundary are defined by environment success, verified progress, and the final safety gate.
