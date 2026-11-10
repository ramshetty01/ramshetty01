# Portfolio overview and evidence guide

Owner: [ramshetty01](https://github.com/ramshetty01). Snapshot: 11 November 2026.

This brief covers four public AI engineering repositories inspected in this work:
EREVNA, PRODUCTION-RAG, realtime-voice-ai-lab and multiagent-software-team.
The chapters document the inspected implementation, verified changes and remaining
engineering work. Other repositories are outside this edition’s scope.

These are code-backed portfolio projects under active hardening, not certified
production deployments. Passing tests, a working demo and a production frontend build
are different kinds of evidence; none alone establishes reliable multi-user operation.
The project chapters distinguish mocked tests, local integrations, genuine provider
runs and unverified deployment claims.

## Project-to-role mapping

This is an interpretation of the demonstrated work, not a claim about current job
openings or guaranteed eligibility. Use entry-level or graduate role requirements to
judge fit and explain the implementation yourself.

| Project | Skills demonstrated | Relevant role themes |
|---|---|---|
| EREVNA | Retrieval, structured model output, citation/support checks, bounded usage, evaluation and API/UI integration | Applied AI engineer; LLM/RAG engineer; Python AI backend |
| PRODUCTION-RAG | Document ingestion, vector retrieval, role/workspace authorization, source lifecycle and evaluation integrity | RAG engineer; applied ML engineer; AI platform/backend |
| Realtime Voice AI Lab | HTTP/WebSocket integration, ASR/LLM/TTS adapters, trace replay, timeout and fallback behavior | Voice AI engineer; conversational AI engineer; Python backend |
| Multi-Agent Software Team | Task DAGs, isolated Git worktrees, review/test gates, checkpoints and truthful execution states | Agent infrastructure engineer; AI tooling/backend; junior AI platform |

## How to present this work in applications

- Link the repository and the specific merged or reviewable changes you understand.
- Demonstrate one reproducible workflow from clean setup through input, output and an inspected failure case.
- Explain the engineering decision and its tradeoff: why BM25 remains default, why tenant boundaries matter, why a thread timeout is not cancellation, or why an agent's success message is not evidence of working code.
- Quote measurements only with their dataset, provider, environment and limitations. Synthetic fixtures and fake-provider tests are not real-world accuracy benchmarks.
- Use the project-specific resume bullets as drafts, then rewrite them in your own words and prepare to walk through the code.
- Do not claim production users, independently verified accuracy, live voice quality, public benchmark performance or deployment scale that has not been measured.

## What production readiness still requires

The repositories now have more concrete correctness and access-control evidence, but
public operation needs additional work: deployment-specific identity and authorization,
shared quotas, persistence/retention/deletion, TLS and network controls, reproducible
runtime images, workload/failure testing and live-provider evaluation. Each project
chapter lists its own blockers. Human review is still needed for AI-output quality.

Unmerged pull requests are reviewable implementations, not changes already present on
the default branch. The recorded issue/PR status table accompanies this snapshot;
check GitHub for later merges or follow-up work. No public deployment was performed.

## Merged verification snapshot

| Repository | Passing tests | Merged changes |
|---|---:|---|
| EREVNA | 87 | [#37](https://github.com/ramshetty01/EREVNA/pull/37), [#38](https://github.com/ramshetty01/EREVNA/pull/38), [#40](https://github.com/ramshetty01/EREVNA/pull/40), [#41](https://github.com/ramshetty01/EREVNA/pull/41) |
| PRODUCTION-RAG | 276 | [#306](https://github.com/ramshetty01/PRODUCTION-RAG/pull/306), [#307](https://github.com/ramshetty01/PRODUCTION-RAG/pull/307), [#308](https://github.com/ramshetty01/PRODUCTION-RAG/pull/308), [#309](https://github.com/ramshetty01/PRODUCTION-RAG/pull/309), [#312](https://github.com/ramshetty01/PRODUCTION-RAG/pull/312) |
| realtime-voice-ai-lab | 71 | [#237](https://github.com/ramshetty01/realtime-voice-ai-lab/pull/237), [#238](https://github.com/ramshetty01/realtime-voice-ai-lab/pull/238) |
| multiagent-software-team | 118 | [#146](https://github.com/ramshetty01/multiagent-software-team/pull/146), [#149](https://github.com/ramshetty01/multiagent-software-team/pull/149) |

Total: 552 passing tests across four suites. Four live-provider tests in the agent-team suite were skipped. Frontend builds, dependency audits, browser checks and local integrations are described per project; they are not counted as additional unit tests.

The 13 listed application PRs are merged. [Machine-readable verification snapshot](projects/verification-status.json) records merge commits and dates. Production limitations remain open and are not hidden by these results.

## Technical chapters

- [EREVNA complete brief](projects/EREVNA.md)
- [PRODUCTION-RAG complete brief](projects/PRODUCTION-RAG.md)
- [Realtime Voice AI Lab complete brief](projects/realtime-voice-ai-lab.md)
- [Multi-Agent Software Team complete brief](projects/multiagent-software-team.md)

The Word export includes these chapters in full, with stack, architecture, workflows,
setup, verification evidence, resume wording, interview topics and remaining work.
