class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        # 새로운 노드를 리스트 끝에 추가
        # TODO: 여기를 구현해보세요
        newNode = ListNode(val)
        if (self.head is None):
            self.head = newNode
            return
        last = self.head
        while (last.next):
            last = last.next
        last.next = newNode

    def prepend(self, val):
        # 새로운 노드를 리스트 앞에 추가
        # TODO: 여기를 구현해보세요
        newNode = LinkedList(val)
        newNode.next = self.head
        self.head = newNode

    def display(self):
        # 리스트의 모든 값을 출력
        # TODO: 여기를 구현해보세요
        current = self.head
        while current:
            print(current.val, end=" -> ")
            current = current.next
        print("None")
    
    def delete(self, val):
        # 특정 값을 가진 노드 삭제
        # TODO: 여기를 구현해보세요
        current = self.head
        while current:
            if current.val == val:
                if current.prev:
                    current.prev.next = current.next
                if current.next:
                    current.next.prev = current.prev
                if current == self.head:
                    self.head = current.next
                return
            current = current.next

# 테스트 코드
if __name__ == "__main__":
    ll = LinkedList()
    ll.append(1)
    ll.append(2) 
    ll.append(3)
    ll.display()  # 출력: 1 -> 2 -> 3 -> None

