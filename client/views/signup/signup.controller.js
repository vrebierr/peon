'use strict';

angular.module('peon')
.controller('SignupCtrl', function ($scope, Auth) {
    $scope.user = {
        name: "",
        address: "",
        commercialId: "",
        plafond: "",
        factureId: "",
        impots_r: {description:"CURRENT", value:"1"},
        selectImpots: [{"id": "0","description": "Tous les mois","value": "1"}, {"id": "1","description": "Tous les trois mois", "value": "3"}]
    };

    var SimpleForm = function(options){

  var self = this;

  /* #extend is used to set default params in case of no options
  ================================================== */

	this.options = $.extend({

	  boxClassName: '.box',
	  progressBarClassName: '.progress-bar',
	  navNextClassName: '.next-box',
	  navPrevClassName: '.prev-box',

	  nav: true,
	  keyboard: true,
	  validation: true,
	  autofocus: true,
	  center: true

	}, options);

  /* #Attributes
  ================================================== */

	this.data = $(this.options.boxClassName);
	this.numberBoxes = this.data.length;

	this.currentBox = 0;
	this.currentProgress = 0;
	this.progressRate = 100 / this.numberBoxes;

	this.isAnimating = false;
	this.isValidated = false;

	/* #Init options
	================================================== */

	  if (this.options.keyboard == true)
		self.setKeyboard();
	  if (this.options.nav == true)
		self.initNav();
	  if (this.options.validation == true)
		self.initValidation();
	  if (this.options.center == true)
	  	$(this.data).center();
};


/* #Initialisation data & keyboard triggers
================================================== */


SimpleForm.prototype = {

  setKeyboard:function() {
	var self = this;
	$(window).keydown(function(event){
		  if (event.keyCode==37) {
			  self.prevBox();
		  }
		  if (event.keyCode==39) {
			 self.nextBox();
		  }
		  if (event.keyCode==13) {
			self.nextBox();
		  }
	});
  },

  initNav:function() {
	var self = this;
	$(this.data).each(function(){
	  $('button',this).click(function(){

		self.nextBox();
		self.disableButton();
	  });
	});
  },

/* #External accessors
================================================== */

  getCurrentBox:function() {
	return this.currentBox;
  },

  getNbBoxes:function() {
	return this.numberBoxes;
  },

/* #Validation
================================================== */


  initValidation:function(){
	var self = this;

	/* #Checkbox part
	================================================== */

	    $(this.data).find('input[type="checkbox"]').change(function () {

			var checkboxs = $(self.data[self.currentBox]).find('input[type="checkbox"]');

			// adding the default value in case of default check
			if($(this).attr('checked'))
				$(this).addClass('checked');


	        if($(this).prop('checked'))
	        {
		        checkboxs.removeClass('checked');
				checkboxs.prop("checked", false);

	        	$(this).addClass('checked');
	        	$(this).prop("checked", true);
	        }
			if ($(self.data[self.currentBox]).find('input[type="checkbox"]:checked').length == 0)
				$(this).prop("checked", true);

	    });


	/* #Input part
	================================================== */

		var charCount = 0;
		var input = $(this.data).find('input');

		// for each keypress
		$(window).keyup(function(event){

			charCount++;

			/* #Auto focus
			================================================== */
			if (self.options.autofocus == true)
			{
				var current_input = $(self.data[self.currentBox]).find('input');
				var current_focus = $(self.data[self.currentBox]).find(':focus');

				if ( current_input[0] && current_focus.length == 0)
					 current_input[0].focus();
			}

			/* #Validation part
			================================================== */
			$(input).each(function(){

				if ($(this).attr('type') == "email")
				{
					if (self.validateEmail($(this).val()) == true)
					{
						$(this).attr('form-isvalid', 'true');
						self.disableButton();
						return true;
					}
				}
				else if ($(this).attr('type') == "text")
				{
					if (self.validateString($(this).val()) == true)
					{
						$(this).attr('form-isvalid', 'true');
						self.disableButton();
						return true;
					}
				}
				else if ($(this).attr('type') == "checkbox")
				{
					$(this).attr('form-isvalid', 'true');
					self.disableButton();
					return true;
				}

			/* #Error handling
			================================================== */
				if (charCount > 30)
				{
					var errorBox = $(self.data[self.currentBox]).find('.error');
					console.log($(errorBox[0]));
					$(errorBox[0]).addClass('display');
					charCount = 0;
				}

				//set the validation param at false
				$(this).attr('form-isvalid', 'false');
				return true;
			});
			self.checkInputBox();
		});

  },
 	/* # Can i go to the next step ?
	================================================== */
  		// check if all inputs in the current box are valid

  checkInputBox:function() {
	var self = this;
	var object = $(this.data[this.currentBox]).find('input');
	this.isValidated = true;

	if (object)
	{
		$(object).each(function(){
			console.log($(this));
			if ($(this).attr('form-isvalid') == "false")
			{
				self.isValidated = false;
			}
		});
	}
	self.disableButton();
  },


	/* #Invalidate button when inputs are not approuved
	================================================== */


	  disableButton:function() {
	  	var button = $(this.data[this.currentBox]).find('button');
	  	var inputs = $(this.data[this.currentBox]).find('input');

	  	if (inputs.length == 0)
	  		button.removeClass('disabled');
	  	else if (this.isValidated == true)
	  		button.removeClass('disabled');
	  	else
	  		button.addClass('disabled');
	  },


	/* #Validate methods
	================================================== */

		validateEmail:function(email) {
		  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  return re.test(email);
		},

		validateString:function(string) {
			console.log(string);
		  if (string.length >= 3)
			return true;
		  else
			return false;
		},

		validateSiret:function(siret) {
		  if (siret.length >= 12)
			return true;
		  else
			return false;
		},



/* #Core
================================================== */


  nextBox: function() {
	var self = this;

	/* #Tests
	================================================== */

		self.checkInputBox();
		//if it is scrolling, do nothing
		if(this.isAnimating) {
		  return ;
		}
		//if index number is out of bound, i.e., invalid, do nothing
		if(this.currentBox < 0 || this.currentBox >= this.numberBoxes) {
		  return ;
		}
		//if it dont respect validation rules
		if(this.options.validation == true && this.isValidated == false) {
			return ;
		}


	/* #Update variables
	================================================== */

		this.currentBox++;
		$('.form-step').text(this.currentBox + " / " + this.numberBoxes);
		this.isAnimating = true;
		this.currentProgress = this.currentBox * this.progressRate;

	/* #Render
	================================================== */

		$(this.options.progressBarClassName).css('width', Math.floor(this.currentProgress) + '%');

	$(this.data[this.currentBox - 1])
					.addClass('fade-out-next')
					.delay(300)
					.queue(function(next){

						$(self.data)
							.addClass('removed')
							.removeClass('fade-in-next', 'fade-in-prev');
	  	self.renderNext();


	  	next();

	});

  },

  renderNext:function() {
  	var self = this;
  		this.isValidated = false;
		self.disableButton();
	$(this.data[this.currentBox])
				.removeClass('removed')
				.delay(400)
				.queue(function(next){
		$(this).addClass('fade-in-next');
		next();
  	});

	this.isAnimating = false;
  }


};

	var form = new SimpleForm({
		nav: true,
		keyboard: true,
		validation: true,
		autofocus: true
		});
});
