
describe ('First Test', () => {
    it ('is working', () => {
      expect (true).to.equal (true);
    });
  });
  describe ('Visit page', () => {
    it ('Visit the app', () => {
      cy.visit ('/');
    });
  });

  describe('Go to Register', function() {
    it('url should be register', function() {
      cy.visit('/');
      cy.get('#register').click();
      cy.url().should('include', 'register');
    })
  });

  describe('Enter invalid creds', function() {
    it('enter invalid creds - url should be login', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("sometext");
      cy.get('#password').type("sometext");
      cy.get('#login').click();
      cy.url().should('include', 'login');  
    })
  });

  describe('Enter proper creds', function() {
    it('enter proper creds - url should be dashboard', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("password");
      cy.get('#login').click();
      cy.url().should('include', 'dashboard');
    })
  });

  describe('Go to readnow with proper creds', function() {
    it('enter proper creds - url should be readnow', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("password");
      cy.get('#login').click();
      
      cy.get('#readnow').click();
      cy.url().should('include', 'readnow');
    })
  });

  describe('Go to readnow with wrong creds', function() {
    it('enter invalid creds - url should be login', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("passwyuut");
      cy.get('#login').click();
      cy.get('#readnow').click();
      cy.url().should('include', 'login');
    })
  });


  describe('Go to dashboard with proper creds', function() {
    it('enter proper creds - url should be dashboard', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("password");
      cy.get('#login').click();
      cy.get('#dashboard').click();
      cy.url().should('include', 'dashboard');
    })
  });

  describe('Go to dashboard with wrong creds', function() {
    it('enter invalid creds - url should be login', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("passwyuut");
      cy.get('#login').click();
      cy.get('#dashboard').click();
      cy.url().should('include', 'login');
    })
  });

  describe('Click filter button', function() {
    it('Filter poup should display', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("password");
      cy.get('#login').click();
      cy.get('#filter').click();
      let display=cy.get("#filterdialog");
      expect(display).to.not.equal (null); 
      
    });
  });

  // describe('Click close button', function() {
  //   it('Filter poup should close', function() {
  //     cy.visit('/');
        
  //     cy.get('#UserName').type("admin");
  //     cy.get('#password').type("password");
  //     cy.get('#login').click();
  //     // cy.get('#filter').click();
  //     cy.get('#close').click();
  //     let display=cy.get("#filterdialog");
  //     expect(display).to.equal(null); 
      
  //   });
  // });

  describe('Filter should search for apple', function() {
    it('Filter poup should close', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("password");
      cy.get('#login').click();
      cy.get('#filter').click();
      // cy.get('#keywords').type("");  
      cy.get('#keywords').type("pple");      
      cy.get('#save').click();
      cy.get("h3").first().should('have.text','Get an Extra $100 for Your Apple Watch Trade-in This Month');
      // let display=cy.get("#filterdialog");
      // expect(display).to.equal(null);       
    });
    
    // .should('have.length', 4)
  });
  describe('Filter should search for apple - page2', function() {
    it('Filter poup should close', function() {
      cy.visit('/');
        
      cy.get('#UserName').type("admin");
      cy.get('#password').type("password");
      cy.get('#login').click();
      cy.get('#filter').click();
      // cy.get('#keywords').type("");  
      cy.get('#keywords').type("pple");   
      cy.get('#pagenumber').clear();   
      cy.get("#pagenumber").type(2);
      cy.get('#save').click();
      cy.get("h3").first().should('have.text','Apple fined $27 million for throttling old iPhones without telling users');
      // let display=cy.get("#filterdialog");
      // expect(display).to.equal(null);       
    });
  });

  // describe('Filter should search page size', function() {
  //   it('Filter poup should close', function() {
  //     cy.visit('/');
        
  //     cy.get('#UserName').type("admin");
  //     cy.get('#password').type("password");
  //     cy.get('#login').click();
  //     cy.get('#filter').click();
  //     // cy.get('#keywords').type("");  
  //     cy.get('#keywords').type("pple");   
  //     // cy.get('#pagenumber').clear();   
  //     // cy.get("#pagenumber").type(2);
  //     cy.get('#save').click();
  //     cy.get('[role="slider"]')
  //     .first()
  //     .invoke('val', 25)
  //     .trigger('change', { data: '25' })
  //     cy.get("h3").should('have.length',55);
  //     // let display=cy.get("#filterdialog");
  //     // expect(display).to.equal(null);       
  //   });
  // });
  