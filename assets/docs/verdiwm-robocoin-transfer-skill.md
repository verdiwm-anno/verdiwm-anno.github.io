# RoboCOIN Transfer Adapter Skill

## Time

2026-07-02

## Target

Adapt an action-conditioned video-to-world model to RoboCOIN rollouts.

## Dataset And Embodiment

- Dataset: RoboCOIN-DataManager
- Robot embodiment: Agilex Cobot Magic
- Model family: DreamDojo/Cosmos Predict2 action-conditioned video-to-world
- Base weights: AgiBot post-train 2B

## Adapter Decision

VerdiWM uses episode boundaries, camera identifiers, temporal alignment, embodiment metadata, and the action interface to select the compatible base model and training wrapper.

## Verification Pattern

Each replay includes a no-action control. The control separates action-conditioned behavior from memorized visual continuation.

## Claim Boundary

This skill supports transfer and action-conditioning evidence for the selected RoboCOIN tasks. It is not a global claim that every unseen robot embodiment is solved.
