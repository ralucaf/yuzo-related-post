jQuery(document).ready( function() {
 

    //from the href="#"
    jQuery('.ilentheme-options a[href="#"],.ilenplugin-options a[href="#"]').on('click',function(event){
        //do something
        //prevent the click as is passed to the function as an event
        event.preventDefault();
        return false;
    });
         

	jQuery('#tabs')
        .tabs({  show: function(event, ui) {

            var lastOpenedPanel = $(this).data("lastOpenedPanel");

            if (!$(this).data("topPositionTab")) {
                $(this).data("topPositionTab", $(ui.panel).position().top)
            }         

            //Dont use the builtin fx effects. This will fade in/out both tabs, we dont want that
            //Fadein the new tab yourself            
            $(ui.panel).hide().fadeIn(50);

            if (lastOpenedPanel) {

                // 1. Show the previous opened tab by removing the jQuery UI class
                // 2. Make the tab temporary position:absolute so the two tabs will overlap
                // 3. Set topposition so they will overlap if you go from tab 1 to tab 0
                // 4. Remove position:absolute after animation
                lastOpenedPanel
                    .toggleClass("ui-tabs-hide")
                    .css("position", "absolute")
                    .css("top", $(this).data("topPositionTab") + "px")
                    .fadeOut(50, function() {
                        $(this)
                        .css("position", "");
                    });

            }

            //Saving the last tab has been opened
            $(this).data("lastOpenedPanel", $(ui.panel));

        } } )
        .addClass('ui-tabs-vertical ui-helper-clearfix');




    //Custom
    // =save theme options
    jQuery(".ilentheme-options .btn_save,.ilenplugin-options .btn_save").on("click",function(){
        jQuery( this ).find("i").addClass("spinInfinite");
        document.frmsave.submit();
    });


    // ONLY THEME 'plugin-fresh.css'
    // for plugin
    /*jQuery(".ilenplugin-options .btn_save").on("click",function(){
        jQuery( this ).find("i").addClass("spinInfinite");
    });*/
    // for plugin
    jQuery(".ilenplugin-options .btn_reset, .ilentheme-options .btn_reset").on("click",function(){
        if( confirm( jQuery(this).attr("data-me") ) ){
            jQuery( this ).find("i").addClass("spinInfinite");
            document.frmreset.submit();
        }
    });
    // end -> ONLY THEME 'plugin-fresh.css'




    var formfield;
    // upload file >3.5
    jQuery('.upload_image_button,.upload_image_button_complete').on("click",function( event ){  
 
		 	event.preventDefault();
 			formfield = jQuery(this).prev().attr('id');
 			var button_this = jQuery(this);

		    var custom_uploader = wp.media({
		        title: jQuery(button_this).attr('data-title'),
		        button: {
		            text: jQuery(button_this).attr('data-button-set')
		        },
		        multiple: false  // Set this to true to allow multiple files to be selected
		    })
		    .on('select', function() {
		        var attachment = custom_uploader.state().get('selection').first().toJSON();

		        jQuery("#"+formfield).val(attachment.url);
                if( jQuery(button_this).hasClass("upload_image_button_complete") ){
                    jQuery(button_this).next(".preview").html("<span class='admin_delete_image_upload admin_delete_image_upload_complete'>✕</span>");
                    jQuery(button_this).next(".preview").css("background-image","url("+attachment.url+")");
                    jQuery(button_this).next(".preview").css("height","200px");
                }else{
                    jQuery(button_this).parent().find(".preview").html("<img src='"+attachment.url+"' /><span class='admin_delete_image_upload'>✕</span>");
                }
		    })
		    .open();

	});

    // end upload >3.5


	// upload file old
	var button_this;
	jQuery('.upload_image_button_old').on("click",function( event ){ 
		 button_this = jQuery(this); 
		 formfield = jQuery(this).prev().attr('id');
		 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		 return false;
	});
	window.send_to_editor = function(html) {
		 imgurl = jQuery('img',html).attr('src');
		 jQuery("#"+formfield).val(imgurl);
		 jQuery(button_this).parent().find(".preview").html("<img src='"+imgurl+"' /><span class='admin_delete_image_upload'></span>");
		 tb_remove();
	}
	// end upload file old


	// delete upload clear input
	jQuery(".admin_delete_image_upload").live("click",function(){
	    jQuery(this).parent().parent().find('.theme_src_upload').val('');
	    jQuery(this).prev().fadeOut(300);
	    jQuery(this).fadeOut(300);
	});
    jQuery(".admin_delete_image_upload_complete").live("click",function(){
        jQuery(this).parent().parent().find('.theme_src_upload').val('');
        jQuery(this).parent().css("background-image","url()");
        jQuery(this).parent().css("height","20px");
        jQuery(this).fadeOut(300);
    });

    // select2 change event in background_complete
    jQuery(".background_complete .select2_background_complete").on("change",function(){
        jQuery(this).parent().parent().next().find(".preview").css(jQuery(this).attr('data-attribute'),jQuery(this).val());
    });
    



	// select radio image (active)
	jQuery(".radio_image_selection").on("click",function( event){

		event.preventDefault();
		var class_ref;
		var img_obj;


		class_ref = jQuery(this).attr("data-id");
		img_obj = jQuery(this);

		jQuery("."+class_ref).each(function(){
			jQuery(this).removeClass("active");
		});

		jQuery(img_obj).addClass("active");
		jQuery(img_obj).next().attr("checked","checked");

	});

    // select radio bg pattern (active)
    jQuery(".item_pattern_bg").on("click",function( event){

        event.preventDefault();
        var class_ref;
        var img_obj;
        var obj_wrap;
        var obj_wrap_class;

        obj_wrap_class = jQuery(this).parent().parent().attr("class");
        obj_wrap = jQuery(this).parent().parent();
        //class_ref = jQuery(this).attr("data-id");
        img_obj = jQuery(this);
        //alert("."+obj_wrap_class+" .item_pattern_bg");
        jQuery( "."+obj_wrap_class+" .item_pattern_bg" ).each(function(){
            jQuery(this).removeClass("active");
            jQuery(this).next().attr('checked', false);

        });

        jQuery(img_obj).addClass("active");
        jQuery(img_obj).next().attr("checked","checked");

    });

 

	// set input an colorpicker
	jQuery('.theme_color_picker').wpColorPicker();


	// if exists div class 'mesaggebox' delete element whth effect
	if ( jQuery('.ilentheme-options div.messagebox').length ) {

		setTimeout(function() {
		    jQuery('.ilentheme-options div.messagebox').slideUp(1000, function(){
			    jQuery(this).remove();
			});
		 }, 2000);

	}




    // Background custom & pattern
    jQuery(".switch-label").on("click",function(){

        var opt =  jQuery(this).prev().attr("value");
        var obj1 =  jQuery(this).parent().parent().find(".custom_bg_wrap");
        var obj2 =  jQuery(this).parent().parent().find(".pattern_bg_wrap");
        jQuery(obj1).css("display","none");
        jQuery(obj2).css("display","none");
        //jQuery().fadeOut( 1500, function() {

            //jQuery(obj).css("display","none");

            var obj_move;
            if( opt == "2"){
                //obj_move = jQuery(this).parent().parent().find(".custom_bg_wrap");
                obj1.css("display","block");    
            }else if( opt = "1" ){
                //obj_move = jQuery(this).parent().parent().find(".pattern_bg_wrap");
                obj2.css("display","block");
               
            }
        //});
        
        

    });



    // Fix color picker in background_complete
    jQuery(".background_complete .wp-color-result").on("click",function(){

        if( jQuery(this).hasClass('wp-picker-open') )
            jQuery(this).next().next('.wp-picker-holder').css({
              'display'         : 'block',
              'overflow'        : 'hidden',
              'margin-bottom'   : '20px'
            });
        else
            jQuery(this).next().next('.wp-picker-holder').css({
              'display'         : 'inherit',
              'overflow'        : 'inherit',
              'margin-bottom'   : '0'
            });

    });
    



    // Fix color picker double
    jQuery(".ilentheme-options .color_hover .wp-color-result").on("click",function(){
        var objCol = jQuery(this).parent().parent();

        if( jQuery(this).hasClass('wp-picker-open') ){
            if( jQuery(this).parent().parent().hasClass("color_hover_color") ){
                jQuery(objCol).parent().parent().find(".color_hover_text").css("display","none");
                jQuery(objCol).parent().parent().find(".color_hover_hover").css("display","none");
            }else if( jQuery(this).parent().parent().hasClass("color_hover_hover") ){
                jQuery(objCol).parent().parent().find(".color_hover_text").css("display","none");
                jQuery(objCol).parent().parent().find(".color_hover_color").css("display","none");
            }  
        }else{
            jQuery(objCol).parent().parent().find(".color_hover_text").css("display","table-cell");
            jQuery(objCol).parent().parent().find(".color_hover_color").css("display","table-cell");
            jQuery(objCol).parent().parent().find(".color_hover_hover").css("display","table-cell");
        }
    });


    jQuery.noConflict(); 
    /*jQuery(function(){
    try{
      var $ = jQuery;
      $('#widgets-right').ajaxComplete(function(event,XMLHttpRequest,ajaxOptions){
        try{
        var request={},pairs=ajaxOptions.data.split('&'),i,split,widget;
        for(i in pairs){
            split=pairs[i].split('=');
            request[decodeURIComponent(split[0])]=decodeURIComponent(split[1])
        }
        if(request.action&&(request.action==='save-widget')){
            widget=$('input.widget-id[value="'+request['widget-id']+'"]').parents('.widget');
            if(!XMLHttpRequest.responseText)
                wpWidgets.save(widget,0,1,0);
            else 
                $(document).trigger('saved_widget',widget)
        }
    }catch(e){

    }
      });
    }catch(e){

    }
    }); */

  
    

});