# Kerium

Kerium is (going to be) a complete cross-host emulator of Linux in TypeScript.

# Frontends

Frontends are software layers that provide compatibility with other platforms or programming environments.
For example, a frontend could run Node.js programs or C/C++ code using Linux syscalls that is compiled to WebAssembly.
Frontends do not modify the kernel or its modules, and they do not have access to the kernel's internal state.

# Modules

Just like Linux, Kerium allows 3rd-party modules to be loaded at runtime.

# Installation

> [!IMPORTANT]
> Kerium is licensed under the GPL (v3 or later) license.
> With some [exceptions](./EXCEPTIONS.md), this license applies to your use of the kernel.

If you are making a frontend, or working on a GPL-compatible module, you can install Kerium using npm:

```sh
npm install kerium
```

For proprietary or non-GPL modules, you _must_ the `kerium-non-gpl` package, which provides a limited set of APIs under the LGPL license:

```sh
npm install kerium-non-gpl
```

# Logging

Kerium exposes a flexible logging API that uses the same levels as syslog.

# Errors

The entire set of POSIX errnos are exposed through the `Errno` enum.
The `ErrnoException` class extends the built-in `Error` with errnos, and provides JSON functionality.
You can use `strerror` to get a human-readable description of an errno.
