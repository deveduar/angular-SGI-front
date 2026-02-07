---
title: "Update guide • Angular-update-guide?v=18.0-21.0&l=1"
source: "https://angular.dev/update-guide?v=18.0-21.0&l=1"
published:
date_saved: 2026-02-07 19:25
description: "The web development framework for building modern apps."
tags:
  - "angular"
source_domain: "angular.dev"
---
# Update guide • Angular 
> [!example] Date: 2026-02-07 19:25	
> [Read Original](https://angular.dev/update-guide?v=18.0-21.0&l=1)
#angular

**Warning:** Plans for releases after the current major release are not finalized and may change. These recommendations are based on scheduled deprecations.

**Warning:** Be sure to follow the guide below to migrate your application to the new version. You can't run `ng update` to update Angular applications more than one major version at a time.

## Guide to update your Angular application v18.0 -> v21.0 for basic applications

### Before you update

*You don't need to do anything before moving between these versions.*

### Update to the new version

*Review these changes and perform the actions to update your application.*

Angular directives, components and pipes are now standalone by default. Specify "standalone: false" for declarations that are currently declared in an NgModule. The Angular CLI will automatically update your code to reflect that.

Zone-based applications should add `provideZoneChangeDetection()` to your application's root providers. For standalone apps, add it to the `bootstrapApplication` call. For NgModule-based apps, add it to your root `AppModule` 's `providers` array. An automated migration should handle this.

### Update to the new version Basic

_Review these changes and perform the actions to update your application._

In the application's project directory, run `ng update @angular/core@19 @angular/cli@19` to update your application to Angular v19.

Basic

Angular directives, components and pipes are now standalone by default. Specify "standalone: false" for declarations that are currently declared in an NgModule. The Angular CLI will automatically update your code to reflect that.

Basic

Replace usages of `BrowserModule.withServerTransition()` with injection of the `APP_ID` token to set the application `id` instead.

Basic

Upgrade to TypeScript version 5.5 or later.

Basic

Migrate from using `Router.errorHandler` to `withNavigationErrorHandler` from `provideRouter` or `errorHandler` from `RouterModule.forRoot`.

Basic

In the application's project directory, run `ng update @angular/core@20 @angular/cli@20` to update your application to Angular v20.

Basic

Rename the `afterRender` lifecycle hook to `afterEveryRender`

Basic

Rename the `request` property passed in resources to `params`.

Basic

`ResourceStatus` is no longer an enum. Use the corresponding constant string values instead.

Basic

Ensure your Node.js version is at least 20.11.1 and not v18 or v22.0-v22.10 before upgrading to Angular v20. Check [https://angular.dev/reference/versions](https://angular.dev/reference/versions) for the full list of supported Node.js versions.

Basic

Replace all occurrences of the deprecated `TestBed.get()` method with `TestBed.inject()` in your Angular tests for dependency injection.

Basic

Upgrade your project's TypeScript version to at least 5.8 before upgrading to Angular v20 to ensure compatibility.

Basic

In the application's project directory, run `ng update @angular/core@21 @angular/cli@21` to update your application to Angular v21.

Basic

Zone-based applications should add `provideZoneChangeDetection()` to your application's root providers. For standalone apps, add it to the `bootstrapApplication` call. For NgModule-based apps, add it to your root `AppModule`'s `providers` array. An automated migration should handle this.

Basic

Host binding type checking is now enabled by default and may surface new build errors. Resolve any new type errors or set `typeCheckHostBindings: false` in your `tsconfig.json`'s `angularCompilerOptions`.

Basic

Update your project's TypeScript version to 5.9 or later. The `ng update` command will typically handle this automatically.

### Update to the new version MEDIUM

_Review these changes and perform the actions to update your application._

In the application's project directory, run `ng update @angular/core@19 @angular/cli@19` to update your application to Angular v19.

Basic

Angular directives, components and pipes are now standalone by default. Specify "standalone: false" for declarations that are currently declared in an NgModule. The Angular CLI will automatically update your code to reflect that.

Basic

Remove `this.` prefix when accessing template reference variables. For example, refactor `<div #foo></div>{{ this.foo }}` to `<div #foo></div>{{ foo }}`

Medium

Replace usages of `BrowserModule.withServerTransition()` with injection of the `APP_ID` token to set the application `id` instead.

Basic

In angular.json, replace the "name" option with "project" for the `@angular/localize` builder.

Medium

Update tests that relied on the `Promise` timing of effects to use `await whenStable()` or call `.detectChanges()` to trigger effects. For effects triggered during change detection, ensure they don't depend on the application being fully rendered or consider using `afterRenderEffect()`. Tests using faked clocks may need to fast-forward/flush the clock.

Medium

Upgrade to TypeScript version 5.5 or later.

Basic

When using `createComponent` API and not passing content for the first `ng-content`, provide `document.createTextNode('')` as a `projectableNode` to prevent rendering the default fallback content.

Medium

Migrate from using `Router.errorHandler` to `withNavigationErrorHandler` from `provideRouter` or `errorHandler` from `RouterModule.forRoot`.

Basic

Update usages of `Resolve` interface to include `RedirectCommand` in its return type.

Medium

In the application's project directory, run `ng update @angular/core@20 @angular/cli@20` to update your application to Angular v20.

Basic

Rename the `afterRender` lifecycle hook to `afterEveryRender`

Basic

Replace uses of `TestBed.flushEffects()` with `TestBed.tick()`, the closest equivalent to synchronously flush effects.

Medium

Rename the `request` property passed in resources to `params`.

Basic

Rename the `request` and `loader` properties passed in RxResource to `params` and `stream`.

Medium

`ResourceStatus` is no longer an enum. Use the corresponding constant string values instead.

Basic

In tests, uncaught errors in event listeners are now rethrown by default. Previously, these were only logged to the console by default. Catch them if intentional for the test case, or use `rethrowApplicationErrors: false` in `configureTestingModule` as a last resort.

Medium

Ensure your Node.js version is at least 20.11.1 and not v18 or v22.0-v22.10 before upgrading to Angular v20. Check [https://angular.dev/reference/versions](https://angular.dev/reference/versions) for the full list of supported Node.js versions.

Basic

Replace all occurrences of the deprecated `TestBed.get()` method with `TestBed.inject()` in your Angular tests for dependency injection.

Basic

Remove `InjectFlags` enum and its usage from `inject`, `Injector.get`, `EnvironmentInjector.get`, and `TestBed.inject` calls. Use options like `{optional: true}` for `inject` or handle null for `*.get` methods.

Medium

Upgrade your project's TypeScript version to at least 5.8 before upgrading to Angular v20 to ensure compatibility.

Basic

In templates parentheses are now always respected. This can lead to runtime breakages when nullish coalescing were nested in parathesis. eg `(foo?.bar).baz` will throw if `foo` is nullish as it would in native JavaScript.

Medium

In the application's project directory, run `ng update @angular/core@21 @angular/cli@21` to update your application to Angular v21.

Basic

Zone-based applications should add `provideZoneChangeDetection()` to your application's root providers. For standalone apps, add it to the `bootstrapApplication` call. For NgModule-based apps, add it to your root `AppModule`'s `providers` array. An automated migration should handle this.

Basic

Remove the 'moduleId' property from your @Component decorators. This property was used for resolving relative URLs for templates and styles, a functionality now handled by modern build tools.

Medium

The `ngComponentOutletContent` input has been strictly typed from `any[][]` to `Node[][]`. Update the value you pass to this input to match the new `Node[][] | undefined` type.

Medium

Host binding type checking is now enabled by default and may surface new build errors. Resolve any new type errors or set `typeCheckHostBindings: false` in your `tsconfig.json`'s `angularCompilerOptions`.

Basic

Update your project's TypeScript version to 5.9 or later. The `ng update` command will typically handle this automatically.

Basic

The `ApplicationConfig` export from `@angular/platform-browser` has been removed. Update your imports to use `ApplicationConfig` from `@angular/core` instead.

Medium

Update tests using `provideZoneChangeDetection` as TestBed now rethrows errors. Fix the underlying issues in your tests or, as a last resort, configure TestBed with `rethrowApplicationErrors: false` to disable this behavior.

Medium

Update tests that rely on router navigation timing. Navigations may now take additional microtasks to complete. Ensure navigations are fully completed before making assertions, for example by using `fakeAsync` with `flush` or waiting for promises/observables to resolve.

Medium

Tests using `TestBed` might be affected by the new fake `PlatformLocation`. If your tests fail, provide the old `MockPlatformLocation` from `@angular/common/testing` via `{provide: PlatformLocation, useClass: MockPlatformLocation}` in your `TestBed` configuration.

Medium

The new standalone `formArray` directive might conflict with existing custom directives or inputs. Rename any custom directives named `FormArray` or inputs named `formArray` on elements that also use reactive forms to resolve the conflict.

Medium

The `lastSuccessfulNavigation` property on the Router has been converted to a signal. To get its value, you now need to invoke it as a function: `router.lastSuccessfulNavigation()`.

Medium


### Update to the new version all

_Review these changes and perform the actions to update your application._

In the application's project directory, run `ng update @angular/core@19 @angular/cli@19` to update your application to Angular v19.

Basic

Angular directives, components and pipes are now standalone by default. Specify "standalone: false" for declarations that are currently declared in an NgModule. The Angular CLI will automatically update your code to reflect that.

Basic

Remove `this.` prefix when accessing template reference variables. For example, refactor `<div #foo></div>{{ this.foo }}` to `<div #foo></div>{{ foo }}`

Medium

Replace usages of `BrowserModule.withServerTransition()` with injection of the `APP_ID` token to set the application `id` instead.

Basic

The `factories` property in `KeyValueDiffers` has been removed.

Advanced

In angular.json, replace the "name" option with "project" for the `@angular/localize` builder.

Medium

Rename `ExperimentalPendingTasks` to `PendingTasks`.

Advanced

Update tests that relied on the `Promise` timing of effects to use `await whenStable()` or call `.detectChanges()` to trigger effects. For effects triggered during change detection, ensure they don't depend on the application being fully rendered or consider using `afterRenderEffect()`. Tests using faked clocks may need to fast-forward/flush the clock.

Medium

Upgrade to TypeScript version 5.5 or later.

Basic

Update tests using `fakeAsync` that rely on specific timing of zone coalescing and scheduling when a change happens outside the Angular zone (hybrid mode scheduling) as these timers are now affected by `tick` and `flush`.

Advanced

When using `createComponent` API and not passing content for the first `ng-content`, provide `document.createTextNode('')` as a `projectableNode` to prevent rendering the default fallback content.

Medium

Update tests that rely on specific timing or ordering of change detection around custom elements, as the timing may have changed due to the switch to the hybrid scheduler.

Advanced

Migrate from using `Router.errorHandler` to `withNavigationErrorHandler` from `provideRouter` or `errorHandler` from `RouterModule.forRoot`.

Basic

Update tests to handle errors thrown during `ApplicationRef.tick` by either triggering change detection synchronously or rejecting outstanding `ComponentFixture.whenStable` promises.

Advanced

Update usages of `Resolve` interface to include `RedirectCommand` in its return type.

Medium

`fakeAsync` will flush pending timers by default. For tests that require the previous behavior, explicitly pass `{flush: false}` in the options parameter.

Advanced

In the application's project directory, run `ng update @angular/core@20 @angular/cli@20` to update your application to Angular v20.

Basic

Rename the `afterRender` lifecycle hook to `afterEveryRender`

Basic

Replace uses of `TestBed.flushEffects()` with `TestBed.tick()`, the closest equivalent to synchronously flush effects.

Medium

Rename `provideExperimentalCheckNoChangesForDebug` to `provideCheckNoChangesConfig`. Note its behavior now applies to all `checkNoChanges` runs. The `useNgZoneOnStable` option is no longer available.

Advanced

Refactor application and test code to avoid relying on `ng-reflect-*` attributes. If needed temporarily for migration, use `provideNgReflectAttributes()` from `@angular/core` in bootstrap providers to re-enable them in dev mode only.

Advanced

Adjust code that directly calls functions returning `RedirectFn`. These functions can now also return an `Observable` or `Promise`; ensure your logic correctly handles these asynchronous return types.

Advanced

Rename the `request` property passed in resources to `params`.

Basic

Rename the `request` and `loader` properties passed in RxResource to `params` and `stream`.

Medium

`ResourceStatus` is no longer an enum. Use the corresponding constant string values instead.

Basic

Rename `provideExperimentalZonelessChangeDetection` to `provideZonelessChangeDetection`.

Advanced

If your templates use `{{ in }}` or `in` in expressions to refer to a component property named 'in', change it to `{{ this.in }}` or `this.in` as 'in' now refers to the JavaScript 'in' operator. If you're using `in` as a template reference, you'd have to rename the reference.

Advanced

The type for the commands arrays passed to Router methods (`createUrlTree`, `navigate`, `createUrlTreeFromSnapshot`) have been updated to use `readonly T[]` since the array is not mutated. Code which extracts these types (e.g. with `typeof`) may need to be adjusted if it expects mutable arrays.

Advanced

Review and update tests asserting on DOM elements involved in animations. Animations are now guaranteed to be flushed with change detection or `ApplicationRef.tick`, potentially altering previous test outcomes.

Advanced

In tests, uncaught errors in event listeners are now rethrown by default. Previously, these were only logged to the console by default. Catch them if intentional for the test case, or use `rethrowApplicationErrors: false` in `configureTestingModule` as a last resort.

Medium

The `any` type is removed from the Route guard arrays (canActivate, canDeactivate, etc); ensure guards are functions, `ProviderToken<T>`, or (deprecated) strings. Refactor string guards to `ProviderToken<T>` or functions.

Advanced

Ensure your Node.js version is at least 20.11.1 and not v18 or v22.0-v22.10 before upgrading to Angular v20. Check [https://angular.dev/reference/versions](https://angular.dev/reference/versions) for the full list of supported Node.js versions.

Basic

Replace all occurrences of the deprecated `TestBed.get()` method with `TestBed.inject()` in your Angular tests for dependency injection.

Basic

Remove `InjectFlags` enum and its usage from `inject`, `Injector.get`, `EnvironmentInjector.get`, and `TestBed.inject` calls. Use options like `{optional: true}` for `inject` or handle null for `*.get` methods.

Medium

Update `injector.get()` calls to use a specific `ProviderToken<T>` instead of relying on the removed `any` overload. If using string tokens (deprecated since v4), migrate them to `ProviderToken<T>`.

Advanced

Upgrade your project's TypeScript version to at least 5.8 before upgrading to Angular v20 to ensure compatibility.

Basic

`Unhandled errors in subscriptions/promises of AsyncPipe` are now directly reported to `ErrorHandler`. This may alter test outcomes; ensure tests correctly handle these reported errors.

Advanced

If relying on the return value of `PendingTasks.run`, refactor to use `PendingTasks.add`. Handle promise results/rejections manually, especially for SSR to prevent node process shutdown on unhandled rejections.

Advanced

If your templates use `{{ void }}` or `void` in expressions to refer to a component property named 'void', change it to `{{ this.void }}` or `this.void` as 'void' now refers to the JavaScript `void` operator.

Advanced

Review `DatePipe` usages. Using the `Y` (week-numbering year) formatter without also including `w` (week number) is now detected as suspicious. Use `y` (year) if that was the intent, or include `w` alongside `Y`.

Advanced

In templates parentheses are now always respected. This can lead to runtime breakages when nullish coalescing were nested in parathesis. eg `(foo?.bar).baz` will throw if `foo` is nullish as it would in native JavaScript.

Medium

Route configurations are now validated more rigorously. Routes that combine `redirectTo` and `canMatch` protections will generate an error, as these properties are incompatible together by default.

Advanced

In the application's project directory, run `ng update @angular/core@21 @angular/cli@21` to update your application to Angular v21.

Basic

When using signal inputs with Angular custom elements, update property access to be direct (`elementRef.newInput`) instead of a function call (`elementRef.newInput()`) to align with the behavior of decorator-based inputs.

Advanced

If using `provideZoneChangeDetection` without the ZoneJS polyfill, note that the internal scheduler is now always enabled. Review your app's timing as this may alter behavior that previously relied on the disabled scheduler.

Advanced

Zone-based applications should add `provideZoneChangeDetection()` to your application's root providers. For standalone apps, add it to the `bootstrapApplication` call. For NgModule-based apps, add it to your root `AppModule`'s `providers` array. An automated migration should handle this.

Basic

Remove the 'interpolation' property from your @Component decorators. Angular now only supports the default '{{' and '}}' interpolation markers.

Advanced

Remove the 'moduleId' property from your @Component decorators. This property was used for resolving relative URLs for templates and styles, a functionality now handled by modern build tools.

Medium

The `ngComponentOutletContent` input has been strictly typed from `any[][]` to `Node[][]`. Update the value you pass to this input to match the new `Node[][] | undefined` type.

Medium

Host binding type checking is now enabled by default and may surface new build errors. Resolve any new type errors or set `typeCheckHostBindings: false` in your `tsconfig.json`'s `angularCompilerOptions`.

Basic

Update your project's TypeScript version to 5.9 or later. The `ng update` command will typically handle this automatically.

Basic

The `ApplicationConfig` export from `@angular/platform-browser` has been removed. Update your imports to use `ApplicationConfig` from `@angular/core` instead.

Medium

The `ignoreChangesOutsideZone` option for configuring ZoneJS is no longer available. Remove this option from your ZoneJS configuration in your polyfills file.

Advanced

Update tests using `provideZoneChangeDetection` as TestBed now rethrows errors. Fix the underlying issues in your tests or, as a last resort, configure TestBed with `rethrowApplicationErrors: false` to disable this behavior.

Medium

Update tests that rely on router navigation timing. Navigations may now take additional microtasks to complete. Ensure navigations are fully completed before making assertions, for example by using `fakeAsync` with `flush` or waiting for promises/observables to resolve.

Medium

Tests using `TestBed` might be affected by the new fake `PlatformLocation`. If your tests fail, provide the old `MockPlatformLocation` from `@angular/common/testing` via `{provide: PlatformLocation, useClass: MockPlatformLocation}` in your `TestBed` configuration.

Medium

The `UpgradeAdapter` has been removed. Update your hybrid Angular/AngularJS application to use the static APIs from the `@angular/upgrade/static` package instead.

Advanced

The new standalone `formArray` directive might conflict with existing custom directives or inputs. Rename any custom directives named `FormArray` or inputs named `formArray` on elements that also use reactive forms to resolve the conflict.

Medium

The deprecated `NgModuleFactory` has been removed. Update any code that uses `NgModuleFactory` to use `NgModule` directly, which is common in dynamic component loading scenarios.

Advanced

The `emitDeclarationOnly` TypeScript compiler option is not supported. Please disable it in your `tsconfig.json` file to allow the Angular compiler to function correctly.

Advanced

The `lastSuccessfulNavigation` property on the Router has been converted to a signal. To get its value, you now need to invoke it as a function: `router.lastSuccessfulNavigation()`.

Medium

