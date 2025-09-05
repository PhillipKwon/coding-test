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

    def insert_at_index(self, index, val):
        if index < 0:
            return
        
        # index가 0이면 prepend와 같음
        if index == 0:
            self.prepend(val)
            return
        
        # 삽입할 위치의 이전 노드 찾기
        current = self.head
        for i in range(index - 1):
            if current is None:
                print("Index out of range")
                return
            current = current.next
        
        if current is None:
            print("Index out of range")
            return
        
        # 새 노드 생성 및 삽입
        new_node = ListNode(val)
        new_node.next = current.next
        current.next = new_node

    def size(self):
        cnt = 0
        current = self.head
        while current is not None:
            cnt += 1
            current = current.next
        return cnt

# 테스트 코드
if __name__ == "__main__":
    ll = LinkedList()
    print(ll.size())
    ll.append(3)
    ll.prepend(2)
    ll.append(4)
    ll.prepend(1)
    ll.append(5)
    ll.display()
    ll.insert_at_index(1, 10)
    ll.display()
    print(ll.size())

    ll.delete(10)
    ll.display()
    ll.insert_at_index(100, 100)
    print(ll.size())

