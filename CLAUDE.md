# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Phone Dashboard is a SvelteKit 5 application for managing phone configuration files. It allows users to create, edit, and manage phone configurations with a custom configuration language syntax highlighting, variable tracking, and support for additional files.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with svelte-check
- `npm run check:watch` - Type check in watch mode

### Database (Drizzle ORM)
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Drizzle Studio GUI

**Important**: After modifying `src/lib/db/schema.ts`, run `npm run db:push` to sync changes with the database.

## Architecture

### Technology Stack
- **Framework**: SvelteKit 5 with Svelte 5 runes (`$state`, `$derived`)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better-Auth via `@jsbursik/magic-ui` package
- **Code Editor**: prism-code-editor with custom phone-config language
- **UI Components**: Custom components from `@jsbursik/magic-ui`

### Database Schema

Drizzle schema is located at `src/lib/db/schema.ts`. The main table is:

**phoneConfigs**:
- `id` (serial, primary key)
- `phone_model` (text, unique, not null)
- `phone_cfg_filename` (text, not null)
- `phone_cfg` (text, not null)
- `additional_files` (json, AdditionalFiles[])
- `variables` (json, string[])

The schema also re-exports Better-Auth tables from `@jsbursik/magic-ui/server`.

### Authentication Flow

Authentication is handled by Better-Auth through the `@jsbursik/magic-ui` package:
- Auth instance created in `src/lib/server/auth.ts`
- Session management in `src/hooks.server.ts`
- Protected routes checked in the hooks (e.g., `/secret`)
- Auth API endpoint at `/api/auth/[...all]/+server.ts`

### Phone Config Management

**Phone Config Language**: Custom syntax highlighting defined in `src/lib/components/code-editor/configLanguage.ts`:
- Comments: `#`
- Variables: `$variable_name`
- Attributes: `key = value` or `key: value`

**Variable Tracking**: Variables are automatically detected from all code editors using the pattern `/\$\w+/g`. The variables array is derived reactively from all editor content.

**Form Validation**: Filename validation in `src/lib/form-validation/index.ts` ensures filenames match the pattern: `$?[\w.-]+\.\w+` or `$\w+`

### API Routes

**Phone Config API** (`src/routes/api/phone-config/`):
- `POST /api/phone-config` - Create new phone config
- `PUT /api/phone-config/[id]` - Update existing config
- `DELETE /api/phone-config/[id]` - Delete config

Request format for POST/PUT:
```typescript
{
  values: Record<string, string>,  // Form field values
  editors: string[],                // Editor IDs
  variables: string[]               // Detected variables
}
```

### Key Pages

- `/phones` - List all phone configs
- `/phones/add-config` - Create new phone config
- `/phones/edit-config` - Edit existing phone config (uses URL params for config ID)
- `/login`, `/signup` - Authentication pages
- `/secret` - Protected route example

### State Management

The application uses Svelte 5 runes:
- `$state` for reactive state
- `$derived` for computed values (e.g., variable extraction)
- Form values stored in `Record<string, string>` objects
- Dynamic editor management with unique IDs (`editor-${count}`)

### Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string (format: `postgres://user:password@host:port/db-name`)

## Development Notes

### Working with Phone Configs

When adding/editing phone configs:
1. The main config is stored in `phone_cfg` field
2. Additional files are managed dynamically (add/remove editors)
3. Each editor has two values: `${editorId}-id` (filename) and `${editorId}-code` (content)
4. Variables are automatically extracted from all editors using regex
5. All values are validated before submission

### Database Workflow

1. Modify schema in `src/lib/db/schema.ts`
2. Run `npm run db:push` to sync with database
3. For production migrations, use `npm run db:generate` then `npm run db:migrate`

### Code Editor Integration

The custom phone-config language (`src/lib/components/code-editor/configLanguage.ts`) extends prism-code-editor. To modify syntax highlighting, update the language definition patterns.
