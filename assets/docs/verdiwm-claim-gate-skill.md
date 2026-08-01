# Evidence Claim Gate Skill

## Purpose

This skill records the rule that VerdiWM claims should be gated by evidence rather than reflection text or a single favorable score.

## Inputs

- Action request or repair candidate
- Execution receipt
- Dataset or environment metadata
- Model architecture and checkpoint context
- Metric output, replay, simulator/robot outcome, or human-auditable artifact
- Validity gates and protected trade-off metrics

## Gate Logic

1. Record the proposed intervention.
2. Execute or stage the intervention under a bounded run contract.
3. Store receipts and artifacts.
4. Verify success with the correct authority for the claim.
5. Check protected metrics and frozen-verifier consistency.
6. Update the claim frontier only when evidence is sufficient.

## Claim Boundary

Video/VLM evidence can audit behavior, but it should not replace environment success when the claim is about task completion in a simulator or real robot workflow. Metric gains are scoped to the context groups whose validity gates pass.
