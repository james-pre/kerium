# Kerium Kernel GPL Exceptions

The following exceptions to the GPL terms apply to the Kerium kernel:

## 1. Frontends

The copyright holders of this software grant an exception to the GPL terms to allow
frontends (software layers that provide compatibility with other platforms or programming
environments) to interface with the Kerium kernel under any license, provided that
they comply with all requirements specified in Section 4 of the GNU Lesser General
Public License version 3 regarding "Combined Works," treating the Kerium kernel as
the "Library" referenced therein.

For clarity, frontends must:

1. Provide prominent notice that Kerium is used
2. Include copies of the appropriate licenses
3. Display copyright notices as appropriate
4. Either
    - Convey the Minimal Corresponding Source under the terms of the LGPLv3, or
    - Use a suitable shared library mechanism for linking with the Library
5. Provide installation information where required

Additionally, this exception only applies to frontends that:

- Do not modify the Kerium kernel source code
- Do not add or inject modules into the kernel
- Interface with Kerium only through its documented public APIs
- Maintain clear separation between the frontend and the kernel

## 2. Limited API Exception for `kerium-non-gpl`

Certain APIs of the Kerium kernel are made available under the GNU Lesser General
Public License (LGPL) through the `kerium-non-gpl` package. This exception explicitly
permits the creation of proprietary drivers and modules that link against only the
specific APIs exported by the `kerium-non-gpl` package.

This exception does NOT extend to:
a) APIs not explicitly exported by the `kerium-non-gpl` package
b) Internal kernel functionality not exposed through `kerium-non-gpl`
c) Modified versions of the Kerium kernel itself

The `kerium-non-gpl` package is a subset of the full Kerium API designed to enable
broader adoption while still protecting the core kernel's freedom.
