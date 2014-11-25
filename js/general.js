// General Initialization JavaScript Document
jQuery(document).foundation();

jQuery(window).load(function(){
	
	jQuery('.loading').fadeOut(500);
		
	// Scrolling Initialization
	jQuery('body').niceScroll({
		scrollspeed:100, 
		cursorfixedheight:150, 
		cursorwidth:6
	});
	
	//Scroll Anchor Animations
	jQuery(".scroll").click(function(event){
		//prevent the default action for the click event
		event.preventDefault();

		//get the full url - like mysitecom/index.htm#home
		var full_url = this.href;

		//split the url by # and get the anchor target name - home in mysitecom/index.htm#home
		var parts = full_url.split("#");
		var trgt = parts[1];

		//get the top offset of the target anchor
		var target_offset = jQuery("#"+trgt).offset();
		var target_top = target_offset.top;

		//goto that anchor by setting the body scroll top to anchor top
		jQuery('html, body').animate({scrollTop:target_top}, 1000);
	});
	
	//Banner Initiliazation
	var mainBanner = jQuery('.banner .bannerImages');
	
	if(mainBanner.length > 0){
		
		mainBanner.on( 'cycle-update-view', function(event, optionHash, slideOptionsHash, currentSlideEl) {			
			jQuery('.text',currentSlideEl).stop().animate({'margin':'0'},1000, function(){
				jQuery(this).find('a').stop().animate({'opacity':1},1000);	
			});
		});
		
		mainBanner.on( 'cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
			jQuery('.text',outgoingSlideEl).stop().animate({'margin-top':'-1000px'},1000, function(){
				jQuery(this).find('a').stop().animate({'opacity':0},1000);	
			});
		});
		
		mainBanner.cycle({
			log:false,
			prev: 'section.banner a.prev',
			next: 'section.banner a.next',
			fx: 'fade', 
			pager:'.controls',
			slides:'.slide',
			timeout:5000,
			delay:2000
		});
		
		jQuery(window).smartresize(function(){
			
			mainBanner.cycle('destroy');
			
			mainBanner.cycle({
				log:false,
				prev: 'section.banner a.prev',
				next: 'section.banner a.next',
				fx: 'fade', 
				pager:'.controls',
				slides:'.slide'		
			});
		
		});
	}
	
	
	//Portfolio Appear Animation
	var portfolio = jQuery('.portfolio');
	
	if(portfolio.length > 0){
		
		jQuery('.zoom').magnificPopup({ 
		  type: 'image',
		  zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out'
		  }
		});
		
		//On appear Animation
		portfolio.appear();
		
		portfolio.on('appear', function(){
			
				var portfolioItems = [];
				
				jQuery(this).find('.flipper.first').each(function(){
					portfolioItems.push($(this));
				});
				
				for(i=0; i <= portfolioItems.length; i++){
					jQuery(portfolioItems[i]).delay(i * 300).animate({'opacity':1},100);
				}
		});
		
		//Set Height of Back Flip
		var portImageHeight = jQuery('section.works article.portfolioItem .front img').height();
		
		var portfolioItem = jQuery('section.works article.portfolioItem');
		portfolioItem.css({'height':portImageHeight});
		portfolioItem.find('.back').css({'height':portImageHeight});
		
		jQuery(window).smartresize(function(){
			var portImageHeight = jQuery('section.works article.portfolioItem .front img').height();
			portfolioItem.css({'height':portImageHeight});
			portfolioItem.find('.back').css({'height':portImageHeight});
		});
	
		//Isotope Initialization
		portfolioContainer = portfolio.children();
		
		portfolioContainer.isotope();
		
		jQuery(window).smartresize(function(){
			portfolioContainer.isotope();
		});
		
		jQuery('#filters li a').click(function(){
			
			jQuery('#filters li a').removeClass();
			jQuery(this).addClass('current');
			
			var selector = jQuery(this).attr('data-filter');
			portfolioContainer.isotope({ filter: selector });
			return false;
		});
		
	
	}
	
	//Set Height of Back Flip for Team Members
	var memberImageHeight = jQuery('.teamMembers article.member .front img').height();
	
	var memberItem = jQuery('.teamMembers article.member');
	memberItem.find('.back').css({'height':memberImageHeight});
	memberItem.find('.flipper').css({'height':memberImageHeight});
	
	jQuery(window).smartresize(function(){
		var memberImageHeight = jQuery('.teamMembers article.member .front img').height();
		memberItem.find('.back').css({'height':memberImageHeight});
		memberItem.find('.flipper').css({'height':memberImageHeight});
	});
	
	//Skill Animation
	var skill = jQuery('.teamInfo .skills .skillItem .skill');
	
	if(skill.length > 0){
		
		skill.appear();
		
		skill.on('appear', function(){
			
			var skillBar = jQuery(this).children();
			var skillPercentage = skillBar.attr('data-skillPercentage');
			skillBar.delay(100).animate({'width':skillPercentage+'%'},500);
			
		});
	}
	
	//Services Animation
	var servicesHolder = jQuery('section.services .service.first');
	
	if(servicesHolder.length > 0){
		
		servicesHolder.appear();
		
		var services = [];
				
		jQuery('.service').each(function(){
			services.push(jQuery(this));
		});
		
		servicesHolder.on('appear', function(){
			for(i=0; i <= services.length; i++){
				jQuery(services[i]).delay(i * 400).animate({'opacity':1},400);
			}
		});
			

	}
	
	//Parallax Animation
	var parallaxAnimation = jQuery('.parallax');
	
	if(parallaxAnimation.length > 0){
		parallaxAnimation.parallax("50%", 0.1); 
	}
	
	
	//Blog Isotope Initialization
	var blog = jQuery('.blogsLayout');
	
	if(blog.length > 0){
		
		jQuery('.readMore').magnificPopup({ 
		  type:'inline',
		  midClick: true
		});


		blog.isotope({
			resizeable:false,
			masonry: { columnWidth: jQuery('.blogsLayout').width() / 2}
		});
		
		// update columnWidth on window resize
		jQuery(window).smartresize(function(){
			
		  var blogWidth = blog.width();
		   
		  blog.isotope({
			masonry: { columnWidth: blogWidth / 2}
		  });
		  
		});
	}
	
    //Pricing Hover Animation
	var pricingHolder = jQuery('.prices .pricesInfo .priceHolder');
	
	if(pricingHolder.length > 0 ){
		
		var price = pricingHolder.find('article');

		price.mouseenter(function(){
			
				jQuery('.prices .pricesInfo .priceHolder article.selected').removeClass('selected');
				
				jQuery(this).addClass('selected');
		});
		
	}
	
	
   //Input Default Text
   jQuery(".defaultText").focus(function(srcc)
    {
        if (jQuery(this).val() == jQuery(this)[0].title)
        {
            jQuery(this).removeClass("defaultTextActive");
            jQuery(this).val("");
        }
    });
    
    jQuery(".defaultText").blur(function()
    {
        if (jQuery(this).val() == "")
        {
            jQuery(this).addClass("defaultTextActive");
            jQuery(this).val(jQuery(this)[0].title);
        }
    });
	
	jQuery(".defaultText").blur();
	
	//Mobile Navigation
	var menuIcon = jQuery('header a.mobileMenuIcon');
	
	if(menuIcon.length > 0){
		
		var menuOpened = false;
		
		menuIcon.click(function(){
			
			if(menuOpened == false)
			{
				jQuery('header nav').parent().stop().slideDown();
				menuOpened = true;
			}
			else
			{
				jQuery('header nav').parent().stop().slideUp();
				menuOpened = false;
			}
		});
		
		jQuery(window).smartresize(function(){
			
			if(jQuery(window).width() > 768){
				jQuery('header nav').parent().css({'display':'block'});
			}
			else
			{
				jQuery('header nav').parent().css({'display':'none'});
			}
			
		});
	}
	
});
