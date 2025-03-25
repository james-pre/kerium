# Kerium

Kerium is a small library containing some POSIX-style code.
The focus is on providing shared utilities for other projects.

# Logging

Kerium exposes a flexible logging API that uses the same levels as syslog.

# Errors

The entire set of POSIX errnos are exposed through the `Errno` enum.
The `ErrnoException` class extends the built-in `Error` with errnos, and provides JSON functionality.
You can use `strerror` to get a human-readable description of an errno.
