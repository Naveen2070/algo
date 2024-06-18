class ImmutableStack {
  constructor(items = []) {
    this._items = items.slice(); // Create a shallow copy to ensure immutability
  }

  push(item) {
    const newItems = this._items.concat(item);
    return new ImmutableStack(newItems); // Return a new ImmutableStack with updated items
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }
    const newItems = this._items.slice(0, -1); // Remove last item
    return new ImmutableStack(newItems); // Return a new ImmutableStack with updated items
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this._items[this._items.length - 1];
  }

  isEmpty() {
    return this._items.length === 0;
  }

  toArray() {
    return this._items.slice(); // Return a shallow copy
  }
}

class ImmutableQueue {
  constructor(items = []) {
    this._items = items.slice(); // Create a shallow copy to ensure immutability
  }

  enqueue(item) {
    const newItems = this._items.concat(item);
    return new ImmutableQueue(newItems); // Return a new ImmutableQueue with updated items
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue underflow');
    }
    const newItems = this._items.slice(1); // Remove first item
    return new ImmutableQueue(newItems); // Return a new ImmutableQueue with updated items
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this._items[0];
  }

  isEmpty() {
    return this._items.length === 0;
  }

  toArray() {
    return this._items.slice(); // Return a shallow copy
  }
}

class ImmutableLinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class ImmutableLinkedList {
  constructor(head = null) {
    this.head = head;
  }

  prepend(value) {
    const newNode = new ImmutableLinkedListNode(value, this.head);
    return new ImmutableLinkedList(newNode);
  }

  append(value) {
    if (!this.head) {
      return new ImmutableLinkedListNode(value);
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    const newNode = new ImmutableLinkedListNode(value);
    current.next = newNode;
    return new ImmutableLinkedList(this.head);
  }

  delete(value) {
    if (!this.head) {
      return this;
    }
    if (this.head.value === value) {
      return new ImmutableLinkedList(this.head.next);
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return new ImmutableLinkedList(this.head);
      }
      current = current.next;
    }
    return this;
  }

  toArray() {
    const array = [];
    let current = this.head;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }
}

class ImmutableMap {
  constructor(entries = []) {
    this._entries = entries.slice(); // Create a shallow copy to ensure immutability
  }

  set(key, value) {
    const updatedEntries = this._entries.filter(([k, v]) => k !== key);
    updatedEntries.push([key, value]);
    return new ImmutableMap(updatedEntries); // Return a new ImmutableMap with updated entries
  }

  get(key) {
    const entry = this._entries.find(([k, v]) => k === key);
    return entry ? entry[1] : undefined;
  }

  delete(key) {
    const updatedEntries = this._entries.filter(([k, v]) => k !== key);
    return new ImmutableMap(updatedEntries); // Return a new ImmutableMap with updated entries
  }

  has(key) {
    return this._entries.some(([k, v]) => k === key);
  }

  toArray() {
    return this._entries.slice(); // Return a shallow copy
  }
}

class ImmutableSet {
  constructor(items = []) {
    this._items = Array.from(new Set(items)); // Convert to Set to ensure uniqueness
  }

  add(item) {
    const newItems = Array.from(new Set(this._items.concat(item)));
    return new ImmutableSet(newItems); // Return a new ImmutableSet with updated items
  }

  delete(item) {
    const newItems = this._items.filter((x) => x !== item);
    return new ImmutableSet(newItems); // Return a new ImmutableSet with updated items
  }

  has(item) {
    return this._items.includes(item);
  }

  toArray() {
    return this._items.slice(); // Return a shallow copy
  }
}

module.exports = {
  ImmutableStack,
  ImmutableQueue,
  ImmutableLinkedList,
  ImmutableMap,
  ImmutableSet,
};
