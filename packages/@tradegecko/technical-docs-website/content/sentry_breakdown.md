## Breakdown of sentry errors

#### Critical errors
Ideally we should not have any errors, but on lieu of that these are errors that *really* should not be happening:
- [No route named](https://sentry.io/organizations/tradegeckocom/issues/?project=88730&query=is%3Aunresolved+no+route+named) errors,
- [Action handler](https://sentry.io/organizations/tradegeckocom/issues/?project=88730&query=is%3Aunresolved+action+handler) errors because they can lead to seemingly non-responsive buttons and things,
- [Missing translation](https://sentry.io/organizations/tradegeckocom/issues/?project=88730&query=is%3Aunresolved+missing+translation) errors because they are typically very noticable,
- [Was destroyed](https://sentry.io/organizations/tradegeckocom/issues/?project=88730&query=is%3Aunresolved+was+destroyed') errors

#### Warnings
These are things that probably should not even be reported on sentry:
- [TaskCancellation](https://sentry.io/organizations/tradegeckocom/issues/?project=88730&query=is%3Aunresolved+TaskCancelation) errors because if used correctly they should not cause a problem
