# Module Handoff Template

Contract reference: CONTRACT_BASELINE.md

If something does not apply, write N/A (dont leave blank)

How to use this file:
1. Duplicate this file to MODULE_HANDOFF_<module-name>.md
2. Fill all sections
3. Attach links to demonstrations (PR, screenshots, API calls, logs)

## 1) Module Identity

- Module name:
- Owner:
- Branch name:
- Pull Request link:


## 2) Dependency Check

- Depends on modules:
- Blocks modules:
- Requires DB migration: Yes/No
- Requires env vars: Yes/No
- Requires websocket events: Yes/No


## 3) API and Endpoints

- Contract version used:

- New endpoints:
  - METHOD /path
- Updated endpoints:
  - METHOD /path
- Removed endpoints:
  - METHOD /path
- Auth required on each endpoint: Yes/No


## 4) Contract and Events (see CONTRACT_BASELINE.md)

- Response format follows contract: Yes/No
- Error format follows contract: Yes/No
- Temporary exception requested: Yes/No

Notes:
~ If format is not compliant, mark No and please explain how and why in section 9
~ If contract exception requested is Yes, include reason in section 9

- Events emitted:
- Events consumed:
- Event names follow baseline format: Yes/No
- Payload schema documented: Yes/No
- Reconnect behavior tested: Yes/No

Notes:
~ Write events exactly as implemented (example: game:state:update)
~ Include payload fields (example: { gameId, state, timestamp })
~ Reconnect test means: disconnect/reconnect does not desync state
~ Events consumed are the ones the module listen to and handles
~ Events emitted are the ones the module publishes to other parts


## 5) Database and Migration

- Migration file name:
- Forward migration tested from clean DB: Yes/No
- Rollback plan documented: Yes/No
- Seed impact documented: Yes/No

Notes:
- Migration file name should match the committed migration exactly
- Forward test means a brand-new database reaches expected schema without manual fixes


## 6) Frontend Integration Notes

- New routes/screens:
- New shared components:
- Breaking UI changes:

Notes:
- Breaking UI changes should mention what old flow is no longer valid.


## 7) Env and Secrets

- Added env vars:
- Updated env example: Yes/No
- Secret handling reviewed (no hardcoded secret): Yes/No

Notes:
- Added env vars: include key name, purpose, and sample safe value.


## 8) Demo (optionnal)

- Local run basic commands list :
  1.
  2.
  3.
- Screenshots or short demo video link:
- API test evidence (curl/Postman/etc.):


## 9) Blockers and exception requests 

- 

- 


#### Thank you for completing the handoff ! ####








## INTEGRATOR PART
This last section is for the integrator (me) to complete 
as a current-state note on the status of the module.

## 1) Integration Checklist
- [ ] Login still works.
- [ ] Auth token works across touched routes.
- [ ] Main navigation still works.
- [ ] Realtime connection stable.
- [ ] Migration applies cleanly on empty DB.
- [ ] No new console errors.
- [ ] No obvious regression in existing module flow.

## 2) GO / NO-GO decision
- Integration status: GO / NO-GO
- If NO-GO, blockers:
