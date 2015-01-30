import Ember from 'ember';

export default Ember.View.extend({
    classNames: ['app-view'],
    // Put jquery/DOM manipulation here
    didInsertElement: function (){
        var SidebarMenuEffects = (function() {

            function hasParentClass( e, classname ) {
                if(e === document) {return false;}
                if( classie.has( e, classname ) ) {
                    return true;
                }
                return e.parentNode && hasParentClass( e.parentNode, classname );
            }

            // http://coveroverflow.com/a/11381730/989439
            function mobilecheck() {
                var check = false;
                (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            }

            function init() {

                var container = document.getElementById( 'st-container' ),
                    buttons = Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > button' ) ),
                // event type (if mobile use touch events)
                    eventtype = mobilecheck() ? 'touchstart' : 'click',
                    resetMenu = function() {
                        classie.remove( container, 'st-menu-open' );
                    },
                    bodyClickFn = function(evt) {
                        if( !hasParentClass( evt.target, 'st-menu' ) ) {
                            resetMenu();
                            document.removeEventListener( eventtype, bodyClickFn );
                        }
                    };

                buttons.forEach( function( el, i ) {
                    var effect = el.getAttribute( 'data-effect' );

                    el.addEventListener( eventtype, function( ev ) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        container.className = 'st-container'; // clear
                        classie.add( container, effect );
                        setTimeout( function() {
                            classie.add( container, 'st-menu-open' );
                        }, 25 );
                        document.addEventListener( eventtype, bodyClickFn );
                    });
                } );

            }

            init();
        });
        SidebarMenuEffects();

        // LANDING PAGE FLIPPERS
        var tapToTouch = function () {
            Ember.$('.flipper').on('tap', function(e) {
                Ember.$(this).toggleClass("hover");
            });
        };
        tapToTouch();


        // PAGE POCKET SCROLL EFFECT
        var tb = Ember.$('.cds-navbar');
        var apptb = Ember.$('.appnav');
        var tbs = "top-bar-scrolled";

        Ember.$('.slide').scroll(function() {
            if(Ember.$(this).scrollTop()) {
                tb.addClass(tbs);
                apptb.addClass(tbs);
            } else {
                tb.removeClass(tbs);
                apptb.removeClass(tbs);
            }
        });

        // SELECT BOX CODE
        Ember.$("#e2").select2({
            formatNoMatches: function (term) {
                return "Whoops!! <br> Instrument Not Found!";
            }
        });

        //    if (jQuery.browser.mobile == true) {
        //        // Defined in landing-page.js
        //        tapToTouch();
        //
        //        // For mobile Sidebar
        //        Ember.$('.st-content').removeClass('z-index-fix');
        //    }


        var $form_modal = Ember.$('.cd-user-modal'),
            $form_login = $form_modal.find('#cd-login'),
            $form_signup = $form_modal.find('#cd-signup'),
            $form_forgot_password = $form_modal.find('#cd-reset-password'),
            $form_modal_tab = Ember.$('.cd-switcher'),
            $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
            $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
            $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
            $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
            $main_nav = Ember.$('#main-nav');

        //open modal
        $main_nav.on('click', function(event){

            if( Ember.$(event.target).is($main_nav) ) {
                // on mobile open the submenu
                Ember.$(this).children('ul').toggleClass('is-visible');
            } else {
                // on mobile close submenu
                $main_nav.children('ul').removeClass('is-visible');
                //show modal layer
                $form_modal.addClass('is-visible');
                //show the selected form
                ( Ember.$(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
            }

        });

        //close modal
        Ember.$('.cd-user-modal').on('click', function(event){
            if( Ember.$(event.target).is($form_modal) || Ember.$(event.target).is('.cd-close-form') ) {
                $form_modal.removeClass('is-visible');
            }
        });
        //close modal when clicking the esc keyboard button
        Ember.$(document).keyup(function(event){
            if(event.which=='27'){
                $form_modal.removeClass('is-visible');
            }
        });

        //switch from a tab to another
        $form_modal_tab.on('click', function(event) {
            event.preventDefault();
            ( Ember.$(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
        });

        //hide or show password
        Ember.$('.hide-password').on('click', function(){
            var $this= Ember.$(this),
                $password_field = $this.prev('input');

            ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
            ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
            //focus and move cursor to the end of input field
            $password_field.putCursorAtEnd();
        });

        //show forgot-password form
        $forgot_password_link.on('click', function(event){
            event.preventDefault();
            forgot_password_selected();
        });

        //back to login from the forgot-password form
        $back_to_login_link.on('click', function(event){
            event.preventDefault();
            login_selected();
        });

        function login_selected(){
            $form_login.addClass('is-selected');
            $form_signup.removeClass('is-selected');
            $form_forgot_password.removeClass('is-selected');
            $tab_login.addClass('selected');
            $tab_signup.removeClass('selected');
        }

        function signup_selected(){
            $form_login.removeClass('is-selected');
            $form_signup.addClass('is-selected');
            $form_forgot_password.removeClass('is-selected');
            $tab_login.removeClass('selected');
            $tab_signup.addClass('selected');
        }

        function forgot_password_selected(){
            $form_login.removeClass('is-selected');
            $form_signup.removeClass('is-selected');
            $form_forgot_password.addClass('is-selected');
        }

        //REMOVE THIS - it's just to show error messages
        $form_login.find('input[type="submit"]').on('click', function(event){
            event.preventDefault();
            $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        });
        $form_signup.find('input[type="submit"]').on('click', function(event){
            event.preventDefault();
            $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
        });


        //IE9 placeholder fallback
        //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
        if(!Modernizr.input.placeholder){
            Ember.$('[placeholder]').focus(function() {
                var input = Ember.$(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            }).blur(function() {
                var input = Ember.$(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            }).blur();
            Ember.$('[placeholder]').parents('form').submit(function() {
                Ember.$(this).find('[placeholder]').each(function() {
                    var input = Ember.$(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                })
            });
        }

        Ember.$.fn.putCursorAtEnd = function() {
            return this.each(function() {
                // If this function exists...
                if (this.setSelectionRange) {
                    // ... then use it (Doesn't work in IE)
                    // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
                    var len = Ember.$(this).val().length * 2;
                    this.setSelectionRange(len, len);
                } else {
                    // ... otherwise replace the contents with itself
                    // (Doesn't work in Google Chrome)
                    Ember.$(this).val(Ember.$(this).val());
                }
            });
        };

    }
});
