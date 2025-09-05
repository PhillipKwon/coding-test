class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        newNode = ListNode(val)
        if self.head is None:
          self.head = newNode
          return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = newNode

    def prepend(self, val):
        newNode = ListNode(val)
        newNode.next = self.head
        self.head = newNode

    def display(self):
        current = self.head
        while current is not None:
            print(current.val, " -> ", end="")
            current = current.next

        print("None")

    def delete(self, val):
        if self.head is None:
            return
        
        if self.head.val == val:
            self.head = self.head.next
            return
        
        prev = self.head
        current = self.head
        while current is not None:
            if current.val == val:
                prev.next = current.next
                return
            prev = current
            current = current.next

# 테스트 코드
if __name__ == "__main__":
    ll = LinkedList()
    ll.append(3)
    ll.prepend(2)
    ll.append(4)
    ll.prepend(1)
    ll.append(5)
    ll.display()
    ll.delete(5)
    ll.display()

