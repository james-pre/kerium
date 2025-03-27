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
	[Errno.EPERM]: 'Operation not permitted',
	[Errno.ENOENT]: 'No such file or directory',
	[Errno.ESRCH]: 'No such process',
	[Errno.EINTR]: 'Interrupted system call',
	[Errno.EIO]: 'Input/output error',
	[Errno.ENXIO]: 'No such device or address',
	[Errno.E2BIG]: 'Argument list too long',
	[Errno.ENOEXEC]: 'Exec format error',
	[Errno.EBADF]: 'Bad file descriptor',
	[Errno.ECHILD]: 'No child processes',
	[Errno.EAGAIN]: 'Resource temporarily unavailable',
	[Errno.ENOMEM]: 'Out of memory',
	[Errno.EACCES]: 'Permission denied',
	[Errno.EFAULT]: 'Bad address',
	[Errno.ENOTBLK]: 'Block device required',
	[Errno.EBUSY]: 'Resource busy or locked',
	[Errno.EEXIST]: 'File exists',
	[Errno.EXDEV]: 'Invalid cross-device link',
	[Errno.ENODEV]: 'No such device',
	[Errno.ENOTDIR]: 'File is not a directory',
	[Errno.EISDIR]: 'File is a directory',
	[Errno.EINVAL]: 'Invalid argument',
	[Errno.ENFILE]: 'Too many open files in system',
	[Errno.EMFILE]: 'Too many open files',
	[Errno.ETXTBSY]: 'Text file busy',
	[Errno.EFBIG]: 'File is too big',
	[Errno.ENOSPC]: 'No space left on disk',
	[Errno.ESPIPE]: 'Illegal seek',
	[Errno.EROFS]: 'Cannot modify a read-only file system',
	[Errno.EMLINK]: 'Too many links',
	[Errno.EPIPE]: 'Broken pipe',
	[Errno.EDOM]: 'Numerical argument out of domain',
	[Errno.ERANGE]: 'Numerical result out of range',
	[Errno.EDEADLK]: 'Resource deadlock would occur',
	[Errno.ENAMETOOLONG]: 'File name too long',
	[Errno.ENOLCK]: 'No locks available',
	[Errno.ENOSYS]: 'Function not implemented',
	[Errno.ENOTEMPTY]: 'Directory is not empty',
	[Errno.ELOOP]: 'Too many levels of symbolic links',
	[Errno.ENOMSG]: 'No message of desired type',
	[Errno.EIDRM]: 'Identifier removed',
	[Errno.ECHRNG]: 'Channel number out of range',
	[Errno.EL2NSYNC]: 'Level 2 not synchronized',
	[Errno.EL3HLT]: 'Level 3 halted',
	[Errno.EL3RST]: 'Level 3 reset',
	[Errno.ENRNG]: 'Link number out of range',
	[Errno.EUNATCH]: 'Protocol driver not attached',
	[Errno.ECSI]: 'No CSI structure available',
	[Errno.EL2HLT]: 'Level 2 halted',
	[Errno.EBADE]: 'Invalid exchange',
	[Errno.EBADR]: 'Invalid request descriptor',
	[Errno.EXFULL]: 'Exchange full',
	[Errno.ENOANO]: 'No anode',
	[Errno.EBADRQC]: 'Invalid request code',
	[Errno.EBADSLT]: 'Invalid slot',
	[Errno.EBFONT]: 'Bad font file format',
	[Errno.ENOSTR]: 'Device not a stream',
	[Errno.ENODATA]: 'No data available',
	[Errno.ETIME]: 'Timer expired',
	[Errno.ENOSR]: 'Out of streams resources',
	[Errno.ENONET]: 'Machine is not on the network',
	[Errno.ENOPKG]: 'Package not installed',
	[Errno.EREMOTE]: 'Object is remote',
	[Errno.ENOLINK]: 'Link has been severed',
	[Errno.EADV]: 'Advertise error',
	[Errno.ESRMNT]: 'Srmount error',
	[Errno.ECOMM]: 'Communication error on send',
	[Errno.EPROTO]: 'Protocol error',
	[Errno.EMULTIHOP]: 'Multihop attempted',
	[Errno.EDOTDOT]: 'RFS specific error',
	[Errno.EBADMSG]: 'Bad message',
	[Errno.EOVERFLOW]: 'Value too large for defined data type',
	[Errno.ENOTUNIQ]: 'Name not unique on network',
	[Errno.EBADFD]: 'File descriptor in bad state',
	[Errno.EREMCHG]: 'Remote address changed',
	[Errno.ELIBACC]: 'Can not access a needed shared library',
	[Errno.ELIBBAD]: 'Accessing a corrupted shared library',
	[Errno.ELIBSCN]: '.lib section in a.out corrupted',
	[Errno.ELIBMAX]: 'Attempting to link in too many shared libraries',
	[Errno.ELIBEXEC]: 'Cannot exec a shared library directly',
	[Errno.EILSEQ]: 'Invalid or incomplete multibyte or wide character',
	[Errno.ERESTART]: 'Interrupted system call should be restarted',
	[Errno.ESTRPIPE]: 'Streams pipe error',
	[Errno.EUSERS]: 'Too many users',
	[Errno.ENOTSOCK]: 'Socket operation on non-socket',
	[Errno.EDESTADDRREQ]: 'Destination address required',
	[Errno.EMSGSIZE]: 'Message too long',
	[Errno.EPROTOTYPE]: 'Protocol wrong type for socket',
	[Errno.ENOPROTOOPT]: 'Protocol not available',
	[Errno.EPROTONOSUPPORT]: 'Protocol not supported',
	[Errno.ESOCKTNOSUPPORT]: 'Socket type not supported',
	[Errno.ENOTSUP]: 'Operation is not supported',
	[Errno.EPFNOSUPPORT]: 'Protocol family not supported',
	[Errno.EAFNOSUPPORT]: 'Address family not supported by protocol',
	[Errno.EADDRINUSE]: 'Address already in use',
	[Errno.EADDRNOTAVAIL]: 'Cannot assign requested address',
	[Errno.ENETDOWN]: 'Network is down',
	[Errno.ENETUNREACH]: 'Network is unreachable',
	[Errno.ENETRESET]: 'Network dropped connection on reset',
	[Errno.ECONNABORTED]: 'Software caused connection abort',
	[Errno.ECONNRESET]: 'Connection reset by peer',
	[Errno.ENOBUFS]: 'No buffer space available',
	[Errno.EISCONN]: 'Transport endpoint is already connected',
	[Errno.ENOTCONN]: 'Transport endpoint is not connected',
	[Errno.ESHUTDOWN]: 'Cannot send after transport endpoint shutdown',
	[Errno.ETOOMANYREFS]: 'Too many references: cannot splice',
	[Errno.ETIMEDOUT]: 'Connection timed out',
	[Errno.ECONNREFUSED]: 'Connection refused',
	[Errno.EHOSTDOWN]: 'Host is down',
	[Errno.EHOSTUNREACH]: 'No route to host',
	[Errno.EALREADY]: 'Operation already in progress',
	[Errno.EINPROGRESS]: 'Operation now in progress',
	[Errno.ESTALE]: 'Stale file handle',
	[Errno.EEUCLEAN]: 'Structure needs cleaning',
	[Errno.ENOTNAM]: 'Not a XENIX named type file',
	[Errno.ENAVAIL]: 'No XENIX semaphores available',
	[Errno.EISNAM]: 'Is a named type file',
	[Errno.EREMOTEIO]: 'Remote I/O error',
	[Errno.EDQUOT]: 'Disk quota exceeded',
	[Errno.ENOMEDIUM]: 'No medium found',
	[Errno.EMEDIUMTYPE]: 'Wrong medium type',
	[Errno.ECANCELED]: 'Operation canceled',
	[Errno.ENOKEY]: 'Required key not available',
	[Errno.EKEYEXPIRED]: 'Key has expired',
	[Errno.EKEYREVOKED]: 'Key has been revoked',
	[Errno.EKEYREJECTED]: 'Key was rejected by service',
	[Errno.EOWNERDEAD]: 'Owner died',
	[Errno.ENOTRECOVERABLE]: 'State not recoverable',
	[Errno.ERFKILL]: 'Operation not possible due to RF-kill',
	[Errno.EHWPOISON]: 'Memory page has hardware error',
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

/**
 * JSON representation of an error.
 */
export interface ErrnoExceptionJSON {
	errno: Errno;
	message: string;
	path?: string;
	code: keyof typeof Errno;
	stack: string;
	syscall: string;
}

/**
 * An error with additional information about what happened.
 *
 * @remarks
 *
 * `Error.captureStackTrace` is used when available to hide irrelevant stack frames.
 * This is being standardized, however it is not available in Deno and behind a flag in Firefox.
 * See https://github.com/tc39/proposal-error-capturestacktrace for more details.
 */
export class ErrnoException extends Error implements NodeJS.ErrnoException {
	declare public stack: string;

	public code: keyof typeof Errno;

	public constructor(
		public errno: Errno,
		public message: string = errnoMessages[errno],
		public syscall: string = ''
	) {
		super(message);
		this.code = Errno[errno] as keyof typeof Errno;

		Error.captureStackTrace?.(this, this.constructor);
	}

	public toString(): string {
		return this.code + ': ' + this.message;
	}

	public toJSON(): ErrnoExceptionJSON {
		return {
			errno: this.errno,
			code: this.code,
			stack: this.stack,
			message: this.message,
			syscall: this.syscall,
		};
	}

	public static fromJSON(json: ErrnoExceptionJSON): ErrnoException {
		const err = new ErrnoException(json.errno, json.message, json.syscall);
		err.code = json.code;
		err.stack = json.stack;
		return err;
	}

	public static With(code: keyof typeof Errno, syscall?: string): ErrnoException {
		const err = new ErrnoException(Errno[code], errnoMessages[Errno[code]], syscall);

		Error.captureStackTrace?.(err, this);
		return err;
	}
}
