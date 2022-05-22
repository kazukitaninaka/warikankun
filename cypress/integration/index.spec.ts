describe('home', () => {
  context('sp resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
    });
    it('ルートパスに訪問できるか', () => {
      cy.visit('/');
    });
  });
});
