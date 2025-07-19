Kerium has some lofty goals.
In order to achieve these optimally and/or with less effort, some proposals to TC39 need to go through.
Below is a list of the proposals that we a tracking and why.

## Structs

Proposal: [JavaScript Structs: Fixed Layout Objects and Some Synchronization Primitives](https://github.com/tc39/proposal-structs)

> This proposal introduces four (4) logical features:
>
> - **Structs**, or unshared structs, which are fixed-layout objects. They behave like `class` instances, with more restrictions that are beneficial for optimizations and analysis.
> - **Shared Structs**, which are further restricted structs that can be shared and accessed in parallel by multiple agents. They enable shared memory multithreading.
> - **Mutex and Condition**, which are higher level abstractions for synchronizing access to shared memory.

`shared struct`s allow use to share JS primitives across threads.
Without this, we would have to use `SharedArrayBuffer`.
That introduces a significant amount of work,
especially since dealing with something like a string becomes a lot more complex.
If this proposal flops, we can leverage Memium for C-style structs,
but it still is way more difficult than using the features introduced by this proposal.
Interfaces that would use this feature are marked with `@todo [share]`.

This proposal also introduces `Mutex` and `Condition`, which are incredibly useful for synchronizing access to shared memory.
Just like `shared struct`s, we can still leverage `SharedArrayBuffer` and `Atomics` without these (again, it is a lot more work).

## Panic

Proposal: [Don't Remember Panicking](https://github.com/tc39/proposal-oom-fails-fast)

This is a smaller proposal that introduces a single but important function: `Reflect.panic`.
The proposal's goal is to allow us to halt a thread as soon as possible.
For now we are using `@endo/panic`, which is an imperfect solution.
