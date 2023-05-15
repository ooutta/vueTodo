
// Test suite
// describe('테스트 스위트 이름', 테스트 케이스들을 모아놓을 콜백함수)
describe('todo 관리', () => {
    // beforeEach : 각각의(Each) 테스트 케이스들을 수행하기 전(before)에 동작시킬 코드
    beforeEach(() => {
        cy.visit('/'); // 사용자가 브라우저를 통해 todos 메인 페이지에 접속

        // 모달 창 열기
        cy.contains('Add Todo').click(); // Add Todo 버튼 클릭
    })

    // 하나의 테스트 케이스
    // it('테스트 할 동작 서술', 실제 테스트 코드 작성할 콜백함수)
    it('Todo 모달 창을 열고 닫을 수 있다.', () => {
        // 모달 창 닫기(배경화면 선택 시)
        cy.get('[data-cy="modal-backdrop"]').click({ force : true });

        cy.get('[data-cy="modal-backdrop"]').should('not.exist');
        cy.get('[data-cy="modal-container"]').should('not.exist');

        // 모달 창 닫기(Close 버튼 클릭 시)
        cy.contains('Add Todo').click();
        cy.contains('Cancel').click();
    
        cy.get('[data-cy="modal-backdrop"]').should('not.exist');
        cy.get('[data-cy="modal-container"]').should('not.exist');

    });

    it('새로운 Todo를 작성할 수 있다.', () => {
        cy.get('#title').type('커피 마시기'); // input에 text 입력
        cy.get('#summary').type('커피를 마신다.');
        // cy.get('#category').
        cy.get('[data-cy="modal-container"]').contains('Add').click();

        cy.get('[data-cy="modal-backdrop"]').should('not.exist');
        cy.get('[data-cy="modal-container"]').should('not.exist');

        // cy.get('li').should('have.length', 4);
        // cy.contains('h2', '커피 마시기');
        cy.get(':nth-child(4) > :nth-child(1) > div > [data-test="title"]').contains('커피 마시기');
        cy.get(':nth-child(4) > :nth-child(1) > div > .mt-2').contains('커피를 마신다.');
    });

    it('입력 항목을 빠뜨리면 안내 메시지가 출력된다.', () => {
        cy.get('[data-cy="modal-container"]').contains('Add').click();
        cy.contains('Please fill out all forms!');
    });

    it('필터링 항목에 맞게 todo 목록들이 필터링된다.', () => {
        cy.visit('/');
        cy.get('[data-cy="todo-filter"]').select('todo', { force: true });
        cy.get('li').should('have.length', 1);
        cy.get('[data-cy="todo-filter"]').select('progress');
        cy.get('li').should('have.length', 1); // 2로 바꿔서 fail 확인
        cy.get('[data-cy="todo-filter"]').select('done');
        cy.get('li').should('have.length', 1);
        cy.get('[data-cy="todo-filter"]').select('all');
        cy.get('li').should('have.length', 3);
    });
})