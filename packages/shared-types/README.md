# Shared Types

This directory contains TypeScript type definitions automatically generated from Rust code.

## Structure

- All `.ts` files (except index.ts) are automatically generated
- Do not modify generated files directly
- Types are generated during the Rust build process

## Usage

Import types from this package in your TypeScript code:

```typescript
import { YourType } from '@project/shared-types';
```

Configure your tsconfig.json paths to include this package.
