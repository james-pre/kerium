import { omit } from 'utilium';

/**
 * Standard POSIX error codes.
 * @see https://en.wikipedia.org/wiki/Errno.h
 */
export enum Errno {
	/** Operation not permitted */
	EPERM = 1,
	/** No such file or directory */
	ENOENT = 2,
	/** No such process */
	ESRCH = 3,
	/** Interrupted system call */
	EINTR = 4,
	/** Input/output error */
	EIO = 5,
	/** No such device or address */
	ENXIO = 6,
	/** Argument list too long */
	E2BIG = 7,
	/** Exec format error */
	ENOEXEC = 8,
	/** Bad file descriptor */
	EBADF = 9,
	/** No child processes */
	ECHILD = 10,
	/** Resource temporarily unavailable */
	EAGAIN = 11,
	/** Out of memory */
	ENOMEM = 12,
	/** Permission denied */
	EACCES = 13,
	/** Bad address */
	EFAULT = 14,
	/** Block device required */
	ENOTBLK = 15,
	/** Resource busy or locked */
	EBUSY = 16,
	/** File exists */
	EEXIST = 17,
	/** Invalid cross-device link */
	EXDEV = 18,
	/** No such device */
	ENODEV = 19,
	/** File is not a directory */
	ENOTDIR = 20,
	/** File is a directory */
	EISDIR = 21,
	/** Invalid argument */
	EINVAL = 22,
	/** Too many open files in system */
	ENFILE = 23,
	/** Too many open files */
	EMFILE = 24,
	/** Text file busy */
	ETXTBSY = 26,
	/** File is too big */
	EFBIG = 27,
	/** No space left on disk */
	ENOSPC = 28,
	/** Illegal seek */
	ESPIPE = 29,
	/** Cannot modify a read-only file system */
	EROFS = 30,
	/** Too many links */
	EMLINK = 31,
	/** Broken pipe */
	EPIPE = 32,
	/** Numerical argument out of domain */
	EDOM = 33,
	/** Numerical result out of range */
	ERANGE = 34,
	/** Resource deadlock would occur */
	EDEADLK = 35,
	/** File name too long */
	ENAMETOOLONG = 36,
	/** No locks available */
	ENOLCK = 37,
	/** Function not implemented */
	ENOSYS = 38,
	/** Directory is not empty */
	ENOTEMPTY = 39,
	/** Too many levels of symbolic links */
	ELOOP = 40,
	/** No message of desired type */
	ENOMSG = 42,
	/** Identifier removed */
	EIDRM = 43,
	/** Channel number out of range */
	ECHRNG = 44,
	/** Level 2 not synchronized */
	EL2NSYNC = 45,
	/** Level 3 halted */
	EL3HLT = 46,
	/** Level 3 reset */
	EL3RST = 47,
	/** Link number out of range */
	ENRNG = 48,
	/** Protocol driver not attached */
	EUNATCH = 49,
	/** No CSI structure available */
	ECSI = 50,
	/** Level 2 halted */
	EL2HLT = 51,
	/** Invalid exchange */
	EBADE = 52,
	/** Invalid request descriptor */
	EBADR = 53,
	/** Exchange full */
	EXFULL = 54,
	/** No anode */
	ENOANO = 55,
	/** Invalid request code */
	EBADRQC = 56,
	/** Invalid slot */
	EBADSLT = 57,
	/** Bad font file format */
	EBFONT = 59,
	/** Device not a stream */
	ENOSTR = 60,
	/** No data available */
	ENODATA = 61,
	/** Timer expired */
	ETIME = 62,
	/** Out of streams resources */
	ENOSR = 63,
	/** Machine is not on the network */
	ENONET = 64,
	/** Package not installed */
	ENOPKG = 65,
	/** Object is remote */
	EREMOTE = 66,
	/** Link has been severed */
	ENOLINK = 67,
	/** Advertise error */
	EADV = 68,
	/** Srmount error */
	ESRMNT = 69,
	/** Communication error on send */
	ECOMM = 70,
	/** Protocol error */
	EPROTO = 71,
	/** Multihop attempted */
	EMULTIHOP = 72,
	/** RFS specific error */
	EDOTDOT = 73,
	/** Bad message */
	EBADMSG = 74,
	/** Value too large for defined data type */
	EOVERFLOW = 75,
	/** Name not unique on network */
	ENOTUNIQ = 76,
	/** File descriptor in bad state */
	EBADFD = 77,
	/** Remote address changed */
	EREMCHG = 78,
	/** Can not access a needed shared library */
	ELIBACC = 79,
	/** Accessing a corrupted shared library */
	ELIBBAD = 80,
	/** .lib section in a.out corrupted */
	ELIBSCN = 81,
	/** Attempting to link in too many shared libraries */
	ELIBMAX = 82,
	/** Cannot exec a shared library directly */
	ELIBEXEC = 83,
	/** Invalid or incomplete multibyte or wide character */
	EILSEQ = 84,
	/** Interrupted system call should be restarted */
	ERESTART = 85,
	/** Streams pipe error */
	ESTRPIPE = 86,
	/** Too many users */
	EUSERS = 87,
	/** Socket operation on non-socket */
	ENOTSOCK = 88,
	/** Destination address required */
	EDESTADDRREQ = 89,
	/** Message too long */
	EMSGSIZE = 90,
	/** Protocol wrong type for socket */
	EPROTOTYPE = 91,
	/** Protocol not available */
	ENOPROTOOPT = 92,
	/** Protocol not supported */
	EPROTONOSUPPORT = 93,
	/** Socket type not supported */
	ESOCKTNOSUPPORT = 94,
	/** Operation is not supported */
	ENOTSUP = 95,
	/** Protocol family not supported */
	EPFNOSUPPORT = 96,
	/** Address family not supported by protocol */
	EAFNOSUPPORT = 97,
	/** Address already in use */
	EADDRINUSE = 98,
	/** Cannot assign requested address */
	EADDRNOTAVAIL = 99,
	/** Network is down */
	ENETDOWN = 100,
	/** Network is unreachable */
	ENETUNREACH = 101,
	/** Network dropped connection on reset */
	ENETRESET = 102,
	/** Software caused connection abort */
	ECONNABORTED = 103,
	/** Connection reset by peer */
	ECONNRESET = 104,
	/** No buffer space available */
	ENOBUFS = 105,
	/** Transport endpoint is already connected */
	EISCONN = 106,
	/** Transport endpoint is not connected */
	ENOTCONN = 107,
	/** Cannot send after transport endpoint shutdown */
	ESHUTDOWN = 108,
	/** Too many references: cannot splice */
	ETOOMANYREFS = 109,
	/** Connection timed out */
	ETIMEDOUT = 110,
	/** Connection refused */
	ECONNREFUSED = 111,
	/** Host is down */
	EHOSTDOWN = 112,
	/** No route to host */
	EHOSTUNREACH = 113,
	/** Operation already in progress */
	EALREADY = 114,
	/** Operation now in progress */
	EINPROGRESS = 115,
	/** Stale file handle */
	ESTALE = 116,
	/** Structure needs cleaning */
	EEUCLEAN = 117,
	/** Not a XENIX named type file */
	ENOTNAM = 118,
	/** No XENIX semaphores available */
	ENAVAIL = 119,
	/** Is a named type file */
	EISNAM = 120,
	/** Remote I/O error */
	EREMOTEIO = 121,
	/** Disk quota exceeded */
	EDQUOT = 122,
	/** No medium found */
	ENOMEDIUM = 123,
	/** Wrong medium type */
	EMEDIUMTYPE = 124,
	/** Operation canceled */
	ECANCELED = 125,
	/** Required key not available */
	ENOKEY = 126,
	/** Key has expired */
	EKEYEXPIRED = 127,
	/** Key has been revoked */
	EKEYREVOKED = 128,
	/** Key was rejected by service */
	EKEYREJECTED = 129,
	/** Owner died */
	EOWNERDEAD = 130,
	/** State not recoverable */
	ENOTRECOVERABLE = 131,
	/** Operation not possible due to RF-kill */
	ERFKILL = 132,
	/** Memory page has hardware error */
	EHWPOISON = 133,
}

/**
 * Strings associated with each error code.
 * @internal
 */
const errnoMessages = {
	[Errno.EPERM]: 'operation not permitted',
	[Errno.ENOENT]: 'no such file or directory',
	[Errno.ESRCH]: 'no such process',
	[Errno.EINTR]: 'interrupted system call',
	[Errno.EIO]: 'i/o error',
	[Errno.ENXIO]: 'no such device or address',
	[Errno.E2BIG]: 'argument list too long',
	[Errno.ENOEXEC]: 'exec format error',
	[Errno.EBADF]: 'bad file descriptor',
	[Errno.ECHILD]: 'no child processes',
	[Errno.EAGAIN]: 'resource temporarily unavailable',
	[Errno.ENOMEM]: 'not enough memory',
	[Errno.EACCES]: 'permission denied',
	[Errno.EFAULT]: 'bad address in system call argument',
	[Errno.ENOTBLK]: 'block device required',
	[Errno.EBUSY]: 'resource busy or locked',
	[Errno.EEXIST]: 'file already exists',
	[Errno.EXDEV]: 'cross-device link not permitted',
	[Errno.ENODEV]: 'no such device',
	[Errno.ENOTDIR]: 'not a directory',
	[Errno.EISDIR]: 'illegal operation on a directory',
	[Errno.EINVAL]: 'invalid argument',
	[Errno.ENFILE]: 'file table overflow',
	[Errno.EMFILE]: 'too many open files',
	[Errno.ETXTBSY]: 'text file is busy',
	[Errno.EFBIG]: 'file too large',
	[Errno.ENOSPC]: 'no space left on device',
	[Errno.ESPIPE]: 'invalid seek',
	[Errno.EROFS]: 'read-only file system',
	[Errno.EMLINK]: 'too many links',
	[Errno.EPIPE]: 'broken pipe',
	[Errno.EDOM]: 'numerical argument out of domain',
	[Errno.ERANGE]: 'result too large',
	[Errno.EDEADLK]: 'resource deadlock would occur',
	[Errno.ENAMETOOLONG]: 'name too long',
	[Errno.ENOLCK]: 'no locks available',
	[Errno.ENOSYS]: 'function not implemented',
	[Errno.ENOTEMPTY]: 'directory not empty',
	[Errno.ELOOP]: 'too many symbolic links encountered',
	[Errno.ENOMSG]: 'no message of desired type',
	[Errno.EIDRM]: 'identifier removed',
	[Errno.ECHRNG]: 'channel number out of range',
	[Errno.EL2NSYNC]: 'level 2 not synchronized',
	[Errno.EL3HLT]: 'level 3 halted',
	[Errno.EL3RST]: 'level 3 reset',
	[Errno.ENRNG]: 'link number out of range',
	[Errno.EUNATCH]: 'protocol driver not attached',
	[Errno.ECSI]: 'no CSI structure available',
	[Errno.EL2HLT]: 'level 2 halted',
	[Errno.EBADE]: 'invalid exchange',
	[Errno.EBADR]: 'invalid request descriptor',
	[Errno.EXFULL]: 'exchange full',
	[Errno.ENOANO]: 'no anode',
	[Errno.EBADRQC]: 'invalid request code',
	[Errno.EBADSLT]: 'invalid slot',
	[Errno.EBFONT]: 'bad font file format',
	[Errno.ENOSTR]: 'device not a stream',
	[Errno.ENODATA]: 'no data available',
	[Errno.ETIME]: 'timer expired',
	[Errno.ENOSR]: 'out of streams resources',
	[Errno.ENONET]: 'machine is not on the network',
	[Errno.ENOPKG]: 'package not installed',
	[Errno.EREMOTE]: 'object is remote',
	[Errno.ENOLINK]: 'link has been severed',
	[Errno.EADV]: 'advertise error',
	[Errno.ESRMNT]: 'srmount error',
	[Errno.ECOMM]: 'communication error on send',
	[Errno.EPROTO]: 'protocol error',
	[Errno.EMULTIHOP]: 'multihop attempted',
	[Errno.EDOTDOT]: 'rFS specific error',
	[Errno.EBADMSG]: 'bad message',
	[Errno.EOVERFLOW]: 'value too large for defined data type',
	[Errno.ENOTUNIQ]: 'name not unique on network',
	[Errno.EBADFD]: 'file descriptor in bad state',
	[Errno.EREMCHG]: 'remote address changed',
	[Errno.ELIBACC]: 'can not access a needed shared library',
	[Errno.ELIBBAD]: 'accessing a corrupted shared library',
	[Errno.ELIBSCN]: '.lib section in a.out corrupted',
	[Errno.ELIBMAX]: 'attempting to link in too many shared libraries',
	[Errno.ELIBEXEC]: 'cannot exec a shared library directly',
	[Errno.EILSEQ]: 'illegal byte sequence',
	[Errno.ERESTART]: 'interrupted system call should be restarted',
	[Errno.ESTRPIPE]: 'streams pipe error',
	[Errno.EUSERS]: 'too many users',
	[Errno.ENOTSOCK]: 'socket operation on non-socket',
	[Errno.EDESTADDRREQ]: 'destination address required',
	[Errno.EMSGSIZE]: 'message too long',
	[Errno.EPROTOTYPE]: 'protocol wrong type for socket',
	[Errno.ENOPROTOOPT]: 'protocol not available',
	[Errno.EPROTONOSUPPORT]: 'protocol not supported',
	[Errno.ESOCKTNOSUPPORT]: 'socket type not supported',
	[Errno.ENOTSUP]: 'operation not supported on socket',
	[Errno.EPFNOSUPPORT]: 'protocol family not supported',
	[Errno.EAFNOSUPPORT]: 'address family not supported',
	[Errno.EADDRINUSE]: 'address already in use',
	[Errno.EADDRNOTAVAIL]: 'address not available',
	[Errno.ENETDOWN]: 'network is down',
	[Errno.ENETUNREACH]: 'network is unreachable',
	[Errno.ENETRESET]: 'network dropped connection on reset',
	[Errno.ECONNABORTED]: 'software caused connection abort',
	[Errno.ECONNRESET]: 'connection reset by peer',
	[Errno.ENOBUFS]: 'no buffer space available',
	[Errno.EISCONN]: 'socket is already connected',
	[Errno.ENOTCONN]: 'socket is not connected',
	[Errno.ESHUTDOWN]: 'cannot send after transport endpoint shutdown',
	[Errno.ETOOMANYREFS]: 'too many references: cannot splice',
	[Errno.ETIMEDOUT]: 'connection timed out',
	[Errno.ECONNREFUSED]: 'connection refused',
	[Errno.EHOSTDOWN]: 'host is down',
	[Errno.EHOSTUNREACH]: 'host is unreachable',
	[Errno.EALREADY]: 'connection already in progress',
	[Errno.EINPROGRESS]: 'operation now in progress',
	[Errno.ESTALE]: 'stale file handle',
	[Errno.EEUCLEAN]: 'structure needs cleaning',
	[Errno.ENOTNAM]: 'not a XENIX named type file',
	[Errno.ENAVAIL]: 'no XENIX semaphores available',
	[Errno.EISNAM]: 'is a named type file',
	[Errno.EREMOTEIO]: 'remote I/O error',
	[Errno.EDQUOT]: 'disk quota exceeded',
	[Errno.ENOMEDIUM]: 'no medium found',
	[Errno.EMEDIUMTYPE]: 'wrong medium type',
	[Errno.ECANCELED]: 'operation canceled',
	[Errno.ENOKEY]: 'required key not available',
	[Errno.EKEYEXPIRED]: 'key has expired',
	[Errno.EKEYREVOKED]: 'key has been revoked',
	[Errno.EKEYREJECTED]: 'key was rejected by service',
	[Errno.EOWNERDEAD]: 'owner died',
	[Errno.ENOTRECOVERABLE]: 'state not recoverable',
	[Errno.ERFKILL]: 'operation not possible due to RF-kill',
	[Errno.EHWPOISON]: 'memory page has hardware error',
} as const satisfies Record<Errno, string>;

type ErrnoMessage<T extends Errno | keyof typeof Errno> = (typeof errnoMessages)[T extends Errno
	? T
	: T extends keyof typeof Errno
		? (typeof Errno)[T]
		: ''];

export function strerror<const T extends Errno | keyof typeof Errno>(errno: T): ErrnoMessage<T> {
	const _errno: Errno = typeof errno == 'string' ? Errno[errno] : errno;
	return (_errno in errnoMessages ? errnoMessages[_errno] : '') as ErrnoMessage<T>;
}

export interface ExceptionExtra {
	path?: string;
	dest?: string;
	syscall?: string;
	[k: string]: any;
}

/**
 * JSON representation of an error.
 */
export interface ExceptionJSON {
	errno: Errno;
	message: string;
	code: keyof typeof Errno;
	stack: string;
	path?: string;
	dest?: string;
	syscall?: string;
}

/**
 * Set the message of an exception to the UV-style message.
 */
export function setUVMessage<T extends ExceptionJSON>(ex: T): T {
	let message = `${ex.code}: ${errnoMessages[ex.errno]}, ${ex.syscall}`;

	if (ex.path) message += ` '${ex.path}'`;
	if (ex.dest) message += ` -> '${ex.dest}'`;

	const isDefault = ex.message.startsWith(errnoMessages[ex.errno]) || /^E[A-Z0-9]+: /.test(ex.message);
	if (ex.message && !isDefault) message += ` (${ex.message})`;

	ex.message = message;
	return ex;
}

/**
 * An error with additional information about what happened.
 *
 * @privateRemarks
 *
 * This is modeled after Node.js's `ErrnoException` and `UVException`.
 *
 * `Error.captureStackTrace` is used when available to hide irrelevant stack frames.
 * This is being standardized, however it is not available in Deno and behind a flag in Firefox.
 * See https://github.com/tc39/proposal-error-capturestacktrace for more details.
 */
export class Exception extends Error implements NodeJS.ErrnoException, ExceptionJSON {
	declare public stack: string;

	public code: keyof typeof Errno;

	public path?: string;
	public dest?: string;
	public syscall?: string;

	public constructor(errno: Errno, message: false, context: ExceptionExtra);
	public constructor(errno: Errno, message?: string);
	public constructor(
		public errno: Errno,
		message?: string | false,
		ctx: ExceptionExtra = {}
	) {
		const code = Errno[errno] as keyof typeof Errno;

		super(message || '');

		this.code = code;
		Object.assign(this, omit(ctx, 'message'));
		if (!message) setUVMessage(this);

		Error.captureStackTrace?.(this, this.constructor);
	}

	public toString(): string {
		return this.message;
	}

	public toJSON(): ExceptionJSON {
		const json: ExceptionJSON = {
			errno: this.errno,
			code: this.code,
			stack: this.stack,
			message: this.message,
		};

		if (this.path) json.path = this.path;
		if (this.dest) json.dest = this.dest;
		if (this.syscall) json.syscall = this.syscall;

		return json;
	}

	public static fromJSON(this: void, json: ExceptionJSON): Exception {
		const err = json.syscall ? new Exception(json.errno, false, json) : new Exception(json.errno, json.message);
		err.stack = json.stack;
		return err;
	}
}

/**
 * Shortcut for UV-style exceptions.
 */
export function UV(this: void, code: keyof typeof Errno, syscall: string, path?: string, dest?: string): Exception;
export function UV(this: void, code: keyof typeof Errno, context?: ExceptionExtra): Exception;
export function UV(
	this: void,
	code: keyof typeof Errno,
	context?: ExceptionExtra | string,
	path?: string,
	dest?: string
): Exception {
	if (typeof context === 'string') context = { syscall: context, path, dest };
	const err = new Exception(Errno[code], false, context ?? {});
	Error.captureStackTrace?.(err, UV);
	return err;
}

/**
 * Shortcut to easily create an `Exception` with a specific error code.
 */
export function withErrno(this: void, code: keyof typeof Errno, message?: string): Exception {
	const err = new Exception(Errno[code], message ?? errnoMessages[Errno[code]]);
	Error.captureStackTrace?.(err, withErrno);
	return err;
}

export function rethrow(syscall: string, path?: string, dest?: string): (e: Exception) => never;
export function rethrow(extra: ExceptionExtra): (e: Exception) => never;
export function rethrow(extra: ExceptionExtra | string, path?: string, dest?: string): (e: Exception) => never {
	const ctx = typeof extra === 'string' ? { syscall: extra } : extra;
	if (path) ctx.path = path;
	if (dest) ctx.dest = dest;

	return function (e: Exception) {
		Object.assign(e, ctx);
		setUVMessage(e);
		throw e;
	};
}
