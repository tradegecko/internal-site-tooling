## When Creating
Include the following in your title:
- If the RFC affects backend `[BACKEND]`
- If it affects frontend include `[FRONTEND]`
- If it affects both include `[BACKEND][FRONTEND]`

Once the pr has been created, ManagerBot request a review from. all members based on the tag that you included in your title.

## Merging an RFC
The RFC cannot be merged until everyone has approved it. If you do not care to comment, just mark the pr as approved, the reason we do this is that RFC's affect everyone and this is you acknowledging it or `waiving your rights`.

## Implementation
RFC's do not need to contain implementation strategy. If the rfc is discussing an architectural change it should have atleast a high level overview of the architecture, but not who what and when it will happen, unless the author desires to include this information. If the rfc requires a migration the affected chapter/s will discuss what the migration plan is. If the changes of the RFC affects are not in the OKR's, chapter implementation will be delayed until the next quarter. If the chapter believes it is extremely important we can change the KR's.

## Automatic closing
If the last update to the rfc was 2 weeks ago it will be automatically closed.
