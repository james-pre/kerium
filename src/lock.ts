/**
 * @todo
 */
export class Lock {
	wait: raw_lock;
	waiters: __RBTree_Root;
	owner: _task_struct;
}
