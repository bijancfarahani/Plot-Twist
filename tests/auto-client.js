describe('runFourUsers', function() {
	//This browser object should not do anything after this
	browser.get('http://localhost:3000');  
	//The number of clients to test
	var numTabs = 4;
	//array of client windows
	var forks = [];
	//declare and store client windows
	for(var i = 0; i < numTabs; i++) {
		forks.push(browser.forkNewDriverInstance(true))
	}
	//automates the client input page
	it('clientInfo', function() {
		for(var i = 0; i < numTabs; i++) {	
			//find and enter the name info		
			var nameInput = forks[i].element(by.model('name'));
			nameInput.sendKeys('testUser'+ (i));

			//find and enter the age info
			var ageInput = forks[i].element(by.model('age'));
			ageInput.sendKeys(i);
			//submit the form
			var clientInputForm = forks[i].element(by.className('clientInput'));
			clientInputForm.submit();
		}
	});
	//joins the first room
	it('joinRoom', function() {
		for(var i = 0; i < numTabs; i++) {
			//ensure that the page can load the rooms list and needed elements first
			var until = protractor.ExpectedConditions;
			//The join room button for room 1
			var joinButton = forks[i].element.all(by.className('joinButton')).get(0);

			//let the page load the button before attempting to press it
			forks[i].wait(until.presenceOf(joinButton),5000,'joinButton not here');
			joinButton.click();
		}
	});
	//readys the client so that the game can begin
	it('readyRoom', function() {
		for(var i = 0; i < numTabs; i++) {
			//find the checkbox and ready it
			var readyCheckBox = forks[i].element(by.id('readyBox'));
			readyCheckBox.click();
		}
		//leave game open for manual testing
		browser.pause();
	});
});