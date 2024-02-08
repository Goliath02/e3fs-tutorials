import { describe, expect, test } from "@jest/globals";
import Queue from "../Queue";
import { QueueError, QueueErrorType } from "../Queue.interface";

describe("Kevin's Queue Tests", () => {
  let queue;

  beforeEach(() => {
    queue = createTestQueue();
  });

  test("Enqueue Item into Queue", () => {
    let queue = createTestQueue();

    queue.enqueue(1);

    queue.length();
    expect(queue.length()).toBe(1);
  });

  test("Dequeue from Queue", () => {
    let queue = createTestQueue();

    queue.enqueue(1);
    expect(queue.length()).toBe(1);
    queue.dequeue();

    expect(queue.length()).toBe(0);
  });

  test("Throw Exception when enqueue beyond capacity", () => {
    let queue = createTestQueue();

    for (let i = 0; i < 5; i++) {
      queue.enqueue(i);
    }
    expect(() => queue.enqueue(6)).toThrow(
      new QueueError(
        QueueErrorType.QueueMaxSizeReached,
        "QueueMaxSizeReached!",
      ),
    );
  });

  test("Expect Queue to have set capacity", () => {
    let queue = new Queue<Number>(1);
    expect(queue.getCapacity()).toBe(1);
  });

  test("Get peeked number from queue", () => {
    let queue = createTestQueue();

    for (let i = 0; i < 3; i++) {
      queue.enqueue(i);
    }
    expect(queue.peek(2)).toBe(1);
  });
});

function createTestQueue() {
  let queue = new Queue<Number>(5);
  queue.setCapacity(5);

  return queue;
}
