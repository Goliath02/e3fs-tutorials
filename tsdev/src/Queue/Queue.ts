import { AbstractQueue } from "./AbstractQueue";
import { QueueError, QueueErrorType } from "./Queue.interface";

export default class Queue<T> extends AbstractQueue<any> {
  private elements: T[] = [];
  private capacity;

  constructor(capacity: number) {
    super();
    this.capacity = capacity;
  }

  enqueue(item: T): void {
    if (this.elements.length + 1 > this.capacity) {
      throw new QueueError(
        QueueErrorType.QueueMaxSizeReached,
        "QueueMaxSizeReached!",
      );
    }
    this.elements.push(item);
  }

  dequeue(): T | undefined {
    return this.elements.shift();
  }

  peek(item: number): T | undefined {
    return this.elements[item - 1];
  }

  length(): number {
    return this.elements.length;
  }

  setCapacity(capacity: number): void {
    this.capacity = capacity;
  }

  getCapacity(): number {
    return this.capacity;
  }
}
