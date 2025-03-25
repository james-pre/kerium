/**
 * Standard POSIX error codes.
 * @see https://en.wikipedia.org/wiki/Errno.h
 */
export enum Errno {
	/** Operation not permitted */
	PERM = 1,
	/** No such file or directory */
	NOENT = 2,
	/** No such process */
	SRCH = 3,
	/** Interrupted system call */
	INTR = 4,
	/** Input/output error */
	IO = 5,
	/** No such device or address */
	NXIO = 6,
	/** Argument list too long */
	E2BIG = 7,
	/** Exec format error */
	NOEXEC = 8,
	/** Bad file descriptor */
	BADF = 9,
	/** No child processes */
	CHILD = 10,
	/** Resource temporarily unavailable */
	AGAIN = 11,
	/** Out of memory */
	NOMEM = 12,
	/** Permission denied */
	ACCES = 13,
	/** Bad address */
	FAULT = 14,
	/** Block device required */
	NOTBLK = 15,
	/** Resource busy or locked */
	BUSY = 16,
	/** File exists */
	EXIST = 17,
	/** Invalid cross-device link */
	XDEV = 18,
	/** No such device */
	NODEV = 19,
	/** File is not a directory */
	NOTDIR = 20,
	/** File is a directory */
	ISDIR = 21,
	/** Invalid argument */
	INVAL = 22,
	/** Too many open files in system */
	NFILE = 23,
	/** Too many open files */
	MFILE = 24,
	/** Text file busy */
	TXTBSY = 26,
	/** File is too big */
	FBIG = 27,
	/** No space left on disk */
	NOSPC = 28,
	/** Illegal seek */
	SPIPE = 29,
	/** Cannot modify a read-only file system */
	ROFS = 30,
	/** Too many links */
	MLINK = 31,
	/** Broken pipe */
	PIPE = 32,
	/** Numerical argument out of domain */
	DOM = 33,
	/** Numerical result out of range */
	RANGE = 34,
	/** Resource deadlock would occur */
	DEADLK = 35,
	/** File name too long */
	NAMETOOLONG = 36,
	/** No locks available */
	NOLCK = 37,
	/** Function not implemented */
	NOSYS = 38,
	/** Directory is not empty */
	NOTEMPTY = 39,
	/** Too many levels of symbolic links */
	LOOP = 40,
	/** No message of desired type */
	NOMSG = 42,
	/** Identifier removed */
	IDRM = 43,
	/** Channel number out of range */
	CHRNG = 44,
	/** Level 2 not synchronized */
	L2NSYNC = 45,
	/** Level 3 halted */
	L3HLT = 46,
	/** Level 3 reset */
	L3RST = 47,
	/** Link number out of range */
	NRNG = 48,
	/** Protocol driver not attached */
	UNATCH = 49,
	/** No CSI structure available */
	CSI = 50,
	/** Level 2 halted */
	L2HLT = 51,
	/** Invalid exchange */
	BADE = 52,
	/** Invalid request descriptor */
	BADR = 53,
	/** Exchange full */
	XFULL = 54,
	/** No anode */
	NOANO = 55,
	/** Invalid request code */
	BADRQC = 56,
	/** Invalid slot */
	BADSLT = 57,
	/** Bad font file format */
	BFONT = 59,
	/** Device not a stream */
	NOSTR = 60,
	/** No data available */
	NODATA = 61,
	/** Timer expired */
	TIME = 62,
	/** Out of streams resources */
	NOSR = 63,
	/** Machine is not on the network */
	NONET = 64,
	/** Package not installed */
	NOPKG = 65,
	/** Object is remote */
	REMOTE = 66,
	/** Link has been severed */
	NOLINK = 67,
	/** Advertise error */
	ADV = 68,
	/** Srmount error */
	SRMNT = 69,
	/** Communication error on send */
	COMM = 70,
	/** Protocol error */
	PROTO = 71,
	/** Multihop attempted */
	MULTIHOP = 72,
	/** RFS specific error */
	DOTDOT = 73,
	/** Bad message */
	BADMSG = 74,
	/** Value too large for defined data type */
	OVERFLOW = 75,
	/** Name not unique on network */
	NOTUNIQ = 76,
	/** File descriptor in bad state */
	BADFD = 77,
	/** Remote address changed */
	REMCHG = 78,
	/** Can not access a needed shared library */
	LIBACC = 79,
	/** Accessing a corrupted shared library */
	LIBBAD = 80,
	/** .lib section in a.out corrupted */
	LIBSCN = 81,
	/** Attempting to link in too many shared libraries */
	LIBMAX = 82,
	/** Cannot exec a shared library directly */
	LIBEXEC = 83,
	/** Invalid or incomplete multibyte or wide character */
	ILSEQ = 84,
	/** Interrupted system call should be restarted */
	RESTART = 85,
	/** Streams pipe error */
	STRPIPE = 86,
	/** Too many users */
	USERS = 87,
	/** Socket operation on non-socket */
	NOTSOCK = 88,
	/** Destination address required */
	DESTADDRREQ = 89,
	/** Message too long */
	MSGSIZE = 90,
	/** Protocol wrong type for socket */
	PROTOTYPE = 91,
	/** Protocol not available */
	NOPROTOOPT = 92,
	/** Protocol not supported */
	PROTONOSUPPORT = 93,
	/** Socket type not supported */
	SOCKTNOSUPPORT = 94,
	/** Operation is not supported */
	NOTSUP = 95,
	/** Protocol family not supported */
	PFNOSUPPORT = 96,
	/** Address family not supported by protocol */
	AFNOSUPPORT = 97,
	/** Address already in use */
	ADDRINUSE = 98,
	/** Cannot assign requested address */
	ADDRNOTAVAIL = 99,
	/** Network is down */
	NETDOWN = 100,
	/** Network is unreachable */
	NETUNREACH = 101,
	/** Network dropped connection on reset */
	NETRESET = 102,
	/** Software caused connection abort */
	CONNABORTED = 103,
	/** Connection reset by peer */
	CONNRESET = 104,
	/** No buffer space available */
	NOBUFS = 105,
	/** Transport endpoint is already connected */
	ISCONN = 106,
	/** Transport endpoint is not connected */
	NOTCONN = 107,
	/** Cannot send after transport endpoint shutdown */
	SHUTDOWN = 108,
	/** Too many references: cannot splice */
	TOOMANYREFS = 109,
	/** Connection timed out */
	TIMEDOUT = 110,
	/** Connection refused */
	CONNREFUSED = 111,
	/** Host is down */
	HOSTDOWN = 112,
	/** No route to host */
	HOSTUNREACH = 113,
	/** Operation already in progress */
	ALREADY = 114,
	/** Operation now in progress */
	INPROGRESS = 115,
	/** Stale file handle */
	STALE = 116,
	/** Structure needs cleaning */
	EUCLEAN = 117,
	/** Not a XENIX named type file */
	NOTNAM = 118,
	/** No XENIX semaphores available */
	NAVAIL = 119,
	/** Is a named type file */
	ISNAM = 120,
	/** Remote I/O error */
	REMOTEIO = 121,
	/** Disk quota exceeded */
	DQUOT = 122,
	/** No medium found */
	NOMEDIUM = 123,
	/** Wrong medium type */
	MEDIUMTYPE = 124,
	/** Operation canceled */
	CANCELED = 125,
	/** Required key not available */
	NOKEY = 126,
	/** Key has expired */
	KEYEXPIRED = 127,
	/** Key has been revoked */
	KEYREVOKED = 128,
	/** Key was rejected by service */
	KEYREJECTED = 129,
	/** Owner died */
	OWNERDEAD = 130,
	/** State not recoverable */
	NOTRECOVERABLE = 131,
	/** Operation not possible due to RF-kill */
	RFKILL = 132,
	/** Memory page has hardware error */
	HWPOISON = 133,
}

/**
 * Strings associated with each error code.
 * @internal
 */
const errnoMessages = {
	[Errno.PERM]: 'Operation not permitted',
	[Errno.NOENT]: 'No such file or directory',
	[Errno.SRCH]: 'No such process',
	[Errno.INTR]: 'Interrupted system call',
	[Errno.IO]: 'Input/output error',
	[Errno.NXIO]: 'No such device or address',
	[Errno.E2BIG]: 'Argument list too long',
	[Errno.NOEXEC]: 'Exec format error',
	[Errno.BADF]: 'Bad file descriptor',
	[Errno.CHILD]: 'No child processes',
	[Errno.AGAIN]: 'Resource temporarily unavailable',
	[Errno.NOMEM]: 'Out of memory',
	[Errno.ACCES]: 'Permission denied',
	[Errno.FAULT]: 'Bad address',
	[Errno.NOTBLK]: 'Block device required',
	[Errno.BUSY]: 'Resource busy or locked',
	[Errno.EXIST]: 'File exists',
	[Errno.XDEV]: 'Invalid cross-device link',
	[Errno.NODEV]: 'No such device',
	[Errno.NOTDIR]: 'File is not a directory',
	[Errno.ISDIR]: 'File is a directory',
	[Errno.INVAL]: 'Invalid argument',
	[Errno.NFILE]: 'Too many open files in system',
	[Errno.MFILE]: 'Too many open files',
	[Errno.TXTBSY]: 'Text file busy',
	[Errno.FBIG]: 'File is too big',
	[Errno.NOSPC]: 'No space left on disk',
	[Errno.SPIPE]: 'Illegal seek',
	[Errno.ROFS]: 'Cannot modify a read-only file system',
	[Errno.MLINK]: 'Too many links',
	[Errno.PIPE]: 'Broken pipe',
	[Errno.DOM]: 'Numerical argument out of domain',
	[Errno.RANGE]: 'Numerical result out of range',
	[Errno.DEADLK]: 'Resource deadlock would occur',
	[Errno.NAMETOOLONG]: 'File name too long',
	[Errno.NOLCK]: 'No locks available',
	[Errno.NOSYS]: 'Function not implemented',
	[Errno.NOTEMPTY]: 'Directory is not empty',
	[Errno.LOOP]: 'Too many levels of symbolic links',
	[Errno.NOMSG]: 'No message of desired type',
	[Errno.IDRM]: 'Identifier removed',
	[Errno.CHRNG]: 'Channel number out of range',
	[Errno.L2NSYNC]: 'Level 2 not synchronized',
	[Errno.L3HLT]: 'Level 3 halted',
	[Errno.L3RST]: 'Level 3 reset',
	[Errno.NRNG]: 'Link number out of range',
	[Errno.UNATCH]: 'Protocol driver not attached',
	[Errno.CSI]: 'No CSI structure available',
	[Errno.L2HLT]: 'Level 2 halted',
	[Errno.BADE]: 'Invalid exchange',
	[Errno.BADR]: 'Invalid request descriptor',
	[Errno.XFULL]: 'Exchange full',
	[Errno.NOANO]: 'No anode',
	[Errno.BADRQC]: 'Invalid request code',
	[Errno.BADSLT]: 'Invalid slot',
	[Errno.BFONT]: 'Bad font file format',
	[Errno.NOSTR]: 'Device not a stream',
	[Errno.NODATA]: 'No data available',
	[Errno.TIME]: 'Timer expired',
	[Errno.NOSR]: 'Out of streams resources',
	[Errno.NONET]: 'Machine is not on the network',
	[Errno.NOPKG]: 'Package not installed',
	[Errno.REMOTE]: 'Object is remote',
	[Errno.NOLINK]: 'Link has been severed',
	[Errno.ADV]: 'Advertise error',
	[Errno.SRMNT]: 'Srmount error',
	[Errno.COMM]: 'Communication error on send',
	[Errno.PROTO]: 'Protocol error',
	[Errno.MULTIHOP]: 'Multihop attempted',
	[Errno.DOTDOT]: 'RFS specific error',
	[Errno.BADMSG]: 'Bad message',
	[Errno.OVERFLOW]: 'Value too large for defined data type',
	[Errno.NOTUNIQ]: 'Name not unique on network',
	[Errno.BADFD]: 'File descriptor in bad state',
	[Errno.REMCHG]: 'Remote address changed',
	[Errno.LIBACC]: 'Can not access a needed shared library',
	[Errno.LIBBAD]: 'Accessing a corrupted shared library',
	[Errno.LIBSCN]: '.lib section in a.out corrupted',
	[Errno.LIBMAX]: 'Attempting to link in too many shared libraries',
	[Errno.LIBEXEC]: 'Cannot exec a shared library directly',
	[Errno.ILSEQ]: 'Invalid or incomplete multibyte or wide character',
	[Errno.RESTART]: 'Interrupted system call should be restarted',
	[Errno.STRPIPE]: 'Streams pipe error',
	[Errno.USERS]: 'Too many users',
	[Errno.NOTSOCK]: 'Socket operation on non-socket',
	[Errno.DESTADDRREQ]: 'Destination address required',
	[Errno.MSGSIZE]: 'Message too long',
	[Errno.PROTOTYPE]: 'Protocol wrong type for socket',
	[Errno.NOPROTOOPT]: 'Protocol not available',
	[Errno.PROTONOSUPPORT]: 'Protocol not supported',
	[Errno.SOCKTNOSUPPORT]: 'Socket type not supported',
	[Errno.NOTSUP]: 'Operation is not supported',
	[Errno.PFNOSUPPORT]: 'Protocol family not supported',
	[Errno.AFNOSUPPORT]: 'Address family not supported by protocol',
	[Errno.ADDRINUSE]: 'Address already in use',
	[Errno.ADDRNOTAVAIL]: 'Cannot assign requested address',
	[Errno.NETDOWN]: 'Network is down',
	[Errno.NETUNREACH]: 'Network is unreachable',
	[Errno.NETRESET]: 'Network dropped connection on reset',
	[Errno.CONNABORTED]: 'Software caused connection abort',
	[Errno.CONNRESET]: 'Connection reset by peer',
	[Errno.NOBUFS]: 'No buffer space available',
	[Errno.ISCONN]: 'Transport endpoint is already connected',
	[Errno.NOTCONN]: 'Transport endpoint is not connected',
	[Errno.SHUTDOWN]: 'Cannot send after transport endpoint shutdown',
	[Errno.TOOMANYREFS]: 'Too many references: cannot splice',
	[Errno.TIMEDOUT]: 'Connection timed out',
	[Errno.CONNREFUSED]: 'Connection refused',
	[Errno.HOSTDOWN]: 'Host is down',
	[Errno.HOSTUNREACH]: 'No route to host',
	[Errno.ALREADY]: 'Operation already in progress',
	[Errno.INPROGRESS]: 'Operation now in progress',
	[Errno.STALE]: 'Stale file handle',
	[Errno.EUCLEAN]: 'Structure needs cleaning',
	[Errno.NOTNAM]: 'Not a XENIX named type file',
	[Errno.NAVAIL]: 'No XENIX semaphores available',
	[Errno.ISNAM]: 'Is a named type file',
	[Errno.REMOTEIO]: 'Remote I/O error',
	[Errno.DQUOT]: 'Disk quota exceeded',
	[Errno.NOMEDIUM]: 'No medium found',
	[Errno.MEDIUMTYPE]: 'Wrong medium type',
	[Errno.CANCELED]: 'Operation canceled',
	[Errno.NOKEY]: 'Required key not available',
	[Errno.KEYEXPIRED]: 'Key has expired',
	[Errno.KEYREVOKED]: 'Key has been revoked',
	[Errno.KEYREJECTED]: 'Key was rejected by service',
	[Errno.OWNERDEAD]: 'Owner died',
	[Errno.NOTRECOVERABLE]: 'State not recoverable',
	[Errno.RFKILL]: 'Operation not possible due to RF-kill',
	[Errno.HWPOISON]: 'Memory page has hardware error',
} as const satisfies Record<Errno, string>;

export function strerror<const T extends Errno>(errno: T): (typeof errnoMessages)[T] {
	return errnoMessages[errno];
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
 * An error with additional information about what happened
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
		return new ErrnoException(Errno[code], errnoMessages[Errno[code]], syscall);
	}
}
