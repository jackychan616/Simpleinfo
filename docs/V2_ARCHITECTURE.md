# Better System v2 (Milestone 1)

This milestone introduces the foundation for a real scalable site:

## RBAC
- `user_roles` table
- Roles: `admin`, `editor`, `writer`, `user`
- Server-side helper: `src/lib/rbac.js`

## Posts core
- `posts` table for canonical content
- `post_blocks` table for block-based content
- Draft -> Publish flow via API

## APIs (v2)
- `GET /api/v2/posts?status=published`
- `POST /api/v2/posts` (writer+)
- `POST /api/v2/posts/:id/publish` (editor+)
- `GET /api/v2/me/role`

## Migration
Run:
- `docs/migrations/20260228_v2_rbac_posts.sql`

## Next milestones
1. Replace old community pages with `posts` as source of truth
2. Add post revisions/versioning
3. Add role management UI (admin panel)
4. Add audit logs for moderation/publish actions
