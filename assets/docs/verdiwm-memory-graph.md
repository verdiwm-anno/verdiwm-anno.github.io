# VerdiWM Research Memory Graph

## Purpose

This document describes the page-level memory graph used to explain how VerdiWM stores and reuses verified repair evidence.

VerdiWM is represented as an evidence-licensed repair memory rather than a generic code-editing agent. Each node records a bounded repair episode with:

- Time and experiment context
- Target model architecture
- Dataset or robot embodiment
- Proposed typed intervention
- Verification artifact and validity-gate status
- Follow-up skill or trace document

## Memory Contract

Every memory node should answer five questions:

1. What backbone and hook contract were changed?
2. What dataset, environment, or robot embodiment defined the task?
3. What failure mechanism was diagnosed?
4. What intervention was tried?
5. Which evidence gates and certificate terms support the next claim?

## Design Boundary

The graph is a project-page explanation layer. It does not claim that every future VerdiWM run is automatically solved. It shows how prior evidence can be indexed, inspected, transferred, or rejected when selecting the next world-model intervention.
